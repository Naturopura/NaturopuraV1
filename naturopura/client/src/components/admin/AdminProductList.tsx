import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { Loader2, ImageOff, CheckCircle, XCircle, ChevronRight, Truck } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import ProductDetailsDialog from "./ProductDetailsDialog";
import { getImageUrl } from '../../utils/imageUtils';
import { Link } from "react-router-dom";

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
}

const AdminProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAvailable, setShowAvailable] = useState(true);
  const [showOutOfStock, setShowOutOfStock] = useState(true);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
      {/* Filter Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card
          className={`cursor-pointer transition-all duration-300 ease-in-out ${
            showAvailable
              ? "bg-green-50 shadow-md ring-2 ring-green-400"
              : "bg-gray-50 border border-gray-200 hover:shadow-sm"
          }`}
          onClick={() => setShowAvailable(!showAvailable)}
        >
          <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-5 lg:p-6">
            <div>
              <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold text-green-800">
                Available Products
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Show products currently in stock</p>
            </div>
            <CheckCircle
              className={`h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 transition-colors duration-300 ${
                showAvailable ? "text-green-600" : "text-gray-400"
              }`}
            />
          </CardHeader>
        </Card>

        <Card
          className={`cursor-pointer transition-all duration-300 ease-in-out ${
            showOutOfStock
              ? "bg-red-50 shadow-md ring-2 ring-red-400"
              : "bg-gray-50 border border-gray-200 hover:shadow-sm"
          }`}
          onClick={() => setShowOutOfStock(!showOutOfStock)}
        >
          <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-5 lg:p-6">
            <div>
              <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold text-red-800">
                Out of Stock
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Show products that are unavailable
              </p>
            </div>
            <XCircle
              className={`h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 transition-colors duration-300 ${
                showOutOfStock ? "text-red-600" : "text-gray-400"
              }`}
            />
          </CardHeader>
        </Card>
      </div>

      {/* Products List */}
      <Card className="shadow-xl overflow-hidden rounded-lg border border-gray-300">
        <CardHeader className="p-4 sm:p-6 lg:p-8 border-b border-gray-200 bg-gradient-to-r from-emerald-100 to-teal-100">
          <CardTitle className="text-lg sm:text-xl lg:text-2xl font-extrabold text-emerald-900 tracking-wide">
            Listed Products ({filteredProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Desktop/Tablet View */}
          <div className="overflow-x-auto shadow-lg rounded-lg md:rounded-b-lg">
            <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg md:rounded-b-lg">
              <thead className="bg-gradient-to-r from-emerald-200 to-teal-200 rounded-t-lg md:rounded-t-none">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">Product</th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">Farmer</th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">Logistics</th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">Price</th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">Category</th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">Stock</th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-600 text-sm italic">
                      No products found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-emerald-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-md bg-gray-100 overflow-hidden flex-shrink-0 border border-emerald-300 shadow-inner">
                            {product.images?.[0] ? (
                              <img
                                src={getImageUrl(product.images[0])}
                                alt={product.name}
                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null; // Prevent infinite loop
                                  target.src = '/placeholder.png'; // Replace with your placeholder image
                                  console.error('Image load error:', product.images[0]);
                                }}
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center">
                                <ImageOff className="h-6 w-6 text-emerald-400" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-emerald-900 text-base">{product.name}</div>
                            <div className="text-xs text-emerald-700 line-clamp-1 max-w-[220px]">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="font-semibold text-emerald-900 text-sm">{product.farmerId.name}</div>
                        <div className="text-xs text-emerald-700">{product.farmerId.email}</div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/admin/logistics/${product._id}`}
                            className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors shadow-sm"
                          >
                            <Truck className="h-4 w-4 mr-1" />
                            Logistics
                          </Link>
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="font-semibold text-emerald-900 text-sm">₹{product.price.toLocaleString()}</div>
                        <div className="text-xs text-emerald-700">per {product.unit}</div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap capitalize text-sm text-emerald-800">{product.category}</td>
                      <td className="py-4 px-6 whitespace-nowrap text-sm text-emerald-800">
                        {product.quantity.toLocaleString()} {product.unit}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize 
                          ${
                            product.status === "available"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.status === "available" ? (
                            <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                          ) : (
                            <XCircle className="h-3 w-3 text-red-600 mr-1" />
                          )}
                          {product.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden divide-y divide-gray-100">
            {filteredProducts.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No products found matching your filters.
                </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="p-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between gap-3"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="flex items-start gap-3 flex-grow min-w-0">
                    <div className="h-16 w-16 rounded-md bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                      {product.images?.[0] ? (
                        <img
                          src={getImageUrl(product.images[0])}
                          alt={product.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = '/placeholder.png';
                            console.error('Image load error:', product.images[0]);
                          }}
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <ImageOff className="h-7 w-7 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-semibold text-gray-900 truncate text-base">{product.name}</div>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize 
                          ${
                            product.status === "available"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          } flex-shrink-0`}
                        >
                          {product.status === "available" ? (
                            <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                          ) : (
                            <XCircle className="h-3 w-3 text-red-600 mr-1" />
                          )}
                          {product.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 line-clamp-1">
                        {product.description}
                      </div>
                      <div className="flex items-center justify-between text-sm pt-1">
                        <div className="text-gray-900 font-medium">
                          ₹{product.price.toLocaleString()}
                          <span className="text-gray-500 text-xs ml-1">/{product.unit}</span>
                        </div>
                        <div className="text-gray-700 text-sm">
                          Stock: {product.quantity.toLocaleString()} {product.unit}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 pt-0.5">
                        <span className="font-medium">By:</span> <span className="truncate">{product.farmerId.name}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <ProductDetailsDialog
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default AdminProductList;