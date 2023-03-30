import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const getCategories = createAsyncThunk(
    'api/calendars',
    async function(_)
    {
        try {
            let {data} = await axios.get('http://localhost:3002/api/categories',{ withCredentials: true });
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

const categoriesSlice = createSlice({
    name: 'categories',
    initialState:{
        themes:[],
        formats:[]
    },
    reducers:{

    },
    extraReducers:{
        [getCategories.pending]: (state) => {
            // console.log('Pending');
          },
          [getCategories.fulfilled]: (state, action) => {
            // console.log('Fulfilled');
            console.log(action.payload);

            // let formats = [];
            // let themes = [];
            // action.payload.forEach(category => {
            //     // console.log(category);
            //     if(category.type === 'format')
            //     {
            //         formats.push(
            //             {
            //                 _id: category._id,
            //                 content: category.content
            //             }
            //         );
            //     } else 
            //     {
            //         themes.push(
            //             {
            //                 _id: category._id,
            //                 content: category.content
            //             }
            //         );
            //     }
            // });
            
            state.themes = action.payload.themes;
            state.formats = action.payload.format;
            // console.log(themes, formats)
          },
          [getCategories.rejected]: (state, action) => {
            console.log('Rejected');
          },
    }
})

export default categoriesSlice.reducer
export const {  } = categoriesSlice.actions;

