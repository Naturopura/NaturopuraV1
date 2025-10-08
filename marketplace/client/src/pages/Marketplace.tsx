import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Plus, Filter } from 'lucide-react';
import ProductList from '../components/marketplace/ProductList';
import AddProductDialog from '../components/marketplace/AddProductDialog';
import { createApiClient, handleApiError } from '../config/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/use-toast';

const MarketplacePage = () => {
  const { token, user } = useAuth();
  const { toast } = useToast();
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handlePurchase = async (productId: string) => {
    if (!token) {
      toast({
        title: 'Error',
        description: 'Authentication required',
        variant: 'destructive'
      });
      return;
    }

    try {
      const apiClient = createApiClient(token);
      await apiClient.put(`/products/${productId}/purchase`);
      
      toast({
        title: 'Success',
        description: 'Product purchased successfully'
      });
    } catch (error) {
      console.error('Purchase update error:', error);
      toast({
        title: 'Error',
        description: handleApiError(error),
        variant: 'destructive'
      });
    }
  };

  // These functions are handled by ProductList component internally

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Your Products</CardTitle>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4 text-gray-600" />
              Filter
            </Button>
            <Button 
              onClick={() => setShowAddProduct(true)} 
              className="gap-2 bg-gradient-to-r from-[#8DA63F] via-[#707e22] to-[#666e21] cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ProductList 
            onPurchase={handlePurchase} 
            currentUserId={user?.id || ''}
            hideOwnerFeatures={false} // Always show owner features in marketplace
          />
        </CardContent>
      </Card>

      {showAddProduct && (
        <AddProductDialog 
          open={showAddProduct} 
          onClose={() => setShowAddProduct(false)} 
        />
      )}
    </>
  );
};

export default MarketplacePage;
