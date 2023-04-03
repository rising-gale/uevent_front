import React from 'react';
import { useDispatch } from 'react-redux';
import { changeAmount } from '../redux/cartSlice';

const TicketInCart = ({ data }) => {
    const dispatch = useDispatch();

    // console.log('Ticket data in cart: ', data);
    const handleIncreaseTickets = () =>{
        let quantity = data.quantity;
        if(quantity < data.tickets) quantity++;
        dispatch(changeAmount({_id: data._id, quantity: quantity}));
    }

    const handleDecreaseTicket = () =>{
        let quantity = data.quantity;
        if(quantity > 1) quantity--;
        dispatch(changeAmount({_id: data._id, quantity: quantity}));
    }

    return (
        <div className='border-y flex justify-between items-center py-2 w-full text-light-beige text-lg border-beige'>
            <img src={data.img ? 'http://localhost:3002/' + data.img : 'logo.png'} alt='logo' className='h-12' />
            <div>{data.title}</div>
            <div>{data.price} грн\шт.</div>
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </div>
    );
}

export default TicketInCart;
