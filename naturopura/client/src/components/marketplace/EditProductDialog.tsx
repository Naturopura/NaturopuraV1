import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";
import { createApiClient, ENDPOINTS } from "../../config/api";
import { useAuth } from "../../context/AuthContext";

interface FormData {
  name: string;
  description: string;
  category: string;
  price: string;
  quantity: string;
  unit: string;
  images: File[];
}

interface EditProductDialogProps {
  open: boolean;
  onClose: () => void;
  product: {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    quantity: number;
    unit: string;
    images: string[];
  };
  onUpdate: () => void;
}

const EditProductDialog = ({ open, onClose, product, onUpdate }: EditProductDialogProps) => {
  const { toast } = useToast();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: product.name,
    description: product.description,
    category: product.category,
    price: product.price.toString(),
    quantity: product.quantity.toString(),
    unit: product.unit,
    images: [] as File[],
  });

  // Reset form when product changes
  useEffect(() => {
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price.toString(),
      quantity: product.quantity.toString(),
      unit: product.unit,
      images: [],
    });
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      toast({
        title: "Authorization Required",
        description: "Please login to update products",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const form = new FormData();
      
      // Add basic fields
      form.append('name', formData.name);
      form.append('description', formData.description);
      form.append('category', formData.category);
      form.append('price', formData.price);
      form.append('quantity', formData.quantity);
      form.append('unit', formData.unit);
      
      // Add new images if any
      formData.images.forEach((file) => {
        form.append('images', file);
      });

      // Add existing images to keep
      if (product.images.length > 0) {
        form.append('keepImages', JSON.stringify(product.images));
      }

      const apiClient = createApiClient(token);
      
      console.log('Updating product:', {
        id: product._id,
        formData: Object.fromEntries(form.entries())
      });

      const { data } = await apiClient.put(
        ENDPOINTS.UPDATE_PRODUCT(product._id),
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );

      if (data.success) {
        toast({
          title: "Success",
          description: "Product updated successfully",
        });
        onUpdate();
        onClose();
      } else {
        throw new Error(data.message || 'Update failed');
      }
    } catch (error) {
      console.error("Update product error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(e.target.files || []),
      }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Product Name
            </label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="fruits">Fruits</SelectItem>
                  <SelectItem value="grains">Grains</SelectItem>
                  <SelectItem value="spices">Spices</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="unit" className="text-sm font-medium">
                Unit
              </label>
              <Select
                value={formData.unit}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, unit: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kilogram (kg)</SelectItem>
                  <SelectItem value="g">Gram (g)</SelectItem>
                  <SelectItem value="piece">Piece</SelectItem>
                  <SelectItem value="dozen">Dozen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium">
                Price (₹)
              </label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, price: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="quantity" className="text-sm font-medium">
                Quantity
              </label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, quantity: e.target.value }))
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="images" className="text-sm font-medium">
              New Images (Optional)
            </label>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            <p className="text-xs text-gray-500">
              Current images will be kept unless new ones are uploaded
            </p>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;