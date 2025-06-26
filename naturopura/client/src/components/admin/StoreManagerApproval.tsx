import React, { useEffect, useState } from "react";
import { ENDPOINTS, createApiClient, handleApiError } from "../../config/api";
import AdminLayout from "../layouts/AdminLayout";

interface StoreManager {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  storeManagerApprovalStatus?: "pending" | "approved" | "rejected";
}

const StoreManagerApproval: React.FC = () => {
  const [storeManagers, setStoreManagers] = useState<StoreManager[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const fetchStoreManagers = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token") || "";
      const apiClient = createApiClient(token);
      const res = await apiClient.get(ENDPOINTS.GET_STORE_MANAGERS);
      setStoreManagers(res.data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoreManagers();
  }, []);

  const handleApproval = async (id: string, approvalStatus: "approved" | "rejected") => {
    try {
      const token = localStorage.getItem("token") || "";
      const apiClient = createApiClient(token);
      await apiClient.put(ENDPOINTS.UPDATE_STORE_MANAGER_STATUS(id), { approvalStatus });
      setStoreManagers((prev) =>
        prev.map((sm) =>
          sm._id === id ? { ...sm, storeManagerApprovalStatus: approvalStatus } : sm
        )
      );
    } catch (err) {
      alert(handleApiError(err));
    }
  };

  return (
    <AdminLayout title="Store Manager Approvals" subtitle="Approve or reject cold storage managers">
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold mb-4">Pending Store Managers</h2>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Address</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {storeManagers.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    No store managers found.
                  </td>
                </tr>
              )}
              {storeManagers.map((sm) => (
                <tr key={sm._id}>
                  <td className="p-2 border">{sm.name}</td>
                  <td className="p-2 border">{sm.email}</td>
                  <td className="p-2 border">{sm.phoneNumber || "-"}</td>
                  <td className="p-2 border">{sm.address || "-"}</td>
                  <td className="p-2 border capitalize">{sm.storeManagerApprovalStatus || "pending"}</td>
                  <td className="p-2 border">
                    {sm.storeManagerApprovalStatus === "pending" ? (
                      <>
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                          onClick={() => handleApproval(sm._id, "approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded"
                          onClick={() => handleApproval(sm._id, "rejected")}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-500">{sm.storeManagerApprovalStatus}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default StoreManagerApproval;