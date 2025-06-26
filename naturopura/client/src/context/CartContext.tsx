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
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
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
      updateQuantity(product._id, existingItem.quantity + quantity);
    } else {
      try {
        const response = await apiClient.post(ENDPOINTS.ADD_TO_CART, {
          productId: product._id,
          quantity
        });
        if (response.data.success) {
          setCartItems(prev => [...prev, {
            productId: product._id,
            quantity,
            product: {
              _id: product._id,
              name: product.name,
              price: product.price,
              unit: product.unit
            }
          }]);
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
      }
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const response = await apiClient.delete(ENDPOINTS.REMOVE_FROM_CART, {
        data: { productId }
      });
      if (response.data.success) {
        setCartItems(prev => prev.filter(item => item.productId !== productId));
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const response = await apiClient.put(ENDPOINTS.UPDATE_CART_ITEM, {
        productId,
        quantity
      });
      if (response.data.success) {
        setCartItems(prev => 
          prev.map(item => 
            item.productId === productId 
              ? { ...item, quantity } 
              : item
          )
        );
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      const response = await apiClient.delete(ENDPOINTS.CLEAR_CART);
      if (response.data.success) {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.quantity * item.product.price), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
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
