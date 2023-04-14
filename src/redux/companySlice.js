import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setUserData } from './authSlice'

const initialState = {
    company: null,
    loading: false,
    status: null
}

export const updateCompanyData = createAsyncThunk('company/updateCompanyData', async (submitData) => {
    try {
        const { data } = await axios.patch(`http://localhost:3002/api/companies/${submitData.get('id')}`, submitData, { withCredentials: true })
        console.log(data)
        return {data}
    } catch (error) {
        console.log(error)
    }
})

export const uploadCompanyAvatar = createAsyncThunk('company/uploadCompanyAvatar', async (req) => {
    try {
        const { data } = await axios.patch(`http://localhost:3002/api/companies/${req.get('id')}/pic-load`, req, { withCredentials: true })
        console.log(data)
        return { data }
    } catch (error) {
        console.log(error)
    }
})

export const createCompany = createAsyncThunk('company/createCompany', async(req) => {
    try {
        const {data} = await axios.post('http://localhost:3002/api/companies', req)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const deleteCompany = createAsyncThunk('company/deleteCompany', async (companyID) => {
    try {
        const { data } = await axios.delete(`http://localhost:3002/api/companies/${companyID}`)
        return data
    } catch (error) {
        console.log(error)
    }
})



export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
    },
    extraReducers: {
        // Create company
        [createCompany.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [createCompany.fulfilled]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
        },
        [createCompany.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
            console.log(action.payload.message)
        },
        // Update company data
        [updateCompanyData.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [updateCompanyData.fulfilled]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
        },
        [updateCompanyData.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
            console.log(action.payload.message)
        },
        [uploadCompanyAvatar.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [uploadCompanyAvatar.fulfilled]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
        },
        [uploadCompanyAvatar.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
        },

        // Delete company
        [deleteCompany.pending]: (state) => {
            state.loading = true
        },
        [deleteCompany.fulfilled]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
        },
        [deleteCompany.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
        }
    }
})

export default companySlice.reducer