import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import EditProductDialog from "./EditProductDialog";
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
  BadgeCheck,
} from "lucide-react";

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
  hideOwnerFeatures?: boolean;
}

const ProductCard = ({
  product,
  onUpdate,
  onDelete,
  onDeleteSuccess,
  currentUserId,
  onClick,
  hideOwnerFeatures = false,
}: ProductProps) => {
  const [imageError, setImageError] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [isPurchased] = useState(product.status === "purchase");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // API handling is done via props

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
        } catch {
          setImageError(true);
          console.error("Error loading product image");
        }
      } else {
        setImageError(true);
      }
    };

    loadImage();
  }, [product.images]);

  const isProductOwner = !hideOwnerFeatures && (
    typeof product.farmerId === "object"
      ? String(product.farmerId._id).trim() === String(currentUserId).trim()
      : String(product.farmerId).trim() === String(currentUserId).trim()
  );

  const handleDelete = async () => {
    try {
      setShowDeleteAlert(false);
      if (onDelete) {
        await onDelete(product._id);
        toast({ title: "Success", description: "Product deleted successfully" });
        if (onDeleteSuccess) onDeleteSuccess();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    }
  };

  const handleBuyNow = () => {
    navigate("/marketplace/metamask-payment", {
      state: { productId: product._id },
    });
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



  const renderBuyButton = () => {
    if (isProductOwner) {
      return (
        <Button
          size="sm"
          className="bg-muted text-muted-foreground cursor-not-allowed w-full h-11 text-sm font-medium rounded-lg border border-border"
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
          className="bg-primary text-primary-foreground cursor-not-allowed w-full h-11 text-sm font-medium rounded-lg shadow-sm"
          disabled
        >
          <BadgeCheck className="h-4 w-4 mr-2" />
          Purchased
        </Button>
      );
    }
    if (product.quantity <= 0) {
      return (
        <Button
          size="sm"
          className="bg-destructive text-destructive-foreground w-full h-11 text-sm font-medium rounded-lg shadow-sm"
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
        className="bg-naturopura-gradient w-full h-11 text-sm rounded-lg hover:bg-naturopura-gradient"
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        Buy Now
      </Button>
    );
  };

  return (
    <Card
      className={`card-product w-full max-w-[300px] group ${
        isHovered ? "transform -translate-y-2" : ""
      }`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        {imageError || !product.images || product.images.length === 0 ? (
          <div className="w-full h-52 flex flex-col items-center justify-center bg-gradient-to-br from-muted to-muted/50 relative">
            <ImageOff className="w-16 h-16 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground font-medium">No image available</p>
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-52 object-cover transition-transform duration-slow group-hover:scale-110"
              onError={() => setImageError(true)}
              onLoad={() => setImageError(false)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-normal" />
          </div>
        )}

        {/* Action Buttons Overlay */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-normal">
          <Button
            variant="ghost"
            size="sm"
            className={`btn-ghost h-9 w-9 p-0 rounded-full transition-colors duration-normal cursor-pointer ${
              isLiked ? "bg-destructive/10 text-destructive border-destructive/20 cursor-pointer" : ""
            }`}
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
                className="btn-ghost h-9 w-9 p-0 rounded-full cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="dropdown-content w-52 bg-white">
              <DropdownMenuItem
                className="dropdown-item bg-white hover:bg-gray-100"
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
                className="dropdown-item bg-white hover:bg-gray-100"
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
                className="dropdown-item bg-white hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
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

        {/* Owner Actions */}
        {isProductOwner && (
          <div className="absolute top-3 left-3 ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="btn-ghost h-9 w-9 p-0 rounded-full cursor-pointer"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="dropdown-content w-40 bg-white">
                <DropdownMenuItem onClick={handleUpdate} className="dropdown-item bg-white hover:bg-gray-100 cursor-pointer">
                  <Pencil className="h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="dropdown-item bg-white hover:bg-gray-100 text-destructive focus:text-destructive cursor-pointer"
                  onClick={() => setShowDeleteAlert(true)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Product Title */}
        <h3 className="text-title text-base line-clamp-2 min-h-[3rem] leading-tight">
          {product.name}
        </h3>

        {/* Rating Section */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {[...Array(4)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-accent fill-current" />
            ))}
            <Star className="w-3.5 h-3.5 text-border" />
          </div>
          <span className="text-subtitle text-sm font-medium">4.2</span>
          <span className="text-muted-foreground text-xs">(5,008)</span>
        </div>

       

        {/* Price Section */}
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-price">₹{product.price}</span>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>(₹{(product.price / 100).toFixed(2)}/100g)</p>
            <p className="font-medium">
            </p>
          </div>
        </div>

        {/* Buy Button */}
        <div className="pt-3">
          {renderBuyButton()}
        </div>
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="card-elevated max-w-[90vw] sm:max-w-lg">
          <AlertDialogHeader className="space-y-4 text-center">
            <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
              <Trash2 className="w-8 h-8 text-destructive" />
            </div>
            <AlertDialogTitle className="text-xl font-bold text-card-foreground">
              Delete Product?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This will permanently delete "{product.name}" from the marketplace.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col-reverse sm:flex-row space-y-2 space-y-reverse sm:space-y-0 sm:space-x-3 pt-6">
            <AlertDialogCancel
              onClick={() => setShowDeleteAlert(false)}
              className="btn-secondary flex-1"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="btn-destructive flex-1"
            >
              Delete Product
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Product Dialog */}
      {showEditDialog && (
        <EditProductDialog
          open={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          product={{
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            quantity: product.quantity,
            unit: product.unit,
            images: product.images
          }}
          onUpdate={() => {
            // This should trigger a refresh of the product list
            // The actual update is handled by the parent component
            if (onUpdate) {
              onUpdate(product._id);
            }
          }}
        />
      )}
    </Card>
  );
};

export default ProductCard;