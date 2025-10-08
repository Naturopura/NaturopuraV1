// network.ts
import { ethers } from "ethers";
import FARMER_REGISTRY_ABI from "./farmerDetailContractABI.json"; // adjust the path if needed

export const CHAINS = {
  amoy: {
    chainId: "0x13882", // 80002
    name: "Polygon Amoy",
    rpcUrl: "https://rpc-amoy.polygon.technology",
    currency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    explorer: "https://amoy.polygonscan.com",
    contractAddress: import.meta.env.VITE_POLYGON_FARMER_DETAILS_CONTRACTADDRESS,
  },
  sepolia: {
    chainId: "0xaa36a7", // 11155111
    name: "Ethereum Sepolia",
    rpcUrl: "https://rpc.sepolia.org",
    currency: { name: "ETH", symbol: "ETH", decimals: 18 },
    explorer: "https://sepolia.etherscan.io",
    contractAddress: import.meta.env.VITE_SEPOLIA_FARMER_DETAILS_CONTRACTADDRESS,
  },
};

export const getActiveNetwork = async () => {
  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  return Object.values(CHAINS).find((net) => net.chainId === chainId) || CHAINS.amoy;
};

export const switchToNetwork = async (targetNetwork: keyof typeof CHAINS) => {
  const net = CHAINS[targetNetwork];
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: net.chainId }],
    });
  } catch (error: any) {
    if (error.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: net.chainId,
            chainName: net.name,
            rpcUrls: [net.rpcUrl],
            nativeCurrency: net.currency,
            blockExplorerUrls: [net.explorer],
          },
        ],
      });
    } else {
      throw error;
    }
  }
};

export const getContractInstance = async (targetNetwork: keyof typeof CHAINS) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contractAddress = CHAINS[targetNetwork].contractAddress;
  return new ethers.Contract(contractAddress, FARMER_REGISTRY_ABI, signer);
};
