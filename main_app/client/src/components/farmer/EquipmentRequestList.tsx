import React, { useEffect, useState } from 'react';
import { createApiClient } from '../../config/api';
import FarmerLayout from '../layouts/FarmerLayout';
import { Package, User, Phone, Clock, CheckCircle, XCircle, Calendar } from 'lucide-react';

interface EquipmentRequest {
  _id: string;
  equipmentName: string;
  vendorName: string;
  vendorPhoneNumber?: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
}

const EquipmentRequestList: React.FC = () => {
  const [requests, setRequests] = useState<EquipmentRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token') || '';
  const apiClient = createApiClient(token);

  const fetchRequests = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiClient.get('/equipment-requests/my-requests');
      setRequests(response.data);
    } catch {
      setError('Failed to fetch your equipment requests');
    } finally {
      setLoading(false);
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <FarmerLayout title="Equipment Requests" subtitle='Manage your equipment requests'>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-6">
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-naturopura-gradient rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">My Equipment Requests</h2>
                <p className="text-gray-600 mt-1">Track the status of your equipment requests</p>
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
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading your requests...</p>
                </div>
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Equipment Requests</h3>
                <p className="text-gray-600">You haven't made any equipment requests yet.</p>
              </div>
            ) : (
              <div className="grid gap-4 lg:hidden">
                {/* Mobile Card View */}
                {requests.map((req) => (
                  <div key={req._id} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-emerald-600" />
                        <h3 className="font-semibold text-gray-900">{req.equipmentName}</h3>
                      </div>
                      {getStatusBadge(req.status)}
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <User className="w-4 h-4" />
                        <span>Vendor: {req.vendorName}</span>
                      </div>
                      
                      {req.vendorPhoneNumber && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>Phone: {req.vendorPhoneNumber}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Requested: {formatDate(req.requestedAt)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Desktop Table View */}
            {!loading && requests.length > 0 && (
              <div className="hidden lg:block overflow-hidden rounded-lg border border-gray-200">
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
                          Vendor
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Requested At
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {requests.map((req, index) => (
                      <tr key={req._id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{req.equipmentName}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{req.vendorName}</div>
                            {req.vendorPhoneNumber && (
                              <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                                <Phone className="w-3 h-3" />
                                {req.vendorPhoneNumber}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(req.status)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{formatDate(req.requestedAt)}</div>
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
    </FarmerLayout>
  );
};

export default EquipmentRequestList;