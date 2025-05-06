import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/products/products.slice";
import authReducer from "./features/products/auth.slice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
