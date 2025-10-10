import React, { useState, useEffect } from "react";
import { createApiClient } from "../../config/api";
import FarmerLayout from "../layouts/FarmerLayout";
import {
  Search,
  Package,
  User,
  Phone,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  X,
} from "lucide-react";

interface Equipment {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
  vendor: {
    _id: string;
    name: string;
    phoneNumber?: string;
  };
}

interface RequestStatus {
  status: "pending" | "approved" | "rejected";
  vendorPhoneNumber?: string;
}

const EquipmentSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [requestStatusMap, setRequestStatusMap] = useState<
    Record<string, RequestStatus>
  >({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageName, setSelectedImageName] = useState<string | null>(
    null
  );

  const token = localStorage.getItem("token") || "";
  const apiClient = createApiClient(token);

  const fetchEquipments = async (query: string) => {
    setLoading(true);
    setError("");
    try {
      console.log("Fetching equipments with query:", query);
      const response = await apiClient.get(
        `/equipment-search/search?search=${encodeURIComponent(query)}`
      );
      console.log("Equipments fetched:", response.data);
      // Map vendorId to vendor for frontend compatibility
      const mappedEquipments = response.data.map((eq: { vendorId: any }) => ({
        ...eq,
        vendor: eq.vendorId || null,
      }));
      setEquipments(mappedEquipments);
      // Fetch request statuses for displayed equipments
      const equipmentIds = response.data.map((eq: Equipment) => eq._id);
      const statusResponse = await apiClient.post(
        "/equipment-search/requests/status",
        { equipmentIds }
      );
      console.log("Request statuses fetched:", statusResponse.data);
      const statusMap: Record<string, RequestStatus> = {};
      statusResponse.data.forEach(
        (req: {
          equipmentId: string;
          status: string;
          vendor: { phoneNumber: string };
        }) => {
          statusMap[req.equipmentId] = {
            status: req.status as "pending" | "approved" | "rejected",
            vendorPhoneNumber:
              req.status === "approved" && req.vendor
                ? req.vendor.phoneNumber
                : undefined,
          };
        }
      );
      setRequestStatusMap(statusMap);
    } catch (err) {
      console.error("Error fetching equipments:", err);
      setError("Failed to fetch equipments");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllEquipments = async () => {
    setLoading(true);
    setError("");
    try {
      console.log("Fetching all equipments");
      // Use empty search query to get all equipment
      const response = await apiClient.get("/equipment-search/equipments");
      console.log("All equipments fetched:", response.data);
      // Map vendorId to vendor for frontend compatibility
      // Ensure vendor info is always present with fallback dummy vendor if missing
      const mappedEquipments = response.data.map((eq: { vendorId: any }) => ({
        ...eq,
        vendor: eq.vendorId || { _id: "unknown", name: "Unknown Vendor" },
      }));
      setEquipments(mappedEquipments);
      // Fetch request statuses for displayed equipments
      const equipmentIds = response.data.map((eq: Equipment) => eq._id);
      const statusResponse = await apiClient.post(
        "/equipment-search/requests/status",
        { equipmentIds }
      );
      console.log("Request statuses fetched:", statusResponse.data);
      const statusMap: Record<string, RequestStatus> = {};
      statusResponse.data.forEach(
        (req: {
          equipmentId: string;
          status: string;
          vendor: { phoneNumber: string };
        }) => {
          statusMap[req.equipmentId] = {
            status: req.status as "pending" | "approved" | "rejected",
            vendorPhoneNumber:
              req.status === "approved" && req.vendor
                ? req.vendor.phoneNumber
                : undefined,
          };
        }
      );
      setRequestStatusMap(statusMap);
    } catch (err) {
      console.error("Error fetching all equipments:", err);
      setError("Failed to fetch all equipments");
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (equipment: Equipment) => {
    setError("");
    try {
      console.log("Sending request for equipment:", equipment);
      if (
        !equipment.vendor ||
        !equipment.vendor._id ||
        equipment.vendor._id === "unknown"
      ) {
        setError("Cannot send request: Valid vendor information is required.");
        return;
      }
      const response = await apiClient.post("/equipment-requests", {
        equipmentId: equipment._id,
        vendorId: equipment.vendor._id,
      });
      console.log("Request sent successfully:", response.data);
      setRequestStatusMap((prev) => ({
        ...prev,
        [equipment._id]: { status: "pending" },
      }));
    } catch (err) {
      console.error("Error sending request:", err);
      setError(
        "Failed to send request: " +
          (err instanceof Error ? err.message : "Unknown error")
      );
    }
  };

  useEffect(() => {
    // Load all equipment when component mounts
    fetchAllEquipments();
  }, []);

  useEffect(() => {
    if (searchTerm.length > 2) {
      fetchEquipments(searchTerm);
    } else if (searchTerm.length === 0) {
      // When search is cleared, show all equipment
      fetchAllEquipments();
    } else {
      setEquipments([]);
      setRequestStatusMap({});
    }
  }, [searchTerm]);

  const getStatusBadge = (status: string) => {
    const baseClasses =
      "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "pending":
        return (
          <span
            className={`${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`}
          >
            <Clock className="w-3 h-3" />
            Pending Approval
          </span>
        );
      case "approved":
        return (
          <span
            className={`${baseClasses} bg-green-100 text-green-800 border border-green-200`}
          >
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        );
      case "rejected":
        return (
          <span
            className={`${baseClasses} bg-red-100 text-red-800 border border-red-200`}
          >
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <FarmerLayout
      title="Equipment Search"
      subtitle="Search and request equipment"
    >
      <div className="max-w-6xl mx-auto p-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-6">
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-naturopura-gradient rounded-lg">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Equipment Search
                </h2>
                <p className="text-gray-600 mt-1">
                  Search and request agricultural equipment from vendors
                </p>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="p-8 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search equipment by name (min 3 characters)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900 placeholder-gray-500"
              />
            </div>
            {searchTerm.length > 0 && searchTerm.length <= 2 && (
              <p className="mt-2 text-sm text-gray-500">
                Please enter at least 3 characters to search
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700 font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className="p-8">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Searching equipment...</p>
                </div>
              </div>
            )}

            {!loading && equipments.length === 0 && searchTerm.length > 2 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Equipment Found
                </h3>
                <p className="text-gray-600">
                  No equipment matches your search criteria. Try different
                  keywords.
                </p>
              </div>
            )}

            {!loading && equipments.length > 0 && (
              <div className="grid gap-4">
                {equipments.map((eq) => {
                  const reqStatus = requestStatusMap[eq._id];
                  return (
                    <div
                      key={eq._id}
                      className="bg-gray-50 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 rounded-lg">
                                {eq.image ? (
                                  <img
                                    src={`${
                                      import.meta.env.VITE_API_URL ||
                                      "http://localhost:5000/api"
                                    }${eq.image}`}
                                    alt={eq.name}
                                    className="w-10 h-8 rounded object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => {
                                      setSelectedImage(
                                        eq.image
                                          ? `${
                                              import.meta.env.VITE_API_URL ||
                                              "http://localhost:5000"
                                            }${eq.image}`
                                          : null
                                      );
                                      setSelectedImageName(eq.name);
                                    }}
                                  />
                                ) : (
                                  <Package className="w-5 h-5 text-white" />
                                )}
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">
                                  {eq.name}
                                </h3>
                                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                                  <span>
                                    Quantity:{" "}
                                    <span className="font-medium">
                                      {eq.quantity}
                                    </span>
                                  </span>
                                  <span>
                                    Price:{" "}
                                    <span className="font-medium naturopura-text">
                                      ₹{eq.price.toLocaleString()}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 mb-3">
                              <User className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-700">
                                Vendor:{" "}
                                <span className="font-medium">
                                  {eq.vendor?.name || "Unknown"}
                                </span>
                              </span>
                            </div>

                            {reqStatus &&
                              reqStatus.status === "approved" &&
                              reqStatus.vendorPhoneNumber && (
                                <div className="flex items-center gap-2 mb-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                  <Phone className="w-4 h-4 text-green-600" />
                                  <span className="text-green-800">
                                    Vendor Phone:{" "}
                                    <span className="font-medium">
                                      {reqStatus.vendorPhoneNumber}
                                    </span>
                                  </span>
                                </div>
                              )}

                            {reqStatus && (
                              <div className="mb-3">
                                {getStatusBadge(reqStatus.status)}
                              </div>
                            )}
                          </div>

                          <div className="ml-6">
                            <button
                              onClick={() => handleRequest(eq)}
                              disabled={!!reqStatus}
                              className={`inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-all duration-200 shadow-sm ${
                                reqStatus
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  : "bg-naturopura-gradient text-white hover:shadow-md"
                              }`}
                              title={reqStatus ? "Request already sent" : ""}
                            >
                              <Package className="w-4 h-4" />
                              {reqStatus ? "Request Sent" : "Send Request"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-4xl max-h-full overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedImageName || "Equipment Image"}
              </h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <img
              src={selectedImage}
              alt="Equipment"
              className="max-w-full max-h-96 object-contain"
            />
          </div>
        </div>
      )}
    </FarmerLayout>
  );
};

export default EquipmentSearch;
