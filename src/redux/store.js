import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import categoriesSlice from './categoriesSlice'
import eventsSlice from './eventsSlice'

const rootReducer = combineReducers({
    auth: authSlice,
    events: eventsSlice,
    categories: categoriesSlice
})

export const store = configureStore({reducer: rootReducer})