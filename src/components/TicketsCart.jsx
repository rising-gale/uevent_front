import React, { useEffect, useState } from 'react';
import TicketInCart from './TicketInCart';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, payTickets } from '../redux/cartSlice';

const calculateTotal = (items) => {
    // console.log(items);
    let total = 0;
    items.forEach(item => {
        total = item.quantity * item.price;
    });
    return total;
}

const TicketsCart = ({closeCart}) => {

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems);

    // console.log(cartItems);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        setTotal(calculateTotal(cartItems));
    }, [cartItems]);

    const handleClear = () =>{
        dispatch(clearCart());
    }

    const handlePay = () => {
        // console.log(cartItems);
        dispatch(payTickets(cartItems));
    }

    if(cartItems)
    return (
        <div className=" text-white justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-700 bg-opacity-50">
            <div className="relative my-3 mx-auto w-2/5">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-dark-blue-pastel outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-3 border-b border-solid border-beige rounded-t">
                        <h3 className="text-3xl pl-4 font-semibold text-light-grey-pastel font-serif">
                            Tickets cart
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-3 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={closeCart}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-5 flex flex-col">
                        {cartItems.map(cartItem => {
                            return(
                                <TicketInCart data={cartItem} />
                            )
                        })}
                        <div className='flex justify-end items-center pt-3 w-full text-light-beige text-lg'>
                            Total: {total} грн.
                        </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center p-3 border-t border-solid border-beige rounded-b">
                        <div className='flex w-1/2 justify-start'>
                        <button
                            className="text-neutral-300 border border-beige rounded-full hover:text-pink-700 background-transparent font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-250"
                            type="button"
                            onClick={handleClear}
                        >Clear
                        </button>     
                        </div>
                        <div className='flex w-1/2 justify-end'>
                        <button
                            className="text-pink-700 hover:text-pink-600 background-transparent font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-250"
                            type="button"
                            onClick={closeCart}
                        >Cancel
                        </button>
                        <button
                            className="bg-emerald-600 text-light-beige active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:bg-emerald-500 transition duration-500 hover:ease-in"
                            type="button"
                            onClick={handlePay}
                        >Pay
                        </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketsCart;
