import axios from "axios";
import toast from "react-hot-toast";

const SignUpAdmin = async (credentials: {
  firstName: string;
  lastName: string;
  email: string;
  isRemember: boolean;
  isActive: boolean;
  signature: string;
  walletAddress: string;
  dialingCode: string;
  addressLine: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  key: string;
  role: string;
}) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/auth/admin/signup",
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
