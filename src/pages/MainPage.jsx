import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardOfEvent from '../components/CardOfEvent';
import EventCreationForm from '../components/EventCreationForm';
import Header from '../components/Header';
import { getAllEvents } from '../redux/eventsSlice';

const MainPage = () => {

    const dispatch = useDispatch();
    const events = useSelector(state => state.events.events);

    useEffect(() => {

        dispatch(getAllEvents({page: 1, sort: 'date'}));

    }, [dispatch])
    console.log(events)
    return (
        <div className='flex flex-col w-full h-screen'>
        <Header />
        
        {/* <EventCreationForm /> */}
        <div className='p-1 flex flex-col bg-dark-purple text-light-beige'>
            <div className='flex w-full h-12 justify-around'>
                {/*Search and filtration bar */}
                <div className='p-1 w-2/5 h-full'>
                    <input autoComplete='off' type="text" name="name" className='p-3 border-2 black rounded-sm w-full h-full outline-none' placeholder='Input name of event ...' />
                </div>
                <div className='w-1/4 h-full'>
                    <select defaultValue={''} name="viewType"
                        className="w-full h-full outline-nonebg-zinc-300 border border-indigo-800 text-gray-900 text-base font-semibold rounded-lg block p-2.5 hover:cursor-pointer" >
                        <option value="month">Month</option>
                        <option value="week">Week</option>
                        <option value="day">Day</option>
                    </select>
                </div>
                <div className='w-1/4 h-full'>
                    <input list="browsers" name="myBrowser"
                        className="w-full h-full outline-nonebg-zinc-300 border border-indigo-800 text-gray-900 text-base font-semibold rounded-lg block p-2.5 hover:cursor-pointer" />
                    <datalist id="browsers">
                        <option value="Chrome" />
                        <option value="Firefox" />
                        <option value="Internet Explorer" />
                        <option value="Opera" />
                        <option value="Safari" />
                        <option value="Microsoft Edge" />
                    </datalist>
                </div>
            </div>
            <div className='w-full h-full pl-4 flex flex-row'>
                {/* <Sidebar /> */}
                <div className='w-5/6 h-full p-2'>
                    <h1>Aboba</h1>
                    <div className='flex flex-row flex-wrap w-full'>
                        {events.map(event => {
                            return (
                                <CardOfEvent key={event._id} data={event} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
      </div>

    );
}

export default MainPage;
