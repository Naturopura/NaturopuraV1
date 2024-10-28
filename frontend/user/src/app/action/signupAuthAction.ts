"use client";

import { userExist, userNotExist, setLoading } from "@/store/adminSlice";
import SignUpAdmin from "../api/signUp";
import { Dispatch } from "redux";

export const SignUp = (credentials: {
  name: string;
  email: string;
  password: string;
  phone: string;
  walletAddress: string;
}) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await SignUpAdmin(credentials);
      console.log("signupresponse", response);

      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", response?.data.token);
      }
      const user = response?.data;
      user.token = response?.token;

      dispatch(userExist(user));

      dispatch(setLoading(false));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(userNotExist(error));
      dispatch(setLoading(false));
    }
  };
};

export default SignUp;
