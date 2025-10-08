import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MetaMaskPaymentForm from '../components/payment/MetaMaskPaymentForm';
import AddressForm from '../components/payment/AddressForm';
import RazorpayPaymentFormWrapper from '../components/payment/RazorpayPaymentFormWrapper';
import PaymentMethodSelector from '../components/payment/PaymentMethodSelector';
import { useToast } from '../components/ui/use-toast';
import { Card, CardContent } from '../components/ui/card';
import { CheckCircle, ArrowRight, Package, ArrowLeft } from 'lucide-react';
import type { Address } from '../types/address';
import { useAuth } from '../context/AuthContext';
import { createApiClient } from '../config/api';

const MetaMaskPaymentWrapperPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { token } = useAuth();
  const apiClient = createApiClient(token ?? undefined);

  const { productId: initialProductId, address: initialAddress, totalAmount: initialTotalAmount, product: initialProduct } = location.state || {};
  const [address, setAddress] = useState<Address | null>(initialAddress || null);
  const [product, setProduct] = useState<object | null>(initialProduct || null);
  const [productId, setProductId] = useState<string>(initialProductId || '');
  const [totalAmount, setTotalAmount] = useState<number>(initialTotalAmount || 0);
  const [currentStep, setCurrentStep] = useState<'address' | 'payment'>('address');
  // Change selectedPaymentMethod type to match PaymentMethodSelector
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'razorpay' | 'metamask'>('metamask');

  useEffect(() => {
    if (!productId) {
      toast({
        title: "Missing Product",
        description: "Product information is missing.",
        variant: "destructive",
      });
      navigate(-1);
    }
  }, [productId, toast, navigate]);

  useEffect(() => {
    if (!productId) {
      toast({
        title: "Missing Product",
        description: "Product information is missing.",
        variant: "destructive",
      });
      navigate(-1);
    }
  }, [productId, toast, navigate]);


  const handleBack = () => {
    if (currentStep === 'payment' && !initialAddress) {
      setCurrentStep('address');
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    if (initialAddress) {
      setAddress(initialAddress);
      setCurrentStep('payment');
    }
  }, [initialAddress]);

  const handleAddressSelect = async (selectedAddress: Address) => {
    // Ensure all required address fields are present, set default country if missing
    const completeAddress = {
      ...selectedAddress,
      country: selectedAddress.country || 'India'
    };
    setAddress(completeAddress);
    localStorage.setItem('lastUsedAddress', JSON.stringify(completeAddress));
    if (selectedPaymentMethod === 'razorpay') {
      console.log('Starting product fetch for productId:', productId);
      try {
        console.log('Fetching product details for productId:', productId);
        // Fetch product details by productId
        const response = await apiClient.get(`/products/${productId}`);
        console.log('Product fetch response:', response.data);
        const fetchedProduct = response.data || null;
        if (!fetchedProduct) {
          toast({
            title: 'Error',
            description: 'Product not found for payment.',
            variant: 'destructive'
          });
          return;
        }
        const totalAmount = fetchedProduct.price || 0;
        setProduct(fetchedProduct);
        setTotalAmount(totalAmount);
        setProductId(fetchedProduct._id || productId);
        navigate('/marketplace/razorpay-payment', { state: { product: fetchedProduct, address: completeAddress, totalAmount } });
      } catch (error) {
        console.error('Product fetch error:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch product details for payment.',
          variant: 'destructive'
        });
      }
    }
  };

  const handleAddressSubmit = (address: Address) => {
    setAddress(address);
    localStorage.setItem('lastUsedAddress', JSON.stringify(address));
    if (selectedPaymentMethod === 'metamask') {
      setCurrentStep('payment');
    }
    toast({
      title: 'Success',
      description: 'Address saved successfully'
    });
  };

  const handlePaymentSuccess = () => {
    toast({
      title: "Success",
      description: "Purchase completed successfully!",
    });
    navigate(-1);
  };

  // Map from internal state to PaymentMethodSelector method
  const mapToSelectorMethod = (method: 'razorpay' | 'metamask'): 'razorpay' | 'crypto' => {
    return method === 'metamask' ? 'crypto' : 'razorpay';
  };

  // Map from PaymentMethodSelector method to internal state
  const mapFromSelectorMethod = (method: 'razorpay' | 'crypto'): 'razorpay' | 'metamask' => {
    return method === 'crypto' ? 'metamask' : 'razorpay';
  };

  // Handle method change from PaymentMethodSelector
  const handleMethodChange = (method: 'razorpay' | 'crypto') => {
    setSelectedPaymentMethod(mapFromSelectorMethod(method));
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header Section - Consistent Width */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6">
            <div className="flex justify-between items-center">
              <button
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Checkout Process
              </h2>
              <div className="w-6" /> {/* Spacer for centering */}
            </div>
          </div>

          {/* Progress Indicator - Consistent Width */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep === 'address' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
                  }`}>
                    {currentStep === 'payment' ? <CheckCircle className="h-5 w-5" /> : '1'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Shipping Address</p>
                    <p className="text-sm text-gray-500">Enter delivery details</p>
                  </div>
                </div>
                
                <ArrowRight className="h-6 w-6 text-gray-300" />
                
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep === 'payment' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'
                  }`}>
                    {currentStep === 'payment' ? '2' : <Package className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Payment</p>
                    <p className="text-sm text-gray-500">Secure checkout</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step Content - Consistent Width */}
          <div className="w-full">
            {currentStep === 'address' ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden space-y-6 p-6">
          {/* Add PaymentMethodSelector here to select payment method during address step */}
          <PaymentMethodSelector
            selectedMethod={mapToSelectorMethod(selectedPaymentMethod)}
            onMethodChange={handleMethodChange}
          />
          <AddressForm 
            onSubmit={handleAddressSubmit} 
            onCancel={() => navigate(-1)}
            selectedPaymentMethod={selectedPaymentMethod}
            onPaymentMethodChange={setSelectedPaymentMethod}
            onAddressSelect={handleAddressSelect}
            token={token || undefined}
            apiClient={apiClient}
          />
        </div>
      ) : address ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
                {selectedPaymentMethod === 'metamask' ? (
                  <MetaMaskPaymentForm
                    productId={productId}
                    onSuccess={handlePaymentSuccess}
                    shippingAddress={address}
                  />
                ) : (
                  <RazorpayPaymentFormWrapper
                    product={product}
                    quantity={1}
                    totalAmount={totalAmount}
                    onSuccess={handlePaymentSuccess}
                    shippingAddress={address}
                  />
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl">
                <p className="text-gray-500">Please provide a shipping address first</p>
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default MetaMaskPaymentWrapperPage;
