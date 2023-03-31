import React from 'react';

const CardOfEvent = ({data}) => {
    return (
        <div className='border-2 rounded-lg border-purple-900 m-2 p-2'>
        <div className='relative'>
          <img src="afisha.jpg" alt="afisha" />
          <div className='p-2 opacity-0 hover:opacity-100 hover:bg-black hover:bg-opacity-50 duration-300 absolute left-0 top-0 h-full w-full flex flex-col justify-between z-10 text-lg font-semibold'>
            <div className='flex flex-col w-full h-1/3 text-white items-center justify-center'>
              <div className='text-sm'>{data.location.description}</div>
              <div className='text-3xl select-none text-gray-400'>{data.title}</div>
            </div>
            <div className='flex flex-col w-full h-1/3 text-white justify-end'>
              <div className='text-yellow-500'>Price: {data.price} $</div>
              <div>Tickets left: {data.tickets}</div>
            </div>
            <div className='flex flex-col w-full h-1/5 text-white justify-center items-center py-3.5 px-5'>
              <button className='w-full h-full bg-orange-700 rounded-lg flex items-center justify-center text-center hover:cursor-pointer hover:bg-orange-800'>Buy ticket</button>
            </div>
          </div>
        </div>
        <p>{data.title}</p>
        <p>Starts {data.date_event}</p>
      </div>
    );
}

export default CardOfEvent;
