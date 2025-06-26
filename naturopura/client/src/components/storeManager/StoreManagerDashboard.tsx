import React, { useEffect, useState } from "react";
import { createApiClient, ENDPOINTS } from "../../config/api";
import { useNavigate } from "react-router-dom";

interface Product {
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

interface Vehicle {
  _id: string;
  vehicleNumber: string;
  // add other fields if needed
}

const StoreManagerDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [exportToday, setExportToday] = useState(0);
  const [importToday, setImportToday] = useState(0);
  const [exportMonth, setExportMonth] = useState(0);
  const [importMonth, setImportMonth] = useState(0);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    unit: "",
    sellerName: "",
    sellerContact: "",
    status: "in progress"
  });
  const [vehicleForm, setVehicleForm] = useState({ vehicleNumber: "" });
  const [exportImportForm, setExportImportForm] = useState({ type: "export", count: "" });

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Optionally clear other user/session data here
    navigate("/login");
  };

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const api = createApiClient(token || undefined);
      const res = await api.get(ENDPOINTS.GET_STORE_MANAGER_DASHBOARD_STATS);
      setProducts(res.data.products || []);
      setExportToday(res.data.exportToday || 0);
      setImportToday(res.data.importToday || 0);
      setExportMonth(res.data.exportMonth || 0);
      setImportMonth(res.data.importMonth || 0);
      setVehicleCount(res.data.vehicleCount || 0);
      setVehicles(res.data.vehicles || []); // <-- Add this line
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !productForm.name ||
      !productForm.description ||
      !productForm.category ||
      !productForm.price ||
      isNaN(Number(productForm.price)) ||
      !productForm.quantity ||
      isNaN(Number(productForm.quantity)) ||
      !productForm.unit ||
      !productForm.sellerName ||
      !productForm.sellerContact
    ) {
      setError("All fields are required and must be valid.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const api = createApiClient(token || undefined);
      await api.post("/store-manager/products", {
        name: productForm.name,
        description: productForm.description,
        category: productForm.category,
        price: Number(productForm.price),
        quantity: Number(productForm.quantity),
        unit: productForm.unit,
        seller: { name: productForm.sellerName, contact: productForm.sellerContact },
        status: productForm.status
      });
      setProductForm({
        name: "",
        description: "",
        category: "",
        price: "",
        quantity: "",
        unit: "",
        sellerName: "",
        sellerContact: "",
        status: "in progress"
      });
      fetchStats();
    } catch (err: any) {
      setError(
        err?.response?.data?.errors?.[0]?.msg ||
        err?.response?.data?.message ||
        "Failed to add product"
      );
    }
  };

  const handleVehicleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const api = createApiClient(token || undefined);
      await api.post("/store-manager/vehicles", { vehicleNumber: vehicleForm.vehicleNumber });
      setVehicleForm({ vehicleNumber: "" });
      fetchStats();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to add vehicle");
    }
  };

  const handleExportImportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const api = createApiClient(token || undefined);
      await api.post("/store-manager/export-import", {
        type: exportImportForm.type,
        count: Number(exportImportForm.count)
      });
      setExportImportForm({ type: "export", count: "" });
      fetchStats();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to add record");
    }
  };

  const handleStatusChange = async (productId: string, newStatus: "in progress" | "delivered") => {
    try {
      const token = localStorage.getItem("token");
      const api = createApiClient(token || undefined);
      await api.put(ENDPOINTS.UPDATE_STORE_MANAGER_PRODUCT_STATUS(productId), { status: newStatus });
      fetchStats();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update status");
    }
  };

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
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 tracking-tight">
            Store Manager
          </h1>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Transform your inventory management with our premium dashboard experience
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-transparent border-t-blue-600 border-r-purple-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-b-pink-600 border-l-indigo-600 rounded-full animate-spin animate-reverse"></div>
              <div className="absolute inset-3 w-18 h-18 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
              <div className="mt-8 text-slate-700 font-semibold text-lg">Loading your dashboard...</div>
            </div>
          </div>
        ) : error ? (
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
        ) : (
          <div className="grid grid-cols-1 2xl:grid-cols-3 gap-8">
            <>
              {/* Products Section - Takes 2 columns on 2xl screens */}
              <div className="2xl:col-span-2 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden hover:shadow-3xl transition-all duration-500">
                <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-700/90"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white flex items-center">
                      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      Product Management Hub
                    </h3>
                    <p className="text-blue-100 mt-2 font-medium">Manage your inventory with precision and style</p>
                  </div>
                </div>
                
                <div className="p-8">
                  <form onSubmit={handleProductSubmit} className="space-y-6 mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Product Name</label>
                        <input
                          type="text"
                          placeholder="Enter product name"
                          value={productForm.name}
                          onChange={e => setProductForm(f => ({ ...f, name: e.target.value }))}
                          required
                          className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-slate-300 placeholder-slate-400 font-medium"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Category</label>
                        <input
                          type="text"
                          placeholder="Product category"
                          value={productForm.category}
                          onChange={e => setProductForm(f => ({ ...f, category: e.target.value }))}
                          required
                          className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-slate-300 placeholder-slate-400 font-medium"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Description</label>
                      <input
                        type="text"
                        placeholder="Product description"
                        value={productForm.description}
                        onChange={e => setProductForm(f => ({ ...f, description: e.target.value }))}
                        required
                        className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-slate-300 placeholder-slate-400 font-medium"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Price (₹)</label>
                        <input
                          type="number"
                          placeholder="0.00"
                          value={productForm.price}
                          onChange={e => setProductForm(f => ({ ...f, price: e.target.value }))}
                          required
                          className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-slate-300 placeholder-slate-400 font-medium"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Quantity</label>
                        <input
                          type="number"
                          placeholder="0"
                          value={productForm.quantity}
                          onChange={e => setProductForm(f => ({ ...f, quantity: e.target.value }))}
                          required
                          className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-slate-300 placeholder-slate-400 font-medium"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Unit</label>
                        <input
                          type="text"
                          placeholder="kg, pcs, etc."
                          value={productForm.unit}
                          onChange={e => setProductForm(f => ({ ...f, unit: e.target.value }))}
                          required
                          className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-slate-300 placeholder-slate-400 font-medium"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Seller Name</label>
                        <input
                          type="text"
                          placeholder="Seller's name"
                          value={productForm.sellerName}
                          onChange={e => setProductForm(f => ({ ...f, sellerName: e.target.value }))}
                          required
                          className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-slate-300 placeholder-slate-400 font-medium"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Seller Contact</label>
                        <input
                          type="text"
                          placeholder="Phone or email"
                          value={productForm.sellerContact}
                          onChange={e => setProductForm(f => ({ ...f, sellerContact: e.target.value }))}
                          required
                          className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-slate-300 placeholder-slate-400 font-medium"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Status</label>
                      <select
                        value={productForm.status}
                        onChange={e => setProductForm(f => ({ ...f, status: e.target.value as "in progress" | "delivered" }))}
                        className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-slate-300 font-medium"
                      >
                        <option value="in progress">In Progress</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl shadow-xl relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10 flex items-center justify-center">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Product
                      </span>
                    </button>
                  </form>
                  
                  <div className="border-t-2 border-slate-100 pt-8">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-2xl font-bold text-slate-800">Product Inventory</h4>
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-3xl font-black px-6 py-3 rounded-2xl shadow-lg">
                        {products.length}
                      </div>
                    </div>
                    
                    <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                      {products.map((p) => (
                        <div key={p._id} className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-6 border-2 border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 transform hover:scale-[1.02]">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h5 className="text-xl font-bold text-slate-800 mb-1">{p.name}</h5>
                              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                {p.category}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-black text-green-600">₹{p.price}</div>
                              <div className="text-sm text-slate-500 font-medium">{p.quantity} {p.unit}</div>
                            </div>
                          </div>
                          <p className="text-slate-600 mb-4 font-medium leading-relaxed">{p.description}</p>
                          <div className="bg-white rounded-xl p-4 mb-4 border border-slate-200">
                            <div className="text-sm text-slate-600 mb-2">
                              <span className="font-bold text-slate-800">Seller:</span> {p.seller?.name}
                            </div>
                            <div className="text-sm text-slate-600">
                              <span className="font-bold text-slate-800">Contact:</span> {p.seller?.contact}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-xs text-slate-500 mb-4 font-medium">
                            <div className="bg-white rounded-lg p-3 border border-slate-200">
                              <div className="font-bold text-slate-700 mb-1">Added</div>
                              <div>{p.createdAt ? new Date(p.createdAt).toLocaleString() : "N/A"}</div>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-slate-200">
                              <div className="font-bold text-slate-700 mb-1">Delivered</div>
                              <div>{p.deliveredAt ? new Date(p.deliveredAt).toLocaleString() : "—"}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-bold text-slate-700 uppercase tracking-wider">Status:</span>
                            <select
                              value={p.status}
                              onChange={e => handleStatusChange(p._id, e.target.value as "in progress" | "delivered")}
                              className="flex-1 px-4 py-2 bg-white border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 font-medium"
                            >
                              <option value="in progress">In Progress</option>
                              <option value="delivered">Delivered</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {/* Vehicle Section */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden hover:shadow-3xl transition-all duration-500">
                  <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 px-6 py-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-teal-600/90"></div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white flex items-center">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                          </svg>
                        </div>
                        Vehicle Fleet
                      </h3>
                      <p className="text-green-100 mt-1 text-sm font-medium">Manage your transportation</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <form onSubmit={handleVehicleSubmit} className="space-y-4 mb-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Vehicle Number</label>
                        <input
                          type="text"
                          placeholder="Enter vehicle number"
                          value={vehicleForm.vehicleNumber}
                          onChange={e => setVehicleForm({ vehicleNumber: e.target.value })}
                          required
                          className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 hover:border-slate-300 placeholder-slate-400 font-medium"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10 flex items-center justify-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          Add Vehicle
                        </span>
                      </button>
                    </form>
                    
                    <div className="border-t-2 border-slate-100 pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-bold text-slate-800">Total Fleet</h4>
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-2xl font-black px-4 py-2 rounded-xl shadow-lg">
                          {vehicleCount}
                        </div>
                      </div>
                      {/* Vehicle Numbers List */}
                      {vehicles.length === 0 ? (
                        <div className="text-slate-400 italic text-sm">No vehicles added yet.</div>
                      ) : (
                        vehicles.map((v) => (
                          <div
                            key={v._id}
                            className="flex items-center bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-xl px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            <svg className="w-5 h-5 text-emerald-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 17v-5a2 2 0 012-2h12a2 2 0 012 2v5M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M4 17h16" />
                            </svg>
                            <span className="font-medium text-slate-700">{v.vehicleNumber}</span>
                          </div>
                        ))
                      )
                      }
                    </div>
                  </div>
                </div>

                {/* Export/Import Section */}
                <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 px-6 py-6 relative overflow-hidden rounded-3xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-indigo-600/90"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                  <div className="relative z-10 ">
                    <h3 className="text-xl font-bold text-white flex items-center mb-2 md:mb-0"> {/* Added margin-bottom for spacing */}
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      Trade Analytics
                    </h3>
                    {/* Moved the paragraph outside the h3 for better semantics and responsiveness */}
                    <p className="text-purple-100 text-sm font-medium">Track imports & exports</p> 
                  </div>
                </div>
                
                <div className="p-6">
                  <form onSubmit={handleExportImportSubmit} className="space-y-4 mb-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Type</label>
                      <select
                        value={exportImportForm.type}
                        onChange={e => setExportImportForm(f => ({ ...f, type: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 hover:border-slate-300 font-medium"
                      >
                        <option value="export">Export</option>
                        <option value="import">Import</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Count</label>
                      <input
                        type="number"
                        placeholder="Enter count"
                        value={exportImportForm.count}
                        onChange={e => setExportImportForm(f => ({ ...f, count: e.target.value }))}
                        required
                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 hover:border-slate-300 placeholder-slate-400 font-medium"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10 flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Record
                      </span>
                    </button>
                  </form>
                  
                  <div className="border-t-2 border-slate-100 pt-6">
                    <h4 className="text-lg font-bold text-slate-800 mb-4">Daily & Monthly Summary</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-50 rounded-xl p-4 border border-purple-200 shadow-sm">
                        <div className="text-sm font-bold text-purple-700 uppercase mb-1">Today's Export</div>
                        <div className="text-2xl font-black text-purple-600">{exportToday}</div>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-4 border border-purple-200 shadow-sm">
                        <div className="text-sm font-bold text-purple-700 uppercase mb-1">Today's Import</div>
                        <div className="text-2xl font-black text-purple-600">{importToday}</div>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-4 border border-purple-200 shadow-sm">
                        <div className="text-sm font-bold text-purple-700 uppercase mb-1">Monthly Export</div>
                        <div className="text-2xl font-black text-purple-600">{exportMonth}</div>
                      </div>
                      <div className="bg-purple-50 rounded-xl p-4 border border-purple-200 shadow-sm">
                        <div className="text-sm font-bold text-purple-700 uppercase mb-1">Monthly Import</div>
                        <div className="text-2xl font-black text-purple-600">{importMonth}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreManagerDashboard;