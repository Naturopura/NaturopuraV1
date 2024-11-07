// import ProtectedRoute from "@/auth/ProtectedRoute";
import axios from "axios";
import toast from "react-hot-toast";

const LoginAdmin = async (credentials: {
  signature: string;
<<<<<<< HEAD
  nonce: number | undefined ;
  walletAddress: string | "" ;
=======
  nonce: number | undefined;
  walletAddress: string | "";
>>>>>>> rakesh-bin
}) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/auth/admin/login",
      credentials
    );
    console.log("adminLogin", response);
    if (response.data.success === true) {
      toast.success("Sign in Successful");
    } else {
<<<<<<< HEAD
      toast.error("Admin Account Not Found, Please Sign up");
=======
      toast.error("Account Not Found, Please Sign up");
>>>>>>> rakesh-bin
    }
    localStorage.setItem("accessToken", response?.data?.data?.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default LoginAdmin;
