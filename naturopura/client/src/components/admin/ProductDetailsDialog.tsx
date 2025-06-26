import  { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Card, CardContent } from "../ui/card";
import { ImageOff, User, Package, Tag, Layers, CheckCircle, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { getImageUrl } from '../../utils/imageUtils';

interface ProductDetailsProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    unit: string;
    category: string;
    images: string[];
    status: string;
    createdAt: string;
    updatedAt: string;
    farmerId: {
      name: string;
      email: string;
    };
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailsDialog = ({ product, isOpen, onClose }: ProductDetailsProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  
  if (!product) return null;

  const handleNextImage = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const handlePrevImage = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
    }
  };

  // Update current image URL handling
  const currentImageUrl = product.images.length > 0 
    ? getImageUrl(product.images[currentImageIndex])
    : null;

  const handleImageError = (index: number) => {
    console.error(`Failed to load image at index ${index}:`, product.images[index]);
    setImageError(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[95vw] md:max-w-[85vw] lg:max-w-[75vw] xl:max-w-[65vw] 
                               max-h-[90vh] overflow-hidden p-0 rounded-xl border-0 shadow-xl">
        <DialogHeader className="bg-gradient-to-r from-emerald-600 to-teal-500 px-4 sm:px-6 py-4 sticky top-0 z-10">
          <DialogTitle className="text-xl font-semibold text-white">
            Product Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white max-h-[calc(90vh-4rem)] overflow-y-auto">
          {/* Image Gallery Section */}
          <div className="p-3 sm:p-4 md:p-6 md:border-r border-gray-100 bg-gray-50 flex flex-col">
            <div className="relative aspect-square rounded-xl bg-white overflow-hidden flex items-center justify-center 
                          border border-gray-200 shadow-sm mb-3 sm:mb-4">
              {currentImageUrl && !imageError ? (
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  src={currentImageUrl}
                  alt={`${product.name} ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
                  onError={() => handleImageError(currentImageIndex)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400 p-8">
                  <ImageOff className="h-8 w-8 sm:h-12 sm:w-12" />
                  <span className="mt-2 text-sm text-center">No image available</span>
                </div>
              )}
              
              {product.images.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full
                              shadow-md hover:bg-white transition-all duration-200 border border-gray-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full
                              shadow-md hover:bg-white transition-all duration-200 border border-gray-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                  </button>
                </>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="mt-2 sm:mt-4">
                <h4 className="text-xs sm:text-sm font-medium text-gray-600 mb-2 sm:mb-3">Gallery</h4>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setImageError(false);
                      }}
                      className={`aspect-square rounded-lg bg-white overflow-hidden border transition-all duration-200
                                flex items-center justify-center hover:shadow-md 
                                ${currentImageIndex === index 
                                  ? 'border-emerald-500 shadow-sm ring-2 ring-emerald-200' 
                                  : 'border-gray-200 hover:border-gray-300'}`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <img
                        src={getImageUrl(image)}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.png';
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3 sm:space-y-4"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{product.name}</h2>
                <p className="mt-2 sm:mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100"></div>

              {/* Product Specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <motion.div 
                  whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl border border-gray-100 shadow-xs transition-shadow"
                >
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 flex-shrink-0">
                    <Tag className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Price</p>
                    <p className="font-semibold text-gray-900 text-base sm:text-lg">
                      ₹{product.price.toLocaleString()} <span className="text-xs sm:text-sm font-normal text-gray-500">/ {product.unit}</span>
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl border border-gray-100 shadow-xs transition-shadow"
                >
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
                    <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Available Stock</p>
                    <p className="font-semibold text-gray-900 text-base sm:text-lg">
                      {product.quantity.toLocaleString()} <span className="text-xs sm:text-sm font-normal text-gray-500">{product.unit}</span>
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl border border-gray-100 shadow-xs transition-shadow"
                >
                  <div className="p-2 rounded-lg bg-purple-50 text-purple-600 flex-shrink-0">
                    <Layers className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Category</p>
                    <p className="font-semibold text-gray-900 text-base capitalize">
                      {product.category}
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl border border-gray-100 shadow-xs transition-shadow"
                >
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-600 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Status</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold capitalize
                      ${product.status === 'available' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-gray-100 text-gray-800'}`}>
                      {product.status}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Farmer Information Card */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="border border-gray-100 shadow-sm bg-gradient-to-br from-gray-50 to-white overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3">
                    <div className="p-2 sm:p-3 rounded-xl bg-white border border-gray-100 shadow-xs">
                      <User className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                      Farmer Information
                    </h4>
                  </div>
                  <div className="pl-10 sm:pl-14 space-y-1 sm:space-y-2">
                    <p className="text-gray-900 font-medium text-sm sm:text-base">{product.farmerId.name}</p>
                    <p className="text-gray-600 text-xs sm:text-sm">{product.farmerId.email}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Timeline Information */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl border border-gray-100 shadow-xs"
            >
              <div className="p-2 rounded-lg bg-gray-50 text-gray-600 flex-shrink-0">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Listed</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">
                    {format(new Date(product.createdAt), 'MMM d, yyyy')}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-900">
                    {format(new Date(product.updatedAt), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;