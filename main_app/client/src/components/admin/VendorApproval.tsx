import React, { useEffect, useState } from 'react';
import { createApiClient, ENDPOINTS } from '../../config/api';


import AdminLayout from '../layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BadgeCheck, XCircle, Loader2, UserX, UserCheck, User } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  vendorApprovalStatus: 'pending' | 'approved' | 'rejected';
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  approved: 'bg-green-100 text-green-800 border-green-300',
  rejected: 'bg-red-100 text-red-800 border-red-300',
};

const statusIcons: Record<string, React.ReactNode> = {
  pending: <User className="inline-block w-4 h-4 mr-1 text-yellow-500" />,
  approved: <UserCheck className="inline-block w-4 h-4 mr-1 text-green-500" />,
  rejected: <UserX className="inline-block w-4 h-4 mr-1 text-red-500" />,
};

const VendorApproval: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const fetchVendors = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');
      const apiClient = createApiClient(token);
      const response = await apiClient.get(ENDPOINTS.GET_VENDORS);
      setVendors(
        Array.isArray(response.data)
          ? response.data.map((v: any) => ({
              id: v._id,
              name: v.name,
              email: v.email,
              phoneNumber: v.phoneNumber,
              vendorApprovalStatus: v.vendorApprovalStatus,
            }))
          : []
      );
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to fetch vendors');
    } finally {
      setLoading(false);
    }
  };

  const updateApprovalStatus = async (id: string, status: 'approved' | 'rejected') => {
    setUpdatingId(id);
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');
      const apiClient = createApiClient(token);
      await apiClient.put(
        ENDPOINTS.UPDATE_VENDOR_STATUS(id),
        { approvalStatus: status }
      );
      setVendors((prev) =>
        prev.map((v) => (v.id === id ? { ...v, vendorApprovalStatus: status } : v))
      );
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to update approval status');
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchVendors();
    // eslint-disable-next-line
  }, []);

  return (
    <AdminLayout title="Vendor Approvals" subtitle="Manage vendor registrations">
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6">
        <Card className="max-w-5xl mx-auto rounded-3xl shadow-2xl border-0 bg-white/90">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <BadgeCheck className="w-7 h-7 naturopura-text" />
              Vendor Registration Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 text-red-600 font-semibold flex items-center gap-2">
                <XCircle className="w-5 h-5" /> {error}
              </div>
            )}
            {loading ? (
              <div className="flex items-center gap-2 text-amber-700 font-semibold py-8 justify-center">
                <Loader2 className="animate-spin w-6 h-6" /> Loading vendors...
              </div>
            ) : vendors.length === 0 ? (
              <div className="flex flex-col items-center py-12 text-gray-500">
                <UserX className="w-12 h-12 mb-2 text-gray-300" />
                <span className="text-lg font-medium">No vendors pending approval.</span>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl shadow">
                <table className="w-full table-auto border-collapse">
                  <thead className="sticky top-0 z-10 bg-white">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-bold naturopura-text uppercase tracking-wider rounded-tl-xl">
                        Name
                      </th>
                      <th className="px-5 py-3 text-left text-xs font-bold naturopura-text uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-5 py-3 text-left text-xs font-bold naturopura-text uppercase tracking-wider">
                        Phone Number
                      </th>
                      <th className="px-5 py-3 text-left text-xs font-bold naturopura-text uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-5 py-3 text-left text-xs font-bold naturopura-text uppercase tracking-wider rounded-tr-xl">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map((v) => (
                      <tr
                        key={v.id}
                        className="hover:bg-amber-50/60 transition-all duration-200"
                      >
                        <td className="px-5 py-3 font-medium text-gray-900">{v.name}</td>
                        <td className="px-5 py-3 text-gray-700">{v.email}</td>
                        <td className="px-5 py-3 text-gray-700">{v.phoneNumber || '-'}</td>
                        <td className="px-5 py-3">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold gap-1 ${statusColors[v.vendorApprovalStatus]}`}
                          >
                            {statusIcons[v.vendorApprovalStatus]}
                            {v.vendorApprovalStatus.charAt(0).toUpperCase() +
                              v.vendorApprovalStatus.slice(1)}
                          </span>
                        </td>
                        <td className="px-5 py-3 space-x-2">
                          {v.vendorApprovalStatus === "pending" ? (
                            <>
                              <button
                                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black px-4 py-2 rounded-lg font-semibold shadow mr-2 transition"
                                disabled={updatingId === v.id}
                                onClick={() => updateApprovalStatus(v.id, "approved")}
                              >
                                Approve
                              </button>
                              <button
                                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-black px-4 py-2 rounded-lg font-semibold shadow transition"
                                disabled={updatingId === v.id}
                                onClick={() => updateApprovalStatus(v.id, "rejected")}
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <span className="font-bold capitalize">
                              {v.vendorApprovalStatus}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default VendorApproval;
