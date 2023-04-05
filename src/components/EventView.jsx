import React, { useEffect } from 'react';
import Header from './Header';
import MapContainer from './MapContainer';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEvent } from '../redux/eventsSlice';
import LoadingPage from '../pages/LoadingPage';
import { addItem } from '../redux/cartSlice';

const EventView = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const eventInfo = useSelector(state => state.events.viewingEventData);
    // console.log('EventInfo: ', eventInfo);

    useEffect(() => {
        dispatch(getEvent(params.id));
    }, [dispatch, params.id]);

    const handleBackClick = () => {
        navigate('/')
    }

    const addCartItem = () => {
        dispatch(addItem({ ...eventInfo.event, quantity: 1 }));
      }

    if (eventInfo.event) {
        return (
            <div className='flex flex-col w-full h-screen'>
                <Header />
                <div className='p-5 flex flex-row bg-dark-purple text-light-beige'>
                    <div className='w-1/5 p-3 pr-4 flex flex-col'>
                        <img src={'http://localhost:3002/' + eventInfo.event.img} alt="afisha" />
                        <div className='text-xl font-semibold text-center mt-2'>Organisator:</div>
                        <div className='text-base font-semibold text-center mt-3 flex items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                            </svg>
                            <div className='ml-2 flex flex-col'>
                                <div className='text-lg'>{eventInfo.event.author.company_name}</div>
                                <div className='text-xs italic'>{eventInfo.event.author.email}</div>
                            </div>
                        </div>
                        <div className='text-xl font-semibold text-center mt-5 flex items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                            </svg>
                            <div className='ml-2'>
                                User list:
                            </div>
                        </div>
                        <div className='mt-3 w-full max-h-screen overflow-y-scroll'>
                            {eventInfo.members.map(member => {
                                return (
                                    <p className='w-full text-lg text-center my-1'>{member.username}</p>
                                )
                            })}

                        </div>
                    </div>
                    <div className='p-2 m-2 flex flex-col w-full h-full border-l-2 border-violet-900'>
                        <div className='flex justify-start ml-5 p-1 w-full'>
                            <button
                                className="flex items-center justify-center leading-none px-3 py-2 text-neutral-300 border border-beige rounded-full hover:text-beige background-transparent font-bold uppercase text-sm outline-none focus:outline-none ease-linear transition-all duration-250"
                                type="button"
                                onClick={handleBackClick}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-0.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                                </svg>
                                Back
                            </button>
                        </div>
                        <p className='text-center text-3xl font-semibold font-serif tracking-wider'>{eventInfo.event.title}</p>
                        <div className='flex flex-row justify-around p-5 m-5'>
                            <div className='flex flex-col justify-center items-center m-2 w-1/3 text-xl font-semibold'>
                                <div className='m-1 w-full flex justify-center items-center'>
                                    <div className='m-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                        </svg>
                                    </div>
                                    <div>
                                        {new Date(eventInfo.event.date_event).toLocaleString()}
                                    </div>
                                </div>
                                <div className='w-full flex justify-center items-center'>
                                    <div className='m-1'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                    </div>
                                    <div className='text-sm font-semibold text-center'>
                                        {eventInfo.event.location.description}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col items-center w-1/6'>
                                <div className='font-semibold p-1 h-1/2'>Tickets left in stock: {eventInfo.event.tickets}</div>
                                <button onClick={addCartItem} className='h-1/3 border border-purple-900 w-full text-center font-semibold rounded-full cursor-pointer bg-purple-900 hover:bg-purple-800 hover:border-purple-600 transition duration-500 hover:ease-in'>Buy tickets</button>
                            </div>
                            <div className='flex flex-col items-center w-1/5'>
                                <div className='font-semibold p-1 h-1/2 text-xl'>Price:</div>
                                <div className='h-1/2 w-full text-center font-bold text-xl'>{eventInfo.event.price} грн.</div>
                            </div>
                        </div>
                        <div className='w-full h-full flex items-center justify-center'>
                            <MapContainer center={eventInfo.event.location} creationMode={false} searchBar={false} setLocation={() => { }} />
                        </div>
                        <div className='w-full h-full flex flex-col m-1 p-1 mt-4'>
                            <div className='w-full text-center text-2xl font-semibold'>
                                Description:
                            </div>
                            <div className='p-3'>
                                {eventInfo.event.description}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else return <LoadingPage />

}

export default EventView;
