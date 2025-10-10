import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWeb3 } from '../../context/Web3Context'; // Import useWeb3
import { useToast } from '../ui/use-toast';
import { createApiClient, ENDPOINTS, handleApiError } from '../../config/api';
import ProductCard from './ProductCard';
import { getImageUrl } from '../../utils/imageUtils';

// Update the Product interface to include processed image URLs
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  category: string;
  images: string[];
  processedImages?: string[]; // Add this field for processed URLs
  status: string;
  createdAt: string;
  updatedAt: string;
  farmerId: string | {
    _id: string;
    name: string;
    email: string;
  };
}

interface ProductListProps {
  onPurchase: (productId: string) => Promise<void>;
  onProductClick?: (productId: string) => void; // Optional for product click handling
  currentUserId?: string; // Optional for checking product ownership
  hideOwnerFeatures?: boolean; // Hide edit/delete buttons and "My Product" tag
  searchQuery?: string; // Optional search query
}

const ProductList = ({ onPurchase, onProductClick, currentUserId, hideOwnerFeatures = false, searchQuery = '' }: ProductListProps) => {
  const { user } = useAuth();
  const { connectWallet, isConnected } = useWeb3(); // Destructure connectWallet and isConnected
  const { toast } = useToast();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Update the getAuthToken function
  const getAuthToken = useCallback((): string => {
    // Check localStorage first
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      return storedToken;
    }

    if (!user?.token) {
      toast({
        title: "Authentication Error",
        description: "Please log in again",
        variant: "destructive"
      });
      navigate('/login');
      throw new Error('Authentication token not found');
    }

    return user.token;
  }, [user, navigate, toast]);

  // Update the fetchProducts function to process image URLs
  const fetchProducts = useCallback(async () => {
    setLoading(true); // Ensure loading is true at the start
    try {
      let token;
      try {
        token = getAuthToken();
      } catch {
        setLoading(false); // Stop loading if token retrieval fails
        return;
      }

      const apiClient = createApiClient(token);
      const response = await apiClient.get<Product[]>(ENDPOINTS.GET_PRODUCTS);

      if (response.data) {
        // Process image URLs for each product
        const productsWithProcessedImages = response.data.map(product => ({
          ...product,
          processedImages: product.images.map(image =>
            image.startsWith('https://res.cloudinary.com') ? image : getImageUrl(image)
          )
        }));
        setProducts(productsWithProcessedImages);
        setTimeout(() => setIsVisible(true), 100); // For fade-in effect
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('Error fetching products:', error);

      if (errorMessage.includes('token') || errorMessage.includes('auth')) {
        localStorage.removeItem('token'); // Clear invalid token
        toast({
          title: "Authentication Error",
          description: "Please log in again",
          variant: "destructive"
        });
        navigate('/login');
      } else {
        toast({
          title: "Error fetching products",
          description: errorMessage,
          variant: "destructive"
        });
      }
    } finally {
      setLoading(false);
    }
  }, [getAuthToken, toast, navigate]);

  // New function to refresh products list
  const refreshProducts = useCallback(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Update handleDelete with proper null checks
  const handleDelete = async (productId: string) => {
    try {
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to delete products",
          variant: "destructive"
        });
        navigate("/login");
        return;
      }

      const token = getAuthToken();
      const apiClient = createApiClient(token);

      const product = products.find(p => p._id === productId);
      let farmerId;
      if (product?.farmerId) {
        farmerId = typeof product.farmerId === 'object'
          ? product.farmerId._id
          : product.farmerId;
      } else {
        toast({
          title: "Error",
          description: "Product or farmer ID not found for deletion.",
          variant: "destructive"
        });
        return;
      }

      if (farmerId !== user.id) {
        toast({
          title: "Authorization Error",
          description: "You can only delete your own products.",
          variant: "destructive"
        });
        return;
      }

      await apiClient.delete(ENDPOINTS.DELETE_PRODUCT(productId));
      setProducts(prev => prev.filter(p => p._id !== productId));

      toast({
        title: "Success",
        description: "Product deleted successfully"
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : handleApiError(error);
      toast({
        title: "Error deleting product",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  const handlePurchaseWithMetaMask = useCallback(async (productId: string) => {
    if (!isConnected) {
      try {
        await connectWallet();
      
        if (localStorage.getItem('isWalletConnected') === 'true') { // A way to check if connection was successful
            onPurchase(productId);
        } else {
            toast({
                title: "MetaMask Connection Required",
                description: "Wallet connection failed or was cancelled. Please connect your MetaMask wallet to proceed.",
                variant: "destructive"
            });
        }
      } catch (error) {
        console.error("Failed to connect MetaMask:", error);
        toast({
          title: "MetaMask Connection Failed",
          description: "Could not connect to MetaMask. Please ensure it's installed and unlocked.",
          variant: "destructive"
        });
      }
    } else {
      onPurchase(productId);
    }
  }, [isConnected, connectWallet, onPurchase, toast]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token && !user) { // Check both localStorage and context user
      toast({
        title: "Authentication Required",
        description: "Please log in to view products.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    fetchProducts();
  }, [fetchProducts, navigate, user, toast]); // Added user and toast to dependencies

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 sm:h-96 bg-green-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 animate-spin text-green-600" />
          <p className="text-green-700 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-4 sm:py-6 px-3 sm:px-6 lg:px-8 bg-green-50 min-h-screen">
      {products.length === 0 ? (
        <div className="text-center py-8 sm:py-12 px-4">
          <div className="bg-white border border-green-200 rounded-lg p-8 max-w-md mx-auto shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No products available</h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
              Looks like there are no products listed at the moment. Farmers, add your products to get started!
            </p>
          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-8 sm:py-12 px-4">
          <div className="bg-white border border-green-200 rounded-lg p-8 max-w-md mx-auto shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
              No products match your search query. Try different keywords.
            </p>
          </div>
        </div>
      ) : (
        <div className={`grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg border border-green-200 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:border-green-300 transform focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              <ProductCard
                product={{
                  ...product,
                  images: product.processedImages || product.images // Use processed images if available
                }}
                onUpdate={refreshProducts} // Use refreshProducts to update list after edit
                onDelete={handleDelete}
                onDeleteSuccess={fetchProducts} // To refresh list after delete
                onPurchase={handlePurchaseWithMetaMask} // Pass the MetaMask integrated handler
                currentUserId={currentUserId || ''} // Pass currentUserId for ownership checks in ProductCard
                onClick={onProductClick} // Pass onProductClick to handle modal opening
                hideOwnerFeatures={hideOwnerFeatures} // Pass hideOwnerFeatures to control owner UI
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;