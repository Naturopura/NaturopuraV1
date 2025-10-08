import React, { createContext, useContext, useState, useEffect } from 'react';
import { createApiClient, ENDPOINTS } from '../config/api';
import { useAuth } from './AuthContext';

interface CartItem {
  productId: string;
  quantity: number;
  product: {
    _id: string;
    name: string;
    price: number;
    unit: string;
  };
  shippingAddress?: {
    _id: string;
    name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  updateCart: (updatedItems: CartItem[]) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { token } = useAuth();
  const apiClient = React.useMemo(() => createApiClient(token || undefined), [token]);


  const loadCart = React.useCallback(async () => {
    if (!token) return;
    try {
      const response = await apiClient.get(ENDPOINTS.GET_CART);
      if (response.data.success && response.data.cart) {
        setCartItems(response.data.cart);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }, [token, apiClient]);

  // Load cart from database when component mounts
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = async (product: any, quantity: number) => {
    const existingItem = cartItems.find(item => item.productId === product._id);
    
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      await updateQuantity(product._id, newQuantity);
    } else {
      const response = await apiClient.post(ENDPOINTS.ADD_TO_CART, { product, quantity });
      if (response.data.success) {
        setCartItems(response.data.cart);
      }
    }
  };

  const removeFromCart = async (productId: string) => {
    const response = await apiClient.delete(ENDPOINTS.REMOVE_FROM_CART, { data: { productId } });
    if (response.data.success) {
      setCartItems(response.data.cart);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    const response = await apiClient.put(ENDPOINTS.UPDATE_CART_ITEM, { productId, quantity });
    if (response.data.success) {
      setCartItems(response.data.cart);
    }
  };

  const clearCart = async () => {
    const response = await apiClient.delete(ENDPOINTS.CLEAR_CART);
    if (response.data.success) {
      setCartItems([]);
    }
  };

  const updateCart = (updatedItems: CartItem[]) => {
    setCartItems(updatedItems);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    updateCart,
    totalItems: cartItems.reduce((total, item) => total + item.quantity, 0),
    totalPrice: cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0),
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
