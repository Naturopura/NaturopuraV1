import React, { useState } from 'react';
import ProductList from '../../components/marketplace/ProductList';
import ProductDetail from '../../components/marketplace/ProductDetails';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/ui/use-toast';
import { ShoppingCart, TrendingUp, Package } from 'lucide-react';

const BuySell: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Get the current user ID for checking product ownership
  const currentUserId = user?.id || '';

  const handleProductClick = (productId: string) => {
    console.log('Product clicked:', productId); 
    setSelectedProductId(productId);
  };

  const handleCloseDetail = () => {
    console.log('Closing product detail'); // Debug log
    setSelectedProductId(null);
  };

  const handlePurchase = async (productId: string) => {
    console.log(`Frontend simulated purchase of product ID: ${productId}`);
    await new Promise(resolve => setTimeout(resolve, 500));
    toast({
      title: "Purchase Simulated",
      description: "Your purchase request was simulated successfully!",
    });
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        {/* Header Section */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl p-6 sm:p-8 mb-8 text-white shadow-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <ShoppingCart className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                    Agricultural Marketplace
                  </h1>
                  <p className="text-emerald-100 text-lg">
                    Discover fresh produce, quality seeds, and farming equipment from local farmers
                  </p>
                </div>
                <div className="flex gap-4 text-center">
                  <div className="bg-white/10 rounded-xl p-3">
                    <Package className="h-6 w-6 mx-auto mb-1" />
                    <div className="text-sm font-medium">500+ Products</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3">
                    <TrendingUp className="h-6 w-6 mx-auto mb-1" />
                    <div className="text-sm font-medium">Best Prices</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ShoppingCart className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Active Listings</p>
                    <p className="text-xl font-bold text-gray-800">245</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Package className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fresh Arrivals</p>
                    <p className="text-xl font-bold text-gray-800">32</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Top Sellers</p>
                    <p className="text-xl font-bold text-gray-800">18</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-6">
              {/* Product List - Main content area */}
              <div className={`flex-1 transition-all duration-500 ease-in-out ${
                selectedProductId ? 'lg:mr-6' : 'mr-0'
              }`}>
                <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-3xl p-6 shadow-lg">
                  <ProductList
                    onPurchase={handlePurchase}
                    onProductClick={handleProductClick}
                    currentUserId={currentUserId}
                  />
                </div>
              </div>

              {/* Product Detail Sidebar - Only show when product is selected */}
              {selectedProductId && (
                <div className="hidden lg:block w-96 transition-all duration-500 ease-in-out">
                  <div className="bg-white/80 backdrop-blur-lg border border-white/40 rounded-3xl shadow-xl overflow-hidden">
                    <ProductDetail
                      productId={selectedProductId}
                      onClose={handleCloseDetail}
                      onPurchase={handlePurchase}
                      currentUserId={currentUserId}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Product Detail Modal */}
        {selectedProductId && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="absolute inset-x-4 top-4 bottom-4 bg-white rounded-3xl shadow-2xl overflow-hidden">
              <ProductDetail
                productId={selectedProductId}
                onClose={handleCloseDetail}
                onPurchase={handlePurchase}
                currentUserId={currentUserId}
              />
            </div>
          </div>
        )}
      </div>
  );
};

export default BuySell;