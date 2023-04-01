import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const getCategories = createAsyncThunk(
    'api/calendars',
    async function (_) {
        try {
            let { data } = await axios.get('http://localhost:3002/api/categories', { withCredentials: true });
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        themes: [],
        formats: []
    },
    reducers: {

    },
    extraReducers: {
        [getCategories.fulfilled]: (state, action) => {
            state.themes = action.payload.themes;
            state.formats = action.payload.format;
        },
        [getCategories.rejected]: (state, action) => {
            console.log('Rejected');
        },
    }
})

export default categoriesSlice.reducer
export const { } = categoriesSlice.actions;

