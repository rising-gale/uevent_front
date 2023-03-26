import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const createEvent = createAsyncThunk(
    'api/calendars',
    async function({title, description, date, time_start, time_end, latePost, date_post, location, ticketsCount, },{dispatch})
    {
        try {
            let response = await axios.get('http://localhost:3002/api/users/calendars',{ withCredentials: true });
            // console.log(response.data);
            // dispatch(setCalendars(response.data));
        } catch (error) {
            console.log(error);
        }
    }
)

const createEventSlice = createSlice({
    name: 'createEvent',
    initialState:{
        location: undefined,
    },
    reducers:{
        setLocation(state, action){
            state.location = action.payload;
        }
    }
})

export default createEventSlice.reducer
export const { setLocation } = createEventSlice.actions;

