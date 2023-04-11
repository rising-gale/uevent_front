import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import categoriesSlice from './categoriesSlice'
import eventsSlice from './eventsSlice'
import cartSlice from './cartSlice'
import userSlice from './userSlice'
import calendarSlice from './calendarSlice'


const rootReducer = combineReducers({
    auth: authSlice,
    events: eventsSlice,
    categories: categoriesSlice,
    cart: cartSlice,
    user: userSlice,
    calendars: calendarSlice
})

export const store = configureStore({reducer: rootReducer})