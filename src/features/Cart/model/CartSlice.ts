import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
};

interface CartState {
  items: CartItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  items: [],
  status: 'idle',
  error: null,
};

export const cartSlice = createSlice({
  name: 'cartReducer',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      console.log('Adding to cart:', action.payload);
      state.items = action.payload;
    },
    deleteCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { setCart, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;
