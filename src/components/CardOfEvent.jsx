import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardOfEvent = ({data}) => {
  const navigate = useNavigate();

    return (
        <div className='border-2 rounded-lg border-purple-900 m-2 p-2'>
        <div className='relative'>
          <img src={data.img} alt="afisha" className='rounded-md'/>
          <div className='p-3 opacity-0 hover:opacity-100 hover:bg-black hover:bg-opacity-50 duration-300 absolute left-0 top-0 h-full w-full flex flex-col justify-between z-10 text-lg font-semibold'>
            <div className='flex flex-col w-full h-1/3 text-white items-center justify-center'>
              <div className='text-sm'>{data.location.description}</div>
              <div className='text-3xl select-none text-light-grey-pastel hover:cursor-pointer hover:underline underline-offset-2' onClick={()=>{navigate(`/events/${data._id}`)}}>{data.title}</div>
            </div>
            <div className='flex flex-col w-full h-1/3 text-white justify-end'>
              <div className='text-yellow-500'>Price: {data.price} грн.</div>
              <div>Tickets left: {data.tickets}</div>
            </div>
            <div className='flex flex-col w-full h-1/5 text-white justify-center items-center py-2 px-5'>
              <button className='w-full h-full bg-orange-700 rounded-lg flex items-center justify-center text-center hover:cursor-pointer hover:bg-orange-800'>Buy ticket</button>
            </div>
          </div>
        </div>
        <p className='text-xl font-semibold text-center p-1 text-light-beige'>{data.title}</p>
        <p className='text-sm text-center p-1 text-light-beige'>Starts {new Date(data.date_event).toLocaleString()}</p>
      </div>
    );
}

export default CardOfEvent;
