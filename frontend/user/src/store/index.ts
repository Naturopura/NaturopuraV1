import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import { userReducer } from "./userSlice";
import { cartReducer } from "./cartSlice";
import { wishlistReducer } from "./wishlistSlice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { userApi } from "@/state/userApi";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const userPersistConfig = {
  key: "user",
  storage: storage,
  whitelist: ["userState"],
};

const persistedReducer = persistReducer(userPersistConfig, userReducer);

const rootReducer = combineReducers({
  auth: persistedReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
});

export const store = configureStore({
  reducer: { rootReducer, [userApi.reducerPath]: userApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      userApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
