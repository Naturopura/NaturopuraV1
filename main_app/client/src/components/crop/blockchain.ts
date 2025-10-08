import { ethers } from "ethers";
import CONTRACT_ABI from "../../constants/CropHealthRecords.json";
import { CONTRACT_ADDRESSES } from "../../constants/crop_health_addrs";
import { DetectionResultFromContract } from "./types";

// Setup ethers provider and contract instance
export const getContract = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESSES, CONTRACT_ABI, signer);
  return contract;
};

// Function to fetch detection results from blockchain contract
export const fetchBlockchainResults = async (): Promise<DetectionResultFromContract[]> => {
  const contract = await getContract();
  const results: DetectionResultFromContract[] = await contract.getMyDetectionResults();
  return results;
};

// Function to store detection result on blockchain contract
export const storeDetectionResultOnChain = async (
  plantName: string,
  issueType: string,
  issueName: string,
  symptomsOrDamage: string,
  treatmentOrControl: string[],
  causesOrBiology: string[]
): Promise<void> => {
  const contract = await getContract();
  const tx = await contract.storeDetectionResult(
    plantName,
    issueType,
    issueName,
    symptomsOrDamage,
    treatmentOrControl,
    causesOrBiology,
    new Date().toISOString()
  );
  await tx.wait();
};
