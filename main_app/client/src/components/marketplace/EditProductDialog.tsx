import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

import { useToast } from "../ui/use-toast";
import { Loader2, Package, DollarSign, Hash, FileImage, Pencil, X } from "lucide-react";
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
      <DialogContent className="sm:max-w-2xl bg-white rounded-3xl border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader className="space-y-4 pb-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                <Pencil className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-gray-900">
                  Edit Product
                </DialogTitle>
                <p className="text-gray-600 text-sm">
                  Update your product information and settings
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 pt-6">
          {/* Product Information Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Product Information</h3>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 space-y-6">
              {/* Product Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  Product Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium"
                  placeholder="Enter product name"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  Description
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[100px] resize-none"
                  placeholder="Describe your product..."
                  required
                />
              </div>

              {/* Category and Unit */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    Category
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, category: e.target.value }))
                      }
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium appearance-none"
                      required
                    >
                      <option value="">Select category</option>
                      <option value="vegetables">🥬 Vegetables</option>
                      <option value="fruits">🍎 Fruits</option>
                      <option value="grains">🌾 Grains</option>
                      <option value="spices">🌶️ Spices</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="unit" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    Unit
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.unit}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, unit: e.target.value }))
                    }
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium appearance-none"
                    required
                  >
                    <option value="">Select unit</option>
                    <option value="kg">Kilogram (kg)</option>
                    <option value="g">Gram (g)</option>
                    <option value="piece">Piece</option>
                    <option value="dozen">Dozen</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Inventory Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Pricing & Inventory</h3>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    Price (₹)
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600 font-bold">₹</span>
                    <input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, price: e.target.value }))
                      }
                      className="w-full pl-8 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 font-medium"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="quantity" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    Quantity
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      id="quantity"
                      type="number"
                      min="0"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, quantity: e.target.value }))
                      }
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 font-medium"
                      placeholder="0"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                <FileImage className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Product Images</h3>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="images" className="text-sm font-semibold text-gray-800">
                  Update Images (Optional)
                </label>
                <div className="relative">
                  <input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-100 file:text-purple-700 file:font-medium hover:file:bg-purple-200 file:transition-colors file:duration-200"
                  />
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-700 font-medium">
                    💡 Tip: Current images will be kept unless new ones are uploaded. 
                    High-quality images help increase sales!
                  </p>
                </div>
              </div>
              
              {formData.images.length > 0 && (
                <div className="bg-white rounded-xl p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Selected Files: {formData.images.length}
                  </p>
                  <div className="space-y-1">
                    {Array.from(formData.images).map((file, index) => (
                      <div key={index} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                        {file.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Updating Product...
                </>
              ) : (
                <>
                  <Pencil className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;