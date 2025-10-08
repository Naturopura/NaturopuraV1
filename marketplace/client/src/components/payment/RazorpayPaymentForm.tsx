import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadRazorpay } from '../../utils/loadRazorpay';
import { createApiClient } from '../../config/api';

interface Address {
  _id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  shippingAddress?: boolean;
}

interface RazorpayPaymentFormProps {
  productId: string;
  quantity: number;
  totalAmount: number;
  onSuccess: () => void;
  shippingAddress: Address;
}

const RazorpayPaymentForm: React.FC<RazorpayPaymentFormProps> = ({ 
  productId, 
  quantity, 
  totalAmount, 
  onSuccess, 
  shippingAddress 
}) => {
  const navigate = useNavigate();
  const apiClient = createApiClient(localStorage.getItem('token') || undefined);

  const [loading, setLoading] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  useEffect(() => {
    if (!shippingAddress || !shippingAddress._id) {
      console.error('Shipping address is invalid:', { shippingAddress });
      navigate('/farmer/marketplace/address-selection', { 
        replace: true,
        state: { productId }
      });
      return;
    }
    
    const initiatePayment = async () => {
      setLoading(true);

      const isRazorpayLoaded = await loadRazorpay();
      if (!isRazorpayLoaded) {
        alert("Razorpay SDK failed to load. Are you online?");
        setLoading(false);
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        };

        // Create order
        console.log('Creating Razorpay order with payload:', {
          productId: productId,
          amount: totalAmount,
          shippingAddress: shippingAddress,
        });
        
        const createOrderResponse = await apiClient.post(
          '/payments/razorpay/order',
          {
            productId: productId,
            amount: totalAmount,
            shippingAddress: shippingAddress,
          },
          config
        );

        if (!createOrderResponse.data.success) {
          throw new Error(createOrderResponse.data.message || 'Failed to create Razorpay order');
        }

        const { order, purchaseId } = createOrderResponse.data.data;

        // Initialize Razorpay options
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: 'Farm Marketplace',
          description: `Purchase of ${quantity} item(s)`,
          order_id: order.id,
          handler: async function (response: any) {
            try {
              // Verify payment
              const verifyResponse = await apiClient.post(
                '/payments/razorpay/verify',
                {
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                  purchaseId: purchaseId,
                },
                config
              );

              if (!verifyResponse.data.success) {
                throw new Error(verifyResponse.data.message || 'Payment verification failed');
              }

              navigate('/orders/success');
            } catch (error) {
              console.error('Payment verification error:', error);
              alert('Payment verification failed. Please try again.');
              setLoading(false);
            }
          },
          theme: { color: '#10B981' },
          modal: {
            ondismiss: function () {
              navigate(-1);
            },
          },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      } catch (error) {
        alert('Error initiating payment');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (shippingAddress && !paymentInitiated) {
      setPaymentInitiated(true);
      initiatePayment();
    }
  }, [productId, totalAmount, quantity, shippingAddress, navigate, paymentInitiated, onSuccess]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">Redirecting to Razorpay...</p>
      </div>
    );
  }

  return null;
};

export default RazorpayPaymentForm;
