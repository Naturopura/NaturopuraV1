import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Category {
  _id: string;
  name: string;
  image: string;
}

export interface CartItem {
  name: string;
  category: Category;
  price: number;
  currency: string;
  unit: string;
  quantity: number;
  description: string;
  image: string;
  _id: string;
}

export interface CartReducerInitialState {
  cartItems: CartItem[];
  loading: boolean;
  error: null;
}

const initialState: CartReducerInitialState = {
  cartItems: [],
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;
      const index = state.cartItems.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );
      if (index !== -1) {
        state.cartItems[index] = action.payload;
      } else state.cartItems.push(action.payload);
      state.loading = false;
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== action.payload
      );

      state.loading = false;
    },
  },
});

export const { addToCart, removeCartItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
