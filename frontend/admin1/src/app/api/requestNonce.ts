import axios from "axios";
import toast from "react-hot-toast";

const requestNonce = async (walletAddress: string) => {
  try {
    // Send the wallet address to your backend to get a nonce
    const response = await axios.post(
      "http://localhost:8000/auth/admin/get-nonce", // Adjust the endpoint accordingly
      { walletAddress }
    );
    
    // Return the nonce from the response
    return response.data.nonce;
    
  } catch (error) {
    toast.error("Failed to get nonce");
    throw error;
  }
};

export default requestNonce;
