import type { User } from "@/types/auth";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import userReducer from "./features/auth/userSlice";

const loadState = () => {
  try {
    const serializedUser = localStorage.getItem("user");
    const serializedToken = localStorage.getItem("token");
    if (serializedUser === null || serializedToken === null) {
      return undefined;
    }
    return {
      user: {
        user: JSON.parse(serializedUser) as User,
        token: serializedToken,
      },
    };
  } catch (e) {
    console.warn("Could not load state from localStorage", e);
    return undefined;
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
