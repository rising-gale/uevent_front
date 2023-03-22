import React, { useState } from 'react';
import MapContainer from './MapContainer';



const EventCreationForm = () => {
    
    const [state, setState] = useState({
        title: 'null',
        description: null,
        
        date: null,
        time_start: null,
        time_end: null,

        latePost: false,
        date_post: null,
        location: {lat: 50.449709821421386, lng: 30.52762771951049},
        ticketsCount: 1,
        image: null,
        notification: null,
        isMembersVisible: true,
        
        calendar: null,

        errMessage: null
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value, e.target.files[0]);
        if(name === 'image')
        {
            setState(prevState => ({
                ...prevState,
                [name]: e.target.files[0],
                errMessage: ''
            }));
        } else {
            setState(prevState => ({
                ...prevState,
                [name]: value,
                errMessage: ''
            }));
        }

    }

    return (
        <div className="text-white justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-600 bg-opacity-50">
            <div className="relative my-2 mx-auto w-1/2">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-600 outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-2xl pl-4 font-semibold text-gray-300 font-serif">
                            Event creation
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-3 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-4 flex flex-col">
                        <div className='pb-1 flex items-center w-full justify-between'>
                            <label>Title:</label>
                            <input type={"text"} className="w-2/3 rounded-full outline-none text-black px-2 py-1" name='title' onChange={handleChange}/>
                        </div>
                        <div className='py-1 flex items-center w-full justify-between'>
                            <label>Tickets:</label>
                            <input type={"number"} min={1} defaultValue={1} className="w-2/3 rounded-full outline-none text-black px-2 py-2" name='ticketsCount' onChange={handleChange}/>
                        </div>
                        <div className='py-1 flex items-center w-full justify-between'> 
                            <label>Category:</label>
                            <select defaultValue={''} name="viewType"
                                className="w-2/3 h-full outline-none bg-zinc-300 border border-indigo-800 text-gray-900 text-base font-semibold rounded-full block p-2.5 hover:cursor-pointer" >
                                <option value="month">Month</option>
                                <option value="week">Week</option>
                                <option value="day">Day</option>
                            </select>
                        </div>
                        <div className='py-1 my-2 flex flex-col w-full items-center'>
                            <label className='pb-2'>Choose a place of event:</label>
                            <MapContainer center={state.location}/>
                        </div>
                        <div className='py-1 flex items-center w-full justify-between'>
                            <label>Afisha:</label>
                            <input type={"file"} min={1} className="w-2/3 rounded-full outline-none text-black p-2" name='image' onChange={handleChange}/>
                        </div>
                        <div className='py-1 flex items-center w-full justify-between text-black'>
                            <label className='text-white'>Select date, <br /> start and end time:</label>
                            <input className='bg-slate-100 m-2 p-2 outline-none rounded-lg border-2 focus:border-indigo-500' type='date' name="date" min="2022-01-01T00:00" onChange={handleChange} />
                            <input className='bg-slate-100 m-2 p-2 outline-none rounded-lg border-2 focus:border-indigo-500' type='time'  name='time_start' step="3600" onChange={handleChange} />
                            <input className='bg-slate-100 m-2 p-2 outline-none rounded-lg border-2 focus:border-indigo-500' type='time' step="3600" name='time_end' onChange={handleChange} />
                        </div>
                        <div className='py-1 flex items-center w-full justify-around'>
                            <label>Your company:</label>
                            <label>'company name'</label>
                        </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                        <button
                            className="text-pink-700 background-transparent font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                        >Cancel
                        </button>
                        <button
                            className="bg-emerald-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:bg-emerald-500 transition duration-500 hover:ease-in"
                            type="button"
                        >Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventCreationForm;
