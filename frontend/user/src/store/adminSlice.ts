import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface Error {
  code: string;
  details: string;
  message: string;
  responseType: string;
}

export interface adminReducerInitialState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}

const initialState: adminReducerInitialState = {
  user: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userExist: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    userNotExist: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = action.payload;
    },
    userLogout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { userExist, userNotExist, userLogout, setLoading } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
