import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import categoriesSlice from './categoriesSlice'
import eventsSlice from './eventsSlice'
import cartSlice from './cartSlice'


const rootReducer = combineReducers({
    auth: authSlice,
    events: eventsSlice,
    categories: categoriesSlice,
    cart: cartSlice
})

export const store = configureStore({reducer: rootReducer})