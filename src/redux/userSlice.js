import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setUserData } from './authSlice'

const initialState = {
    updatedUser: null,
    loading: false,
    status: null
}

export const updateUserData = createAsyncThunk('user/updateUserData', async (submitData, { dispatch }) => {
    try {
        const { data } = await axios.patch(`http://localhost:3002/api/users`, submitData, { withCredentials: true })
        console.log(data.user)        
        dispatch(setUserData(data.user))
        return {data}
    } catch (error) {
        console.log(error)
    }
})

export const uploadUserAvatar = createAsyncThunk('user/uploadUserAvatar', async (req, {dispatch}) => {
    try {
        const { data } = await axios.patch(`http://localhost:3002/api/users/pic-load`, req, { withCredentials: true })
        console.log(data.user)
        dispatch(setUserData(data.user))
        return { data }
    } catch (error) {
        console.log(error)
    }
})

export const deleteUser = createAsyncThunk('user/deleteUser', async (userID) => {
    try {
        const { data } = await axios.delete(`http://localhost:3002/api/users/${userID}`)
        return data
    } catch (error) {
        console.log(error)
    }
})



export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: {

        // Update user data
        [updateUserData.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [updateUserData.fulfilled]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
        },
        [updateUserData.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
            console.log(action.payload.message)
        },
        [uploadUserAvatar.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [uploadUserAvatar.fulfilled]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
        },
        [uploadUserAvatar.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
        },

        // Delete user
        [deleteUser.pending]: (state) => {
            state.loading = true
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
            // state.users = state.users.filter((user) => user._id !== action.payload.user._id)
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
        }
    }
})

export default userSlice.reducer