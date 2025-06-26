import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useToast } from "../ui/use-toast";
import { createApiClient, ENDPOINTS, handleApiError } from '../../config/api';
import EditProductDialog from './EditProductDialog';
import { ShoppingCart, ImageOff, MoreVertical, Pencil, Trash2, Package, Truck } from 'lucide-react';
import ProductQrCode from './ProductQRCode';


interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  category: string;
  images: string[];
  farmerId: string | {
    _id: string;
    name: string;
    email: string;
  };
  status: string;
}

export interface ProductProps {
  product: Product;
  onUpdate: (productId: string) => void;
  onDelete: (productId: string) => Promise<void>;
  onDeleteSuccess?: () => void;
  currentUserId: string;
  onPurchase?: (
    productId: string,
    address: {
      name: string;
      phone: string;
      street: string;
      city: string;
      state: string;
      pincode: string;
    },
    walletAddress: string
  ) => Promise<void>;
  onClick?: (productId: string) => void;
}

const ProductCard = ({
  product,
  onUpdate,
  onDelete,
  onDeleteSuccess,
  currentUserId,
  onClick,
}: ProductProps) => {
  const [imageError, setImageError] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [isPurchased] = useState(product.status === 'purchase');
  const [showEditDialog, setShowEditDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const apiClient = createApiClient(token || undefined);

  useEffect(() => {
    const loadImage = async () => {
      if (product.images && product.images.length > 0) {
        const imagePath = product.images[0];
        const baseUrl = import.meta.env.VITE_API_URL;
        const imageUrl = imagePath.startsWith('http')
          ? imagePath
          : `${baseUrl}/${imagePath.replace(/^uploads\//, '')}`;

        try {
          const response = await fetch(imageUrl, { method: 'HEAD' });
          setImageError(!response.ok);
        } catch (error) {
          setImageError(true);
          console.error('Error loading product image:', error);
        }
      } else {
        setImageError(true);
      }
    };

    loadImage();
  }, [product.images]);

  const isProductOwner =
    typeof product.farmerId === 'object'
      ? String(product.farmerId._id).trim() === String(currentUserId).trim()
      : String(product.farmerId).trim() === String(currentUserId).trim();

  const handleDelete = async () => {
    try {
      setShowDeleteAlert(false);
      if (onDelete) {
        await onDelete(product._id);
      } else {
        await apiClient.delete(ENDPOINTS.DELETE_PRODUCT(product._id));
      }
      toast({ title: "Success", description: "Product deleted successfully" });
      if (onDeleteSuccess) onDeleteSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: handleApiError(error),
        variant: "destructive",
      });
    }
  };

  const handleBuyNow = () => {
    navigate('/farmer/marketplace/metamask-payment', {
      state: { productId: product._id },
    });
  };

  const handleEditSuccess = () => {
    onUpdate(product._id);
    setShowEditDialog(false);
  };

  const handleUpdate = () => {
    setShowEditDialog(true);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (
      e.target instanceof HTMLElement &&
      (e.target.closest('button') ||
        e.target.closest('[role="menuitem"]') ||
        e.target.closest('[role="dialog"]') ||
        e.target.closest('.dropdown-menu-trigger'))
    ) {
      return;
    }
    onClick?.(product._id);
  };

  const handleViewLogistics = async () => {
    try {
      const token = localStorage.getItem('token');
      const apiClient = createApiClient(token || undefined);
      const response = await apiClient.get(ENDPOINTS.GET_LOGISTICS_STATUS(product._id));
      if (response.data) {
        // Assuming you want to navigate to logistics page with data or just navigate
        navigate(`/marketplace/logistics/${product._id}`);
      } else {
        // Handle no logistics data case if needed
        navigate(`/marketplace/logistics/${product._id}`);
      }
    } catch (error) {
      console.error('Failed to fetch logistics status:', error);
      navigate(`/marketplace/logistics/${product._id}`);
    }
  };

  const renderBuyButton = () => {
    if (isProductOwner) {
      return (
        <Button size="sm" className="bg-gray-500 cursor-not-allowed w-full sm:w-auto" disabled>
          My Product
        </Button>
      );
    }
    if (isPurchased) {
      return (
        <Button size="sm" className="bg-gray-500 cursor-not-allowed w-full sm:w-auto" disabled>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Purchased
        </Button>
      );
    }
    if (product.quantity <= 0) {
      return (
        <Button size="sm" className="bg-gray-500 w-full sm:w-auto" disabled>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Out of Stock
        </Button>
      );
    }
    return (
      <Button onClick={handleBuyNow}>
        Buy Now
      </Button>
    );
  };

  return (
    <Card className="w-full max-w-sm" onClick={handleCardClick}>
      <div className="relative">
        {imageError || !product.images || product.images.length === 0 ? (
          <div className="w-full h-48 flex items-center justify-center bg-muted">
            <ImageOff className="w-12 h-12 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mt-2">No image available</p>
          </div>
        ) : (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover"
            onError={() => setImageError(true)}
            onLoad={() => setImageError(false)}
          />
        )}
        <Badge className="absolute top-2 right-2">{product.status}</Badge>
        <div className="absolute top-2 right-2 flex gap-2">
          <Badge className="bg-green-500/90 hover:bg-green-600 transition-colors text-xs sm:text-sm">
            {product.category}
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-white hover:bg-white">
                <MoreVertical className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32 sm:w-36 cursor-pointer bg-white">
              {isProductOwner && (
                <>
                  <DropdownMenuItem onClick={handleUpdate} className="text-xs sm:text-sm">
                    <Pencil className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600 text-xs sm:text-sm"
                    onClick={() => setShowDeleteAlert(true)}
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem
                onClick={handleViewLogistics}
                className="text-blue-600 text-2xl sm:text-sm bg-white border-none cursor-pointer"
              >
                <Truck className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Track Logistics
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardContent className="p-4">
        <div>
          <h3 className="font-semibold text-base sm:text-lg text-gray-800 line-clamp-1">{product.name}</h3>
          <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mt-1">{product.description}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-2 border-t border-gray-100 gap-2 sm:gap-0">
          <div className="space-y-0.5">
            <span className="text-xl sm:text-2xl font-bold text-green-600">₹ {product.price}</span>
            <span className="text-xs sm:text-sm text-gray-500 block">per {product.unit}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Package className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {product.quantity} {product.unit} left
            </span>
          </div>
        </div>

        {product.quantity <= 5 && product.quantity > 0 && (
          <div className="text-xs sm:text-sm text-orange-500 mt-2">
            Only {product.quantity} left in stock!
          </div>
        )}


        <div className="flex justify-between items-center mt-4">
          {renderBuyButton()}
          {isProductOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="dropdown-menu-trigger">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowDeleteAlert(true)}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleViewLogistics}>
                  <Package className="w-4 h-4 mr-2" />
                  View Logistics
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {isProductOwner && (
          <div className="flex justify-end mt-2">
            <ProductQrCode productId={product._id} />
          </div>
        )}
      </CardContent>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg sm:text-xl">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm sm:text-base">
              This action cannot be undone. This will permanently delete your product and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteAlert(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditProductDialog
        open={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        product={product}
        onUpdate={handleEditSuccess}
      />
    </Card>
  );
};

export default ProductCard;
