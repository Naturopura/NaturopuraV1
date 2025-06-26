import { useState, useEffect, ReactNode } from 'react';
import { useToast } from '../ui/use-toast';
import { ethers } from 'ethers';
import { useAccount, useSwitchChain } from 'wagmi';
import { createApiClient, ENDPOINTS, API_BASE_URL } from '../../config/api';
import contractABI from '../../constants/contractABI';
import SUPPORTED_CURRENCIES from '../../constants/currencies';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Loader2, Wallet, Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import FarmerLayout from '../layouts/FarmerLayout';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface ShippingAddress {
	name: string;
	phone: string;
	street: string;
	city: string;
	state: string;
	pincode: string;
}

interface MetaMaskPaymentFormProps {
	productId: string;
	onSuccess: () => void;
	shippingAddress: ShippingAddress;
	children?: ReactNode;
	disabled?: boolean;
}

const MetaMaskPaymentForm = ({
	productId,
	onSuccess,
	shippingAddress,
	children,
	disabled = false,
}: MetaMaskPaymentFormProps) => {
	const [isProcessing, setIsProcessing] = useState(false);
	const [productPrice, setProductPrice] = useState<string | null>(null);
	const [productData, setProductData] = useState<any>(null);

	// NEW: Use objects for selected currency and network
	const [selectedCurrency, setSelectedCurrency] = useState(() => SUPPORTED_CURRENCIES[0]);
	const [selectedNetwork, setSelectedNetwork] = useState(() => SUPPORTED_CURRENCIES[0].networks[0]);
	const [convertedPrice, setConvertedPrice] = useState<string | null>(null);
	const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
	const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
	const { toast } = useToast();
	const { address: account, isConnected } = useAccount();

	// Fetch product price in INR
	useEffect(() => {
		const fetchPrice = async () => {
			try {
				const token = localStorage.getItem('token') || '';
				const response = await fetch(`${API_BASE_URL}${ENDPOINTS.GET_PRODUCT(productId)}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				if (!response.ok) throw new Error('Failed to fetch product price from backend');
				const product = await response.json();
				if (!product.price) throw new Error('Product price not found');
				setProductPrice(product.price.toString());
				setProductData(product);
			} catch (error: unknown) {
				const errMsg = error instanceof Error ? error.message : "Failed to fetch product price from backend.";
				toast({ title: "Error fetching price", description: errMsg, variant: "destructive" });
				setProductPrice("100");
				setProductData({ name: "Sample Product", price: 100 });
			}
		};
		fetchPrice();
	}, [productId, toast]);

	// Fetch conversion rate and calculate crypto price
	useEffect(() => {
		const fetchConversion = async () => {
			if (!productPrice) return;
			if (!selectedCurrency.coingeckoId) return;
			try {
				const res = await fetch(
					`https://api.coingecko.com/api/v3/simple/price?ids=${selectedCurrency.coingeckoId}&vs_currencies=inr`
				);
				const data = await res.json();
				const rate = data[selectedCurrency.coingeckoId]?.inr;
				if (!rate) throw new Error('Conversion rate not found');
				const cryptoAmount = (parseFloat(productPrice) / rate).toFixed(6);
				setConvertedPrice(cryptoAmount);
			} catch (error) {
				setConvertedPrice(null);
				toast({
					title: "Conversion Error",
					description: "Could not fetch conversion rate.",
					variant: "destructive",
				});
			}
		};
		fetchConversion();
	}, [productPrice, selectedCurrency, selectedNetwork, toast]);

	// Switch network in MetaMask
	const { switchChain } = useSwitchChain();

	const switchNetwork = async (chainId: string) => {
		if (!switchChain) throw new Error("Switch chain function not available");
		const parsedChainId = parseInt(chainId, 16);
		await switchChain({ chainId: parsedChainId });
	};

	const handlePayment = async () => {
		if (!isConnected || !account) {
			toast({ title: "Wallet Not Connected", description: "Connect your wallet to proceed with the payment.", variant: "destructive" });
			return;
		}
		if (!shippingAddress || !shippingAddress.pincode || String(shippingAddress.pincode).trim() === "") {
			toast({ title: "Shipping Address Required", description: "Please enter your full shipping address.", variant: "destructive" });
			return;
		}
		if (!convertedPrice) {
			toast({ title: "Price Not Available", description: "Product price is not available. Please try again later.", variant: "destructive" });
			return;
		}
		if (!selectedNetwork.contractAddress) {
			toast({ title: "Network Error", description: "No contract address for selected network.", variant: "destructive" });
			return;
		}

		setIsProcessing(true);
		try {
			await switchNetwork("0x" + parseInt(selectedNetwork.chainId).toString(16));

			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new ethers.Contract(selectedNetwork.contractAddress, contractABI, signer);

			const priceWei = ethers.parseEther(convertedPrice.toString());

			const tx = await contract.purchaseProduct(productId, { value: priceWei });
			const txHash = tx.hash;
			await tx.wait();

			const token = localStorage.getItem('token');
			if (!token) throw new Error('No authentication token found');
			const apiClient = createApiClient(token);
			await apiClient.post(ENDPOINTS.PROCESS_CRYPTO_PURCHASE, {
				productId,
				amount: Number(convertedPrice),
				txHash,
				paymentMethod: selectedCurrency.symbol,
				address: shippingAddress.street,
				pincode: parseInt(shippingAddress.pincode),
				shippingAddress,
			});

			toast({ title: "Payment Successful!", description: "Your purchase has been confirmed." });
			onSuccess();
		} catch (error: unknown) {
			const errMsg = error instanceof Error ? error.message : "An unknown error occurred.";
			toast({ title: "Payment Failed", description: errMsg, variant: "destructive" });
		} finally {
			setIsProcessing(false);
		}
	};

	// Dropdown helpers
	const handleCurrencySelect = (symbol: string) => {
		const currency = SUPPORTED_CURRENCIES.find(c => c.symbol === symbol);
		if (currency) {
			setSelectedCurrency(currency);
			setSelectedNetwork(currency.networks[0]);
		}
		setShowCurrencyDropdown(false);
	};
	const handleNetworkSelect = (networkName: string) => {
		const network = selectedCurrency.networks.find(n => n.name === networkName);
		if (network) setSelectedNetwork(network);
		setShowNetworkDropdown(false);
	};

	return (
		<FarmerLayout title="Secure Payment" subtitle="Complete your purchase with MetaMask">
			<div className="space-y-6">
				<div className="flex justify-between items-center mb-6">
					<ConnectButton/>
					</div>
				{/* Currency and Network Selector */}
				<div className="flex flex-col sm:flex-row gap-4 mb-4">
					{/* Currency Dropdown */}
					<div className="flex-1">
						<div className="p-4 bg-green-50 border border-green-200 rounded-xl shadow-sm">
							<label className="font-semibold text-green-800 mb-1 block flex items-center gap-2">
								💱 Currency
							</label>
							<div className="relative">
								<button
									type="button"
									className="w-full flex items-center justify-between px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200"
									onClick={() => setShowCurrencyDropdown(v => !v)}
								>
									<span className="font-semibold">{selectedCurrency.symbol}</span>
									<svg className="w-4 h-4 ml-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
								</button>
								{showCurrencyDropdown && (
									<div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-2">
										{SUPPORTED_CURRENCIES.map(currency => (
											<button
												key={currency.symbol}
												type="button"
												className="w-full text-left px-4 py-2 hover:bg-green-50 text-gray-800 font-semibold"
												onClick={() => handleCurrencySelect(currency.symbol)}
											>
												{currency.symbol}
											</button>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
					{/* Network Dropdown */}
					<div className="flex-1">
						<div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl shadow-sm">
							<label className="font-semibold text-yellow-800 mb-1 block flex items-center gap-2">
								🌐 Network
							</label>
							<div className="relative">
								<button
									type="button"
									className="w-full flex items-center justify-between px-4 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-200"
									onClick={() => setShowNetworkDropdown(v => !v)}
								>
									<span className="font-semibold">{selectedNetwork.name}</span>
									<svg className="w-4 h-4 ml-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
									</svg>
								</button>
								{showNetworkDropdown && (
									<div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-2">
										{selectedCurrency.networks
											.filter(network => network.contractAddress)
											.map(network => (
												<button
													key={network.name}
													type="button"
													className="w-full text-left px-4 py-2 hover:bg-yellow-50 text-gray-800 font-semibold"
													onClick={() => handleNetworkSelect(network.name)}
												>
													{network.name}
												</button>
											))}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Payment Summary Card */}
				<Card className="shadow-lg border-0 bg-white">
					<CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
						<CardTitle className="flex items-center space-x-2 text-gray-800">
							<Wallet className="h-5 w-5 text-blue-600" />
							<span>Payment Summary</span>
						</CardTitle>
					</CardHeader>
					<CardContent className="p-6">
						<div className="space-y-4">
							<div className="flex justify-between items-center py-2 border-b border-gray-100">
								<span className="text-gray-600">Product</span>
								<span className="font-medium text-gray-900">
									{productData?.name || `Product ${productId}`}
								</span>
							</div>
							<div className="flex justify-between items-center py-2 border-b border-gray-100">
								<span className="text-gray-600">Price</span>
								<div className="flex flex-col items-end">
									<span className="font-bold text-xl text-blue-600">
										{convertedPrice ? `${convertedPrice} ${selectedCurrency.symbol}` : 'Loading...'}
									</span>
									<span className="text-sm text-gray-500">
										{productPrice ? `₹${productPrice} INR` : ''}
									</span>
								</div>
							</div>
							<div className="flex justify-between items-center py-2">
								<span className="text-gray-600">Network</span>
								<span className="font-medium text-gray-900">
{selectedNetwork.name}
								</span>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Shipping Address Card */}
				<Card className="shadow-lg border-0 bg-white">
					<CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
						<CardTitle className="flex items-center space-x-2 text-gray-800">
							<Shield className="h-5 w-5 text-purple-600" />
							<span>Shipping Address</span>
						</CardTitle>
					</CardHeader>
					<CardContent className="p-6">
						<div className="space-y-2 text-sm">
							<div className="font-medium text-gray-900">{shippingAddress.name}</div>
							<div className="text-gray-600">{shippingAddress.phone}</div>
							<div className="text-gray-600">{shippingAddress.street}</div>
							<div className="text-gray-600">
								{shippingAddress.city}, {shippingAddress.state} {shippingAddress.pincode}
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Payment Method Card */}
				<Card className="shadow-lg border-0 bg-white">
					<CardContent className="p-6">
						<div className="space-y-4">
							{/* Security Features */}
							<div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
								<CheckCircle className="h-5 w-5 text-green-600" />
								<div>
									<p className="text-sm font-medium text-green-800">Secure Payment</p>
									<p className="text-xs text-green-600">Your transaction is secured by blockchain technology</p>
								</div>
							</div>

							{/* Wallet Connection Status */}
							{!isConnected && (
								<div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
									<AlertTriangle className="h-5 w-5 text-orange-600" />
									<div>
										<p className="text-sm font-medium text-orange-800">Wallet Required</p>
										<p className="text-xs text-orange-600">Please connect your MetaMask wallet to continue</p>
									</div>
								</div>
							)}

							{children}

							{/* Payment Button */}
							<Button
								onClick={handlePayment}
								disabled={disabled || isProcessing || !convertedPrice || !isConnected}
								className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
							>
								{isProcessing ? (
									<div className="flex items-center space-x-2">
										<Loader2 className="h-5 w-5 animate-spin" />
										<span>Processing Payment...</span>
									</div>
								) : (
									<div className="flex items-center space-x-2">
										<Wallet className="h-5 w-5" />
										<span>
											{convertedPrice ? `Pay ${convertedPrice} ${selectedCurrency.symbol} with MetaMask` : 'Loading...'}
										</span>
									</div>
								)}
							</Button>

							{/* Payment Info */}
							<div className="text-center space-y-2">
								<p className="text-xs text-gray-500">
									By clicking "Pay", you agree to our terms and conditions
								</p>
								<div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
									<span>🔒 SSL Secured</span>
									<span>⚡ Instant Transaction</span>
									<span>🛡️ Blockchain Protected</span>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</FarmerLayout>
	);
};

export default MetaMaskPaymentForm;