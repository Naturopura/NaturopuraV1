import axios from "axios";
import toast from "react-hot-toast";

const SignUpAdmin = async (credentials: {
  name: string;
  email: string;
  password: string;
  phone: string;
  walletAddress: string;
}) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/auth/signup",
      credentials
    );
    if (response.data.success === true) {
      toast.success("Signup Successful");
    } else {
      toast.error("Signup failed");
    }
    localStorage.setItem("accessToken", response?.data?.data?.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default SignUpAdmin;
