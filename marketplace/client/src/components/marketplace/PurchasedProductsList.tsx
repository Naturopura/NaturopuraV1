import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { createApiClient, ENDPOINTS } from "../../config/api";
import { formatEther, parseEther } from "ethers";
import {
  ShoppingCart,
  User,
  DollarSign,
  CalendarDays,
  BadgeCheck,
  Wallet,
  Eye,
  X,
  Package,
  MapPin,
  Hash,
  Info,
  TrendingUp,
  Filter,
  Search,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Toaster } from "../ui/toaster";

// Helper function to format amount as a currency string (assuming INR)
// The original formatEther function is not suitable for INR.
const formatAmountAsCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

interface Purchase {
  _id: string;
  productId: string | { _id: string };
  productName?: string;
  userId: string | { _id: string; email: string };
  address: string;
  pincode: number;
  shippingAddress?: {
    name?: string;
    phoneNumber?: string;
    street: string;
    city: string;
    state: string;
    pincode: string | number;
  };
  txHash: string;
  amount: number;
  paymentMethod: "crypto" | "test";
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  status: string;
  unit: number;
  quantity: number;
}

interface PurchasedProductsListProps {
  userRole?: "admin" | "delivery_partner" | "farmer";
}

const PurchasedProductsList = ({ userRole }: PurchasedProductsListProps) => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [filteredPurchases, setFilteredPurchases] = useState<Purchase[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  const handleViewDetails = async (purchase: Purchase | null) => {
    if (!purchase || !purchase._id) {
      toast({
        title: "Error",
        description: "Invalid purchase selected",
        variant: "destructive",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token") || "";
      const apiClient = createApiClient(token);
      const response = await apiClient.get(
        `${ENDPOINTS.GET_PURCHASES}/${purchase._id}`
      );
      if (response.data && response.data.data) {
        setSelectedPurchase(response.data.data);
      } else {
        setSelectedPurchase(purchase);
      }
    } catch (error) {
      console.error("Error fetching purchase details:", error);
      setSelectedPurchase(purchase);
    }
  };

  const handleCloseModal = () => {
    setSelectedPurchase(null);
  };

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiClient = createApiClient(token || "");
        let role = userRole;
        if (!role) {
          const userString = localStorage.getItem("user");
          if (userString) {
            try {
              const userObj = JSON.parse(userString);
              role =
                (userObj.role as "admin" | "delivery_partner" | "farmer") ||
                undefined;
            } catch {
              role = undefined;
            }
          }
        }
        let response;
        if (role === "delivery_partner") {
          response = await apiClient.get("/delivery-partner/available");
        } else if (role === "admin") {
          response = await apiClient.get(ENDPOINTS.GET_PURCHASES);
        } else {
          response = await apiClient.get(ENDPOINTS.GET_PURCHASES);
        }
        setPurchases(response.data);
        setFilteredPurchases(response.data);
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching purchases:", error);
        setError(
          "Failed to fetch purchases: " +
            (error.response?.data?.message || error.message || "Unknown error")
        );
        toast({
          title: "Error",
          description:
            "Failed to fetch purchased products: " +
            (error.response?.data?.message || error.message || "Unknown error"),
          variant: "destructive",
        });
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const apiClient = createApiClient(token || "");
        const response = await apiClient.get(ENDPOINTS.GET_PRODUCTS);
        setProducts(response.data);
      } catch (error) {
        setError("Failed to fetch products");
        toast({
          title: "Error",
          description: "Failed to fetch product details",
          variant: "destructive",
        });
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = purchases.filter(
      (purchase) => purchase && purchase.productId
    );

    if (searchTerm) {
      filtered = filtered.filter((purchase) => {
        if (!purchase || !purchase.productId) return false;

        const product = products.find(
          (p) =>
            p._id.toString() ===
            (typeof purchase.productId === "object"
              ? purchase.productId._id
              : purchase.productId)
        );
        const productName = product?.name?.toLowerCase() || "";
        const category = product?.category?.toLowerCase() || "";
        const userEmail = isUserObject(purchase.userId)
          ? purchase.userId.email.toLowerCase()
          : "";

        return (
          productName.includes(searchTerm.toLowerCase()) ||
          category.includes(searchTerm.toLowerCase()) ||
          userEmail.includes(searchTerm.toLowerCase())
        );
      });
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (purchase) => purchase.status === statusFilter
      );
    }

    setFilteredPurchases(filtered);
  }, [searchTerm, statusFilter, purchases, products]);

  function isUserObject(
    userId: any
  ): userId is { _id: string; email: string } {
    return (
      userId && typeof userId === "object" && "_id" in userId && "email" in userId
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "failed":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <BadgeCheck className="w-4 h-4" />;
      case "failed":
        return <X className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div
            className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1s" }}
          ></div>
        </div>
        <p className="text-gray-600 font-medium">
          Loading purchased products...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <X className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Error Loading Data
        </h3>
        <p className="text-red-600 max-w-md mx-auto">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pt-8">
      {/* Header Section */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl mb-4">
          <ShoppingCart className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Purchased Products
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Track and manage all purchased products with detailed information and
          real-time status updates.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">
                Total Purchases
              </p>
              <p className="text-2xl font-bold text-blue-700">
                {purchases.length}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl p-6 border border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-600 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold text-emerald-700">
                {purchases.filter((p) => p.status === "completed").length}
              </p>
            </div>
            <BadgeCheck className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-600 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold text-amber-700">
                {purchases.filter((p) => p.status === "pending").length}
              </p>
            </div>
            <Package className="w-8 h-8 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by product name, category, or user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white min-w-[150px]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredPurchases.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Products Found
          </h3>
          <p className="text-gray-600 max-w-sm mx-auto">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filter criteria."
              : "No purchased products available at the moment."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPurchases.map((purchase) => {
            const productIdStr =
              purchase.productId && typeof purchase.productId === "object"
                ? purchase.productId._id ?? ""
                : purchase.productId ?? "";
            const product = products.find(
              (p) => p._id.toString() === productIdStr.toString()
            );
            return (
              <div
                key={purchase._id}
                className="bg-white rounded-2xl shadow-lg shadow-gray-100 hover:shadow-xl hover:shadow-gray-200 p-6 border border-gray-100 transition-all duration-300 hover:scale-[1.02] group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <ShoppingCart className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">
                        {product?.name || "Unknown Product"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {product?.category}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      purchase.status
                    )}`}
                  >
                    {getStatusIcon(purchase.status)}
                    <span className="capitalize">{purchase.status}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6 text-sm sm:text-base">
                  <div className="flex items-center gap-3 text-gray-600">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="truncate">
                      {isUserObject(purchase.userId)
                        ? purchase.userId.email
                        : purchase.userId}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Wallet className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-900">
                      {formatAmountAsCurrency(purchase.amount)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="capitalize">
                      {purchase.paymentMethod}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600">
                    <CalendarDays className="w-4 h-4 text-gray-400" />
                    <span>
                      {new Date(purchase.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => handleViewDetails(purchase)}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                  <Link
                    to={`/admin/logistics/${purchase._id}`}
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Truck className="w-4 h-4" />
                    Track Logistics
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Details Modal */}
      {selectedPurchase && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-3xl shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                    <Info className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Purchase Details
                  </h3>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Product Details */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200 mb-6">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  Product Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-gray-900 text-lg mb-2">
                      {(() => {
                        const productIdStr =
                          selectedPurchase.productId &&
                          typeof selectedPurchase.productId === "object"
                            ? selectedPurchase.productId._id ?? ""
                            : selectedPurchase.productId ?? "";
                        return (
                          products.find(
                            (p) => p._id.toString() === productIdStr.toString()
                          )?.name || "Unknown Product"
                        );
                      })()}
                    </p>
                    <p className="text-gray-600 mb-3">
                      {(() => {
                        const productIdStr =
                          selectedPurchase.productId &&
                          typeof selectedPurchase.productId === "object"
                            ? selectedPurchase.productId._id ?? ""
                            : selectedPurchase.productId ?? "";
                        return (
                          products.find(
                            (p) => p._id.toString() === productIdStr.toString()
                          )?.description || "N/A"
                        );
                      })()}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-gray-700">
                        Category:
                      </span>{" "}
                      {(() => {
                        const productIdStr =
                          selectedPurchase.productId &&
                          typeof selectedPurchase.productId === "object"
                            ? selectedPurchase.productId._id ?? ""
                            : selectedPurchase.productId ?? "";
                        return (
                          products.find(
                            (p) => p._id.toString() === productIdStr.toString()
                          )?.category || "N/A"
                        );
                      })()}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Unit:</span>{" "}
                      {(() => {
                        const productIdStr =
                          selectedPurchase.productId &&
                          typeof selectedPurchase.productId === "object"
                            ? selectedPurchase.productId._id ?? ""
                            : selectedPurchase.productId ?? "";
                        return (
                          products.find(
                            (p) => p._id.toString() === productIdStr.toString()
                          )?.unit || "N/A"
                        );
                      })()}
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Quantity:
                      </span>{" "}
                      {(() => {
                        const productIdStr =
                          selectedPurchase.productId &&
                          typeof selectedPurchase.productId === "object"
                            ? selectedPurchase.productId._id ?? ""
                            : selectedPurchase.productId ?? "";
                        return (
                          products.find(
                            (p) => p._id.toString() === productIdStr.toString()
                          )?.quantity || "N/A"
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-emerald-600" />
                  Payment Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="mb-2">
                      <span className="font-medium text-gray-700">Amount:</span>{" "}
                      <span className="font-bold text-emerald-700">
                        {formatAmountAsCurrency(selectedPurchase.amount)}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="font-medium text-gray-700">
                        Payment Method:
                      </span>{" "}
                      <span className="capitalize">
                        {selectedPurchase.paymentMethod}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="font-medium text-gray-700">Status:</span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          selectedPurchase.status
                        )}`}
                      >
                        {getStatusIcon(selectedPurchase.status)}
                        <span className="capitalize">
                          {selectedPurchase.status}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-700">
                        Tx Hash:
                      </span>
                    </div>
                    <div className="mt-1 p-2 bg-gray-100 rounded-lg text-xs font-mono break-all">
                      {selectedPurchase.txHash}
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Delivery Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="mb-2">
                      <span className="font-medium text-gray-700">
                        Name:
                      </span>
                      <div className="p-3 bg-white/80 rounded-lg text-gray-900">
                        {selectedPurchase.shippingAddress?.name || "N/A"}
                      </div>
                    </div>
                    <div className="mb-2 mt-4">
                      <span className="font-medium text-gray-700">
                        Phone:
                      </span>
                      <div className="p-3 bg-white/80 rounded-lg text-gray-900">
                        {selectedPurchase.shippingAddress?.phoneNumber || "N/A"}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">
                      <span className="font-medium text-gray-700">
                        Street:
                      </span>
                      <div className="p-3 bg-white/80 rounded-lg text-gray-900">
                        {selectedPurchase.shippingAddress?.street || "N/A"}
                      </div>
                    </div>
                    <div className="mb-2 mt-4">
                      <span className="font-medium text-gray-700">
                        City:
                      </span>
                      <div className="p-3 bg-white/80 rounded-lg text-gray-900">
                        {selectedPurchase.shippingAddress?.city || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Additional Delivery Info */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">
                      State:
                    </span>
                    <div className="p-3 bg-white/80 rounded-lg text-gray-900">
                      {selectedPurchase.shippingAddress?.state || "N/A"}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Pincode:
                    </span>
                    <div className="p-3 bg-white/80 rounded-lg text-gray-900">
                      {selectedPurchase.shippingAddress?.pincode ??
                        selectedPurchase.pincode ??
                        "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-gray-600" />
                  Order Timeline
                </h4>
                <div className="text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span>
                      Order placed on{" "}
                      {new Date(selectedPurchase.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default PurchasedProductsList;