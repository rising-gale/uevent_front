import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setUserData } from './authSlice'

const initialState = {
    // users: [],
    // user: null,
    updatedUser: null,
    loading: false,
    status: null
}

// export const getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
//     try {
//         const { data } = await axios.get('http://localhost:3002/api/users')
//         return ({ users: data })
//     } catch (error) {
//         console.log(error)
//     }
// })

// export const getUserById = createAsyncThunk('user/getUserById', async (userId) => {
//     try {
//         const { data } = await axios.get(`http://localhost:3002/api/users/${userId}`)
//         return data
//     } catch (error) {
//         console.log(error)
//     }
// })

export const updateUserData = createAsyncThunk('user/updateUserData', async (submitData, { dispatch }) => {
    try {
        console.log(submitData.state.full_name)

        const { data } = await axios.patch(`http://localhost:3002/api/users`, submitData.state, { withCredentials: true })
        // dispatch(getUserData())
        console.log(data.message)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const uploadUserAvatar = createAsyncThunk('user/uploadUserAvatar', async (req, {dispatch}) => {
    try {
        const { data } = await axios.patch(`http://localhost:3002/api/users//pic-load`, req, { withCredentials: true })
        console.log(data.message)
        dispatch(setUserData(data))
        return { data }
    } catch (error) {
        console.log(error)
    }
})

// export const createUser = createAsyncThunk('user/createUser', async(req) => {
//     try {
//         const {data} = await axios.post('http://localhost:3002/api/users', req)
//         return data
//     } catch (error) {
//         console.log(error)
//     }
// })

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


        // // Create user
        // [createUser.pending] : (state) => {
        //     state.loading = true
        // },
        // [createUser.fulfilled] : (state, action) => {
        //     state.loading = false
        //     state.users.push(action.payload)
        // },
        // [createUser.rejected] : (state) => {
        //     state.loading = false
        // },

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