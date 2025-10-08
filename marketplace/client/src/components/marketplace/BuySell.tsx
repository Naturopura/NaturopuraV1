import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../../components/marketplace/ProductList';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../ui/use-toast';
import { Search,Activity } from 'lucide-react';


const BuySell: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  // Get the current user ID for checking product ownership
  const currentUserId = user?.id || '';

  const handleProductClick = (productId: string) => {
    navigate(`/marketplace/product/${productId}`);
  };

  const handlePurchase = async (productId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    toast({
      title: "Purchase Initiated",
      description: "Redirecting to secure payment...",
    });
    navigate(`/marketplace/product/${productId}`);
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
     

      {/* Header Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter Bar */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/40 rounded-2xl p-4 mb-6 shadow-lg">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search fresh produce, seeds, equipment..."
                  className="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/70 backdrop-blur-lg border border-white/40 rounded-3xl shadow-lg overflow-hidden">
            {/* Section Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  Live Product Feed
                </h2>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Updated in real-time
                </div>
              </div>
            </div>
            
            {/* Product List */}
            <div className="p-6">
              <ProductList
                onPurchase={handlePurchase}
                onProductClick={handleProductClick}
                currentUserId={currentUserId}
                hideOwnerFeatures={true} // Hide edit/delete buttons and "My Product" tag
                searchQuery={searchQuery}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuySell;