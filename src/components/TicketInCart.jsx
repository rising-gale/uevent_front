import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeAmount, changeOptionals, deleteItem } from '../redux/cartSlice';

const TicketInCart = ({ data }) => {
    const dispatch = useDispatch();
    const [showOptionals, setShowOptionals] = useState(false);
    const [state, setState] = useState({
        remindMe: false,
        showMe: false,
        promocode: ''
    })
    // console.log('Ticket data in cart: ', data);
    const handleIncreaseTickets = () => {
        let quantity = data.quantity;
        if (quantity < data.tickets) quantity++;
        dispatch(changeAmount({ _id: data._id, quantity: quantity }));
    }

    const handleDecreaseTicket = () => {
        let quantity = data.quantity;
        if (quantity > 1) quantity--;
        dispatch(changeAmount({ _id: data._id, quantity: quantity }));
    }

    const handleDeleteItem = () => {
        dispatch(deleteItem(data._id));
    }

    const handleChangeAdditionals = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'remindMe':
                setState(prevState => ({
                    ...prevState,
                    remindMe: !state.remindMe
                }));
                dispatch(changeOptionals({_id: data._id, showMe: state.showMe, remindMe: !state.remindMe, promocode: state.promocode}));
                break;
            case 'showMe':
                setState(prevState => ({
                    ...prevState,
                    showMe: !state.showMe
                }));
                dispatch(changeOptionals({_id: data._id, showMe: !state.showMe, remindMe: state.remindMe, promocode: state.promocode}));
                break;
            case 'promocode':
                setState(prevState => ({
                    ...prevState,
                    promocode: value
                }));
                dispatch(changeOptionals({_id: data._id, showMe: state.showMe, remindMe: state.remindMe, promocode: value}));
                break;
            default:
                break;
        }
        // setState(prevState => ({
        //     ...prevState,
        //     [name]: value
        // }));
        // dispatch(changeOptionals({_id: data._id, showMe: state.showMe, remindMe: state.remindMe, promocode: state.promocode}));
    }

    return (
        <div className='border-y py-1 flex flex-col border-beige'>
            <div className='flex justify-between items-center py-2 w-full text-light-beige text-lg border-beige'>
                <img src={data.img ? 'http://localhost:3002/' + data.img : 'logo.png'} alt='logo' className='h-12' />
                <div>{data.title}</div>
                <div>{data.price} UAH\itm.</div>
                <div className='flex w-1/6 justify-between items-center select-none'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 hover:cursor-pointer" onClick={handleDecreaseTicket}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                    </svg>
                    {data.quantity}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 hover:cursor-pointer" onClick={handleIncreaseTickets}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                </div>
                <div className='hover:cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-7 h-7 hover:cursor-pointer" onClick={handleDeleteItem}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
            <div className='w-full flex p-1 flex-col'>
                <div className='w-full flex items-center hover:cursor-pointer hover:animate-pulse' onClick={() => { setShowOptionals(!showOptionals) }}>
                    {showOptionals ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    }
                    <div className='ml-2'>Additionals</div>
                </div>
                {showOptionals &&
                    <div className='flex p-1 flex-col'>
                        <div className='flex items-center'>
                            <input type='checkbox' name="showMe" onChange={handleChangeAdditionals}/>
                            <div className='ml-2'>Show me in members list</div>
                        </div>
                        <div className='flex items-center mt-1'>
                            <input type='checkbox' name='remindMe' onChange={handleChangeAdditionals}/>
                            <div className='ml-2'>Remind me the day before</div>
                        </div>
                        <div className='flex items-center mt-1'>
                            <div className='mr-2'>Promocode:</div>
                            <input onChange={handleChangeAdditionals} type='text' name='promocode' className='rounded-full pl-2 bg-light-beige text-black outline-none focus:border-none'/> 
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default TicketInCart;
