import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const registerUser = createAsyncThunk(
    'api/auth/register',
    async ({ username, full_name, password, email, repeatPassword }) => {
        try {
            const { data } = await axios.post('http://localhost:3002/api/auth/register', {
                username,
                full_name,
                password,
                repeatPassword,
                email
            }, { withCredentials: true })
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ username_or_email, password }) => {
        try {
            const { data } = await axios.post('http://localhost:3002/api/auth/login', {
                username_or_email,
                password
            }, { withCredentials: true })

            console.log(data)

            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const getUserData = createAsyncThunk('auth/getUserData', async () => {
    try {
        const { data } = await axios.get('http://localhost:3002/api/auth/me', { withCredentials: true })
        return data
    } catch (error) {
        console.log(error)
    }
},
)

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        try {
            const { data } = await axios.get('http://localhost:3002/api/auth/logout', { withCredentials: true })
            console.log(data)
            return data
        }
        catch (error) {
            console.log(error)
        }
    }
)

export const passwordForgot = createAsyncThunk(
    "auth/passwordForgot",
    async ({ email }) => {
      try {
        const { data } = await axios.post("http://localhost:3002/api/auth/recover", {
          email,
        }, { withCredentials: true });
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  );

  export const verifyPassword = createAsyncThunk(
    "auth/verifyPassword",
    async ({ new_password, confirm_password, token }) => {
      try {
        console.log(new_password)
        const { data } = await axios.post(`http://localhost:3002/api/auth/recover/${token}`, {
          new_password,
          confirm_password,
        }, { withCredentials: true });
  
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  );
  
const authSlice = createSlice({
    name: 'auth',

    initialState: {
        user: null,
        isLoading: false,
        status: null,
        userId: null
    },

    reducers: {
        // setCalendars(state, action) {
        //     let calendars = action.payload;
        // }
    },
    extraReducers: {

        //Login
        [loginUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.userId = action.payload.user?._id
        },
        [loginUser.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },

        //Check authorization (Get ME)
        [getUserData.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getUserData.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.me = action.payload?.user
            state.userId = action.payload?.user._id
        },
        [getUserData.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },

    }
})

export default authSlice.reducer
export const {  } = authSlice.actions;

