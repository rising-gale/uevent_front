import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

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
            // console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const getAllEvents = createAsyncThunk(
    'api/events',
    async function ({ page, sort, filterThemes, filterFormats, search }) {
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

const eventsSlice = createSlice({
    name: 'createEvent',
    initialState: {
        events: [],
        tickets: [],
        ticketsEvents: [],
        viewingEventData: {},
        pages: 1,
        curPage: 1
    },
    reducers: {
        incrementPage(state)
        {
            state.curPage = state.curPage + 1;
        },
        decrementPage(state)
        {
            state.curPage = state.curPage - 1;
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
    }
})

export default eventsSlice.reducer
export const {incrementPage, decrementPage} = eventsSlice.actions;

