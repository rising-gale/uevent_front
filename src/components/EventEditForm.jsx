import React, { useEffect, useState } from 'react';
import { getCategories } from '../redux/categoriesSlice';
import { useDispatch, useSelector } from 'react-redux';
import MapContainer from './MapContainer';
import LoadingPage from '../pages/LoadingPage';
import { editEvent } from '../redux/eventsSlice';

const defaultLocation = { lat: 50.449709821421386, lng: 30.52762771951049 }

const EventEditForm = ({ data, closeForm }) => {
    const dispatch = useDispatch();

    const themes = useSelector(state => state.categories.themes);
    const formats = useSelector(state => state.categories.formats);
    const user = useSelector(state => state.auth.user);

    const [state, setState] = useState({
        title: 'null',
        description: 'null',
        tickets: 1,
        price: 0,

        date_event: null,
        time_start: null,

        date_end: null,
        time_end: null,
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

    const handleChange = (e) => {
        const { name, value, id } = e.target;
        console.log(name, value, id);

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
            case 'date_event':
                setState(prevState => ({
                    ...prevState,
                    date_event: value + ' ' + state.time_start.toString(),
                    date_end: value + ' ' + state.time_end.toString(),
                    errMessage: ''
                }));
                // let date_string = value + ' ' + state.time_start.toString();
                // console.log(date_string);
                // console.log(Date(date_string))
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
        console.log(data);
        console.log(state);
        console.log(location);
        if (state.title.length > 0 && state.title.length < 25  && state.tickets >= 1 && state.price >= 0 && state.date_event && state.time_start
            && state.formats.length > 0 && state.themes.length >= 0 && state.date_end && state.time_end && location) {
            // console.log("OK");
            dispatch(editEvent({ ...state, _id: data._id, location, company_id: user.companies[0]._id }));
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

    useEffect(()=>{
        console.log(data);
        let date_event = new Date(data.date_event);
        let time_start = date_event.toLocaleTimeString();
        let date_end = new Date(data.date_end);
        let time_end = date_end.toLocaleTimeString();
        setLocation(data.location)
        console.log('Date event:', date_event.toLocaleDateString('en-CA')); 
        console.log('Time event:', time_start); 
        console.log('Date end:', date_end);
        console.log('Time end:', time_end);

        let date_post = new Date(data.date_post);
        let time_post = date_post.getHours();

        setState(prevState => ({
            ...prevState,
            title: data.title,
            description: data.description,
            tickets: data.tickets,
            price: data.price,
    
            date_event: date_event.toLocaleDateString('en-CA'),
            time_start: time_start,
    
            date_end: date_end.toLocaleDateString('en-CA'),
            time_end: time_end,
            
    
            latePost: false,
            date_post: date_post,
            time_post: time_post,
    
    
            notifications: data.notifications,
            members_visibles: data.members_visibles,
    
            formats: [...data.formats],
            themes: [...data.themes],
        }));
    }, [data])

    if(state.title !== 'null')
    return (
        <div className="text-white justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-slate-600 bg-opacity-50">
            <div className="relative my-2 mx-auto w-1/2">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-dark-blue-pastel outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl pl-4 font-semibold text-light-grey-pastel font-serif">
                            Editing event
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-3 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={closeForm}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {/*body*/}
                    <div className="relative px-8 py-3 flex flex-col m-1">
                        <div className='pb-1 my-1 flex items-center w-full '>
                            <label className='text-xl text-beige w-1/3'>Title (required):</label>
                            <input type={"text"} defaultValue={state.title}
                                className={state?.title?.length > 25 ?
                                    "border-2 border-purple-500 focus:border-2 focus:border-red-600 w-2/3 rounded-full outline-none text-black p-2 bg-light-beige"
                                    :
                                    "border-2 border-purple-500 focus:border-emerald-600 focus:border-2 w-2/3 rounded-full outline-none text-black p-2 bg-light-beige"
                                } name='title' onChange={handleChange} />
                        </div>
                        {state.title.length > 0 && state.title.length > 25 && <div className='text-red-600 text-xs w-full text-end px-3'>(must be 1 - 25 symbols)</div>}
                        <div className='py-1 my-1 flex items-center w-full'>
                            <label className='text-xl text-beige w-1/3'>Description:</label>
                            <textarea 
                            className='w-2/3 rounded-lg text-black p-1 outline-none bg-light-beige border-2 border-purple-500 focus:border-emerald-600' 
                            defaultValue={state.description}/>
                        </div>
                        <div className='py-1 flex items-center w-full'>
                            <div className='w-1/2 flex items-center'>
                                <div className='flex flex-col'>
                                    <div className='w-full flex items-center'>
                                        <label className='text-xl text-beige w-1/3'>Tickets:</label>
                                        <input type={"number"} 
                                        min={1} 
                                        className="border-2 border-purple-500 focus:border-emerald-600 w-1/3 rounded-full outline-none text-black bg-light-beige p-2" 
                                        name='tickets' 
                                        onChange={handleChange} 
                                        defaultValue={state.tickets}/>
                                    </div>
                                    {state.tickets == ' ' || state.tickets <= 0 && <div className='text-red-600 text-xs w-full text-start px-3'>(must be 1 at least)</div>}
                                </div>
                            </div>
                            
                            <div className='w-1/2 flex items-center'>
                                <div className='flex flex-col'>
                                    <div className='w-full flex items-center'>
                                        <label className='text-xl text-beige w-1/3'>Price {<div className='text-xs'>(keep 0 if it`s free):</div>}</label>
                                        <input type={"number"} min={0} defaultValue={state.price} className="border-2 border-purple-500 focus:border-emerald-600 w-1/3 rounded-full outline-none text-black bg-light-beige p-2" name='price' onChange={handleChange} />
                                    </div>
                                    {state.price == ' ' || state.price < 0 && <div className='text-red-600 text-xs w-full text-start px-3'>(must be 0 or higher)</div>}
                                </div>
                            </div>
                        </div>
                        <div className='py-1 flex items-center w-full justify-between text-black'>
                            <label className='text-beige text-xl'>Select start date and time:</label>
                            <input defaultValue={state.date_event} className='bg-light-beige m-2 p-2 outline-none rounded-lg border-2 border-purple-500 focus:border-emerald-600' type='date' name="date_event" min="2022-01-01T00:00" onChange={handleChange} />
                            <input defaultValue={state.time_start} className='bg-light-beige m-2 p-2 outline-none rounded-lg border-2 border-purple-500 focus:border-emerald-600' type='time' name='time_start' step="1800" onChange={handleChange} />
                        </div>
                        <div className='pb-1 my-1 flex items-center w-full justify-start text-black'>
                            <label className='text-beige text-xl w-1/3'>Select end time:</label>
                            <input defaultValue={state.time_end} className='bg-light-beige mx-2 p-2 outline-none rounded-lg border-2 border-purple-500 focus:border-emerald-600' type='time' name='time_end' step="1800" onChange={handleChange} />
                        </div>
                        <div className='py-1 flex items-center w-full justify-between'>
                            <div className='flex w-3/5 items-center'>
                                <label className='text-xl text-beige w-4/5'>Notifications about new members:</label>
                                <input defaultChecked={state.notifications} type="checkbox" className="border-2 border-purple-500 focus:border-emerald-600 rounded-sm outline-none text-black bg-light-beige w-5 h-5" name='notifications' onChange={handleChange} />
                            </div>
                            <div className='flex w-2/5 items-center'>
                                <label className='text-xl text-beige w-2/3 '>Set post for later:</label>
                                <input type="checkbox" className="border-2 border-purple-500 focus:border-emerald-600 rounded-sm outline-none text-black bg-light-beige w-5 h-5" name='latePost' onChange={handleChange} />
                            </div>
                        </div>
                        {
                            state.latePost &&
                            <div className='py-1 flex items-center w-full justify-between text-black'>
                                <label className='text-beige text-xl'>Select date and time when post will be shown:</label>
                                <input className='bg-light-beige m-2 p-2 outline-none rounded-lg border-2 border-purple-500 focus:border-emerald-600' type='date' name="date_post" min="2022-01-01T00:00" onChange={handleChange} />
                                <input className='bg-light-beige m-2 p-2 outline-none rounded-lg border-2 border-purple-500 focus:border-emerald-600' type='time' name='time_post' step="3600" onChange={handleChange} />
                            </div>
                        }

                        <div className='py-1 my-2 flex flex-col w-full items-center'>
                            <label className='pb-2 text-beige text-xl'>Choose a location of event:</label>
                            <MapContainer center={data.location} creationMode={false} searchBar={true} setLocation={setLocation} />
                            {location.lat == defaultLocation.lat && location.lng == defaultLocation.lng && <div className='text-red-600 text-sm pt-1 w-full text-center px-3'>Choose location with search bar.</div>}
                        </div>
                        <div className='py-1 flex flex-col items-center w-full justify-start'>
                            <label className='text-lg text-beige w-full '>Select formats of event:</label>
                            <div className='w-full text-xs text-light-beige'>(minimum 1 must be choosen)</div>
                        </div>
                        <div className='flex flex-row items-center p-1.5 flex-wrap'>
                            {
                                formats && formats.map(format => {
                                    let idx = state.formats.findIndex(format1 => format1._id === format._id);
                                    return (
                                        <div className='m-0.5 p-1 border border-purple-500 rounded-xl flex items-center justify-center' key={format._id}>
                                            <input defaultChecked={idx >= 0} name='format' type="checkbox" className="focus:border-none rounded-sm outline-none text-black w-3.5 h-3.5" onChange={handleChange} id={format._id} />
                                            <label className="mx-2 text-base font-medium">{format.content}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='py-1 flex flex-col items-center w-full justify-start'>
                            <label className='text-lg text-beige w-full '>Select themes of event:</label>
                            <div className='w-full text-xs text-light-beige'>(minimum 1 must be choosen)</div>
                        </div>
                        <div className='flex flex-row items-center p-1.5 flex-wrap'>
                            {
                                themes && themes.map(theme => {
                                    let idx = state.themes.findIndex(theme1 => theme1._id === theme._id); 
                                    return (
                                        <div className='m-0.5 p-1 border border-fuchsia-600 rounded-xl flex items-center justify-center' key={theme._id}>
                                            <input defaultChecked={idx >= 0} name='theme' type="checkbox" className="focus:border-none rounded-sm outline-none text-black w-3.5 h-3.5" onChange={handleChange} id={theme._id} />
                                            <label className="mx-2 text-base font-medium">{theme.content}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='py-1 flex items-center w-full justify-between'>
                            <label className='text-xl text-beige w-2/3'>Visibility of members:</label>
                            <select defaultValue={state.members_visibles} name="members_visibles"
                                className="w-2/3 h-full outline-none border-2 border-purple-500 focus:border-emerald-600 text-base font-semibold rounded-full block p-2 hover:cursor-pointer text-black bg-light-beige"
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
                            className="text-pink-700 hover:text-pink-600 background-transparent font-bold uppercase px-3 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-350"
                            type="button"
                            onClick={closeForm}
                        >Cancel
                        </button>
                        <button
                            className="bg-emerald-600 text-light-beige active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:bg-emerald-500 transition duration-500 hover:ease-in"
                            type="button"
                            onClick={handleSubmit}
                        >Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
    else return <LoadingPage />
}

export default EventEditForm;
