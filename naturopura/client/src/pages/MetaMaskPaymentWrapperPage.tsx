import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MetaMaskPaymentForm from '../components/payment/MetaMaskPaymentForm';
import AddressForm from '../components/payment/AddressForm';
import { useToast } from '../components/ui/use-toast';
import { Card, CardContent } from '../components/ui/card';
import { CheckCircle, ArrowRight, Package } from 'lucide-react';
import FarmerLayout from '../components/layouts/FarmerLayout';
import { Address } from '../types/address';


const MetaMaskPaymentWrapperPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
 
 

  // Get productId and initial address from navigation state
  const { productId, address: initialAddress } = location.state || {};

  const [address, setAddress] = useState<Address | null>(null);
  const [currentStep, setCurrentStep] = useState<'address' | 'payment'>('address');

  // Redirect if productId is missing
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

  // If productId is missing, render nothing
  if (!productId) {
    return null;
  }

  // Handle back navigation
  const handleBack = () => {
    if (currentStep === 'payment' && !initialAddress) {
      setCurrentStep('address');
    } else {
      navigate(-1);
    }
  };

  // If initialAddress is present, go directly to payment step
  useEffect(() => {
    if (initialAddress) {
      setAddress(initialAddress);
      setCurrentStep('payment');
    }
  }, [initialAddress]);

  // When address is submitted from AddressForm
  const handleAddressSubmit = (address: Address) => {
    setAddress(address);
    localStorage.setItem('lastUsedAddress', JSON.stringify(address));
    setCurrentStep('payment');
    toast({
      title: 'Success',
      description: 'Address saved successfully'
    });
  };

  // When payment is successful
  const handlePaymentSuccess = () => {
    toast({
      title: "Success",
      description: "Purchase completed successfully!",
    });
    navigate(-1);
  };

  return (
    <FarmerLayout 
      title="Checkout Process" 
      subtitle="Complete your purchase in simple steps"
    >
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Checkout Process</h2>
          <button
            onClick={handleBack}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Back
          </button>
        </div>

        {/* Progress Indicator */}
        <Card className="shadow-lg border-0 bg-white">
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
              
              <ArrowRight className="h-5 w-5 text-gray-300" />
              
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

        {/* Step Content */}
        {currentStep === 'address' ? (
          <AddressForm 
            onSubmit={handleAddressSubmit} 
            onCancel={() => navigate(-1)} 
          />
        ) : address ? (
          <MetaMaskPaymentForm
            productId={productId}
            onSuccess={handlePaymentSuccess}
            shippingAddress={address}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-500">Please provide a shipping address first</p>
          </div>
        )}
      </div>
    </FarmerLayout>
  );
};

export default MetaMaskPaymentWrapperPage;