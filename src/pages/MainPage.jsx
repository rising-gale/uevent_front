import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardOfEvent from '../components/CardOfEvent';
import EventCreationForm from '../components/EventCreationForm';
import Header from '../components/Header';
import { getCategories } from '../redux/categoriesSlice';
import { getAllEvents } from '../redux/eventsSlice';


const MainPage = () => {

    const dispatch = useDispatch();
    const events = useSelector(state => state.events.events);
    const themes = useSelector(state => state.categories.themes);
    const formats = useSelector(state => state.categories.formats);

    // const [sort, setSort] = useState('date');
    // const [page, setPage] = useState(1);
    const [openedForm, setForm] = useState(null);

    const [state, setState] = useState({
        sort: 'date',
        page: 1,
        filterThemes: [],
        filterFormats: [],
        search: '',
        errMessage: ''
    });

    useEffect(() => {
        dispatch(getCategories());
        console.log(state);
        dispatch(getAllEvents({page: state.page, sort: state.sort, filterThemes: state.filterThemes, filterFormats: state.filterFormats, search: state.search}));
    }, [dispatch, state]);




    const handleChange = (e) => {
        const { name, value, id } = e.target;
        // console.log(name, value, id);

        switch (name) {
            case 'format':
                if (state.filterFormats.find((element) => element === id)) {
                    let idx = state.filterFormats.findIndex((element) => element === id);
                    let newFormats = state.filterFormats;
                    newFormats.splice(idx, 1);
                    setState(prevState => ({
                        ...prevState,
                        filterFormats: newFormats,
                        errMessage: ''
                    }));
                } else {
                    let newFormats = state.filterFormats;
                    newFormats.push(id);
                    setState(prevState => ({
                        ...prevState,
                        filterFormats: newFormats,
                        errMessage: ''
                    }));
                }
                break;
            case 'theme':
                if (state.filterThemes.find((element) => element === id)) {
                    let idx = state.filterThemes.findIndex((element) => element === id);
                    let newThemes = state.filterThemes;
                    newThemes.splice(idx, 1);
                    setState(prevState => ({
                        ...prevState,
                        filterThemes: newThemes,
                        errMessage: ''
                    }));
                } else {
                    let newThemes = state.filterThemes;
                    newThemes.push(id);
                    setState(prevState => ({
                        ...prevState,
                        filterThemes: newThemes,
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

    return (
        <div className='flex flex-col w-full h-screen'>
        <Header />
        {/* <EventCreationForm /> */}
        <div className='p-1 flex flex-col bg-dark-purple text-light-beige '>
            <div className='flex w-full h-12 justify-around'>
                {/*Search and filtration bar */}
                <div className='p-1 w-2/5 h-full flex items-center'>
                    <input autoComplete='off' type="text" name="name" className='w-5/6 text-base p-3 border-1 black rounded-lg h-full outline-none bg-light-beige' placeholder='Input name of event ...' onChange={handleChange}/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9 ml-2 hover:cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
                <div className='w-1/5 h-full'>
                    <select defaultValue={'date'} name="sort"
                        className="w-full h-full outline-none bg-light-beige border border-indigo-800 text-gray-900 text-base font-semibold rounded-lg block p-2.5 hover:cursor-pointer" 
                        onChange={handleChange}>
                        <option value="date">Date</option>
                        <option value="themes">Themes</option>
                        <option value="format">Formats</option>
                    </select>
                </div>
            </div>
            <div className='w-full min-h-screen max-h-full pl-4 flex flex-row mt-4'>
                {/* <Sidebar /> */}
                <div className='w-1/4 h-full py-2 px-0.5 border-r-2 border-purple-900'>
                    <div className='text-center text-xl font-semibold my-5'>Filters for events</div>
                    <div className='text-center text-lg font-semibold'>By formats:</div>
                    <div className='text-center text-xs font-semibold'>(you can choose up to 3 items)</div>
                    <div className='flex flex-row flex-wrap py-1 my-1'>
                        {
                            formats && formats.map(format => {
                                
                                if(format.content !== 'none')
                                return(
                                    <div className='flex p-1 m-1.5 border rounded-md' key={format._id}>
                                        <input type='checkbox' name='format' id={format._id} onChange={handleChange}/>
                                        <div>{format.content}</div>
                                    </div>
                                )
                                else return <></>
                            })
                        }
                    </div>
                    <div className='text-center text-lg font-semibold'>By themes:</div>
                    <div className='text-center text-xs font-semibold'>(you can choose up to 3 items)</div>
                    <div className='flex flex-row flex-wrap py-1 my-1'>
                        {
                            themes && themes.map(theme => {
                                if(theme.content !== 'none')
                                return(
                                    <div className='flex p-1 m-1.5 border rounded-md' key={theme._id}>
                                        <input type='checkbox' name='theme' id={theme._id} onChange={handleChange}/>
                                        <div>{theme.content}</div>
                                    </div>
                                )
                                else return <></>
                            })
                        }
                    </div>
                </div>
                <div className='w-full h-full p-2'>
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
