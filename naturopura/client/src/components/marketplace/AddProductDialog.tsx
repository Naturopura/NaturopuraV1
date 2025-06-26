import { useState, useEffect, useCallback } from "react";
import axios from "axios";
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
import { createApiClient, ENDPOINTS } from "../../config/api";
import { useAuth } from "../../context/AuthContext";
import {
  Loader2,
  Upload,
  Tag,
  Package,
  DollarSign,
  Scale,
  Camera,
  TrendingUp,
} from "lucide-react";

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
}

interface PricePrediction {
  title: string;
  price: string;
  source: string;
}

// Add type for API response
interface PredictionApiResponse {
  predictions: PricePrediction[];
}

interface ProductResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    // ...other product fields
  };
}

const AddProductDialog = ({ open, onClose }: AddProductDialogProps) => {
  const { toast } = useToast();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    unit: "",
    images: [] as File[],
  });
  const [predictions, setPredictions] = useState<PricePrediction[]>([]);
  const [isPredicting, setIsPredicting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast({
        title: "Authorization Required",
        description: "Please login to add products",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Validate form data
      const requiredFields = [
        "name",
        "description",
        "category",
        "price",
        "quantity",
        "unit",
      ];
      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          throw new Error(`${field} is required`);
        }
      }

      if (formData.images.length === 0) {
        throw new Error("At least one image is required");
      }

      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "images" && Array.isArray(value)) {
          if (value.length === 0) {
            throw new Error("At least one image is required");
          }
          value.forEach((file: File) => {
            form.append("images", file);
          });
        } else {
          if (!value) {
            throw new Error(`${key} is required`);
          }
          form.append(key, value.toString());
        }
      });

      const apiClient = createApiClient(token);
      const { data } = await apiClient.post<ProductResponse>(
        ENDPOINTS.CREATE_PRODUCT,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast({
          title: "Success",
          description: "Product added successfully",
        });
        onClose();
      }
    } catch (error) {
      const err = error as Error;
      console.error("Add product error:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to add product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPricePredictions = useCallback(
    async (productName: string) => {
      if (!productName || !token) return;

      setIsPredicting(true);
      try {
        const apiClient = createApiClient(token);

        console.log("Making price prediction request with token:", {
          token: token.substring(0, 10) + "...",
          productName,
        });

        const { data } = await apiClient.get<PredictionApiResponse>(
          ENDPOINTS.PREDICT_PRICE,
          {
            params: {
              q: `${productName} ${formData.unit}`,
              category: formData.category,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data.predictions && Array.isArray(data.predictions)) {
          setPredictions(data.predictions);

          if (data.predictions.length > 0) {
            const prices = data.predictions
              .map((p) => parseFloat(p.price.replace(/[^0-9.]/g, "")))
              .filter((price) => !isNaN(price));

            if (prices.length > 0) {
              const avgPrice = (
                prices.reduce((a, b) => a + b, 0) / prices.length
              ).toFixed(2);

              setFormData((prev) => ({
                ...prev,
                price: avgPrice,
              }));

              toast({
                title: "Price Suggestion",
                description: `Average market price: ₹${avgPrice}`,
              });
            }
          }
        }
      } catch (error) {
        console.error("Price prediction error:", error);

        if (axios.isAxiosError(error) && error.response?.status === 401) {
          toast({
            title: "Authorization Error",
            description: "Your session has expired. Please login again.",
            variant: "destructive",
          });
          // Optionally trigger logout or refresh token
          return;
        }

        toast({
          title: "Price Prediction Failed",
          description: "Could not fetch price suggestions",
          variant: "destructive",
        });
      } finally {
        setIsPredicting(false);
      }
    },
    [token, formData.unit, formData.category, toast]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.name.length >= 3) {
        getPricePredictions(formData.name);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.name, getPricePredictions]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[95vh] overflow-y-auto w-[95vw] sm:w-full max-w-[95vw] sm:max-w-[600px] bg-gradient-to-b from-white to-gray-50/50 border-0 shadow-2xl rounded-xl sm:rounded-2xl">
        <DialogHeader className="pb-6 border-b border-gray-100">
          <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            Add New Product
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-2">
            Fill in the details to list your product
          </p>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 px-1">
          <form onSubmit={handleSubmit} className="space-y-6 py-2">
            {/* Product Name */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Tag className="h-4 w-4 text-green-600" />
                Product Name
              </label>
              <Input
                placeholder="e.g., Fresh Organic Tomatoes"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="h-12 border-gray-200 focus:border-green-400 focus:ring-green-200 rounded-lg bg-white shadow-sm transition-all duration-200"
              />
            </div>

            {/* Description */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Package className="h-4 w-4 text-green-600" />
                Description
              </label>
              <Textarea
                placeholder="Describe your product quality, origin, and special features..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                className="min-h-[100px] border-gray-200 focus:border-green-400 focus:ring-green-200 rounded-lg bg-white shadow-sm resize-none transition-all duration-200"
              />
            </div>

            {/* Category */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Scale className="h-4 w-4 text-green-600" />
                Category
              </label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="h-12 border-gray-200 focus:border-green-400 focus:ring-green-200 rounded-lg bg-white shadow-sm">
                  <SelectValue placeholder="Choose product category" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 shadow-lg rounded-lg">
                  <SelectItem
                    value="Vegetables"
                    className="hover:bg-green-50 cursor-pointer"
                  >
                    🥕 Vegetables
                  </SelectItem>
                  <SelectItem
                    value="Fruits"
                    className="hover:bg-green-50 cursor-pointer"
                  >
                    🍎 Fruits
                  </SelectItem>
                  <SelectItem
                    value="Grains"
                    className="hover:bg-green-50 cursor-pointer"
                  >
                    🌾 Grains
                  </SelectItem>
                  <SelectItem
                    value="Other"
                    className="hover:bg-green-50 cursor-pointer"
                  >
                    📦 Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price and Quantity Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  Price (₹)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                    className="h-12 border-gray-200 focus:border-green-400 focus:ring-green-200 rounded-lg bg-white shadow-sm pl-8"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    ₹
                  </span>
                </div>
                {isPredicting && (
                  <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-2 rounded-md">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing market prices...
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Package className="h-4 w-4 text-green-600" />
                  Quantity
                </label>
                <Input
                  type="number"
                  placeholder="Available quantity"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  required
                  className="h-12 border-gray-200 focus:border-green-400 focus:ring-green-200 rounded-lg bg-white shadow-sm"
                />
              </div>
            </div>

            {/* Unit */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Scale className="h-4 w-4 text-green-600" />
                Unit of Measurement
              </label>
              <Select
                value={formData.unit}
                onValueChange={(value) =>
                  setFormData({ ...formData, unit: value })
                }
              >
                <SelectTrigger className="h-12 border-gray-200 focus:border-green-400 focus:ring-green-200 rounded-lg bg-white shadow-sm">
                  <SelectValue placeholder="Select unit type" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 shadow-lg rounded-lg">
                  <SelectItem
                    value="Kilogram"
                    className="hover:bg-green-50 cursor-pointer"
                  >
                    ⚖️ Kilogram (kg)
                  </SelectItem>
                  <SelectItem
                    value="Piece"
                    className="hover:bg-green-50 cursor-pointer"
                  >
                    🔢 Piece (pcs)
                  </SelectItem>
                  <SelectItem
                    value="Packet"
                    className="hover:bg-green-50 cursor-pointer"
                  >
                    📦 Packet
                  </SelectItem>
                  <SelectItem
                    value="Other"
                    className="hover:bg-green-50 cursor-pointer"
                  >
                    ➕ Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Image Upload */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Camera className="h-4 w-4 text-green-600" />
                Product Images
              </label>
              <div className="relative">
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setFormData({ ...formData, images: files });
                  }}
                  className="h-12 border-gray-200 focus:border-green-400 focus:ring-green-200 rounded-lg bg-white shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 file:font-medium hover:file:bg-green-100 transition-all duration-200"
                />
                <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center gap-2 text-sm">
                {formData.images.length > 0 ? (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <Camera className="h-4 w-4" />
                    <span className="font-medium">
                      {formData.images.length} image(s) selected
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-500">
                    Upload high-quality product images
                  </span>
                )}
              </div>
            </div>

            {/* Price Predictions */}
            {predictions.length > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    <h3 className="font-semibold">Market Price Analysis</h3>
                    <span className="ml-auto bg-white/20 px-2 py-1 rounded-full text-xs">
                      {predictions.length} suggestions
                    </span>
                  </div>
                </div>
                <div className="max-h-[200px] overflow-y-auto">
                  {predictions.map((pred, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          price: pred.price.replace(/[^0-9.]/g, ""),
                        }));
                        toast({
                          description: `Price set to ${pred.price}`,
                        });
                      }}
                      className="p-4 hover:bg-white/70 cursor-pointer transition-all duration-200 border-b border-blue-100 last:border-b-0 flex justify-between items-center group"
                    >
                      <span
                        className="text-sm text-gray-700 group-hover:text-gray-900 font-medium truncate mr-4"
                        title={pred.title}
                      >
                        {pred.title}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-green-600 whitespace-nowrap">
                          {pred.price}
                        </span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs text-blue-600">
                            Click to use
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Action Buttons */}

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto h-12 border-gray-200 hover:bg-gray-50 text-gray-600 hover:text-gray-800 font-medium rounded-lg transition-all duration-200"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="w-full sm:w-auto h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Adding Product...
              </>
            ) : (
              <>
                <Package className="mr-2 h-5 w-5" />
                Add Product
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
