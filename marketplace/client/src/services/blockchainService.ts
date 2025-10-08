import { ethers } from "ethers";
import SoilDataStorageABI from "../constants/SoilDataStorage.json";
import { CONTRACT_ADDRESSES } from "../constants/soil_addrs";
import { BlockchainSoilData } from "../types/soil";

interface StoreSoilDataParams {
  ph: number;
  organicCarbon: number;
  clayContent: number;
  latitude: string;
  longitude: string;
}

export const storeSoilDataOnChain = async ({
  ph,
  organicCarbon,
  clayContent,
  latitude,
  longitude,
}: StoreSoilDataParams): Promise<boolean> => {
  try {
    if (!window.ethereum) {
      throw new Error("Ethereum provider not found. Please install MetaMask.");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESSES,
      SoilDataStorageABI,
      signer
    );

    const location = `Lat: ${latitude}, Lon: ${longitude}`;

    const tx = await contract.storeSoilData(
      await signer.getAddress(),
      location,
      Math.round(ph * 10), // Convert to integer
      Math.round(organicCarbon * 10),
      Math.round(clayContent * 10)
    );

    await tx.wait();
    console.log("✅ Soil data stored on blockchain");
    return true;
  } catch (error) {
    console.error("❌ Error storing soil data:", error);
    throw error;
  }
};

export const getMySoilDataFromChain = async (): Promise<
  BlockchainSoilData[]
> => {
  try {
    if (!window.ethereum) {
      throw new Error("Ethereum provider not found. Please install MetaMask.");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESSES,
      SoilDataStorageABI,
      signer
    );

    const data = await contract.getMySoilData();
    console.log("Raw fetched soil data from chain:", data);

    // Handle BigInts/BigNumbers correctly as ethers v6 returns BigInt
    return data.map((entry: any) => ({
      location: entry.location,
      ph: Number(entry.ph) / 10,
      organicCarbon: Number(entry.organicCarbon) / 10,
      clayContent: Number(entry.clayContent) / 10,
      timestamp: new Date(Number(entry.timestamp) * 1000),
    }));
  } catch (error) {
    console.error("❌ Error fetching soil data:", error);
    return [];
  }
};
