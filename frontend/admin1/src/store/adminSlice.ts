import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Admin {
  createSuccessResponse: string;
  email: string;
  expiresIn: string;
  firstName: string;
  isActive: boolean;
  lastName: string;
  role: string;
  token: string;
}

interface Error {
  code: string;
  details: string;
  message: string;
  responseType: string;
}

export interface adminReducerInitialState {
  admin: Admin | null;
  loading: boolean;
  error: Error | null;
}

const initialState: adminReducerInitialState = {
  admin: null,
  loading: false,
  error: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminExist: (state, action: PayloadAction<Admin>) => {
      state.loading = false;
      state.admin = action.payload;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    adminNotExist: (state, action: PayloadAction<Error>) => {
      state.loading = false;
      state.error = action.payload;
    },
    adminLogout: (state) => {
      state.admin = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { adminExist, adminNotExist, adminLogout, setLoading } =
  adminSlice.actions;
export const adminReducer = adminSlice.reducer;
