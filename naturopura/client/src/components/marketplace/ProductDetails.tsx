import React, { useEffect, useState, useCallback } from 'react';
import {
  Loader2, IndianRupee, ImageOff, ShoppingCart, Package, X, Calendar, User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../ui/use-toast';
import { createApiClient, ENDPOINTS, handleApiError } from '../../config/api';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious
} from '../ui/carousel';
import {
  DialogContent, DialogHeader, DialogTitle,
  DialogPortal, DialogOverlay, Dialog
} from "../ui/dialog";
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  category: string;
  images: string[];
  processedImages?: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  farmerId: string | {
    _id: string;
    name: string;
    email: string;
  };
}

interface ProductDetailProps {
  productId: string | null;
  onClose: () => void;
  onPurchase: (productId: string) => Promise<void>;
  currentUserId: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  productId, onClose, onPurchase, currentUserId
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { addToCart, cartItems } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(1);

  const isInCart = product ? cartItems.some(item => item.productId === product._id) : false;

  const getAuthToken = useCallback((): string => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) return storedToken;
    if (!user?.token) {
      onClose();
      toast({ title: "Authentication Error", description: "Please log in again", variant: "destructive" });
      throw new Error('Authentication token not found');
    }
    return user.token;
  }, [user, toast, onClose]);

  const checkImageExists = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  };

  const fetchProductDetails = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const apiClient = createApiClient(token);
      const { data } = await apiClient.get<Product>(ENDPOINTS.GET_PRODUCT(id));
      const processedImages: string[] = [];

      if (data.images?.length) {
        for (const path of data.images) {
          const cleanPath = path.replace(/\/+/g, '/').replace(/^\//, '');
          const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
          const url = path.startsWith('http') ? path : `${baseUrl}/${cleanPath}`;
          if (await checkImageExists(url)) processedImages.push(url);
        }
      }

      setProduct({ ...data, processedImages: processedImages.length ? processedImages : undefined });
    } catch (error) {
      toast({ title: "Error", description: handleApiError(error), variant: "destructive" });
      onClose();
    } finally {
      setLoading(false);
    }
  }, [getAuthToken, toast, onClose]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addToCart(product, cartQuantity);
    toast({ 
      title: 'Added to Cart', 
      description: `${cartQuantity} ${product.unit} of ${product.name} added to cart`, 
      variant: 'default' 
    });
  }, [product, addToCart, toast, cartQuantity]);

  const handlePurchase = useCallback(async () => {
    if (!product) return;
    setIsPurchasing(true);
    try {
      await onPurchase(product._id);
      toast({ title: 'Purchase Successful', description: 'Product purchased successfully', variant: 'default' });
      setIsPurchased(true);
    } catch {
      toast({ title: 'Purchase Failed', description: 'Failed to purchase product', variant: 'destructive' });
    } finally {
      setIsPurchasing(false);
    }
  }, [product, onPurchase, toast]);

  useEffect(() => {
    if (!productId) {
      setError("Product ID is not available");
      return;
    }
    setError(null);
    setIsPurchased(false);
    fetchProductDetails(productId);
  }, [productId]);

  const isOwner = product && currentUserId && (
    (typeof product.farmerId === 'object' && product.farmerId._id === currentUserId) ||
    (typeof product.farmerId === 'string' && product.farmerId === currentUserId)
  );

  const getFarmerName = () => {
    if (!product) return 'Unknown Farmer';
    return typeof product.farmerId === 'object' ? product.farmerId.name : 'Farmer';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderBuyButton = () => {
    if (!product) return null;

    if (isPurchased) {
      return (
        <Button className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full py-3" disabled>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Purchased Successfully
        </Button>
      );
    }

    if (product.quantity <= 0) {
      return (
        <Button className="w-full bg-gray-400 text-white rounded-full py-3" disabled>
          <Package className="h-4 w-4 mr-2" />
          Out of Stock
        </Button>
      );
    }

    if (isOwner) {
      return (
        <Button className="w-full bg-blue-100 text-blue-700 rounded-full py-3" disabled>
          <User className="h-4 w-4 mr-2" />
          This is your product
        </Button>
      );
    }

    return (
      <Button
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full py-3 font-semibold"
        onClick={handlePurchase}
        disabled={isPurchasing}
      >
        {isPurchasing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
            Processing...
          </>
        ) : (
          <>
            <ShoppingCart className="h-4 w-4 mr-2" /> 
            Buy Now - ₹{(product.price * cartQuantity).toFixed(2)}
          </>
        )}
      </Button>
    );
  };

  return (
    <AnimatePresence>
      {productId && (
        <Dialog open={!!productId} onOpenChange={(open) => !open && onClose()}>
          <DialogPortal>
            <DialogOverlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <DialogContent className="fixed left-[50%] top-[50%] max-h-[90vh] w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] rounded-3xl border-0 bg-white p-0 shadow-2xl z-50 overflow-hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                {/* Header */}
                <DialogHeader className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 px-6 py-4 relative">
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-xl font-bold text-white">Product Details</DialogTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="text-white hover:bg-white/20 rounded-full h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-500/20 backdrop-blur-sm"></div>
                </DialogHeader>

                <div className="max-h-[calc(90vh-5rem)] overflow-y-auto">
                  {loading ? (
                    <div className="flex justify-center items-center h-96">
                      <div className="text-center">
                        <Loader2 className="h-12 w-12 animate-spin text-emerald-600 mx-auto mb-4" />
                        <p className="text-gray-600">Loading product details...</p>
                      </div>
                    </div>
                  ) : error ? (
                    <div className="p-8 text-center">
                      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                        <p className="text-red-700 font-medium">{error}</p>
                      </div>
                    </div>
                  ) : product ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      {/* Left - Images */}
                      <div className="px-6 py-4 bg-gradient-to-br from-gray-50 to-gray-100 border-r border-gray-200">
                        {product.processedImages?.length ? (
                          <Carousel className="rounded-2xl overflow-hidden shadow-lg">
                            <CarouselContent>
                              {product.processedImages.map((image, index) => (
                                <CarouselItem key={index}>
                                  <div className="aspect-square relative overflow-hidden">
                                    <img
                                      src={image}
                                      alt={`${product.name} ${index + 1}`}
                                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                      onError={(e) => ((e.target as HTMLImageElement).src = '/placeholder.jpg')}
                                    />
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            {product.processedImages.length > 1 && (
                              <div className="flex justify-center gap-2 mt-4">
                                <CarouselPrevious className="relative translate-y-0 left-0" />
                                <CarouselNext className="relative translate-y-0 right-0" />
                              </div>
                            )}
                          </Carousel>
                        ) : (
                          <div className="aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex flex-col items-center justify-center shadow-inner">
                            <ImageOff className="h-16 w-16 text-emerald-400 mb-4" />
                            <span className="text-emerald-600 font-medium">No image available</span>
                          </div>
                        )}
                      </div>

                      {/* Right - Product Info */}
                      <div className="p-6 space-y-6">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          {/* Product Title & Category */}
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <h1 className="text-2xl font-bold text-gray-900 leading-tight">{product.name}</h1>
                              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 px-3 py-1">
                                {product.category}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>{getFarmerName()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>Listed {formatDate(product.createdAt)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <IndianRupee className="h-6 w-6 text-emerald-600" />
                                <span className="text-3xl font-bold text-emerald-700">{product.price}</span>
                                <span className="text-gray-600">/ {product.unit}</span>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-600">Total for {cartQuantity} {product.unit}</p>
                                <p className="text-xl font-bold text-emerald-700">₹{(product.price * cartQuantity).toFixed(2)}</p>
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <div className="space-y-2">
                            <h3 className="font-semibold text-gray-900">Description</h3>
                            <p className="text-gray-700 leading-relaxed">{product.description}</p>
                          </div>

                          {/* Availability */}
                          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                            <Package className="h-5 w-5 text-emerald-600" />
                            <div>
                              <p className="font-medium text-gray-900">Available Stock</p>
                              <p className="text-sm text-gray-600">{product.quantity} {product.unit} in stock</p>
                            </div>
                          </div>

                          {/* Quantity Selector */}
                          {!isOwner && product.quantity > 0 && (
                            <div className="space-y-3">
                              <label className="font-medium text-gray-900">Quantity</label>
                              <div className="flex items-center gap-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setCartQuantity(Math.max(1, cartQuantity - 1))}
                                  className="rounded-full h-10 w-10 p-0"
                                >
                                  -
                                </Button>
                                <span className="text-lg font-semibold min-w-[3rem] text-center">{cartQuantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setCartQuantity(Math.min(product.quantity, cartQuantity + 1))}
                                  className="rounded-full h-10 w-10 p-0"
                                >
                                  +
                                </Button>
                                <span className="text-sm text-gray-600 ml-2">{product.unit}</span>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-3 pt-4">
                            {!isOwner && product.quantity > 0 && !isInCart && (
                              <Button
                                onClick={handleAddToCart}
                                variant="outline"
                                className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 rounded-full py-3 font-semibold"
                              >
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Add {cartQuantity} {product.unit} to Cart
                              </Button>
                            )}
                            {renderBuyButton()}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 h-96 flex items-center justify-center">
                      <div>
                        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-lg font-medium">Product not found</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ProductDetail;