import React, { useEffect, useState } from 'react';
import { createApiClient, ENDPOINTS } from '../../config/api';
import AdminLayout from '../layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BadgeCheck, XCircle, Loader2, UserX, UserCheck, User } from 'lucide-react';

interface DeliveryPartner {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  deliveryPartnerApprovalStatus: 'pending' | 'approved' | 'rejected';
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

const DeliveryPartnerApproval: React.FC = () => {
  const [deliveryPartners, setDeliveryPartners] = useState<DeliveryPartner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const fetchDeliveryPartners = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');
      const apiClient = createApiClient(token);
      const response = await apiClient.get(ENDPOINTS.GET_DELIVERY_PARTNERS);
      setDeliveryPartners(
        Array.isArray(response.data)
          ? response.data.map((dp: any) => ({
              id: dp._id,
              name: dp.name,
              email: dp.email,
              phoneNumber: dp.phoneNumber,
              deliveryPartnerApprovalStatus: dp.deliveryPartnerApprovalStatus,
            }))
          : []
      );
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to fetch delivery partners');
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
        ENDPOINTS.UPDATE_DELIVERY_PARTNER_STATUS(id),
        { approvalStatus: status }
      );
      setDeliveryPartners((prev) =>
        prev.map((dp) => (dp.id === id ? { ...dp, deliveryPartnerApprovalStatus: status } : dp))
      );
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to update approval status');
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchDeliveryPartners();
    // eslint-disable-next-line
  }, []);

  return (
    <AdminLayout title="Delivery Partner Approvals" subtitle="Manage delivery partner registrations">
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6">
        <Card className="max-w-5xl mx-auto rounded-3xl shadow-2xl border-0 bg-white/90">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <BadgeCheck className="w-7 h-7 naturopura-text" />
              Delivery Partner Registration Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 text-red-600 font-semibold flex items-center gap-2">
                <XCircle className="w-5 h-5" /> {error}
              </div>
            )}
            {loading ? (
              <div className="flex items-center gap-2 text-emerald-700 font-semibold py-8 justify-center">
                <Loader2 className="animate-spin w-6 h-6" /> Loading delivery partners...
              </div>
            ) : deliveryPartners.length === 0 ? (
              <div className="flex flex-col items-center py-12 text-gray-500">
                <UserX className="w-12 h-12 mb-2 text-gray-300" />
                <span className="text-lg font-medium">No delivery partners pending approval.</span>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl shadow">
                <table className="w-full table-auto border-collapse">
                  <thead className="sticky top-0 z-10 bg-emerald-100/80">
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
                    {deliveryPartners.map((dp) => (
                      <tr
                        key={dp.id}
                        className="hover:bg-emerald-50/60 transition-all duration-200"
                      >
                        <td className="px-5 py-3 font-medium text-gray-900">{dp.name}</td>
                        <td className="px-5 py-3 text-gray-700">{dp.email}</td>
                        <td className="px-5 py-3 text-gray-700">{dp.phoneNumber || '-'}</td>
                        <td className="px-5 py-3">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold gap-1 ${statusColors[dp.deliveryPartnerApprovalStatus]}`}
                          >
                            {statusIcons[dp.deliveryPartnerApprovalStatus]}
                            {dp.deliveryPartnerApprovalStatus.charAt(0).toUpperCase() +
                              dp.deliveryPartnerApprovalStatus.slice(1)}
                          </span>
                        </td>
                        <td className="px-5 py-3 space-x-2">
                          {dp.deliveryPartnerApprovalStatus === "pending" ? (
                            <>
                              <button
                                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-black px-4 py-2 rounded-lg font-semibold shadow mr-2 transition"
                                disabled={updatingId === dp.id}
                                onClick={() => updateApprovalStatus(dp.id, "approved")}
                              >
                                Approve
                              </button>
                              <button
                                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-black px-4 py-2 rounded-lg font-semibold shadow transition"
                                disabled={updatingId === dp.id}
                                onClick={() => updateApprovalStatus(dp.id, "rejected")}
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <span className="font-bold capitalize">
                              {dp.deliveryPartnerApprovalStatus}
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

export default DeliveryPartnerApproval;
