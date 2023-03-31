import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const createEvent = createAsyncThunk(
    'api/calendars',
    async function(submitData,{dispatch})
    {
        try {
            console.log(submitData);
            let {data} = await axios.post(`http://localhost:3002/api/events/company/${submitData.company_id}`,{...submitData}, { withCredentials: true })            
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)


export const getAllEvents = createAsyncThunk(
    'api/calendars',
    async function({page, sort},{dispatch})
    {
        try {
            let { data } = await axios.get(`http://localhost:3002/api/events/${page}/${sort}`, { withCredentials: true });
            // console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

const eventsSlice = createSlice({
    name: 'createEvent',
    initialState:{
        events: []
    },
    reducers:{

    },
    extraReducers:{
        [getAllEvents.fulfilled]: (state, action) => {
            // console.log(action.payload);
            state.events = action.payload;
        },
        [getAllEvents.rejected]: (state, action) => {
            console.log('Rejected get all events.');
        },
    }
})

export default eventsSlice.reducer
export const {  } = eventsSlice.actions;

