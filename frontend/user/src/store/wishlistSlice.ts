import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ImageBuffer = {
  type: "Buffer";
  data: number[];
};

export interface WishlistItem {
  name: string;
  category: string;
  price: number;
  currency: string;
  unit: string;
  quantity: number;
  description: string;
  image: ImageBuffer;
  _id: string;
}

export interface WishlistReducerInitialState {
  wishlistItems: WishlistItem[];
  loading: boolean;
  error: null;
}

const initialState: WishlistReducerInitialState = {
  wishlistItems: [],
  loading: false,
  error: null,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      state.loading = true;
      const index = state.wishlistItems.findIndex(
        (wishlistItem) => wishlistItem._id === action.payload._id
      );
      if (index !== -1) {
        state.wishlistItems[index] = action.payload;
      } else state.wishlistItems.push(action.payload);
      state.loading = false;
    },
    removeWishlistItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.wishlistItems = state.wishlistItems.filter(
        (wishlistItem) => wishlistItem._id !== action.payload
      );

      state.loading = false;
    },
  },
});

export const { addToWishlist, removeWishlistItem } = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
