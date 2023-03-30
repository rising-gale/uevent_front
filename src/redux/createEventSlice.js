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
    async function(_,{dispatch})
    {
        try {
            let {data} = await axios.get('http://localhost:3002/api/events',{ withCredentials: true });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
)

const createEventSlice = createSlice({
    name: 'createEvent',
    initialState:{

    },
    reducers:{
        setLocation(state, action){
            state.location = action.payload;
        }
    }
})

export default createEventSlice.reducer
export const { setLocation } = createEventSlice.actions;

