import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../redux/categoriesSlice';
import { createEvent } from '../redux/eventsSlice';
import MapContainer from './MapContainer';



const EventCreationForm = () => {

    const dispatch = useDispatch();

    const themes = useSelector(state => state.categories.themes);
    const formats = useSelector(state => state.categories.formats);
    const user = useSelector(state => state.auth.user);

    // console.log(user);

    const [state, setState] = useState({
        title: 'null',
        description: 'null',
        tickets: 1,
        price: 0,

        date_event: null,
        time_start: null,

        // time_end: null,

        latePost: false,
        date_post: null,
        time_post: null,

        // image: null,

        notifications: null,
        members_visibles: 'everyone',

        formats: [],
        themes: [],
        // calendar: null,
        errMessage: null
    })

    const [location, setLocation] = useState({ lat: 50.449709821421386, lng: 30.52762771951049 });
    // console.log(location);

    const handleChange = (e) => {
        const { name, value, id } = e.target;
        // console.log(name, value, id);

        switch (name) {
            case 'image':
                setState(prevState => ({
                    ...prevState,
                    [name]: e.target.files[0],
                    errMessage: ''
                }));
                break;
            case 'latePost':
                // console.log(name, value);
                setState(prevState => ({
                    ...prevState,
                    [name]: !state.latePost,
                    errMessage: ''
                }));
                break;
            case 'notifications':
                // console.log(name, value);
                setState(prevState => ({
                    ...prevState,
                    [name]: !state.notifications,
                    errMessage: ''
                }));
                break;
            case 'format':
                if (state.formats.find((element) => element._id === id)) {
                    let idx = state.formats.findIndex((element) => element._id === id);
                    let newFormats = state.formats;
                    newFormats.splice(idx, 1);
                    setState(prevState => ({
                        ...prevState,
                        formats: newFormats,
                        errMessage: ''
                    }));
                } else {
                    let newFormats = state.formats;
                    newFormats.push({ _id: id });
                    setState(prevState => ({
                        ...prevState,
                        formats: newFormats,
                        errMessage: ''
                    }));
                }
                break;
            case 'theme':
                if (state.themes.find((element) => element._id === id)) {
                    let idx = state.themes.findIndex((element) => element._id === id);
                    let newThemes = state.themes;
                    newThemes.splice(idx, 1);
                    setState(prevState => ({
                        ...prevState,
                        themes: newThemes,
                        errMessage: ''
                    }));
                } else {
                    let newThemes = state.themes;
                    newThemes.push({ _id: id });
                    setState(prevState => ({
                        ...prevState,
                        themes: newThemes,
                        errMessage: ''
                    }));
                }
                break;
            default:
                setState(prevState => ({
                    ...prevState,
                    [name]: value,
                    errMessage: ''
                }));
                break;
        }
    }

    const handleSubmit = () => {
        // console.log(state);
        // console.log(location);
        if (state.title && state.tickets >= 1 && state.price >= 0 && state.date_event && state.time_start
            && state.formats.length > 0 && state.themes.length >= 0 && location) {
            // console.log("OK");
            dispatch(createEvent({ ...state, location, company_id: user.companies[0] }));
        } else {
            setState(prevState => ({
                ...prevState,
                errMessage: 'Please fill out everything properly and try again.',
            }));
        }

    }

    useEffect(() => {
        dispatch(getCategories());
        // dispatch(getAllEvents());
    }, [dispatch])

    return (
        <div className="text-white justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-600 bg-opacity-50">
            <div className="relative my-2 mx-auto w-1/2">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-dark-blue-pastel outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl pl-4 font-semibold text-light-beige font-serif">
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
                    <div className="relative px-8 py-3 flex flex-col m-1">
                        <div className='pb-1 flex items-center w-full justify-between'>
                            <label className='text-xl text-beige w-2/3'>Title (required):</label>
                            <input type={"text"} className="focus:border-none w-2/3 rounded-full outline-none text-black p-2 " name='title' onChange={handleChange} />
                        </div>
                        <div className='py-1 flex items-center w-full justify-between'>
                            <label className='text-xl text-beige w-2/3'>Description:</label>
                            <textarea className='w-full rounded-lg text-black p-1 outline-none'/>
                        </div>
                        <div className='py-1 flex items-center w-full justify-between'>
                            <label className='text-xl text-beige w-1/5'>Tickets:</label>
                            <input type={"number"} min={1} defaultValue={1} className="focus:border-none w-1/5 rounded-full outline-none text-black p-2" name='tickets' onChange={handleChange} />
                            <label className='text-xl text-beige w-1/5'>Price:</label>
                            <input type={"number"} min={0} defaultValue={0} className="focus:border-none w-1/5 rounded-full outline-none text-black p-2" name='price' onChange={handleChange} />
                        </div>
                        <div className='py-1 flex items-center w-full justify-between text-black'>
                            <label className='text-white text-xl'>Select date and time:</label>
                            <input className='bg-slate-100 m-2 p-2 outline-none rounded-lg border-2 focus:border-indigo-500' type='date' name="date_event" min="2022-01-01T00:00" onChange={handleChange} />
                            <input className='bg-slate-100 m-2 p-2 outline-none rounded-lg border-2 focus:border-indigo-500' type='time' name='time_start' step="1800" onChange={handleChange} />
                        </div>
                        <div className='py-1 flex items-center w-full justify-between'>
                            <div className='flex w-3/5 items-center'>
                                <label className='text-xl text-beige w-4/5'>Notifications about new members:</label>
                                <input type="checkbox" className="focus:border-none rounded-sm outline-none text-black w-5 h-5" name='notifications' onChange={handleChange} />
                            </div>
                            <div className='flex w-2/5 items-center'>
                                <label className='text-xl text-beige w-2/3 '>Set late post:</label>
                                <input type="checkbox" className="focus:border-none rounded-sm outline-none text-black w-5 h-5" name='latePost' onChange={handleChange} />
                            </div>
                        </div>
                        {
                            state.latePost &&
                            <div className='py-1 flex items-center w-full justify-between text-black'>
                                <label className='text-white text-xl'>Select date and time when post will be shown:</label>
                                <input className='bg-slate-100 m-2 p-2 outline-none rounded-lg border-2 focus:border-indigo-500' type='date' name="date_post" min="2022-01-01T00:00" onChange={handleChange} />
                                <input className='bg-slate-100 m-2 p-2 outline-none rounded-lg border-2 focus:border-indigo-500' type='time' name='time_post' step="3600" onChange={handleChange} />
                            </div>
                        }

                        <div className='py-1 my-2 flex flex-col w-full items-center'>
                            <label className='pb-2'>Choose a location of event:</label>
                            <MapContainer center={location} creationMode={false} searchBar={true} setLocation={setLocation} />
                        </div>
                        {/* <div className='py-1 flex items-center w-full justify-between'>
                            <label className='text-lg text-beige w-1/2'>Afisha:</label>
                            <input type={"file"} min={1} className="w-2/3 rounded-full outline-none text-black p-2" name='image' onChange={handleChange} />
                        </div> */}
                        <div className='py-1 flex items-center w-full'>
                            <label className='text-lg text-beige w-1/2 '>Select formats of event:</label>
                        </div>
                        <div className='flex flex-row items-center p-1.5 flex-wrap'>
                            {
                                formats.map(format => {
                                    return (
                                        <div className='m-0.5 p-1 border rounded-xl flex items-center justify-center' key={format._id}>
                                            <input name='format' type="checkbox" className="focus:border-none rounded-sm outline-none text-black w-3.5 h-3.5" onChange={handleChange} id={format._id} />
                                            <label className="mx-2 text-base font-medium">{format.content}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='py-1 flex items-center w-full'>
                            <label className='text-lg text-beige w-1/2 '>Select themes of event:</label>
                        </div>
                        <div className='flex flex-row items-center p-1.5 flex-wrap'>
                            {
                                themes.map(theme => {
                                    return (
                                        <div className='m-0.5 p-1 border rounded-xl flex items-center justify-center' key={theme._id}>
                                            <input name='theme' type="checkbox" className="focus:border-none rounded-sm outline-none text-black w-3.5 h-3.5" onChange={handleChange} id={theme._id} />
                                            <label className="mx-2 text-base font-medium">{theme.content}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='py-1 flex items-center w-full justify-between'>
                            <label className='text-xl text-beige w-2/3'>Visibility of members:</label>
                            <select defaultValue={'everyone'} name="members_visibles"
                                className="w-2/3 h-full outline-none border text-base font-semibold rounded-full block p-2 hover:cursor-pointer text-black"
                                onChange={handleChange} >
                                <option value="everyone">Everyone</option>
                                <option value="nobody">Nobody</option>
                                <option value="company">Company</option>
                            </select>
                        </div>
                        <div className='text-red-500 text-2xl font-semibold underline underline-offset-4 text-center w-full m-1 p-1'>
                            {state.errMessage}
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
                            onClick={handleSubmit}
                        >Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventCreationForm;
