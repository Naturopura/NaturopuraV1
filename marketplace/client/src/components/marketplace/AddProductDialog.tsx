import { useState, useCallback, useEffect, useRef } from "react";
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
  Scale,
  Camera,
  TrendingUp,
  BadgeIndianRupee,
  X,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface PricePrediction {
  title: string;
  price: string;
  source: string;
}

interface PredictionApiResponse {
  predictions: PricePrediction[];
}

interface ProductResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
  };
}

interface FormData {
  name: string;
  description: string;
  category: string;
  price: string;
  quantity: string;
  unit: string;
  images: File[];
}

const INITIAL_FORM_STATE: FormData = {
  name: "",
  description: "",
  category: "",
  price: "",
  quantity: "",
  unit: "",
  images: [],
};

const CATEGORIES = [
  { value: "cereals_grains", label: "🌾 Cereals & Grains" },
  { value: "pulses_legumes", label: "🫘 Pulses & Legumes" },
  { value: "oilseeds", label: "🌻 Oilseeds" },
  { value: "fiber_crops", label: "�� Fiber Crops" },
  { value: "sugar_crops", label: "🍯 Sugar Crops" },
  { value: "vegetables", label: "🥕 Vegetables" },
  { value: "fruits", label: "🍎 Fruits" },
  { value: "beverage_crops", label: "☕ Beverage Crops" },
  { value: "cultivated_fungi", label: "🍄 Cultivated Fungi" },
  { value: "aquaculture", label: "🐟 Aquaculture" },
  { value: "farmed_animals", label: "🐄 Farmed Animals" },
  { value: "other", label: "📦 Other" },
];

const UNITS = [
  { value: "Kilogram", label: "⚖️ Kilogram (kg)" },
  { value: "Piece", label: "🔢 Piece (pcs)" },
  { value: "Packet", label: "📦 Packet" },
  { value: "Other", label: "➕ Other" },
];

const AddProductDialog = ({ open, onClose, onSuccess }: AddProductDialogProps) => {
  const { toast } = useToast();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [predictions, setPredictions] = useState<PricePrediction[]>([]);
  const [isPredicting, setIsPredicting] = useState(false);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_STATE);
    setPredictions([]);
    setImagePreviewUrls([]);
    setIsPredicting(false);
  }, []);

  const handleClose = useCallback(() => {
    if (!loading) {
      resetForm();
      onClose();
    }
  }, [loading, onClose, resetForm]);

  const validateForm = useCallback((): string | null => {
    if (!formData.name.trim()) return "Product name is required";
    if (!formData.description.trim()) return "Description is required";
    if (!formData.category) return "Please select a category";
    if (!formData.price || parseFloat(formData.price) <= 0) return "Please enter a valid price";
    if (!formData.quantity || parseFloat(formData.quantity) <= 0) return "Please enter a valid quantity";
    if (!formData.unit) return "Please select a unit";
    if (formData.images.length === 0) return "At least one image is required";
    return null;
  }, [formData]);

  const getPricePredictions = useCallback(
    async (productName: string) => {
      if (!productName || !token || productName.length < 3) return;

      setIsPredicting(true);
      try {
        const apiClient = createApiClient(token);
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

          if (data.predictions.length > 0 && !formData.price) {
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
        }
      } finally {
        setIsPredicting(false);
      }
    },
    [token, formData.unit, formData.category, formData.price, toast]
  );

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (formData.name.length >= 3 && formData.unit && formData.category) {
      debounceTimerRef.current = setTimeout(() => {
        getPricePredictions(formData.name);
      }, 800);
    } else {
      setPredictions([]);
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [formData.name, formData.unit, formData.category, getPricePredictions]);

  useEffect(() => {
    imagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));

    const newPreviewUrls = formData.images.map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreviewUrls(newPreviewUrls);

    return () => {
      newPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [formData.images]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setFormData({ ...formData, images: [...formData.images, ...files] });
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handlePriceSelect = (price: string) => {
    const numericPrice = price.replace(/[^0-9.]/g, "");
    setFormData((prev) => ({ ...prev, price: numericPrice }));
    toast({
      description: `Price set to ₹${numericPrice}`,
    });
  };

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

    const validationError = validateForm();
    if (validationError) {
      toast({
        title: "Validation Error",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const form = new FormData();
      form.append("name", formData.name.trim());
      form.append("description", formData.description.trim());
      form.append("category", formData.category);
      form.append("price", formData.price);
      form.append("quantity", formData.quantity);
      form.append("unit", formData.unit);

      formData.images.forEach((file) => {
        form.append("images", file);
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
        resetForm();
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Add product error:", error.message, error.response?.data);
        toast({
          title: "Error",
          description: error.response?.data?.message || error.message || "Failed to add product",
          variant: "destructive",
        });
      } else {
        const err = error as Error;
        console.error("Add product error:", err);
        toast({
          title: "Error",
          description: err.message || "Failed to add product",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="!max-h-[90vh] w-[95vw] sm:w-full max-w-[95vw] sm:max-w-[600px] bg-gradient-to-b from-white to-gray-50/50 border-0 shadow-2xl rounded-xl sm:rounded-2xl p-0 !flex !flex-col gap-0 !overflow-hidden">
        <DialogHeader className="pb-5 border-b border-gray-100 px-6 pt-6 flex-shrink-0">
          <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="h-6 w-6 text-[#707e22]" />
            </div>
            Add New Product
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-2">
            Fill in the details to list your product on the marketplace
          </p>
        </DialogHeader>

        <div
          className="overflow-y-auto overflow-x-hidden flex-1 px-6 min-h-0"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#8DA63F #f1f1f1'
          }}
          onWheel={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSubmit} className="space-y-5 py-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Tag className="h-4 w-4 text-green-600" />
                Product Name
                <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="e.g., Fresh Organic Tomatoes"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="h-11 border-gray-200 focus:border-green-400 focus:ring-green-200 rounded-lg bg-white shadow-sm transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Package className="h-4 w-4 text-green-600" />
                Description
                <span className="text-red-500">*</span>
              </label>
              <Textarea
                placeholder="Describe your product quality, origin, and special features..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                className="min-h-[90px] border-gray-200 focus:border-green-400 focus:ring-green-200 rounded-lg bg-white shadow-sm resize-none transition-all duration-200"
              />
              <p className="text-xs text-gray-500">
                {formData.description.length}/500 characters
              </p>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Scale className="h-4 w-4 text-green-600" />
                Category
                <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="h-11 border-gray-200 focus:border-green-400 focus:ring-green-200 rounded-lg bg-white shadow-sm">
                  <SelectValue placeholder="Choose product category" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 shadow-lg rounded-lg max-h-[300px] overflow-y-auto">
                  {CATEGORIES.map((cat) => (
                    <SelectItem
                      key={cat.value}
                      value={cat.value}
                      className="hover:bg-green-50 cursor-pointer"
                    >
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <BadgeIndianRupee className="h-4 w-4 text-green-600" />
                  Price (₹)
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                    className="h-11 border-gray-200 focus:border-green-400 focus:ring-green-200 rounded-lg bg-white shadow-sm pl-8"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    ₹
                  </span>
                </div>
                {isPredicting && (
                  <div className="flex items-center gap-2 text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded-md">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Analyzing market prices...
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Package className="h-4 w-4 text-green-600" />
                  Quantity
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Available quantity"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  required
                  className="h-11 border-gray-200 focus:border-green-400 focus:ring-green-200 rounded-lg bg-white shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Scale className="h-4 w-4 text-green-600" />
                Unit of Measurement
                <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.unit}
                onValueChange={(value) =>
                  setFormData({ ...formData, unit: value })
                }
              >
                <SelectTrigger className="h-11 border-gray-200 focus:border-green-400 focus:ring-green-200 rounded-lg bg-white shadow-sm">
                  <SelectValue placeholder="Select unit type" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 shadow-lg rounded-lg">
                  {UNITS.map((unit) => (
                    <SelectItem
                      key={unit.value}
                      value={unit.value}
                      className="hover:bg-green-50 cursor-pointer"
                    >
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Camera className="h-4 w-4 text-green-600" />
                Product Images
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="h-11 border-gray-200 focus:border-green-400 focus:ring-green-200 rounded-lg bg-white shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 file:font-medium hover:file:bg-green-100 transition-all duration-200"
                />
                <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>

              {formData.images.length > 0 ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="font-medium">
                      {formData.images.length} image(s) selected
                    </span>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {imagePreviewUrls.map((url, index) => (
                      <div
                        key={index}
                        className="relative group aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-green-400 transition-all duration-200"
                      >
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                  <ImageIcon className="h-4 w-4" />
                  <span>Upload high-quality product images</span>
                </div>
              )}
            </div>

            {predictions.length > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    <h3 className="font-semibold text-sm">Market Price Analysis</h3>
                    <span className="ml-auto bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
                      {predictions.length} suggestions
                    </span>
                  </div>
                </div>
                <div className="max-h-[180px] overflow-y-auto">
                  {predictions.map((pred, idx) => (
                    <div
                      key={idx}
                      onClick={() => handlePriceSelect(pred.price)}
                      className="px-4 py-3 hover:bg-white/70 cursor-pointer transition-all duration-200 border-b border-blue-100 last:border-b-0 flex justify-between items-center group"
                    >
                      <span
                        className="text-sm text-gray-700 group-hover:text-gray-900 font-medium truncate mr-4"
                        title={pred.title}
                      >
                        {pred.title}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-green-600 whitespace-nowrap">
                          {pred.price}
                        </span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <CheckCircle2 className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {formData.name.length >= 3 && formData.unit && formData.category && predictions.length === 0 && !isPredicting && (
              <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                <span>No market price data available for this product</span>
              </div>
            )}
          </form>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-5 pb-6 px-6 border-t border-gray-100 bg-white flex-shrink-0">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={loading}
            className="w-full sm:w-auto h-11 border-gray-200 hover:bg-gray-50 text-gray-600 hover:text-gray-800 font-medium rounded-lg transition-all duration-200"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="w-full sm:w-auto h-11 bg-gradient-to-r from-[#8DA63F] via-[#707e22] to-[#666e21] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
