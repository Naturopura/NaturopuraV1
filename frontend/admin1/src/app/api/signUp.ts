import axios from "axios";
import toast from "react-hot-toast";

const SignUpAdmin = async (credentials: {
  name: string;
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
  role: string;
}) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/auth/admin/signup",
      credentials
    );

    console.log("API call successful, response:", response);

    if (response.data.success === true) {
      toast.success("Signup Successful");
    } else {
      toast.error(response.data.message);
    }

    // Store the token if signup was successful
    if (response?.data?.data?.token) {
      localStorage.setItem("accessToken", response?.data?.data?.token);
    }

    return response.data; // Ensure the response is returned properly
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (
      error.response?.data?.message === "Email or phone number already exists"
    ) {
      // toast.error("Email or phone number already exists");
    } else {
      toast.error("Signup failed. Please try again.");
    }
  } finally {
    console.log("API call finished.");
  }
};

export default SignUpAdmin;
