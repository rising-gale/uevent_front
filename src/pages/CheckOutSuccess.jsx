import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendTickets } from '../redux/cartSlice';

const CheckOutSuccess = () => {
    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        let parsed = JSON.parse(params.cartItems);
        dispatch(sendTickets(parsed))
    }, [params, dispatch]);
    return (
        <div>
            CheckOutSuccess
        </div>
    );
}

export default CheckOutSuccess;
