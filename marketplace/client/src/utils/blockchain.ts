import { ethers } from 'ethers';
import FeedbackContractABI from '../constants/FeedbackContract.json';

const CONTRACT_ADDRESS = '0x9ADa7cA7D830a587D8A3B563c9Ac39e2b2Af9924';

export async function submitToBlockchain(title: string, message: string, category: string, rating: number) {
  try {
    if (!window.ethereum) throw new Error("MetaMask not found");

    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, FeedbackContractABI, signer);

    const tx = await contract.submitFeedback(title, message, category, rating);
    await tx.wait();
    alert("Feedback submitted to blockchain successfully!");
  } catch (error) {
    console.error(error);
    alert("Blockchain submission failed.");
  }
}
