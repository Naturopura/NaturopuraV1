import React, { useEffect, useState } from "react";
import { createApiClient, ENDPOINTS } from "../../config/api";
import {
  Package,
  Plus,
  Building2,
  DollarSign,
  Hash,
  AlertCircle,
  LogOut,
  Edit,
  Trash2,
  X,
} from "lucide-react";

interface Equipment {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

const Dashboard: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
  const [editName, setEditName] = useState("");
  const [editQuantity, setEditQuantity] = useState<number | "">("");
  const [editPrice, setEditPrice] = useState<number | "">("");
  const [editImage, setEditImage] = useState<File | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const fetchEquipments = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token") || "";
      const apiClient = createApiClient(token);
      const response = await apiClient.get(ENDPOINTS.GET_VENDOR_EQUIPMENTS);
      setEquipments(response.data);
    } catch {
      setError("Failed to load equipments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  const handleAddEquipment = async () => {
    if (!name || quantity === "" || price === "") {
      setError("Please fill all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token") || "";
      const apiClient = createApiClient(token);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("quantity", quantity.toString());
      formData.append("price", price.toString());
      if (image) {
        formData.append("image", image);
      }
      await apiClient.post(ENDPOINTS.ADD_VENDOR_EQUIPMENTS, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setName("");
      setQuantity("");
      setPrice("");
      setImage(null);
      fetchEquipments();
    } catch {
      setError("Failed to add equipment");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleEditEquipment = (equipment: Equipment) => {
    setEditingEquipment(equipment);
    setEditName(equipment.name);
    setEditQuantity(equipment.quantity);
    setEditPrice(equipment.price);
    setEditImage(null);
  };

  const handleUpdateEquipment = async () => {
    if (!editingEquipment || !editName || editQuantity === "" || editPrice === "") {
      setError("Please fill all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token") || "";
      const apiClient = createApiClient(token);
      const formData = new FormData();
      formData.append("name", editName);
      formData.append("quantity", editQuantity.toString());
      formData.append("price", editPrice.toString());
      if (editImage) {
        formData.append("image", editImage);
      }
      await apiClient.put(ENDPOINTS.UPDATE_VENDOR_EQUIPMENT(editingEquipment._id), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setEditingEquipment(null);
      setEditName("");
      setEditQuantity("");
      setEditPrice("");
      setEditImage(null);
      fetchEquipments();
    } catch {
      setError("Failed to update equipment");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEquipment = async (id: string) => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token") || "";
      const apiClient = createApiClient(token);
      await apiClient.delete(ENDPOINTS.DELETE_VENDOR_EQUIPMENT(id));
      setShowDeleteConfirm(null);
      fetchEquipments();
    } catch {
      setError("Failed to delete equipment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/nat.svg"
                alt="Logo"
                className="h-full max-h-12 w-auto object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Vendor Portal
                </h1>
                <p className="text-sm text-gray-600">
                  Equipment Management System
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-teal-600 hover:from-red-700 hover:to-teal-700 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-6">
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Vendor Dashboard
                </h2>
                <p className="text-gray-600 mt-1">
                  Manage your equipment inventory
                </p>
              </div>
            </div>
          </div>

          {/* Add Equipment Form */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Add New Equipment
              </h3>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-700 font-medium">{error}</span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Equipment Name
                </label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Enter equipment name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500"
                    min={0}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Price (₹)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) =>
                      setPrice(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500"
                    min={0}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Equipment Image (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              />
            </div>

            <button
              onClick={handleAddEquipment}
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              {loading ? "Adding Equipment..." : "Add Equipment"}
            </button>
          </div>

          {/* Equipment List Section */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Your Equipment Inventory
              </h3>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">
                    Loading equipment inventory...
                  </p>
                </div>
              </div>
            )}

            {!loading && equipments.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  No Equipment Added
                </h4>
                <p className="text-gray-600">
                  Start by adding your first piece of equipment to your
                  inventory.
                </p>
              </div>
            )}

            {!loading && equipments.length > 0 && (
              <>
                {/* Mobile Card View */}
                <div className="grid gap-4 lg:hidden">
                  {equipments.map((eq) => (
                    <div
                      key={eq._id}
                      className="bg-gray-50 rounded-lg border border-gray-200 p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {eq.image ? (
                            <img
                              src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${eq.image}`}
                              alt={eq.name}
                              className="w-12 h-12 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => setSelectedImage(eq.image ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${eq.image}` : null)}
                            />
                          ) : (
                            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
                              <Package className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {eq.name}
                            </h4>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                              <span>
                                Qty:{" "}
                                <span className="font-medium">
                                  {eq.quantity}
                                </span>
                              </span>
                              <span>
                                Price:{" "}
                                <span className="font-medium text-emerald-600">
                                  ₹{eq.price.toLocaleString()}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditEquipment(eq)}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            <Edit className="w-3 h-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(eq._id)}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden lg:block overflow-hidden rounded-lg border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-emerald-500 to-teal-600">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            Equipment Name
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                          <div className="flex items-center gap-2">
                            <Hash className="w-4 h-4" />
                            Quantity
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            Price
                          </div>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {equipments.map((eq, index) => (
                        <tr
                          key={eq._id}
                          className={`hover:bg-gray-50 transition-colors ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                          }`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {eq.image ? (
                              <img
                                src={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${eq.image}`}
                                alt={eq.name}
                                className="w-8 h-8 rounded object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => setSelectedImage(eq.image ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${eq.image}` : null)}
                              />
                              ) : (
                                <div className="p-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded">
                                  <Package className="w-3 h-3 text-white" />
                                </div>
                              )}
                              <span className="font-medium text-gray-900">
                                {eq.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                              <Hash className="w-3 h-3" />
                              {eq.quantity}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
                              <DollarSign className="w-3 h-3" />₹
                              {eq.price.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditEquipment(eq)}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors"
                              >
                                <Edit className="w-3 h-3" />
                                Edit
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(eq._id)}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Summary Stats */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-4 text-white">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        Total Equipment Types
                      </span>
                    </div>
                    <div className="text-2xl font-bold mt-1">
                      {equipments.length}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-4 text-white">
                    <div className="flex items-center gap-2">
                      <Hash className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        Total Quantity
                      </span>
                    </div>
                    <div className="text-2xl font-bold mt-1">
                      {equipments.reduce((sum, eq) => sum + eq.quantity, 0)}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg p-4 text-white">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      <span className="text-sm font-medium">Total Value</span>
                    </div>
                    <div className="text-2xl font-bold mt-1">
                      ₹
                      {equipments
                        .reduce((sum, eq) => sum + eq.quantity * eq.price, 0)
                        .toLocaleString()}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full p-4">
            <img
              src={selectedImage}
              alt="Equipment"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Edit Equipment Modal */}
      {editingEquipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Edit Equipment</h3>
                <button
                  onClick={() => setEditingEquipment(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Equipment Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900"
                  min={0}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900"
                  min={0}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Equipment Image (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditImage(e.target.files?.[0] || null)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setEditingEquipment(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateEquipment}
                disabled={loading}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Equipment"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Equipment</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600">
                Are you sure you want to delete this equipment? This action cannot be undone.
              </p>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteEquipment(showDeleteConfirm)}
                disabled={loading}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
              >
                {loading ? "Deleting..." : "Delete Equipment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
