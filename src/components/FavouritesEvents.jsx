import React from 'react';
import { useSelector } from 'react-redux';
import EventInFavourite from './EventInFavourite';

const FavouritesEvents = ({closeForm}) => {

    const userFavourites = useSelector(state => state.auth.user.subscriptions_events);

    // useEffect(() => {
    //     let idx = cartItems.findIndex((item) => item._id === eventInfo.event._id);
    //     if (idx >= 0) {
    //         setEventInCart(true);
    //     } else setEventInCart(false);
    // }, [cartItems, eventInfo]);

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
                                <EventInFavourite key={fav_event._id} data={fav_event} />
                            )
                        })}
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
                        {/* <button
                            className="bg-emerald-600 text-light-beige active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:bg-emerald-500 transition duration-500 hover:ease-in"
                            type="button"
                            onClick={handlePay}
                        >Pay
                        </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FavouritesEvents;
