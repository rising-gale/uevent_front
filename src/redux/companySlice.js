import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setUserData } from './authSlice'

const initialState = {
    company: null,
    members: null,
    events: null,
    loading: false,
    status: null
}

export const updateCompanyData = createAsyncThunk('company/updateCompanyData', async (submitData) => {
    try {
        console.log(submitData)
        const { data } = await axios.patch(`http://localhost:3002/api/companies/${submitData?.id}`, {...submitData}, { withCredentials: true })
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const uploadCompanyAvatar = createAsyncThunk('company/uploadCompanyAvatar', async (req) => {
    try {
        const { data } = await axios.post(`http://localhost:3002/api/companies/${req.get('id')}/pic-load`, req, { withCredentials: true })
        console.log(data)
        return { data }
    } catch (error) {
        console.log(error)
    }
})

export const createCompany = createAsyncThunk('company/createCompany', async (submitData) => {
    try {
        const { data } = await axios.post('http://localhost:3002/api/companies', {...submitData}, { withCredentials: true })

        return data
    } catch (error) {
        console.log(error)
    }
})

export const deleteCompany = createAsyncThunk('company/deleteCompany', async (companyID) => {
    try {
        const { data } = await axios.delete(`http://localhost:3002/api/companies/${companyID}`, { withCredentials: true })
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getCompaniesEvents = createAsyncThunk('company/getCompaniesEvents', async (companyID) => {
    try {
        const { data } = await axios.get(`http://localhost:3002/api/${companyID}/events`, { withCredentials: true })
        // setCompaniesEvents(data)
    } catch (error) {
        console.log(error)
    }
})

export const getMyCompany = createAsyncThunk('company/getMyCompany', async () => {
    try {
        const { data } = await axios.get('http://localhost:3002/api/users/companies', { withCredentials: true })
        console.log(data)
        return data.my_company[0]
    } catch (error) {
        console.log(error)
    }
})

export const getMembers = createAsyncThunk('company/getMembers', async (companyId) => {
    try{
        const {data} = await axios.get(`http://localhost:3002/api/companies/${companyId}/users`, {withCredentials: true})
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
})

export const getCompanyById = createAsyncThunk('company/getCompanyById', async(companyId) => {
    try{
        const {data} = await axios.get(`http://localhost:3002/api/companies/${companyId}`, {withCredentials: true})
        return data
    } catch (error) {
        console.log(error)
    }
})

export const inviteMember = createAsyncThunk('company/inviteMember', async(req, {dispatch}) => {
    try{
        const {data} = await axios.post(`http://localhost:3002/api/companies/${req.id}/invite-members`, req, {withCredentials: true})
        return data 
    } catch (error) {
        console.log(error)
    }
})


export const subscribeToCompany = createAsyncThunk(
    'api/users/subscriptionTo/:id company',
    async function (id, {dispatch})
    {
        try {
            // console.log('ID: ',id);
            let { data } = await axios.get(`http://localhost:3002/api/users/subscriptionTo/${id}`, { withCredentials: true });
            console.log('Subscription data: ', data);   
            return data;            
        } catch (error) {
            console.log(error);
        }
    }
)

export const unsubsribeFromCompany = createAsyncThunk(
    'api/users/subs company',
    async function ({id, subscriptions_companies}, {dispatch})
    {
        try {
            // console.log('ID: ',id, subscriptions_companies);
            let idx = subscriptions_companies.findIndex(item => item._id === id);
            let newArr = [...subscriptions_companies];
            newArr.splice(idx, 1);
            console.log(newArr);
            let { data } = await axios.patch(`http://localhost:3002/api/users/subs`, {subscriptions_companies: newArr}, { withCredentials: true });
            console.log('Subscription data: ', data);   
            dispatch(setUserData(data));
            return data;            
        } catch (error) {
            console.log(error);
        }
    }
)


export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompaniesEvents(state, action) {
            state.events = action.payload
            state.status = action.payload?.message
        }
    },
    extraReducers: {
        // Create company
        [createCompany.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [createCompany.fulfilled]: (state, action) => {
            state.loading = false
            state.company = action.payload?.newCompany
            state.status = action.payload?.message
        },
        [createCompany.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
            console.log(action.payload.message)
        },
        // Create company
        [getMembers.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [getMembers.fulfilled]: (state, action) => {
            state.loading = false
            state.members = action.payload
            state.status = action.payload?.message
        },
        [getMembers.rejected]: (state, action) => {
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
            state.company = action.payload?.company
            state.status = action.payload?.message
            console.log(action.payload)
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
            state.company = action.payload.data
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
            state.company = null
            state.members = null
            state.events = null
            state.status = action.payload?.message
        },
        [deleteCompany.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload?.message
        },

        //get My Company
        [getMyCompany.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [getMyCompany.fulfilled]: (state, action) => {
            state.loading = false
            state.company = action.payload
            console.log(action.payload)
            state.status = action.payload?.message
        },
        [getMyCompany.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },

        //get Company
        [getCompanyById.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [getCompanyById.fulfilled]: (state, action) => {
            state.loading = false
            state.company = action.payload
            console.log(action.payload)
            state.status = action.payload?.message
        },
        [getCompanyById.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        },

        //Invite Member
        [inviteMember.pending]: (state) => {
            state.loading = true
            state.status = null
        },
        [inviteMember.fulfilled]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
            console.log(state.status)
        },
        [inviteMember.rejected]: (state, action) => {
            state.loading = false
            state.status = action.payload.message
        }
    }
})

export default companySlice.reducer