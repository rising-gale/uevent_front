import React from 'react';
import { useSelector } from 'react-redux';
import EventInFavourite from './EventInFavourite';

const FavouritesEvents = ({closeForm}) => {

    const userFavourites = useSelector(state => state.auth.user.subscriptions_events);

    return (
        <div className=" text-white justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-700 bg-opacity-50">
            <div className="relative my-3 mx-auto w-2/5">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-dark-blue-pastel outline-none focus:outline-none h-screen">
                    {/*header*/}
                    <div className="flex items-start justify-between p-3 border-b border-solid border-beige rounded-t">
                        <h3 className="text-3xl pl-4 font-semibold text-light-grey-pastel font-serif">
                            Favourite events
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-3 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={closeForm}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-5 flex flex-col overflow-y-auto scrollbar h-5/6">
                        {userFavourites && userFavourites.map(fav_event => {
                            return(
                                <EventInFavourite key={fav_event._id} data={fav_event} userFavourites={userFavourites} />
                            )
                        })}
                        {userFavourites.length <= 0 && <div className='text-light-beige text-xl h-full w-full flex justify-center'>Nothing to see here ...</div>}
                    </div>
                    {/*footer*/}
                    <div className="flex items-center p-3 border-t border-solid border-beige rounded-b">
                        <div className='flex w-full justify-end'>
                        <button
                            className="text-pink-700 hover:text-pink-600 background-transparent font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-250"
                            type="button"
                            onClick={closeForm}
                        >Cancel
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FavouritesEvents;
