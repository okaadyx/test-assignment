import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../services/products/types';

type WishlistProduct = Pick<Product, 'id' | 'title' | 'price' | 'images'>;

interface WishlistState {
  items: WishlistProduct[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<Product>) {
      const exists = state.items.find(i => i.id === action.payload.id);
      if (!exists) {
        const { id, title, price, images } = action.payload;
        state.items.push({ id, title, price, images: images ?? [] });
      }
    },
    removeFromWishlist(state, action: PayloadAction<number>) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    toggleWishlist(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex(i => i.id === action.payload.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        const { id, title, price, images } = action.payload;
        state.items.push({ id, title, price, images: images ?? [] });
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
