import { CartItem } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
  cartItems: CartItem[];
}
const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload);
    },
    updateCart(state, action) {
      state.cartItems = action.payload;
    },
    emptyCart(state) {
      state.cartItems = [];
    },
  },
});


export const {   addToCart, emptyCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;