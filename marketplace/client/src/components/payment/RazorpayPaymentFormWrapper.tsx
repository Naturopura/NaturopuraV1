import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '../../components/ui/use-toast';
import RazorpayPaymentForm from './RazorpayPaymentForm';
import type { Address } from "../../types/address";

interface RazorpayPaymentFormWrapperProps {
  onSuccess: () => void;
  shippingAddress?: Address | null;
  product?: any; // Accept full product object instead of just productId
  quantity?: number;
  totalAmount?: number;
}

const RazorpayPaymentFormWrapper: React.FC<RazorpayPaymentFormWrapperProps> = ({ onSuccess, shippingAddress: propShippingAddress, product: propProduct, quantity: propQuantity, totalAmount: propTotalAmount }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();

  // Initialize state, prioritizing props then location.state
  const [selectedProduct] = useState<any>(propProduct || location.state?.product || null);
  const [shippingAddress] = useState<Address | null>(propShippingAddress ?? location.state?.address ?? null);

  useEffect(() => {
    console.log('RazorpayPaymentFormWrapper - selectedProduct:', selectedProduct);
    console.log('RazorpayPaymentFormWrapper - shippingAddress:', shippingAddress);

  

    if (shippingAddress === null) {
      navigate('/farmer/marketplace/address-selection', { 
        replace: true,
        state: { productId: selectedProduct?.productId }
      });
      return;
    }

    // Validate the address fields
    const requiredAddressFields: Array<keyof Address> = ['_id', 'name', 'phone', 'street', 'city', 'state', 'country', 'pincode'];
    const hasAllFields = requiredAddressFields.every(field => {
      return shippingAddress[field] !== undefined && shippingAddress[field] !== null && String(shippingAddress[field]).trim() !== '';
    });
    
    if (!hasAllFields) {
      console.error('Invalid address: Missing required fields', shippingAddress);
      toast({
        title: "Invalid Address",
        description: "Please ensure all address fields are filled out correctly.",
        variant: "destructive"
      });
      navigate('/farmer/marketplace/address-selection', { 
        replace: true,
        state: { productId: selectedProduct?.productId }
      });
      return;
    }

    // Validate phone number format
    const phoneRegex = /^0?[6-9]\d{9}$/;
    if (!phoneRegex.test(shippingAddress.phone)) {
      console.error('Invalid phone number:', shippingAddress.phone);
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number starting with 6-9, optionally prefixed with 0.",
        variant: "destructive"
      });
      navigate('/farmer/marketplace/address-selection', { 
        replace: true,
        state: { productId: selectedProduct?.productId }
      });
      return;
    }

    // Validate pincode format
    const pincodeRegex = /^[1-9]\d{5}$/;
    if (!pincodeRegex.test(shippingAddress.pincode)) {
      console.error('Invalid pincode:', shippingAddress.pincode);
      toast({
        title: "Invalid Pincode",
        description: "Please enter a valid 6-digit pincode.",
        variant: "destructive"
      });
      navigate('/farmer/marketplace/address-selection', { 
        replace: true,
        state: { productId: selectedProduct?.productId }
      });
      return;
    }
  }, [selectedProduct, shippingAddress, navigate, toast]);

  if (selectedProduct && shippingAddress !== null) {
    return (
      <RazorpayPaymentForm
        onSuccess={onSuccess}
        shippingAddress={shippingAddress}
        productId={selectedProduct._id || selectedProduct.productId}
        quantity={propQuantity || 1}
        totalAmount={propTotalAmount || selectedProduct.price}
      />
    );
  }

  return null;
};

export default RazorpayPaymentFormWrapper;
