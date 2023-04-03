import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const payTickets = createAsyncThunk(
    'api/events/create-checkout-session',
    async function (cartItems) {
        try {
            console.log(cartItems);
            // let { data } = await axios.post(`http://localhost:3002/api/events/create-checkout-session`,{ cartItems: cartItems }, { withCredentials: true });
            // console.log('Event: ', data)
            // return data;
        } catch (error) {
            console.log(error);
        }
    }
)

const cartSlice = createSlice({
    name: 'ticketsCart',
    initialState: {
        cartItems: [ ]
    },
    reducers: {
        addItem(state, action) {
            // console.log(action.payload);
            let idx = state.cartItems.findIndex((item) => item._id === action.payload._id);
            if(idx < 0)
            {
                state.cartItems.push(action.payload);
            }
        },
        deleteItem(state, action)
        {
            // console.log(action.payload);
            let idx = state.cartItems.findIndex((item) => item._id === action.payload);
            if(idx >= 0)
            {
                let newCart = state.cartItems;
                newCart.splice(idx, 1);
                state.cartItems = newCart;
            }
        },
        clearCart(state)
        {
            state.cartItems = [];
        },
        changeAmount(state, action)
        {
            // console.log(action.payload);
            let idx = state.cartItems.findIndex((item) => item._id === action.payload._id);
            if(idx >= 0)
            {
                let newCart = state.cartItems;
                newCart[idx].quantity = action.payload.quantity;
                state.cartItems = newCart;
            }
        }

    },
    extraReducers: {

    }
})

export default cartSlice.reducer
export const { addItem, deleteItem, changeAmount, clearCart } = cartSlice.actions;

