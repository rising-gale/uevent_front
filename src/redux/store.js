import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import categoriesSlice from './categoriesSlice'
import createEventSlice from './createEventSlice'

const rootReducer = combineReducers({
    auth: authSlice,
    eventCreation: createEventSlice,
    categories: categoriesSlice
})

export const store = configureStore({reducer: rootReducer})