import { useEffect, useState, useCallback } from 'react';
import { createApiClient, ENDPOINTS, handleApiError } from '../../config/api';
import FarmerLayout from '../layouts/FarmerLayout';
import { CheckCircle, XCircle, Hourglass } from 'lucide-react';
import { toast } from '../ui/use-toast';
import { useNavigate } from 'react-router-dom';

interface Insurance {
  _id: string;
  insuranceType: string;
  cropType?: string;
  landSize: number;
  premiumAmount: number;
  status: 'pending' | 'approved' | 'rejected';
  description?: string;
}

const statusMap = {
  approved: {
    color: 'bg-green-100 text-green-700',
    icon: <CheckCircle size={16} />,
    text: 'Approved',
  },
  rejected: {
    color: 'bg-red-100 text-red-700',
    icon: <XCircle size={16} />,
    text: 'Rejected',
  },
  pending: {
    color: 'bg-yellow-100 text-yellow-700',
    icon: <Hourglass size={16} />,
    text: 'Pending',
  },
};

const ITEMS_PER_PAGE = 4;

// Add helper function for token validation
const getAuthToken = (): string => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return token;
};

const MyInsurance = () => {
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // Wrap fetchInsurances in useCallback
  const fetchInsurances = useCallback(async () => {
    try {
      const token = getAuthToken();
      const api = createApiClient(token);
      const res = await api.get(ENDPOINTS.GET_MY_INSURANCE);
      setInsurances(res.data);
    } catch (err) {
      const error = err as Error;
      console.error(handleApiError(err));
      
      if (error.message === 'No authentication token found') {
        toast({
          title: "Session Expired",
          description: "Please login to view your insurance applications",
          variant: "destructive",
        });
        navigate('/login', { state: { from: '/farmer/insurance' } });
      }
    }
  }, [navigate]); // Add navigate as dependency

  // Update useEffect to include fetchInsurances
  useEffect(() => {
    fetchInsurances();
  }, [fetchInsurances]);

  const paginated = insurances.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <FarmerLayout title="My Insurance Applications" subtitle="Track your insurance requests">
      <div className="space-y-6">
        {paginated.length === 0 ? (
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
                  <h3 className="text-xl font-bold text-gray-800 tracking-tight">{i.insuranceType}</h3>
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
    </FarmerLayout>
  );
};

export default MyInsurance;
