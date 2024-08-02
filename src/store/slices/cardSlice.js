import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // cartItems: [],
    // using this code for loosing data in shopping cart 
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    cartTotalQty: 0,
    cartTotalPrice: 0


}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            // console.log(state);
            // console.log(action.payload);
            // state.cartItems.push(action.payload);
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            )
            // console.log(itemIndex);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1
            }
            else {
                let cartItems = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(cartItems);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        clearCart(state, action) {
            state.cartItems = [];
        },
        removeFromCart(state, action) {


            const nextCartItems = state.cartItems.filter(
                (item) => item.id !== action.payload.id
            );

            state.cartItems = nextCartItems;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;


            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (item) => item.id !== action.payload.id
                );

                state.cartItems = nextCartItems;


            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

        },
    }
})


export const { addToCart, clearCart, removeFromCart, decreaseCart } = cartSlice.actions
export default cartSlice.reducer;