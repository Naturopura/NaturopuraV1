import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Loader2,
  IndianRupee,
  ImageOff,
  ShoppingCart,
  Package,
  ArrowLeft,
  Calendar,
  User,
  MapPin,
  Star,
  Shield,
  Truck,
  MessageCircle,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/ui/use-toast';
import { createApiClient, ENDPOINTS, handleApiError } from '../config/api';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
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

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { addToCart, cartItems } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const currentUserId = user?.id || '';
  const isInCart = product ? cartItems.some(item => item.productId === product._id) : false;

  const getAuthToken = useCallback((): string => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) return storedToken;
    if (!user?.token) {
      toast({ title: "Authentication Error", description: "Please log in again", variant: "destructive" });
      throw new Error('Authentication token not found');
    }
    return user.token;
  }, [user, toast]);

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
      navigate('/farmer/marketplace');
    } finally {
      setLoading(false);
    }
  }, [getAuthToken, toast, navigate]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addToCart(product, cartQuantity);
    toast({
      title: 'Added to Cart',
      description: `${cartQuantity} ${product.unit} of ${product.name} added to cart`,
      variant: 'default'
    });
  }, [product, addToCart, toast, cartQuantity]);

  const handleBuyNow = useCallback(() => {
    if (!product) return;
    setIsPurchasing(true);
    try {
      navigate('/marketplace/metamask-payment', {
        state: {
          productId: product._id,
          quantity: cartQuantity,
          totalAmount: product.price * cartQuantity
        },
      });
    } finally {
      setIsPurchasing(false);
    }
  }, [product, cartQuantity, navigate]);

  const nextImage = () => {
    if (product?.processedImages?.length) {
      setCurrentImageIndex((prev) => (prev + 1) % product.processedImages!.length);
    }
  };

  const prevImage = () => {
    if (product?.processedImages?.length) {
      setCurrentImageIndex((prev) => (prev - 1 + product.processedImages!.length) % product.processedImages!.length);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied to clipboard!" });
    }
  };

  useEffect(() => {
    if (!productId) {
      navigate('/farmer/marketplace');
      return;
    }
    fetchProductDetails(productId);
  }, [productId, fetchProductDetails, navigate]);

  const isOwner = product && currentUserId && (
    (typeof product.farmerId === 'object' && product.farmerId._id === currentUserId) ||
    (typeof product.farmerId === 'string' && product.farmerId === currentUserId)
  );

  const getFarmerName = () => {
    if (!product) return "N/A";
    if (typeof product.farmerId === 'object' && product.farmerId.name) {
      return product.farmerId.name;
    }
    return "Unknown Farmer";
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-emerald-600 mx-auto mb-6" />
          <p className="text-xl text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Product not found</p>
          <Button onClick={() => navigate('/marketplace/buy-sell')} className="mt-4">
            Back to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/marketplace/buy-sell')}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Marketplace
              </Button>
              <div className="hidden sm:block w-px h-6 bg-gray-300" />
              <Badge variant="secondary" className="hidden sm:inline-flex bg-emerald-100 text-emerald-700">
                {product.category}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFavorite(!isFavorite)}
                className={`${isFavorite ? 'text-red-600 hover:text-red-700' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-gray-600 hover:text-gray-900"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Images */}
          <div className="space-y-6 lg:sticky lg:top-24 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/50"
            >
              {product.processedImages?.length ? (
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden group">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        src={product.processedImages[currentImageIndex]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => ((e.target as HTMLImageElement).src = '/placeholder.jpg')}
                      />
                    </AnimatePresence>
                    
                    {/* Navigation Arrows */}
                    {product.processedImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                        >
                          <ChevronLeft className="h-5 w-5 text-gray-700" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                        >
                          <ChevronRight className="h-5 w-5 text-gray-700" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    {product.processedImages.length > 1 && (
                      <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {product.processedImages.length}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Row */}
                  {product.processedImages.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {product.processedImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            index === currentImageIndex 
                              ? 'border-emerald-500 shadow-md' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${product.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex flex-col items-center justify-center">
                  <ImageOff className="h-20 w-20 text-emerald-400 mb-4" />
                  <span className="text-emerald-600 font-medium text-lg">No image available</span>
                </div>
              )}
            </motion.div>

            {/* Trust & Security Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/50"
            >
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-600" />
                Trust & Security
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Shield className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Verified Farmer</p>
                    <p className="text-sm text-gray-600">Identity verified by our team</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Truck className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Safe Delivery</p>
                    <p className="text-sm text-gray-600">Secure payment & delivery</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Product Details */}
          <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-7rem)] pr-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-white/50"
            >
              {/* Product Header */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
                      {product.name}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span className="font-medium">{getFarmerName()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Listed {formatDate(product.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-medium text-gray-900">4.8</span>
                    <span className="text-gray-600">(124 reviews)</span>
                  </div>
                </div>

                {/* Price */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <IndianRupee className="h-8 w-8 text-black" />
                      <div>
                        <span className="text-4xl font-bold text-black">{product.price}</span>
                        <span className="text-gray-600 ml-2">/ {product.unit}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Total for {cartQuantity} {product.unit}</p>
                      <p className="text-2xl font-bold text-black">
                        ₹{(product.price * cartQuantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3 mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                <p className="text-gray-700 leading-relaxed text-base">{product.description}</p>
              </div>

              {/* Availability & Stock */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="font-medium text-gray-900">Available Stock</p>
                      <p className="text-sm text-gray-600">{product.quantity} {product.unit}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p className="text-sm text-gray-600">Punjab, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              {!isOwner && product.quantity > 0 && (
                <div className="space-y-3 mb-6">
                  <label className="text-lg font-semibold text-gray-900">Quantity</label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCartQuantity(Math.max(1, cartQuantity - 1))}
                      className="rounded-full h-12 w-12 p-0 border-emerald-200 hover:bg-emerald-50"
                    >
                      -
                    </Button>
                    <div className="text-xl font-semibold bg-emerald-50 px-6 py-2 rounded-xl min-w-[4rem] text-center">
                      {cartQuantity}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCartQuantity(Math.min(product.quantity, cartQuantity + 1))}
                      className="rounded-full h-12 w-12 p-0 border-emerald-200 hover:bg-emerald-50"
                    >
                      +
                    </Button>
                    <span className="text-gray-600 ml-2 font-medium">{product.unit}</span>
                  </div>
                </div>
              )}

              {/* Low Stock Warning */}
              {product.quantity <= 5 && product.quantity > 0 && (
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4 mb-6">
                  <p className="font-semibold text-orange-700 text-center">
                    ⚠️ Only {product.quantity} left in stock - order soon!
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4">
                {!isOwner && product.quantity > 0 && !isInCart && (
                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    size="lg"
                    className="w-full border-emerald-200 text-black hover:text-[#b0c632] rounded-xl py-4 text-lg font-semibold transition-all duration-200"
                  >
                    <ShoppingCart className="h-5 w-5 mr-3" />
                    Add {cartQuantity} {product.unit} to Cart
                  </Button>
                )}

                {!isOwner && product.quantity > 0 ? (
                  <Button
                    className="w-full bg-gradient-to-r from-[#8DA63F] via-[#707e22] to-[#666e21] text-white rounded-xl py-4 text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    onClick={handleBuyNow}
                    disabled={isPurchasing}
                  >
                    {isPurchasing ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5 mr-3" />
                        Buy Now - ₹{(product.price * cartQuantity).toFixed(2)}
                      </>
                    )}
                  </Button>
                ) : isOwner ? (
                  <Button
                    size="lg"
                    className="w-full bg-blue-100 text-blue-700 rounded-xl py-4 text-lg font-semibold"
                    disabled
                  >
                    <User className="h-5 w-5 mr-3" />
                    This is your product
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="w-full bg-gray-400 text-white rounded-xl py-4 text-lg font-semibold"
                    disabled
                  >
                    <Package className="h-5 w-5 mr-3" />
                    Out of Stock
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl py-4 text-lg font-semibold"
                >
                  <MessageCircle className="h-5 w-5 mr-3" />
                  Contact Farmer
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;