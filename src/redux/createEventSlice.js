import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const getAllEvents = createAsyncThunk(
    'api/calendars',
    async function(_,{dispatch})
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
    name: 'calendar',
    initialState:{
        
    },
    reducers:{
        setCalendars(state, action){
            // let calendars = action.payload;

            // state.choosedCalendars = choosedCalendars;
        }
    }
})

export default createEventSlice.reducer
export const { } = createEventSlice.actions;

