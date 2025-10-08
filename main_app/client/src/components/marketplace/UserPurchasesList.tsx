import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createApiClient } from "../../config/api";
import {
  DollarSign,
  CalendarDays,
  Wallet,
  Eye,
  X,
  Package,
  MapPin,
  TrendingUp,
  Filter,
  Search,
  Phone,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

interface ShippingAddress {
  name: string;
  phoneNumber: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
  unit?: string;
  quantity?: number;
}

interface Purchase {
  _id: string;
  productId: Product;
  amount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
  shippingAddress: ShippingAddress;
  txHash?: string;
}

const UserPurchasesList: React.FC = () => {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [filteredPurchases, setFilteredPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchPurchases = async () => {
    try {
      const token = localStorage.getItem("token");
      const apiClient = createApiClient(token || "");
      const response = await apiClient.get("/payments/user/purchases");
      setPurchases(response.data.data);
      setFilteredPurchases(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching purchases:", error);
      setError("Failed to fetch user purchases.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  // Filter purchases based on search term and status
  useEffect(() => {
    let filtered = purchases;

    if (searchTerm) {
      filtered = filtered.filter((purchase) => {
        const productName = purchase.productId?.name?.toLowerCase() || "";
        const category = purchase.productId?.category?.toLowerCase() || "";
        
        return (
          productName.includes(searchTerm.toLowerCase()) ||
          category.includes(searchTerm.toLowerCase())
        );
      });
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (purchase) => purchase.status === statusFilter
      );
    }

    setFilteredPurchases(filtered);
  }, [searchTerm, statusFilter, purchases]);

  const handleViewDetails = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
  };

  const handleCloseModal = () => {
    setSelectedPurchase(null);
  };

  const handleTrackLogistics = (productId: string) => {
    navigate(`/farmer/logistics/${productId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "failed":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "failed":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center h-96 space-y-4">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Data</h3>
            <p className="text-red-600 max-w-md mx-auto">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Your Orders</h1>
          <p className="text-gray-600">Track and manage your purchase history</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{purchases.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {purchases.filter((p) => p.status === "completed").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {purchases.filter((p) => p.status === "pending").length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative sm:w-48">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredPurchases.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "You haven't made any purchases yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPurchases.map((purchase) => (
              <div key={purchase._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 sm:p-6">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div className="flex-1 mb-3 sm:mb-0">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-lg mb-1 truncate">
                            {purchase.productId?.name || "Unknown Product"}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {purchase.productId?.category}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <CalendarDays className="w-4 h-4" />
                              {new Date(purchase.createdAt).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              ₹{purchase.amount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(purchase.status)}`}>
                        {getStatusIcon(purchase.status)}
                        <span className="capitalize">{purchase.status}</span>
                      </span>
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleViewDetails(purchase)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      Order Details
                    </button>
                    
                    {purchase.status === "completed" && purchase.productId?._id && (
                      <button
                        onClick={() => handleTrackLogistics(purchase.productId._id)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-lg flex items-center justify-center gap-2 font-medium"
                      >
                        <Truck className="w-4 h-4" />
                        Track Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Details Modal */}
        {selectedPurchase && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Order Details</h3>
                <button
                  onClick={handleCloseModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Product Details */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Package className="w-5 h-5" />
                        Product Information
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium text-gray-900">{selectedPurchase.productId?.name}</p>
                          <p className="text-sm text-gray-600">{selectedPurchase.productId?.description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Category:</span>
                            <p>{selectedPurchase.productId?.category}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Unit:</span>
                            <p>{selectedPurchase.productId?.unit}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Quantity:</span>
                            <p>{selectedPurchase.productId?.quantity}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Price:</span>
                            <p className="font-semibold text-green-600">₹{selectedPurchase.amount}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Details */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Wallet className="w-5 h-5" />
                        Payment Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment Method:</span>
                          <span className="capitalize font-medium">{selectedPurchase.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPurchase.status)}`}>
                            {getStatusIcon(selectedPurchase.status)}
                            <span className="capitalize">{selectedPurchase.status}</span>
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Order Date:</span>
                          <span className="font-medium">{new Date(selectedPurchase.createdAt).toLocaleDateString()}</span>
                        </div>
                        {selectedPurchase.txHash && (
                          <div>
                            <span className="text-gray-600 block mb-1">Transaction Hash:</span>
                            <div className="p-2 bg-gray-100 rounded text-xs font-mono break-all">
                              {selectedPurchase.txHash}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Shipping Details */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Shipping Address
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Name:</span>
                          <p>{selectedPurchase.shippingAddress?.name || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            Phone:
                          </span>
                          <p>{selectedPurchase.shippingAddress?.phoneNumber || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Address:</span>
                          <div className="mt-1">
                            <p>{selectedPurchase.shippingAddress?.street}</p>
                            <p>{selectedPurchase.shippingAddress?.city}, {selectedPurchase.shippingAddress?.state}</p>
                            <p>PIN: {selectedPurchase.shippingAddress?.pincode}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Track Order Button */}
                    {selectedPurchase.status === "completed" && selectedPurchase.productId?._id && (
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <Truck className="w-5 h-5 text-blue-600" />
                          Order Tracking
                        </h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Track your order's journey with real-time updates.
                        </p>
                        <button
                          onClick={() => {
                            handleCloseModal();
                            handleTrackLogistics(selectedPurchase.productId._id);
                          }}
                          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                        >
                          <Truck className="w-4 h-4" />
                          Track Order
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPurchasesList;