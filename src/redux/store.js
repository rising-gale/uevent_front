import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import createEventSlice from './createEventSlice'

const rootReducer = combineReducers({
    auth: authSlice,
    eventCreation: createEventSlice
})

export const store = configureStore({reducer: rootReducer})