import { adminExist, adminNotExist, setLoading } from "@/state";
import SignUpAdmin from "../api/signUp";
import { Dispatch } from "redux";

export const SignUp = (credentials: {
  firstName: string;
  lastName: string;
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
  key: string;
  role: string;
}) => {
  return async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await SignUpAdmin(credentials);
      console.log("signupresponse", response);

      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", response?.data.token);
      }
      const admin = response?.data;
      admin.token = response?.token;

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
