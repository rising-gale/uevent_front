import React from 'react';

const CardOfEvent = () => {
    return (
        <div className='border m-2 p-2'>
        <div className='relative'>
          <img src="afisha.jpg" alt="afisha" />
          <div className='p-2 opacity-0 hover:opacity-100 hover:bg-black hover:bg-opacity-50 duration-300 absolute left-0 top-0 h-full w-full flex flex-col justify-between z-10 text-lg font-semibold'>
            <div className='flex flex-col w-full h-1/3 text-white items-center justify-center'>
              <div>Place of this event</div>
              <div className='text-3xl select-none text-gray-400'>Title</div>
            </div>
            <div className='flex flex-col w-full h-1/3 text-white justify-end'>
              <div className='text-yellow-500'>Price of 1 ticket</div>
              <div>Tickets left</div>
            </div>
            <div className='flex flex-col w-full h-1/5 text-white justify-center items-center py-3.5 px-5'>
              <div className='w-full h-full bg-orange-700 rounded-lg flex items-center justify-center text-center hover:cursor-pointer hover:bg-orange-800'>Buy ticket</div>
            </div>
          </div>
        </div>
        <p>Name goes here</p>
        <p>Starts 01.01.2023</p>
      </div>
    );
}

export default CardOfEvent;
