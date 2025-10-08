// CartContext.tsx
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
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
  addToCart: (product: CartItem["product"], quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  updateCart: (updatedItems: CartItem[]) => void;
  totalItems: number;
  totalPrice: number;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const apiClient = useMemo(() => createApiClient(token || undefined), [token]);

  const setCartItemsSafe = (items: any) => {
    setCartItems(Array.isArray(items) ? items : []);
  };

  const loadCart = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await apiClient.get(ENDPOINTS.GET_CART);
      setCartItemsSafe(response.data?.cart);
    } catch (error) {
      setCartItemsSafe([]);
    } finally {
      setLoading(false);
    }
  }, [token, apiClient]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

 

  const addToCart = async (product: CartItem["product"], quantity: number) => {
    setLoading(true);
    const prevCart = [...cartItems];

    // optimistic update
    const existingItem = cartItems.find(item => item.productId === product._id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cartItems.map(item =>
        item.productId === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...cartItems, { productId: product._id, quantity, product }];
    }
    setCartItemsSafe(updatedCart);

    try {
      const response = await apiClient.post(ENDPOINTS.ADD_TO_CART, { productId: product._id, quantity });
      setCartItemsSafe(response.data?.cart);
    } catch (error) {
      setCartItemsSafe(prevCart); // rollback
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    setLoading(true);
    const prevCart = [...cartItems];

    const updatedCart = cartItems.filter(item => item.productId !== productId);
    setCartItemsSafe(updatedCart);

    try {
      const response = await apiClient.delete(ENDPOINTS.REMOVE_FROM_CART, { data: { productId } });
      setCartItemsSafe(response.data?.cart);
    } catch (error) {
      setCartItemsSafe(prevCart); // rollback
    } finally {
      setLoading(false);
    }
  };

 const updateQuantity = async (productId: string, quantity: number) => {
  setLoading(true);
  const prevCart = [...cartItems];

  // optimistic update
  const updatedCart = cartItems.map(item =>
    item.productId === productId ? { ...item, quantity } : item
  );
  setCartItemsSafe(updatedCart);

  try {
    const response = await apiClient.put(ENDPOINTS.UPDATE_CART_ITEM, { productId, quantity });

    if (response.data?.cart && Array.isArray(response.data.cart)) {
      setCartItemsSafe(response.data.cart);
    } else {
      // fallback: keep optimistic cart
      setCartItemsSafe(updatedCart);
    }
  } catch (error) {
    setCartItemsSafe(prevCart); // rollback
  } finally {
    setLoading(false);
  }
};

  const clearCart = async () => {
    setLoading(true);
    const prevCart = [...cartItems];

    // optimistic update
    setCartItemsSafe([]);

    try {
      const response = await apiClient.delete(ENDPOINTS.CLEAR_CART);
      setCartItemsSafe(response.data?.cart);
    } catch (error) {
      setCartItemsSafe(prevCart); // rollback
    } finally {
      setLoading(false);
    }
  };


  const updateCart = (updatedItems: CartItem[]) => {
    setCartItemsSafe(updatedItems);
  };

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  const value: CartContextType = {
    cartItems: safeCartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    updateCart,
    totalItems: safeCartItems.reduce((total, item) => total + item.quantity, 0),
    totalPrice: safeCartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0),
    loading,
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
