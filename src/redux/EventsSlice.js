import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const getAllEvents = createAsyncThunk(
    'api/calendars',
    async function(_,{dispatch})
    {
        try {
            let response = await axios.get('http://localhost:3002/api/users/calendars',{ withCredentials: true });
            // console.log(response.data);
            dispatch(setCalendars(response.data));
        } catch (error) {
            console.log(error);
        }
    }
)


const eventsSlice = createSlice({
    name: 'calendar',
    initialState:{
        calendars:[]
    },
    reducers:{
        setCalendars(state, action){
            let calendars = action.payload;
            calendars.push({
            _id:"1",
            type:"main",
            visible:true,
            national_holidays:true,
            author:"1",
            name:"National holidays",
            color:"",
            description:"Main calendar with holidays"})
            
            state.calendars = calendars;
            let choosedCalendars = [];
            calendars.forEach(calendar => {
                choosedCalendars.push(calendar._id);
            })
            state.choosedCalendars = choosedCalendars;
        }
    }
})

export default eventsSlice.reducer
export const {setCalendars} = eventsSlice.actions;

