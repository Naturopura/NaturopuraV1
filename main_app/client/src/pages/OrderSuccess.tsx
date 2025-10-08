// pages/OrderSuccess.tsx
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <CheckCircle className="text-green-500 w-20 h-20 mb-6" />
      <h1 className="text-3xl font-bold text-green-700 mb-2">Payment Successful</h1>
      <p className="text-gray-600 mb-6">Thank you for your purchase! Your order has been placed.</p>
      <Button onClick={() => navigate('/farmer/marketplace/buy-sell')}>Go to Marketplace</Button>
    </div>
  );
};

export default OrderSuccess;
