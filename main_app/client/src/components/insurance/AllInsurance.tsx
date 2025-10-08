import  { useEffect, useState } from 'react';
import { createApiClient, ENDPOINTS, handleApiError } from '../../config/api';
import AdminLayout from '../layouts/AdminLayout';
import { CheckCircle, XCircle, Hourglass } from 'lucide-react';

interface Insurance {
  _id: string;
  farmerId: { name: string };
  insuranceType: string;
  cropType?: string;
  landSize: number;
  premiumAmount: number;
  description?: string;
  status: 'pending' | 'approved' | 'rejected';
}

const statusMap = {
  approved: {
    color: 'bg-green-100 text-green-700',
    icon: <CheckCircle size={16} className="text-green-600 animate-pulse" />,
    text: 'Approved',
  },
  rejected: {
    color: 'bg-red-100 text-red-700',
    icon: <XCircle size={16} className="text-red-600 animate-pulse" />,
    text: 'Rejected',
  },
  pending: {
    color: 'bg-yellow-100 text-yellow-700',
    icon: <Hourglass size={16} className="text-yellow-600 animate-pulse" />,
    text: 'Pending',
  },
};

const ITEMS_PER_PAGE = 4;

// Add a helper function to handle token validation
const getAuthToken = (): string => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return token;
};

const AllInsurance = () => {
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchInsurances = async () => {
    try {
      const token = getAuthToken();
      const api = createApiClient(token);
      const res = await api.get(ENDPOINTS.GET_ALL_INSURANCE);
      setInsurances(res.data);
    } catch (err) {
      console.error(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const token = getAuthToken();
      const api = createApiClient(token);
      await api.put(ENDPOINTS.UPDATE_INSURANCE_STATUS(id), { status });
      fetchInsurances();
    } catch (err) {
      console.error(handleApiError(err));
    }
  };

  useEffect(() => {
    fetchInsurances();
  }, []);

  const paginated = insurances.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <AdminLayout title="Insurance Requests" subtitle="Manage all insurance applications">
      <div className="space-y-6 mt-8">
        {loading ? (
          <p className="text-gray-500">Loading insurance applications...</p>
        ) : paginated.length === 0 ? (
          <p className="text-gray-500">No insurance applications found.</p>
        ) : (
          paginated.map((i) => {
            const status = statusMap[i.status];
            return (
              <div
                key={i._id}
                className="bg-gradient-to-br from-green-50 via-white to-green-100 border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-transform duration-300 hover:scale-[1.02]"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 tracking-tight">
                    {i.insuranceType} <span className="text-sm font-medium text-gray-500">({i.farmerId?.name || 'N/A'})</span>
                  </h3>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${status.color}`}>
                    {status.icon}
                    {status.text}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-700">
                  <p><span className="font-semibold text-gray-800">Crop Type:</span> {i.cropType || 'N/A'}</p>
                  <p><span className="font-semibold text-gray-800">Land Size:</span> {i.landSize} acres</p>
                  <p><span className="font-semibold text-gray-800">Premium:</span> ₹{i.premiumAmount}</p>
                  <p><span className="font-semibold text-gray-800">Description:</span> {i.description || 'N/A'}</p>
                </div>

                <div className="space-x-2 mt-4">
                  {i.status !== 'approved' && (
                    <button
                      onClick={() => updateStatus(i._id, 'approved')}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-shadow shadow-md hover:shadow-lg"
                    >
                      Approve
                    </button>
                  )}
                  {i.status !== 'rejected' && (
                    <button
                      onClick={() => updateStatus(i._id, 'rejected')}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-shadow shadow-md hover:shadow-lg"
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {insurances.length > ITEMS_PER_PAGE && (
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg shadow-sm disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((prev) => (prev * ITEMS_PER_PAGE < insurances.length ? prev + 1 : prev))}
            disabled={page * ITEMS_PER_PAGE >= insurances.length}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg shadow-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </AdminLayout>
  );
};

export default AllInsurance;
