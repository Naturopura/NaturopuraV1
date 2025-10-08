import React, { useEffect, useState } from "react";
import axios from "axios";
import { ENDPOINTS, API_BASE_URL } from "../../config/api";
import { Leaf, PackageSearch, TrendingUp, TrendingDown, DollarSign, Users, Package, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

interface Farmer {
  name: string;
  email: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  unit: string;
  images: string[];
  farmerId: Farmer;
}

interface MarketPriceData {
  [productId: string]: number;
}

const PricingInfo: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [marketPrices, setMarketPrices] = useState<MarketPriceData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}${ENDPOINTS.GET_PRODUCTS}`
        );
        let productList: Product[] = [];

        if (Array.isArray(response.data)) {
          productList = response.data;
        } else if (Array.isArray(response.data.data)) {
          productList = response.data.data;
        } else {
          console.error("Unexpected response shape:", response.data);
        }

        setProducts(productList);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchMarketPrices = async () => {
      const prices: MarketPriceData = {};

      for (const product of products) {
        try {
          const res = await axios.get(
            `${API_BASE_URL}${ENDPOINTS.PREDICT_PRICE}`,
            {
              params: { q: product.name },
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          const topPrediction = res.data.predictions?.[0];
          if (topPrediction?.price) {
            prices[product._id] = parseFloat(
              topPrediction.price.replace(/,/g, "")
            );
          }
        } catch (error) {
          console.error(`Error predicting price for ${product.name}:`, error);
        }
      }

      setMarketPrices(prices);
    };

    if (products.length > 0) {
      fetchMarketPrices();
    }
  }, [products]);

  if (loading) {
    return (
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Header Skeleton */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl p-4 md:p-8">
            <div className="flex items-center gap-3 md:gap-4 mb-4">
              <Skeleton className="h-10 w-10 md:h-12 md:w-12 rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 md:h-8 w-32 md:w-64" />
                <Skeleton className="h-3 md:h-4 w-24 md:w-48" />
              </div>
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="bg-white/60 backdrop-blur-lg">
                <CardContent className="p-3 md:p-6">
                  <Skeleton className="h-12 md:h-16 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Table Skeleton */}
          <Card className="bg-white/60 backdrop-blur-lg">
            <CardContent className="p-3 md:p-6">
              <div className="space-y-3 md:space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 md:h-16 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
    );
  }

  const totalProducts = products.length;
  const avgFarmerPrice = products.reduce((sum, p) => sum + p.price, 0) / totalProducts || 0;
  const avgMarketPrice = Object.values(marketPrices).reduce((sum, p) => sum + p, 0) / Object.values(marketPrices).length || 0;
  const totalSavings = products.reduce((sum, p) => {
    const marketPrice = marketPrices[p._id] || p.price;
    const finalRate = p.price - (p.price * 5) / 100;
    return sum + (marketPrice - finalRate);
  }, 0);

  // This function will render a product card for mobile view
  const renderProductCard = (product: Product, index: number) => {
    const marketPrice = marketPrices[product._id];
    const farmerPrice = product.price;
    const discountRate = 5;
    const finalRate = farmerPrice - (farmerPrice * discountRate) / 100;
    const savings = marketPrice ? marketPrice - finalRate : 0;
    const isAboveMarket = marketPrice && farmerPrice > marketPrice;

    return (
      <motion.div
        key={product._id}
        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
      >
        <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-green-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl group-hover:scale-110 transition-transform duration-200">
              <Package className="h-5 w-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
            <Badge variant="outline" className="text-xs">
              {product.farmerId.name}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 p-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500">Farm Price</p>
            <div>
              <p className="text-lg font-bold text-emerald-700">₹{farmerPrice.toFixed(2)}</p>
              {isAboveMarket && (
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-red-500" />
                  <span className="text-xs text-red-600">Above market</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500">Market Price</p>
            {marketPrice ? (
              <div>
                <p className="text-lg font-semibold text-blue-700">₹{marketPrice.toFixed(2)}</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-blue-500" />
                  <span className="text-xs text-blue-600">Live rate</span>
                </div>
              </div>
            ) : (
              <Badge variant="outline" className="text-xs mt-1">No data</Badge>
            )}
          </div>
          
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500">Discount</p>
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold">
              5% OFF
            </Badge>
          </div>
          
          <div className="space-y-1">
            <p className="text-xs font-medium text-gray-500">Final Rate</p>
            <div>
              <p className="text-lg font-bold text-green-700">₹{finalRate.toFixed(2)}</p>
              {savings > 0 && (
                <div className="flex items-center gap-1">
                  <TrendingDown className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600">Save ₹{savings.toFixed(0)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
      <div className="p-4 md:p-6 space-y-6 md:space-y-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          className="bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 rounded-3xl p-6 md:p-8 lg:p-12 text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-white/10 rounded-full -translate-y-16 md:-translate-y-32 translate-x-16 md:translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-24 md:w-48 h-24 md:h-48 bg-white/5 rounded-full translate-y-12 md:translate-y-24 -translate-x-12 md:-translate-x-24"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 md:mb-6">
              <div className="p-3 md:p-4 bg-white/20 rounded-2xl md:rounded-3xl backdrop-blur-sm inline-flex">
                <DollarSign className="h-6 w-6 md:h-10 md:w-10" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2">Pricing Dashboard</h1>
                <p className="text-base md:text-xl text-white/90">Smart pricing insights for your agricultural products</p>
              </div>
            </div>
            <p className="text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
              Track market trends, optimize your pricing strategy, and maximize your profits with real-time market data and analytics.
            </p>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {[
            {
              title: "Total Products",
              value: totalProducts.toString(),
              icon: Package,
              gradient: "from-blue-500 to-cyan-600",
              trend: "+12% this month"
            },
            {
              title: "Avg Farm Price",
              value: `₹${avgFarmerPrice.toFixed(0)}`,
              icon: Leaf,
              gradient: "from-green-500 to-emerald-600",
              trend: "Competitive rates"
            },
            {
              title: "Avg Market Price",
              value: `₹${avgMarketPrice.toFixed(0)}`,
              icon: TrendingUp,
              gradient: "from-purple-500 to-violet-600",
              trend: "+5% vs last week"
            },
            {
              title: "Total Savings",
              value: `₹${totalSavings.toFixed(0)}`,
              icon: Star,
              gradient: "from-orange-500 to-red-600",
              trend: "For customers"
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="bg-white/70 backdrop-blur-lg border-0 shadow-lg hover:shadow-xl transition-all duration-300 group h-full">
                <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-2 md:mb-4">
                    <div className={`p-2 md:p-3 bg-gradient-to-r ${stat.gradient} rounded-xl md:rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="h-4 w-4 md:h-6 md:w-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs whitespace-nowrap">
                      {stat.trend}
                    </Badge>
                  </div>
                  <div className="space-y-1 mt-auto">
                    <p className="text-xs md:text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {products.length === 0 ? (
          <motion.div 
            className="flex flex-col items-center justify-center py-10 md:py-20 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 md:p-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mb-4 md:mb-6">
              <PackageSearch className="h-12 w-12 md:h-20 md:w-20 text-gray-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">No Products Available</h3>
            <p className="text-gray-600 max-w-md px-4">
              Start adding your agricultural products to see pricing information and market analysis.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-4"
          >
            {/* Mobile Product Cards (visible on small screens) */}
            <div className="lg:hidden space-y-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg">
                    <Leaf className="h-4 w-4 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Product Pricing</h2>
                </div>
                <Badge variant="outline" className="text-xs">
                  {products.length} Products
                </Badge>
              </div>
              
              <div className="space-y-4">
                {products.map((product, index) => renderProductCard(product, index))}
              </div>
            </div>
            
            {/* Desktop Table (hidden on small screens) */}
            <Card className="hidden lg:block bg-white/70 backdrop-blur-lg border-0 shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl">
                      <Leaf className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900">Product Pricing Table</CardTitle>
                      <p className="text-gray-600">Detailed pricing breakdown for all your products</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-sm">
                    {products.length} Products
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-emerald-50 to-green-50 border-b">
                        <th className="px-4 md:px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Product</th>
                        <th className="px-4 md:px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">Farmer</th>
                        <th className="px-4 md:px-6 py-4 text-right text-sm font-bold text-gray-900 uppercase tracking-wider">Farm Price</th>
                        <th className="px-4 md:px-6 py-4 text-right text-sm font-bold text-gray-900 uppercase tracking-wider">Market Price</th>
                        <th className="px-4 md:px-6 py-4 text-center text-sm font-bold text-gray-900 uppercase tracking-wider">Discount</th>
                        <th className="px-4 md:px-6 py-4 text-right text-sm font-bold text-gray-900 uppercase tracking-wider">Final Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {products.map((product, index) => {
                        const marketPrice = marketPrices[product._id];
                        const farmerPrice = product.price;
                        const discountRate = 5;
                        const finalRate = farmerPrice - (farmerPrice * discountRate) / 100;
                        const savings = marketPrice ? marketPrice - finalRate : 0;
                        const isAboveMarket = marketPrice && farmerPrice > marketPrice;

                        return (
                          <motion.tr
                            key={product._id}
                            className="hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-green-50/50 transition-all duration-200 group"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.3 }}
                          >
                            <td className="px-4 md:px-6 py-4 md:py-6">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl group-hover:scale-110 transition-transform duration-200">
                                  <Package className="h-5 w-5 text-emerald-600" />
                                </div>
                                <div>
                                  <p className="font-bold text-gray-900 text-base md:text-lg">{product.name}</p>
                                  <p className="text-xs md:text-sm text-gray-500">{product.category}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 md:px-6 py-4 md:py-6">
                              <div className="flex items-center gap-2">
                                <div className="p-1 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full">
                                  <Users className="h-3 w-3 md:h-4 md:w-4 text-blue-600" />
                                </div>
                                <span className="font-medium text-gray-700 text-sm md:text-base">{product.farmerId.name}</span>
                              </div>
                            </td>
                            <td className="px-4 md:px-6 py-4 md:py-6 text-right">
                              <div className="space-y-1">
                                <span className="text-lg md:text-2xl font-bold text-emerald-700">₹{farmerPrice.toFixed(2)}</span>
                                {isAboveMarket && (
                                  <div className="flex items-center justify-end gap-1">
                                    <TrendingUp className="h-3 w-3 text-red-500" />
                                    <span className="text-xs text-red-600 font-medium">Above market</span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-4 md:px-6 py-4 md:py-6 text-right">
                              {marketPrice ? (
                                <div className="space-y-1">
                                  <span className="text-md md:text-xl font-semibold text-blue-700">₹{marketPrice.toFixed(2)}</span>
                                  <div className="flex items-center justify-end gap-1">
                                    <TrendingUp className="h-3 w-3 text-blue-500" />
                                    <span className="text-xs text-blue-600 font-medium">Live rate</span>
                                  </div>
                                </div>
                              ) : (
                                <Badge variant="outline" className="text-xs">No data</Badge>
                              )}
                            </td>
                            <td className="px-4 md:px-6 py-4 md:py-6 text-center">
                              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold">
                                5% OFF
                              </Badge>
                            </td>
                            <td className="px-4 md:px-6 py-4 md:py-6 text-right">
                              <div className="space-y-1">
                                <span className="text-lg md:text-2xl font-bold text-green-700">₹{finalRate.toFixed(2)}</span>
                                {savings > 0 && (
                                  <div className="flex items-center justify-end gap-1">
                                    <TrendingDown className="h-3 w-3 text-green-500" />
                                    <span className="text-xs text-green-600 font-medium">
                                      Save ₹{savings.toFixed(0)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
  );
};

export default PricingInfo;