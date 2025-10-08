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
      <div className="mt-4 rounded-xl shadow-lg p-8 ">
        <h2 className="text-2xl font-extrabold mb-6 text-black drop-shadow-lg text-center">
           Store Managers
        </h2>
        {loading ? (
          <div className="text-white text-center font-semibold">Loading...</div>
        ) : error ? (
          <div className="text-red-200 bg-red-600 rounded p-3 text-center">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full rounded-xl overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-naturopura-gradient text-black">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {storeManagers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center p-6 text-black">
                      No store managers found.
                    </td>
                  </tr>
                )}
                {storeManagers.map((sm) => (
                  <tr
                    key={sm._id}
                    className="bg-white bg-opacity-10 hover:bg-opacity-20 transition"
                  >
                    <td className="p-3 text-black">{sm.name}</td>
                    <td className="p-3 text-black">{sm.email}</td>
                    <td className="p-3 text-black">{sm.phoneNumber || "-"}</td>
                    <td className="p-3 text-black">{sm.address || "-"}</td>
                    <td className="p-3 capitalize text-black">
                      {sm.storeManagerApprovalStatus || "pending"}
                    </td>
                    <td className="p-3">
                      {sm.storeManagerApprovalStatus === "pending" ? (
                        <>
                          <button
                            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-black px-4 py-2 rounded-lg font-semibold shadow mr-2 transition"
                            onClick={() => handleApproval(sm._id, "approved")}
                          >
                            Approve
                          </button>
                          <button
                            className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-black px-4 py-2 rounded-lg font-semibold shadow transition"
                            onClick={() => handleApproval(sm._id, "rejected")}
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-black font-bold">
                          {sm.storeManagerApprovalStatus}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default StoreManagerApproval;