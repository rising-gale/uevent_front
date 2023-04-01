import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardOfEvent from '../components/CardOfEvent';
import EventCreationForm from '../components/EventCreationForm';
import Header from '../components/Header';
import { getAllEvents } from '../redux/eventsSlice';

const MainPage = () => {

    const dispatch = useDispatch();
    const events = useSelector(state => state.events.events);
    const [sort, setSort] = useState('date');
    const [page, setPage] = useState(1);
    const [openedForm, setForm] = useState(null);

    useEffect(() => {
        dispatch(getAllEvents({page: page, sort: sort}));
    }, [dispatch, sort, page]);

    const onChange = (e) => {
        console.log(e.target.name, e.target.value);
        switch (e.target.name) {
            case 'sort':
                // console.log('111')
                setSort(e.target.value);
                break;
            case 'page':
                setPage(e.target.value);
                break;
            default:
                break;
        }
    }

    return (
        <div className='flex flex-col w-full h-screen'>
        <Header />
        {/* <EventCreationForm /> */}
        <div className='p-1 flex flex-col bg-dark-purple text-light-beige '>
            <div className='flex w-full h-12 justify-around'>
                {/*Search and filtration bar */}
                <div className='p-1 w-2/5 h-full flex items-center'>
                    <input autoComplete='off' type="text" name="name" className='w-5/6 text-base p-3 border-1 black rounded-lg h-full outline-none bg-light-beige' placeholder='Input name of event ...' />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 ml-2 hover:cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
                <div className='w-1/5 h-full'>
                    <select defaultValue={'date'} name="sort"
                        className="w-full h-full outline-none bg-light-beige border border-indigo-800 text-gray-900 text-base font-semibold rounded-lg block p-2.5 hover:cursor-pointer" 
                        onChange={onChange}>
                        <option value="date">Date</option>
                        <option value="themes">Themes</option>
                        <option value="format">Formats</option>
                    </select>
                </div>
                {/* <div className='w-1/4 h-full'>
                    <input list="browsers" name="myBrowser"
                        className="w-full h-full outline-none bg-light-beige border border-indigo-800 text-gray-900 text-base font-semibold rounded-lg block p-2.5 hover:cursor-pointer" 
                        multiple/>
                    <datalist id="browsers">
                        <option value="Chrome" />
                        <option value="Firefox" />
                        <option value="Internet Explorer" />
                        <option value="Opera" />
                        <option value="Safari" />
                        <option value="Microsoft Edge" />
                    </datalist>
                </div> */}
            </div>
            <div className='w-full min-h-screen max-h-full pl-4 flex flex-row mt-4'>
                {/* <Sidebar /> */}
                <div className='w-1/4 h-full py-2 px-0.5 border-r-2 border-purple-900'>
                    <div className='text-center text-xl font-semibold my-5'>Filters for events</div>
                    <div className='text-center text-lg font-semibold'>By formats:</div>
                    <div className='text-center text-xs font-semibold'>(you can choose up to 3 items)</div>
                    <div className='flex flex-row flex-wrap py-1 my-1'>
                        <div className='flex p-1 m-1.5 border rounded-md'>
                            <input type='checkbox' />
                            <div>Format 1</div>
                        </div>
                        <div className='flex p-1 m-1.5 border rounded-md'>
                            <input type='checkbox' />
                            <div>Format 1</div>
                        </div>
                        <div className='flex p-1 m-1.5 border rounded-md'>
                            <input type='checkbox' />
                            <div>Format 1</div>
                        </div>
                        <div className='flex p-1 m-1.5 border rounded-md'>
                            <input type='checkbox' />
                            <div>Format 1</div>
                        </div>
                    </div>
                    <div className='text-center text-lg font-semibold'>By themes:</div>
                    <div className='text-center text-xs font-semibold'>(you can choose up to 3 items)</div>
                    <div className='flex flex-row flex-wrap py-1 my-1'>
                        <div className='flex p-1 m-1.5 border rounded-md'>
                            <input type='checkbox' />
                            <div>Format 1</div>
                        </div>
                        <div className='flex p-1 m-1.5 border rounded-md'>
                            <input type='checkbox' />
                            <div>Format 1</div>
                        </div>
                        <div className='flex p-1 m-1.5 border rounded-md'>
                            <input type='checkbox' />
                            <div>Format 1</div>
                        </div>
                        <div className='flex p-1 m-1.5 border rounded-md'>
                            <input type='checkbox' />
                            <div>Format 1</div>
                        </div>
                    </div>
                </div>
                <div className='w-full h-full p-2'>
                    {/* <h1>Aboba</h1> */}
                    <div className='flex flex-row flex-wrap w-full'>
                        {events.length > 0 && events.map(event => {
                            return (
                                <>
                                    <CardOfEvent key={event._id} data={event} />
                                    <CardOfEvent key={event._id + 1} data={event} />
                                </>
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
