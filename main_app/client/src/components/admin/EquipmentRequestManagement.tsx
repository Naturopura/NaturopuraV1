import React, { useEffect, useState } from "react";
import { createApiClient } from "../../config/api";
import AdminLayout from "../layouts/AdminLayout";
import { CheckCircle, XCircle, Clock, Package, User, Building2 } from "lucide-react";

interface EquipmentRequest {
  _id: string;
  equipmentId: string;
  equipmentName: string;
  farmerId: string;
  farmerName: string;
  vendorId: string;
  vendorName: string;
  status: "pending" | "approved" | "rejected";
}

const EquipmentRequestManagement: React.FC = () => {
  const [requests, setRequests] = useState<EquipmentRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token") || "";
  const apiClient = createApiClient(token);

  const fetchRequests = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await apiClient.get("/admin/equipment-requests");
      // Map the response to include equipmentName, farmerName, vendorName from populated fields
      const mappedRequests = response.data.map((req: any) => ({
        ...req,
        equipmentName: req.equipmentId?.name || "Unknown",
        farmerName: req.farmerId?.name || "Unknown",
        vendorName: req.vendorId?.name || "Unknown",
      }));
      setRequests(mappedRequests);
    } catch {
      setError("Failed to fetch equipment requests");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      await apiClient.put(`/admin/equipment-requests/${id}/status`, { status });
      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status } : req))
      );
    } catch {
      setError("Failed to update request status");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "pending":
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`}>
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case "approved":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800 border border-green-200`}>
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800 border border-red-200`}>
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
    }
  };

  return (
    <AdminLayout
      title="Equipment Requests Management"
      subtitle="Manage equipment requests from farmers"
    >
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-6">
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-naturopura-gradient rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Equipment Requests Management</h2>
                <p className="text-gray-600 mt-1">Review and manage equipment requests from farmers</p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-8 mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700 font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className="p-8">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gradient-to-r from-emerald-500 to-teal-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading requests...</p>
                </div>
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Equipment Requests</h3>
                <p className="text-gray-600">No equipment requests found at the moment.</p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead className="bg-naturopura-gradient">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4" />
                          Equipment
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Farmer
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          Vendor
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {requests.map((req, index) => (
                      <tr key={req._id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{req.equipmentName}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{req.farmerName}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{req.vendorName}</div>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(req.status)}
                        </td>
                        <td className="px-6 py-4">
                          {req.status === "pending" ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => updateStatus(req._id, "approved")}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Approve
                              </button>
                              <button
                                onClick={() => updateStatus(req._id, "rejected")}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                              >
                                <XCircle className="w-4 h-4" />
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500 italic">No actions available</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EquipmentRequestManagement;