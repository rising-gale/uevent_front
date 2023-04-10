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
<<<<<<< HEAD
    user: userSlice
=======
    calendars: calendarSlice
>>>>>>> f1a5b03538f68f868df4680a024b3ffe8e73e079
})

export const store = configureStore({reducer: rootReducer})