"use client";

import { adminExist, adminNotExist, setLoading } from "@/store/adminSlice";
import SignUpAdmin from "../api/signUp";
import { Dispatch } from "redux";

export const SignUp = (credentials: {
<<<<<<< HEAD
  firstName: string;
  lastName: string;
=======
  name: string;
>>>>>>> rakesh-bin
  email: string;
  isRemember: boolean;
  isActive: boolean;
  signature: string;
  dialingCode: string;
  addressLine: string;
  phone: string;
  country: string;
  walletAddress: string;
  state: string;
  city: string;
  zipCode: string;
  role: string;
}) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await SignUpAdmin(credentials);
      console.log("signup response is here", response);
<<<<<<< HEAD
      
=======
>>>>>>> rakesh-bin

      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", response?.data.token);
      }
<<<<<<< HEAD
      console.log("here >>>>>>> also")
      const admin = response?.data;
      admin.token = response?.token;
      
=======
      console.log("here >>>>>>> also");
      const admin = response?.data;
      admin.token = response?.token;

>>>>>>> rakesh-bin
      dispatch(adminExist(admin));

      dispatch(setLoading(false));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(adminNotExist(error));
      dispatch(setLoading(false));
    }
  };
};

export default SignUp;
