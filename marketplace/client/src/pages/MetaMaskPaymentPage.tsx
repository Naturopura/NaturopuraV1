import { useLocation, useNavigate } from 'react-router-dom';
import MetaMaskPaymentForm from '../components/payment/MetaMaskPaymentForm';
import { useToast } from '../components/ui/use-toast';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { CreditCard } from 'lucide-react';

const MetaMaskPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { productId, address } = location.state || {};

  if (!productId || !address) {
    toast({
      title: "Missing Data",
      description: "Product or address information is missing.",
      variant: "destructive",
    });
    navigate(-1);
    return null;
  }

  const handleSuccess = () => {
    toast({
      title: "Success",
      description: "Purchase completed successfully!",
    });
    navigate(-1);
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Wallet Connection Card - Consistent Width */}
          <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-gray-800">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <span>Wallet Connection</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Connect your MetaMask wallet to proceed with the secure payment
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>🔒 Secure</span>
                    <span>⚡ Fast</span>
                    <span>🌐 Decentralized</span>
                  </div>
                </div>
                <ConnectButton />
              </div>
            </CardContent>
          </Card>

          {/* Payment Form - Consistent Width */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl overflow-hidden">
            <MetaMaskPaymentForm
              productId={productId}
              onSuccess={handleSuccess}
              shippingAddress={address}
            />
          </div>
        </div>
      </div>
    
  );
};

export default MetaMaskPaymentPage;