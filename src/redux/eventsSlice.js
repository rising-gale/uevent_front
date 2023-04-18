import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { setUserData } from "./authSlice";

export const getTickets = createAsyncThunk(
    'api/user/tickets',
    async function (_) {
        try {
            let { data } = await axios.get(`http://localhost:3002/api/users/tickets`, { withCredentials: true })
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const createEvent = createAsyncThunk(
    'api/events/create',
    async function (submitData, { dispatch }) {
        try {
            console.log(submitData);
            let { data } = await axios.post(`http://localhost:3002/api/events/company/${submitData.company_id}`, { ...submitData }, { withCredentials: true })
            console.log(data);
            dispatch(getAllEvents({ page : 1, sort : 'date', filterThemes : [], filterFormats : [], search : '' }));
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const editEvent = createAsyncThunk(
    'api/events/edit',
    async function (submitData, { dispatch }) {
        try {
            console.log(submitData);
            let { data } = await axios.patch(`http://localhost:3002/api/events/${submitData._id}/company/${submitData.company_id}`, { ...submitData }, { withCredentials: true })
            // console.log(data);
            // dispatch(getAllEvents());
            dispatch(getEvent(data.event._id));
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const getAllEvents = createAsyncThunk(
    'api/events',
    async function ({ page = 1, sort = 'date', filterThemes = [], filterFormats = [], search = '' }) {
        try {
            // console.log(page, sort, filterThemes, filterFormats, search);
            if(filterThemes.length === 0)
            filterThemes = '';
            if(filterFormats.length === 0)
            filterFormats = '';
            // console.log(page, sort, filterThemes, filterFormats, search);
            let { data } = await axios.get(`http://localhost:3002/api/events/${page}/${sort}`, { params: { filterThemes: filterThemes, filterFormats: filterFormats, search: search } }, { withCredentials: true });
            console.log(data)
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const getAllCompanyEvents = createAsyncThunk(
    'api/companies/:id/events',
    async function ({company_id, page}) {
        try {
            let { data } = await axios.get(`http://localhost:3002/api/companies/${company_id}/events/${page}`, { withCredentials: true });
            console.log(data)
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const getEvent = createAsyncThunk(
    'api/events/:id',
    async function (id) {
        try {
            // console.log('ID: ',id);
            let { data } = await axios.get(`http://localhost:3002/api/events/${id}`, { withCredentials: true });
            // console.log('Event: ', data)
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const getEventComments = createAsyncThunk(
    'api/events/:id/comments',
    async function (id) {
        try {
            // console.log('ID: ',id);
            let { data } = await axios.get(`http://localhost:3002/api/events/${id}/comments`, { withCredentials: true });
            // console.log('Event comments: ', data)
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const createComment = createAsyncThunk(
    'api/events/:id/comments create',
    async function ({id, comment}, {dispatch}) {
        try {
            // console.log('data: ', id, comment);
            let { data } = await axios.post(`http://localhost:3002/api/events/${id}/comments`, { comment }, { withCredentials: true });
            // console.log('New comment: ', data);
            dispatch(getEventComments(id));
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const editComment = createAsyncThunk(
    'api/comments/:id edit',
    async function ({event_id, comment_id, comment}, {dispatch}) {
        try {
            console.log('data: ', event_id, comment_id, comment);
            let { data } = await axios.patch(`http://localhost:3002/api/comments/${comment_id}`, { comment }, { withCredentials: true });
            console.log('New comment: ', data);
            dispatch(getEventComments(event_id));
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const deleteComment = createAsyncThunk(
    'api/comments/:id delete',
    async function ({event_id, comment_id}, {dispatch}) {
        try {
            console.log('id: ', event_id);
            let { data } = await axios.delete(`http://localhost:3002/api/comments/${comment_id}`, { withCredentials: true });
            dispatch(getEventComments(event_id));
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)



export const loadAfisha = createAsyncThunk(
    'api/events/:id/pic-load',
    async function ({id, formData}, {dispatch}) {
        try {
            let {data} = await axios.post(`http://localhost:3002/api/events/${id}/pic-load`, formData, { withCredentials: true });
            console.log(data);
            dispatch(getEvent(data._id));
            dispatch(getEventComments(data._id));
            return;
        } catch (error) {
            console.log(error)
        }
    }
)

export const subscribeToEvent = createAsyncThunk(
    'api/users/subscriptionTo/:id event',
    async function (id, {dispatch})
    {
        try {
            // console.log('ID: ',id);
            let { data } = await axios.get(`http://localhost:3002/api/users/subscriptionTo/${id}`, { withCredentials: true });
            console.log('Subscription data: ', data);   
            dispatch(setUserData(data));
            return data;            
        } catch (error) {
            console.log(error);
        }
    }
)


export const unsubsribeFromEvent = createAsyncThunk(
    'api/users/subs event',
    async function ({id, userFavourites}, {dispatch})
    {
        try {
            // console.log('ID: ',id, userFavourites);
            let idx = userFavourites.findIndex(item => item._id === id);
            let newArr = [...userFavourites];
            newArr.splice(idx, 1);
            console.log(newArr);
            let { data } = await axios.patch(`http://localhost:3002/api/users/subs`, {subscriptions_events: newArr}, { withCredentials: true });
            console.log('Subscription data: ', data);   
            dispatch(setUserData(data));
            return data;            
        } catch (error) {
            console.log(error);
        }
    }
)

const eventsSlice = createSlice({
    name: 'createEvent',
    initialState: {
        events: [],
        tickets: [],
        ticketsEvents: [],

        viewingEventData: {},
        viewingEventComments: [],

        viewingCompanyEvents: [],
        viewingCompanyEventsPage: 1,
        viewingCompanyEventsPages: 1,

        pages: 1,
        curPage: 1,
        createStatus: ''
    },
    reducers: {
        incrementPage(state, action)
        {
            if(action.payload === 'main')
                state.curPage = state.curPage + 1;
            else state.viewingCompanyEventsPage = state.viewingCompanyEventsPage + 1;
        },
        decrementPage(state, action)
        {
            if(action.payload === 'main')
                state.curPage = state.curPage - 1;
            else state.viewingCompanyEventsPage = state.viewingCompanyEventsPage - 1;
        },
        editEventArray(state, action)
        {
            let idx = state.events.findIndex(event => event._id === action.payload._id);
            let newArr = [...state.events];
            newArr[idx] = action.payload;
            console.log(state.events);
            console.log(newArr);
            state.events = newArr;
        }
    },
    extraReducers: {
        [getAllEvents.fulfilled]: (state, action) => {
            state.events = action.payload.pageEvents;
            state.pages = action.payload.totalPages;
        },
        [getAllEvents.rejected]: () => {
            console.log('Rejected get all events.');
        },
        [getEvent.fulfilled]: (state, action) => {
            state.viewingEventData = action.payload;
        },
        [getTickets.fulfilled]: (state, action) => {
            let ticketsEvents = [];
            action.payload.forEach(ticket => {
                ticketsEvents.push(ticket.event);
            });
            state.tickets = action.payload;
            state.ticketsEvents = ticketsEvents;
        },
        [createEvent.fulfilled] : (state, action) => {
            state.createStatus = action.payload.message;
        },
        [getEventComments.fulfilled] : (state, action) => {
            state.viewingEventComments = action.payload;
        },
        [getAllCompanyEvents.fulfilled]:(state,action) =>{
            state.viewingCompanyEvents = action.payload.pageEvents;
            state.viewingCompanyEventsPages = action.payload.totalPages;
        }
    }
})

export default eventsSlice.reducer
export const {incrementPage, decrementPage, editEventArray} = eventsSlice.actions;

