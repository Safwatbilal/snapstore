import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
    productId: string;
  imageUrl: string;
  productName: string;
  price: number;
  quantity: number;
}

interface InitialStateProps {
  cartArray: CartItem[];
}

const initialState: InitialStateProps = {
  cartArray: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cartArray.find(item => item.productId === action.payload.productId);
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        if (existingItem.quantity <= 0) {
            state.cartArray = state.cartArray.filter(
              (item) => item.productId !== existingItem.productId
            );
          }
      } else {
        state.cartArray.push(action.payload);
      }
    },
        removeFromCart: (state, action: PayloadAction<string>) => {
        state.cartArray = state.cartArray.filter(item => item.productId !== action.payload);
        },
    clearCart: (state) => {
      state.cartArray = [];
    }
  },
});

export const { addToCart ,clearCart,removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;
