import React, { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { createApiClient, ENDPOINTS } from "../../config/api";
import { getImageUrl } from "../../utils/imageUtils";
import { useNavigate } from "react-router-dom";
import {
  ImageOff,
  CheckCircle,
  XCircle,
  Truck,
  Package,
  MapPin,
  Edit3,
  Save,
  X,
  User,
  Calendar,
  Tag,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  category: string;
  images: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  farmerId: {
    name: string;
    email: string;
  };
  // Store manager specific fields
  arrival_status?: "pending" | "arrived";
  arrivalDate?: string;
  shipping_status?: "pending" | "shipped" | "delivered";
  shippedDate?: string;
  deliveredDate?: string;
  vehicle_number?: string;
  origin?: string;
  destination?: string;
}

interface StoreManagerProduct {
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  unit: string;
  seller: {
    name: string;
    contact: string;
  };
  status: "in progress" | "delivered";
  _id: string;
  createdAt?: string;
  deliveredAt?: string;
}

const StoreManagerDashboard: React.FC = () => {
  // All products from the system (like AdminProductList)
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  // Store manager specific products
  const [_storeProducts, setStoreProducts] = useState<StoreManagerProduct[]>([]);
  
  // UI States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all-products" | "store-products" | "analytics">("all-products");
  const [showAvailable] = useState(true);
  const [showOutOfStock] = useState(true);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editData, setEditData] = useState<{
    vehicle_number: string;
    origin: string;
    destination: string;
  }>({ vehicle_number: "", origin: "", destination: "" });

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get("api/products");
      const data = Array.isArray(response.data) ? response.data : response.data.products;
      if (Array.isArray(data)) {
        setAllProducts(data);
        setFilteredProducts(data);
      }
    } catch (err) {
      console.error("Error fetching all products:", err);
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const api = createApiClient(token || undefined);
      const res = await api.get(ENDPOINTS.GET_STORE_MANAGER_DASHBOARD_STATS);
      setStoreProducts(res.data.products || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    fetchStats();
  }, []);

  useEffect(() => {
    const statusFilters: string[] = [];
    if (showAvailable) statusFilters.push("available");
    if (showOutOfStock) statusFilters.push("out_of_stock");

    const filtered = allProducts.filter((product) =>
      statusFilters.includes(product.status)
    );
    setFilteredProducts(filtered);
  }, [showAvailable, showOutOfStock, allProducts]);

  // Product status management functions
  const handleArrivalStatusChange = async (productId: string, status: "pending" | "arrived") => {
    try {
      const token = localStorage.getItem("token");
      const api = createApiClient(token || undefined);
      await api.put(`/store-manager/products/${productId}/arrival-status`, { arrival_status: status });
      fetchAllProducts(); // Refresh the list
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update arrival status");
    }
  };

  const handleShippingStatusChange = async (productId: string, status: "pending" | "shipped" | "delivered") => {
    try {
      const token = localStorage.getItem("token");
      const api = createApiClient(token || undefined);
      await api.put(`/store-manager/products/${productId}/shipping-status`, { shipping_status: status });
      fetchAllProducts(); // Refresh the list
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update shipping status");
    }
  };

  const handleEditShippingDetails = (product: Product) => {
    setEditingProduct(product._id);
    setEditData({
      vehicle_number: product.vehicle_number || "",
      origin: product.origin || "",
      destination: product.destination || ""
    });
  };

  const handleSaveShippingDetails = async (productId: string) => {
    try {
      const token = localStorage.getItem("token");
      const api = createApiClient(token || undefined);
      await api.put(`/store-manager/products/${productId}/shipping-details`, editData);
      setEditingProduct(null);
      fetchAllProducts(); // Refresh the list
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update shipping details");
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setEditData({ vehicle_number: "", origin: "", destination: "" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-transparent border-t-blue-600 border-r-purple-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-b-pink-600 border-l-indigo-600 rounded-full animate-spin animate-reverse"></div>
          <div className="absolute inset-3 w-18 h-18 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
          <div className="mt-8 text-slate-700 font-semibold text-lg">Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Logout Button */}
      <div className="absolute top-8 right-8 z-20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:from-pink-700 hover:to-blue-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
          </svg>
          Logout
        </button>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Premium Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-2xl mb-6 transform hover:scale-110 transition-all duration-300">
            <Package className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 tracking-tight">
            Store Manager
          </h1>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Comprehensive product and inventory management dashboard
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-red-50 to-pink-50 border-l-8 border-red-500 p-8 rounded-2xl shadow-2xl mb-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-bold text-red-800 mb-2">Something went wrong</h3>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("all-products")}
            className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
              activeTab === "all-products"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl"
                : "bg-white/80 text-slate-700 hover:bg-white shadow-lg"
            }`}
          >
            All Products ({filteredProducts.length})
          </button>
        </div>

        {/* All Products Tab */}
        {activeTab === "all-products" && (
          <div className="space-y-8">

            {/* Products Header */}
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-black text-white mb-2">
                    Product Inventory
                  </h2>
                  <p className="text-emerald-100 text-lg font-medium">
                    Manage all listed products with advanced controls
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
                  <div className="text-3xl font-black text-white">{filteredProducts.length}</div>
                  <div className="text-emerald-100 text-sm font-medium">Total Products</div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white/80 rounded-3xl shadow-xl">
                  <Package className="h-24 w-24 text-gray-300 mb-6" />
                  <h3 className="text-2xl font-bold text-gray-500 mb-2">No Products Found</h3>
                  <p className="text-gray-400 text-center max-w-md">
                    No products match your current filters. Try adjusting your filter settings.
                  </p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden hover:shadow-3xl hover:scale-105 transition-all duration-500 group"
                  >
                    {/* Product Image & Status */}
                    <div className="relative h-64 overflow-hidden">
                      {product.images?.[0] ? (
                        <img
                          src={getImageUrl(product.images[0])}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = '/placeholder.png';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <ImageOff className="h-16 w-16 text-gray-400" />
                        </div>
                      )}
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span
                          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                            product.status === "available"
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {product.status === "available" ? (
                            <CheckCircle className="h-4 w-4 mr-2" />
                          ) : (
                            <XCircle className="h-4 w-4 mr-2" />
                          )}
                          {product.status === "available" ? "Available" : "Out of Stock"}
                        </span>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-500 text-white shadow-lg">
                          <Tag className="h-3 w-3 mr-1" />
                          {product.category}
                        </span>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-6 space-y-4">
                      {/* Product Info */}
                      <div>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-2xl font-bold text-gray-900 line-clamp-1">
                            {product.name}
                          </h3>
                        </div>
                        
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                          {product.description}
                        </p>
                        
                        {/* Price & Stock */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl">
                            <div className="text-2xl font-black">₹{product.price.toLocaleString()}</div>
                            <div className="text-xs opacity-90">per {product.unit}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-gray-800">{product.quantity.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">{product.unit} in stock</div>
                          </div>
                        </div>

                        {/* Farmer Info */}
                        <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{product.farmerId.name}</div>
                              <div className="text-sm text-gray-600">{product.farmerId.email}</div>
                            </div>
                          </div>
                        </div>

                        {/* Store Actions Dropdown */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                              <Package className="h-5 w-5" />
                              Store Actions
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent 
                            side="bottom" 
                            align="center" 
                            sideOffset={8}
                            className="w-80 bg-white border border-gray-200 shadow-xl z-50 rounded-xl"
                          >
                            <DropdownMenuLabel className="font-bold text-gray-800 flex items-center gap-2 py-3">
                              <Package className="h-4 w-4" />
                              Store Management
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            
                            {/* Arrival Status Section */}
                            <div className="px-4 py-3">
                              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                                Arrival Status
                              </div>
                              <div className="flex items-center justify-between mb-3">
                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                                  product.arrival_status === "arrived" 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-yellow-100 text-yellow-800"
                                }`}>
                                  {product.arrival_status === "arrived" ? "Arrived" : "Pending"}
                                </span>
                              </div>
                              {product.arrival_status === "arrived" && product.arrivalDate && (
                                <div className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  Arrived on {new Date(product.arrivalDate).toLocaleDateString()}
                                </div>
                              )}
                              {product.arrival_status !== "arrived" && (
                                <DropdownMenuItem
                                  onClick={() => handleArrivalStatusChange(product._id, "arrived")}
                                  className="text-green-600 font-medium hover:bg-green-50 cursor-pointer"
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark as Arrived
                                </DropdownMenuItem>
                              )}
                            </div>
                            
                            <DropdownMenuSeparator />
                            
                            {/* Shipping Status Section */}
                            <div className="px-4 py-3">
                              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                                Shipping Status
                              </div>
                              <div className="flex items-center justify-between mb-3">
                                <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                                  product.shipping_status === "delivered" 
                                    ? "bg-green-100 text-green-800"
                                    : product.shipping_status === "shipped"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}>
                                  {product.shipping_status === "delivered" 
                                    ? "Delivered" 
                                    : product.shipping_status === "shipped" 
                                    ? "Shipped" 
                                    : "Pending"}
                                </span>
                              </div>
                              
                              {/* Date Information */}
                              {product.shipping_status === "shipped" && product.shippedDate && (
                                <div className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  Shipped: {new Date(product.shippedDate).toLocaleDateString()}
                                </div>
                              )}
                              {product.shipping_status === "delivered" && product.deliveredDate && (
                                <div className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  Delivered: {new Date(product.deliveredDate).toLocaleDateString()}
                                </div>
                              )}

                              {/* Action Items */}
                              {product.shipping_status !== "delivered" && (
                                <div className="space-y-2">
                                  {product.shipping_status !== "shipped" && (
                                    <DropdownMenuItem
                                      onClick={() => handleShippingStatusChange(product._id, "shipped")}
                                      className="text-blue-600 font-medium hover:bg-blue-50 cursor-pointer"
                                    >
                                      <Truck className="h-4 w-4 mr-2" />
                                      Mark as Shipped
                                    </DropdownMenuItem>
                                  )}
                                  {product.shipping_status === "shipped" && (
                                    <DropdownMenuItem
                                      onClick={() => handleShippingStatusChange(product._id, "delivered")}
                                      className="text-green-600 font-medium hover:bg-green-50 cursor-pointer"
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Mark as Delivered
                                    </DropdownMenuItem>
                                  )}
                                </div>
                              )}
                            </div>
                            
                            <DropdownMenuSeparator />
                            
                            {/* Shipping Details Section */}
                            <div className="px-4 py-3">
                              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                                Shipping Details
                              </div>
                              
                              {editingProduct === product._id ? (
                                <div className="space-y-3">
                                  <input
                                    type="text"
                                    placeholder="Vehicle Number"
                                    value={editData.vehicle_number}
                                    onChange={(e) => setEditData(prev => ({ ...prev, vehicle_number: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Origin"
                                    value={editData.origin}
                                    onChange={(e) => setEditData(prev => ({ ...prev, origin: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Destination"
                                    value={editData.destination}
                                    onChange={(e) => setEditData(prev => ({ ...prev, destination: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  />
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleSaveShippingDetails(product._id)}
                                      className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                                    >
                                      <Save className="h-4 w-4" />
                                      Save
                                    </button>
                                    <button
                                      onClick={handleCancelEdit}
                                      className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                                    >
                                      <X className="h-4 w-4" />
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="space-y-2 mb-3">
                                    {product.vehicle_number ? (
                                      <div className="text-sm text-gray-700 flex items-center gap-2">
                                        <Truck className="h-4 w-4 text-blue-600" />
                                        <span className="font-medium">Vehicle:</span>
                                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-bold">
                                          {product.vehicle_number}
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="text-sm text-gray-500 italic">No vehicle assigned</div>
                                    )}
                                    
                                    {product.origin && product.destination ? (
                                      <div className="text-sm text-gray-700 flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-green-600" />
                                        <span className="font-medium">Route:</span>
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs font-bold">
                                          {product.origin} → {product.destination}
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="text-sm text-gray-500 italic">No route set</div>
                                    )}
                                  </div>
                                  
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleEditShippingDetails(product);
                                    }}
                                    className="text-purple-600 font-medium hover:bg-purple-50 cursor-pointer"
                                  >
                                    <Edit3 className="h-4 w-4 mr-2" />
                                    Edit Shipping Details
                                  </DropdownMenuItem>
                                </>
                              )}
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreManagerDashboard;