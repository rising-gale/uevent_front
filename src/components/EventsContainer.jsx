import React from 'react';
import Sidebar from './Sidebar';
import CardOfEvent from './CardOfEvent';

const EventsContainer = ({events, formats, themes, handleChange}) => {
    return (
        <div className='p-1 flex flex-col bg-dark-purple text-light-beige '>
            {/*Search and filtration bar */}
            <div className='flex w-full h-12 justify-around mt-3'>
                <div className='p-1 w-2/5 h-full flex items-center'>
                    <input autoComplete='off' type="text" name="search" className='w-5/6 text-base p-3 border-2 border-beige focus:border-purple-600 rounded-lg h-full outline-none bg-light-beige text-black' placeholder='Input name of event ...' onChange={handleChange}/>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 ml-2 hover:cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg> */}
                </div>
                <div className='w-1/5 h-full'>
                    <select defaultValue={'date'} name="sort"
                        className="w-full h-full outline-none bg-light-beige border-2 border-beige focus:border-purple-600 text-gray-900 text-base font-semibold rounded-lg block p-2.5 hover:cursor-pointer" 
                        onChange={handleChange}>
                        <option value="date">Date</option>
                        <option value="themes">Themes</option>
                        <option value="format">Formats</option>
                    </select>
                </div>
                <button 
                        className="flex items-center justify-around border border-purple-900 rounded-full w-1/12 p-3 bg-violet-700 hover:bg-violet-500 hover:border-purple-600 transition duration-500 hover:ease-in font-semibold text-lg "
                        
                    >
                        <div>Create</div>
                </button>
            </div>
            <div className='w-full min-h-screen max-h-full pl-4 flex flex-row mt-4'>
                <Sidebar formats={formats} themes={themes} handleChange={handleChange}/>
                <div className='w-full h-full p-2'>
                    <div className='flex flex-row flex-wrap w-full'>
                        {events.length > 0 && events.map(event => {
                            return (
                                <>
                                    <CardOfEvent key={event._id} data={event} />
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventsContainer;