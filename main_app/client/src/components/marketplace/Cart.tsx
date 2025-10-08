import React, { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, Eye, Package2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import ProductDetail from './ProductDetails';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { user } = useAuth();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
  };

  const handleCloseProductDetail = () => {
    setSelectedProductId(null);
  };

  const handlePurchase = async (productId: string) => {
    // Simulate purchase logic here
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log("Purchase simulated for product ID:", productId);
    
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-4xl mx-auto p-6">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-6 mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-full">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
                  <p className="text-gray-600">{totalItems} {totalItems === 1 ? 'item' : 'items'} selected</p>
                </div>
              </div>
              
              {cartItems.length > 0 && (
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-emerald-600">₹{totalPrice.toFixed(2)}</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Cart Content */}
          {cartItems.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center"
            >
              <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Package2 className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
              <Link to="/marketplace/buy-sell" className="inline-block">
                <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-3 rounded-full">
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Cart Items */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.productId}
                      variants={itemVariants}
                      layout
                      exit={{ opacity: 0, x: -100 }}
                      className="group"
                    >
                      <Card className="bg-white border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-6">
                            {/* Product Image Placeholder */}
                            <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Package2 className="h-8 w-8 text-emerald-600" />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 
                                    className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-emerald-600 transition-colors duration-200 flex items-center gap-2"
                                    onClick={() => handleProductClick(item.productId)}
                                  >
                                    {item.product.name}
                                    <Eye className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </h3>
                                  <p className="text-sm text-gray-600 mt-1">
                                    ₹{item.product.price} per {item.product.unit}
                                  </p>
                                  <p className="text-lg font-bold text-emerald-700 mt-2">
                                    ₹{(item.product.price * item.quantity).toFixed(2)}
                                  </p>
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center gap-3 bg-gray-50 rounded-full p-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="h-8 w-8 rounded-full hover:bg-emerald-100 hover:text-emerald-700"
                                    onClick={() => updateQuantity(item.productId, item.quantity - 1)} 
                                    disabled={item.quantity <= 1}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  
                                  <span className="text-sm font-semibold min-w-[2rem] text-center">
                                    {item.quantity}
                                  </span>
                                  
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="h-8 w-8 rounded-full hover:bg-emerald-100 hover:text-emerald-700"
                                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>

                                {/* Remove Button */}
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="h-8 w-8 rounded-full hover:bg-red-100 hover:text-red-600 ml-3"
                                  onClick={() => removeFromCart(item.productId)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Cart Summary */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
                    <p className="text-sm text-gray-600">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-600">₹{totalPrice.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={clearCart} 
                    variant="outline" 
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-full py-3"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Cart
                  </Button>
                  
                  <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full py-3 text-lg font-semibold">
                    Proceed to Checkout
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </div>

        {/* Product Detail Modal */}
        {selectedProductId && (
          <ProductDetail
            productId={selectedProductId}
            onClose={handleCloseProductDetail}
            onPurchase={handlePurchase}
            currentUserId={user?.id || ''}
          />
        )}
      </div>
  );
};

export default Cart;