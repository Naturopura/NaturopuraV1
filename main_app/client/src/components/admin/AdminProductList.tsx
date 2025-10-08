import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import {  ImageOff,  XCircle,  Truck, Package, MapPin, Calendar,  User, Eye } from "lucide-react";

import ProductDetailsDialog from "./ProductDetailsDialog";
import { getImageUrl } from '../../utils/imageUtils';

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
  // Extended fields for logistics tracking
  arrival_status?: "pending" | "arrived";
  arrivalDate?: string;
  shipping_status?: "pending" | "shipped" | "delivered";
  shippedDate?: string;
  deliveredDate?: string;
  vehicle_number?: string;
  origin?: string;
  destination?: string;
}

const AdminProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAvailable] = useState(true);
  const [showOutOfStock] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.products;
      if (Array.isArray(data)) {
        setProducts(data);
        setFilteredProducts(data);
      } else {
        setError("Invalid data format received");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const statusFilters: string[] = [];
    if (showAvailable) statusFilters.push("available");
    if (showOutOfStock) statusFilters.push("out_of_stock");

    const filtered = products.filter((product) =>
      statusFilters.includes(product.status)
    );
    setFilteredProducts(filtered);
  }, [showAvailable, showOutOfStock, products]);

  // const getStatusBadge = (status: string | undefined, type: 'arrival' | 'shipping') => {
  //   if (!status) return null;
    
  //   const configs = {
  //     arrival: {
  //       arrived: { bg: 'bg-gradient-to-r from-emerald-500 to-green-600', text: 'text-white', icon: CheckCircle, shadow: 'shadow-emerald-200' },
  //       pending: { bg: 'bg-gradient-to-r from-amber-500 to-orange-600', text: 'text-white', icon: Clock, shadow: 'shadow-amber-200' }
  //     },
  //     shipping: {
  //       delivered: { bg: 'bg-gradient-to-r from-emerald-500 to-green-600', text: 'text-white', icon: CheckCircle, shadow: 'shadow-emerald-200' },
  //       shipped: { bg: 'bg-gradient-to-r from-blue-500 to-indigo-600', text: 'text-white', icon: Truck, shadow: 'shadow-blue-200' },
  //       pending: { bg: 'bg-gradient-to-r from-slate-400 to-gray-500', text: 'text-white', icon: Clock, shadow: 'shadow-gray-200' }
  //     }
  //   };

  //   const config = configs[type][status as keyof typeof configs[typeof type]];
  //   if (!config) return null;

  //   const IconComponent = config.icon;
    
  //   return (
  //     <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${config.bg} ${config.text} shadow-lg ${config.shadow}`}>
  //       <IconComponent className="h-3 w-3 mr-1.5" />
  //       {status.charAt(0).toUpperCase() + status.slice(1)}
  //     </span>
  //   );
  // };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-transparent border-t-blue-600 border-r-purple-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-b-pink-600 border-l-indigo-600 rounded-full animate-spin animate-reverse"></div>
          <div className="absolute inset-2 w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
          <div className="mt-8 text-slate-700 font-semibold text-lg">Loading products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Products</h3>
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Premium Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-naturopura-gradient text-white rounded-2xl shadow-2xl mb-6 transform hover:scale-110 transition-all duration-300">
            <Package className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-6xl font-black text-naturopura-gradient mb-4 tracking-tight">
            Product Management
          </h1>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Comprehensive overview of all products with advanced logistics tracking
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Products Header */}
        <div className="bg-naturopura-gradient text-white rounded-3xl p-8 shadow-2xl mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-black text-white mb-2">
                Product Inventory
              </h2>
              <p className="text-blue-100 text-lg font-medium">
                Complete overview with logistics tracking
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4">
              <div className="text-3xl font-black text-white">{filteredProducts.length}</div>
              <div className="text-blue-100 text-sm font-medium">Total Products</div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl">
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
                className="flex flex-col h-full min-h-[540px] bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                {/* Product Image & Status */}
                <div className="relative h-48 overflow-hidden shrink-0">
                  {product.images?.[0] ? (
                    <img
                      src={getImageUrl(product.images[0])}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/placeholder.png';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                      <ImageOff className="h-12 w-12 text-gray-300" />
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex flex-col flex-1 p-4 space-y-3">
                  {/* Product Name & Description */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  
                  {/* Price & Stock Row */}
                  <div className="flex items-center justify-between">
                    <div className="bg-emerald-50 border border-emerald-200 naturopura-text px-3 py-2 rounded-lg">
                      <div className="text-lg font-bold">₹{product.price.toLocaleString()}</div>
                      <div className="text-xs text-black">per {product.unit}</div>
                    </div>
                  
                  </div>

                  {/* Farmer Info */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-naturopura-gradient rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-gray-900 text-sm truncate">{product.farmerId.name}</div>
                        <div className="text-xs text-gray-600 truncate">{product.farmerId.email}</div>
                      </div>
                    </div>
                  </div>

                  {/* Compact Logistics Status */}
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="h-4 w-4 text-slate-600" />
                      <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Logistics</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-600 text-xs">Arrival:</span>
                          <span className={`font-semibold text-xs ${
                            product.arrival_status === 'arrived' ? 'text-emerald-600' : 
                            product.arrival_status === 'pending' ? 'text-amber-600' : 'text-gray-400'
                          }`}>
                            {product.arrival_status === 'arrived' ? '✓ Arrived' : 
                             product.arrival_status === 'pending' ? '○ Pending' : 'N/A'}
                          </span>
                        </div>
                        {product.arrivalDate && (
                          <div className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(product.arrivalDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-600 text-xs">Shipping:</span>
                          <span className={`font-semibold text-xs ${
                            product.shipping_status === 'delivered' ? 'text-emerald-600' : 
                            product.shipping_status === 'shipped' ? 'text-blue-600' :
                            product.shipping_status === 'pending' ? 'text-amber-600' : 'text-gray-400'
                          }`}>
                            {product.shipping_status === 'delivered' ? '✓ Delivered' : 
                             product.shipping_status === 'shipped' ? '→ Shipped' :
                             product.shipping_status === 'pending' ? '○ Pending' : 'N/A'}
                          </span>
                        </div>
                        <div className="space-y-1">
                          {product.shippedDate && (
                            <div className="flex items-center gap-1 text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded">
                              <Calendar className="h-3 w-3" />
                              <span>Shipped: {new Date(product.shippedDate).toLocaleDateString()}</span>
                            </div>
                          )}
                          {product.deliveredDate && (
                            <div className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                              <Calendar className="h-3 w-3" />
                              <span>Delivered: {new Date(product.deliveredDate).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Vehicle & Route - Only if available */}
                    {(product.vehicle_number || (product.origin && product.destination)) && (
                      <div className="mt-2 pt-2 border-t border-slate-200">
                        {product.vehicle_number && (
                          <div className="flex items-center gap-1 text-xs text-gray-600 mb-1">
                            <Truck className="h-3 w-3" />
                            <span className="font-medium">{product.vehicle_number}</span>
                          </div>
                        )}
                        {product.origin && product.destination && (
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{product.origin} → {product.destination}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-auto">
                    {/* View Details Button */}
                    <button className="w-full bg-naturopura-gradient text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                      <Eye className="h-4 w-4" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ProductDetailsDialog
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default AdminProductList;