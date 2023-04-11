import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    // users: [],
    user: null,
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

export const updateUserData = createAsyncThunk('user/updateUserData', async (submitData, {dispatch}) => {
    try {
        console.log(submitData.username)
        const { data } = await axios.patch(`http://localhost:3002/api/users/${submitData.id}`, submitData, {withCredentials: true})
        // dispatch(getUserData())
        console.log(data.message)
        return data
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

export const getUserData = createAsyncThunk('auth/getUserData', async () => {
    try {
        const { data } = await axios.get('http://localhost:3002/api/auth/me', { withCredentials: true })
        return data
    } catch (error) {
        console.log(error)
    }
},
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserData: (state, action) => {
            state.user = action.payload
            state.message = action.payload?.message
        }
    },
    extraReducers: {
        // // Get all users
        // [getAllUsers.pending]: (state) => {
        //     state.loading = true
        // },
        // [getAllUsers.fulfilled]: (state, action) => {
        //     state.loading = false
        //     state.users = action.payload.users
        // },
        // [getAllUsers.rejected]: (state) => {
        //     state.loading = false
        // },

        // // Get user by id
        // [getUserById.pending]: (state) => {
        //     state.loading = true
        // },
        // [getUserById.fulfilled]: (state, action) => {
        //     state.loading = false
        //     state.user = action.payload
        // },
        // [getUserById.rejected]: (state) => {
        //     state.loading = false
        // },

        // Update user data
        // [updateUserData.pending]: (state) => {
        //     state.loading = true
        //     state.status = null
        // },
        // [updateUserData.fulfilled]: (state, action) => {
        //     state.loading = false
        //     // const index = state.users.findIndex((user) => user._id === action.payload._id) 
        //     // state.users[index] = action.payload.updatedUser
        //     state.user = action.payload.user
        //     state.status = action.payload?.message
        // },
        // [updateUserData.rejected]: (state, action) => {
        //     state.loading = false
        //     state.status = action.payload?.message
        //     console.log(action.payload.message)
        // },

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
        },

        //Check authorization (Get ME)
        [getUserData.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getUserData.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload?.user
        },
        [getUserData.rejected]: (state, action) => {
            state.status = action.payload?.message
            state.isLoading = false
        },
    }
})

export default userSlice.reducer