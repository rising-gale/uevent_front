import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { getCategories } from '../redux/categoriesSlice';
import { getAllEvents } from '../redux/eventsSlice';
import EventsContainer from '../components/EventsContainer';


const MainPage = () => {

    const dispatch = useDispatch();
    const events = useSelector(state => state.events.events);
    const themes = useSelector(state => state.categories.themes);
    const formats = useSelector(state => state.categories.formats);
    const page = useSelector(state => state.events.curPage);

    const [state, setState] = useState({
        sort: 'date',
        filterThemes: [],
        filterFormats: [],
        search: '',
        errMessage: ''
    });

    useEffect(() => {
        dispatch(getCategories());
        // console.log(state);
        dispatch(getAllEvents({ page: page, sort: state.sort, filterThemes: state.filterThemes, filterFormats: state.filterFormats, search: state.search }));
    }, [dispatch, state, page]);

    const handleChange = (e) => {
        const { name, value, id } = e.target;
        switch (name) {
            case 'format':
                let newFormats = state.filterFormats;
                if (state.filterFormats.find((element) => element === id)) {
                    let idx = state.filterFormats.findIndex((element) => element === id);
                    newFormats.splice(idx, 1);
                    setState(prevState => ({
                        ...prevState,
                        filterFormats: newFormats,
                        errMessage: ''
                    }));
                } else {
                    newFormats.push(id);
                    setState(prevState => ({
                        ...prevState,
                        filterFormats: newFormats,
                        errMessage: ''
                    }));
                }
                break;
            case 'theme':
                let newThemes = state.filterThemes;
                if (state.filterThemes.find((element) => element === id)) {
                    let idx = state.filterThemes.findIndex((element) => element === id);
                    newThemes.splice(idx, 1);
                    setState(prevState => ({
                        ...prevState,
                        filterThemes: newThemes,
                        errMessage: ''
                    }));
                } else {
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
            {/* <Header /> */}
            <EventsContainer events={events} formats={formats} themes={themes} handleChange={handleChange} />
        </div>
    );
}

export default MainPage;
