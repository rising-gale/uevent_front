import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../redux/cartSlice';

const CardOfEvent = ({ data }) => {
  // console.log(data)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(state => state.cart.cartItems);
  const userId = useSelector(state => state.auth.userId);

  const [isEventInCart, setEventInCart] = useState(false);

  const addCartItem = () => {
    dispatch(addItem({ ...data, quantity: 1 }));
  }

  useEffect(() => {
    let idx = cartItems.findIndex((item) => item._id === data._id);
    if (idx >= 0) {
      setEventInCart(true);
    } else setEventInCart(false);
  }, [cartItems, data]);
  

  return (
    <div className='border-2 rounded-lg border-beige m-2 p-1.5 w-1.5/6 h-fit'>
      <div className='relative'>
          <img src={data.img ? 'http://localhost:3002/' + data.img : 'afisha.jpg'} alt="afisha" className='rounded-lg  w-full h-64' /> {/*w-48 h-64*/}
        <div className='p-2 opacity-0 hover:opacity-100 hover:bg-black hover:bg-opacity-50 duration-300 absolute left-0 top-0 h-full w-full flex flex-col justify-between z-10 text-lg font-semibold'>
          <div className='flex flex-col w-full h-1/2 text-white items-center justify-center'>
            <div className='text-xs text-center'>{data.location.description}</div>
            <div className='text-xl select-none text-center text-light-grey-pastel hover:cursor-pointer hover:underline underline-offset-2' onClick={() => { navigate(`/events/${data._id}`) }}>{data.title}</div>
          </div>
          <div className='flex flex-col w-full h-1/3 text-white justify-end'>
            <div className='text-yellow-500'>Price: {data.price > 0 ? data.price + ' UAH.': 'Free'}</div>
            <div>Tickets left: {data.tickets}</div>
          </div>
          {
            userId && 
            <div className='flex flex-col w-full h-1/5 text-white justify-center items-center py-2 px-5'>
            <button
              disabled={isEventInCart}
              className={isEventInCart ? 'text-emerald-600 w-full h-full bg-orange-700 rounded-lg flex items-center justify-center text-center hover:cursor-pointer hover:bg-orange-800 disabled:bg-gray-400' : 'w-full h-full bg-orange-700 rounded-lg flex items-center justify-center text-center hover:cursor-pointer hover:bg-orange-800'}
              id={data._id}
              onClick={addCartItem}>
              {isEventInCart ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
                : 'Buy ticket'}
            </button>
          </div>
          }

        </div>
      </div>
      <p className='text-lg font-semibold text-center p-1 text-light-beige' > {data.title}</p>
      <p className='text-sm text-center p-1 text-light-beige'>Starts {new Date(data.date_event).toLocaleString()}</p>
    </div>
  );
}

export default CardOfEvent;
