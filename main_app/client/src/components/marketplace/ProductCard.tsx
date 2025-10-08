import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
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
import { createApiClient, ENDPOINTS, handleApiError } from "../../config/api";
import EditProductDialog from "./EditProductDialog";
import {
  ShoppingCart,
  ImageOff,
  MoreVertical,
  Pencil,
  Trash2,
  Package,
  Star,
  Heart,
  Share2,
} from "lucide-react";
import ProductQrCode from "./ProductQRCode";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  category: string;
  images: string[];
  farmerId:
    | string
    | {
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
  const [isPurchased] = useState(product.status === "purchase");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const apiClient = createApiClient(token || undefined);

  useEffect(() => {
    const loadImage = async () => {
      if (product.images && product.images.length > 0) {
        const imagePath = product.images[0];
        const baseUrl =
          import.meta.env.VITE_API_URL || "http://localhost:5000/api";
        const imageUrl = imagePath.startsWith("http")
          ? imagePath
          : `${baseUrl}/${imagePath}`;

        try {
          const response = await fetch(imageUrl, { method: "HEAD" });
          setImageError(!response.ok);
        } catch (error) {
          setImageError(true);
          console.error("Error loading product image:", error);
        }
      } else {
        setImageError(true);
      }
    };

    loadImage();
  }, [product.images]);

  const isProductOwner =
    typeof product.farmerId === "object"
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
    navigate("/marketplace/metamask-payment", {
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
      (e.target.closest("button") ||
        e.target.closest('[role="menuitem"]') ||
        e.target.closest('[role="dialog"]') ||
        e.target.closest(".dropdown-menu-trigger"))
    ) {
      return;
    }
    onClick?.(product._id);
  };

  // Calculate discount percentage (mock data)
  const originalPrice = Math.round(product.price * 1.32);
  const discountPercentage = Math.round(
    ((originalPrice - product.price) / originalPrice) * 100
  );

  const renderBuyButton = () => {
    if (isProductOwner) {
      return (
        <Button
          size="sm"
          className="bg-gray-400 cursor-not-allowed w-full h-10 text-sm font-medium rounded-md"
          disabled
        >
          <Package className="h-4 w-4 mr-2" />
          My Product
        </Button>
      );
    }
    if (isPurchased) {
      return (
        <Button
          size="sm"
          className="bg-blue-500 cursor-not-allowed w-full h-10 text-sm font-medium rounded-md"
          disabled
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Purchased
        </Button>
      );
    }
    if (product.quantity <= 0) {
      return (
        <Button
          size="sm"
          className="bg-red-500 w-full h-10 text-sm font-medium rounded-md"
          disabled
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Out of Stock
        </Button>
      );
    }
    return (
      <Button
        onClick={handleBuyNow}
        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white w-full h-10 text-sm font-semibold rounded-md transition-colors duration-200 border-0"
      >
        Buy Now
      </Button>
    );
  };

  return (
    <Card
      className={`w-full max-w-[280px] bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group rounded-lg ${
        isHovered ? "transform -translate-y-1" : ""
      }`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        {imageError || !product.images || product.images.length === 0 ? (
          <div className="w-full h-48 flex flex-col items-center justify-center bg-gray-100 relative">
            <ImageOff className="w-12 h-12 text-gray-400 mb-2" />
            <p className="text-xs text-gray-500">No image available</p>
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
              onLoad={() => setImageError(false)}
            />
          </div>
        )}

        {/* Top Action Buttons */}
        <div className="absolute top-2 right-2 flex flex-col space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 w-8 p-0 rounded-full ${
              isLiked ? "bg-red-50 text-red-500" : "bg-white/90 text-gray-600"
            } hover:bg-white shadow-sm`}
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 bg-white/90 hover:bg-white text-gray-600 rounded-full shadow-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-white border shadow-lg rounded-md p-1"
            >
              <DropdownMenuItem
                className="text-sm text-gray-700 hover:bg-gray-100 rounded px-2 py-1.5 cursor-pointer flex items-center space-x-2"
                onClick={(e) => {
                  e.stopPropagation();
                  const url = encodeURIComponent(
                    window.location.origin + "/product/" + product._id
                  );
                  const imageUrl =
                    product.images && product.images.length > 0
                      ? encodeURIComponent(
                          window.location.origin + "/" + product.images[0]
                        )
                      : "";
                  const text = encodeURIComponent(
                    `Check out this product: ${
                      product.name
                    }\nImage: ${decodeURIComponent(
                      imageUrl
                    )}\nLink: ${decodeURIComponent(url)}`
                  );
                  const whatsappUrl = `https://wa.me/?text=${text}`;
                  window.open(whatsappUrl, "_blank");
                }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WhatsApp"
                  className="w-5 h-5"
                />
                <span>Share on WhatsApp</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-sm text-gray-700 hover:bg-gray-100 rounded px-2 py-1.5 cursor-pointer flex items-center space-x-2"
                onClick={(e) => {
                  e.stopPropagation();
                  const url = encodeURIComponent(
                    window.location.origin + "/product/" + product._id
                  );
                  const imageUrl =
                    product.images && product.images.length > 0
                      ? encodeURIComponent(
                          window.location.origin + "/" + product.images[0]
                        )
                      : "";
                  const telegramText = encodeURIComponent(
                    `${product.name}\nImage: ${decodeURIComponent(
                      imageUrl
                    )}\nLink: ${decodeURIComponent(url)}`
                  );
                  const telegramUrl = `https://t.me/share/url?url=${url}&text=${telegramText}`;
                  window.open(telegramUrl, "_blank");
                }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
                  alt="Telegram"
                  className="w-5 h-5"
                />
                <span>Share on Telegram</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-sm text-gray-700 hover:bg-gray-100 rounded px-2 py-1.5 cursor-pointer flex items-center space-x-2"
                onClick={(e) => {
                  e.stopPropagation();
                  // Instagram does not have a direct share URL, so open Instagram homepage or product page URL for manual sharing
                  const instagramUrl = "https://www.instagram.com/";
                  window.open(instagramUrl, "_blank");
                }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
                  alt="Instagram"
                  className="w-5 h-5"
                />
                <span>Share on Instagram</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Owner Actions Menu */}
        {isProductOwner && (
          <div className="absolute top-2 left-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 bg-white/90 hover:bg-white backdrop-blur-sm shadow-sm border border-gray-200 rounded-full"
                >
                  <MoreVertical className="h-4 w-4 text-gray-700" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-36 bg-white border shadow-lg rounded-lg p-1"
              >
                <DropdownMenuItem
                  onClick={handleUpdate}
                  className="text-sm text-gray-700 hover:bg-gray-50 rounded px-2 py-1.5 cursor-pointer"
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-sm text-red-600 hover:bg-red-50 rounded px-2 py-1.5 cursor-pointer"
                  onClick={() => setShowDeleteAlert(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discountPercentage}% off
          </div>
        )}
      </div>

      <CardContent className="p-3 space-y-2">
        {/* Product Title */}
        <h3 className="font-medium text-sm text-gray-900 line-clamp-2 leading-tight min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          <div className="flex items-center">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-orange-400 fill-current" />
            ))}
            <Star className="w-3 h-3 text-gray-300" />
          </div>
          <span className="text-xs text-gray-600">4.2</span>
          <span className="text-xs text-gray-500">5,008</span>
        </div>

        {/* Purchase Info */}
        <p className="text-xs text-gray-600">800+ bought in past month</p>

        {/* Price Section */}
        <div className="space-y-1">
          <div className="flex items-baseline space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price}
            </span>
            <span className="text-xs text-gray-500 line-through">
              ₹{originalPrice}
            </span>
          </div>
          <p className="text-xs text-gray-600">
            (₹{(product.price / 100).toFixed(2)}/100 g)
          </p>
          <p className="text-xs text-gray-700 font-medium">
            M.R.P: <span className="line-through">₹{originalPrice}</span> (
            {discountPercentage}% off)
          </p>
        </div>

        {/* Offers */}
        <p className="text-xs text-gray-700">Buy 2 items, get 3% off</p>

        {/* Delivery Info */}
        <div className="space-y-1 text-xs">
          <p className="font-medium text-gray-900">
            <span className="text-green-600">FREE delivery</span>{" "}
            <span className="font-bold">Thu, 10 Jul</span> on first order
          </p>
          <p className="text-gray-700">
            Or fastest delivery{" "}
            <span className="font-bold">Tomorrow, 5 Jul</span>
          </p>
        </div>

        {/* Stock Info */}
        {product.quantity <= 5 && product.quantity > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded p-2">
            <p className="text-xs text-orange-700 font-medium">
              Only {product.quantity} left in stock!
            </p>
          </div>
        )}

        {/* Buy Button */}
        <div className="pt-2">{renderBuyButton()}</div>

        {/* QR Code for Product Owner */}
        {isProductOwner && (
          <div className="flex justify-center pt-2">
            <div className="bg-gray-50 rounded p-2 border">
              <ProductQrCode productId={product._id} />
            </div>
          </div>
        )}
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-lg bg-white border-0 shadow-2xl rounded-xl">
          <AlertDialogHeader className="space-y-3">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Trash2 className="w-6 h-6 text-red-600" />
            </div>
            <AlertDialogTitle className="text-lg font-bold text-gray-900 text-center">
              Delete Product?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 text-center">
              This will permanently delete "{product.name}" from the
              marketplace.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex space-x-3 pt-4">
            <AlertDialogCancel
              onClick={() => setShowDeleteAlert(false)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 border-0"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white border-0"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Product Dialog */}
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
