// import ProtectedRoute from "@/auth/ProtectedRoute";
import axios from "axios";
import toast from "react-hot-toast";

const LoginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/auth/signin",
      credentials
    );
    console.log("adminLogin", response);
    if (response.data.success === true) {
      toast.success("Sign in Successful");
    } else {
      toast.error("Account Not Found, Please Sign up");
    }
    localStorage.setItem("accessToken", response?.data?.data?.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default LoginUser;
