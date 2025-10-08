import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetail from '../components/marketplace/ProductDetails';
import { useAuth } from '../context/AuthContext';

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClose = () => {
    navigate(-1);
  };

  if (!productId) {
    return <div>Product ID is missing.</div>;
  }

  // Fix TS error: user._id may not exist, use user.id or user?.id or user?._id depending on user type
  const currentUserId = (user as any)?._id || '';

  return (
    <ProductDetail
      productId={productId}
      onClose={handleClose}
      currentUserId={currentUserId}
      onPurchase={async (id: string) => {
        // Implement purchase logic if needed
        console.log('Purchase product:', id);
      }}
    />
  );
};

export default ProductPage;
