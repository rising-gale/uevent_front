import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendTickets } from '../redux/cartSlice';
import Header from '../components/Header';

const CheckOutSuccess = () => {
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        let parsed = JSON.parse(params.cartItems);
        dispatch(sendTickets(parsed))
    }, [params, dispatch]);

    return (
        <div className='flex flex-col w-full h-screen'>
            <Header />
            <div className="w-full h-screen z-50 overflow-hidden bg-dark-purple opacity-75 flex flex-col items-center justify-center ">
                <img src='http://localhost:3000/uevent_logo.png' alt='logo' className='w-1/6 select-none'/>
                <h2 className="text-center text-light-grey-pastel text-3xl font-semibold m-3">Thank you for buying tickets with our service!</h2>
                <p className='text-center text-light-beige text-xl font-semibold m-1'>We wish you to have a good time out there, good luck!</p>
                <p className="w-1/2 text-center text-lg text-light-beige m-1">You can now view your tickets at your email and return to <Link to='/' className='underline underline-offset-2'>main page.</Link></p>
            </div>
        </div>
    );
}

export default CheckOutSuccess;
