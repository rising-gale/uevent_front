import React from 'react';
import { useDispatch } from 'react-redux';
import { unsubsribeFromEvent } from '../redux/eventsSlice';

const EventInFavourite = ({ data, userFavourites }) => {
    let dispatch = useDispatch();

    const unSubscribe = () => {
        // console.log('unsub');
        dispatch(unsubsribeFromEvent({id: data._id, userFavourites}));
    }
    return (
        <div className='border-y px-1 py-1 flex flex-col border-beige'>
            <div className='flex justify-between items-center p-2 w-full text-light-beige text-lg border-beige'>
                <img src={data.img ? 'http://localhost:3002/' + data.img : 'logo.png'} alt='logo' className='h-14 w-1/12' />
                <div className='w-1/3 flex justify-center items-center text-center'>{data.title}</div>
                <div className='w-1/3 flex justify-center items-center'>{data.price} UAH\itm.</div>
                <div className='hover:cursor-pointer text-rose-600 w-1/6 flex justify-end items-center' onClick={unSubscribe}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 leading-none">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.143 17.082a24.248 24.248 0 003.844.148m-3.844-.148a23.856 23.856 0 01-5.455-1.31 8.964 8.964 0 002.3-5.542m3.155 6.852a3 3 0 005.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 003.536-1.003A8.967 8.967 0 0118 9.75V9A6 6 0 006.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default EventInFavourite;
