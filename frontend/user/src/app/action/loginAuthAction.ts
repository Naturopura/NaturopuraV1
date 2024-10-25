"use client";

import { userExist, userNotExist, setLoading } from "@/store/adminSlice"; // Adjust the import path
import LoginAdmin from "../api/login"; // Adjust the import path
import { Dispatch } from "redux";

const Login = (credentials: { email: string; password: string }) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    console.log(`>>>>>>>>>>.3`);

    try {
      const response = await LoginAdmin(credentials); // Make sure LoginAdmin returns a Promise<LoginResponse>
      console.log("called ----------------", response);

      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", response.data.token);
      }

      if (!response) {
        dispatch(userNotExist(response));
        dispatch(setLoading(false));
      } else {
        const user = response.data;
        user.token = response.token; // Correctly access token
        dispatch(userExist(user));
        dispatch(setLoading(false));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(userNotExist(error));
      dispatch(setLoading(false));
    }
  };
};

export default Login;
