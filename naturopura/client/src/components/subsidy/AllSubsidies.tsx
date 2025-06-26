import { useEffect, useState } from 'react';
import { createApiClient, ENDPOINTS, handleApiError } from '../../config/api';
import AdminLayout from '../layouts/AdminLayout';
import { CheckCircle, XCircle } from 'lucide-react';

interface Subsidy {
  _id: string;
  farmerId: { name: string };
  cropType: string;
  landSize: number;
  amountRequested: number;
  status: 'pending' | 'approved' | 'rejected'; 
  governmentSiteName?: string; // Optional field, handle gracefully
}

// Helper to get token
const getAuthToken = (): string => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication token not found');
  }
  return token;
};

const AllSubsidies = () => {
  const [subsidies, setSubsidies] = useState<Subsidy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSubsidies = async () => {
    try {
      const token = getAuthToken();
      const api = createApiClient(token);
      const res = await api.get(ENDPOINTS.GET_ALL_SUBSIDIES);
      
      console.log('Fetched Subsidies:', res.data); // ✅ Debug log
      
      setSubsidies(res.data);
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
      await api.put(ENDPOINTS.UPDATE_SUBSIDY_STATUS(id), { status });
      fetchSubsidies(); // Refresh list
    } catch (err) {
      console.error(handleApiError(err));
    }
  };

  useEffect(() => {
    fetchSubsidies();
  }, []);

  return (
    <AdminLayout title="Subsidy Requests" subtitle="Manage all subsidy applications">
      <div className="space-y-6 mt-8">
        {loading ? (
          <p className="text-center text-gray-500">Loading subsidies...</p>
        ) : subsidies.length === 0 ? (
          <p className="text-center text-gray-500">No subsidy applications found.</p>
        ) : (
          subsidies.map((s) => (
            <div key={s._id} className="border border-gray-300 p-6 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-between items-center">
                <p className="text-xl font-semibold"><strong>Farmer:</strong> {s.farmerId?.name || 'N/A'}</p>
                <p className="text-sm text-gray-500">
                  {s.status === 'approved' ? 'Approved' : s.status === 'rejected' ? 'Rejected' : 'Pending'}
                </p>
              </div>
              <p><strong>Crop Type:</strong> {s.cropType}</p>
              <p><strong>Land Size:</strong> {s.landSize} acres</p>
              <p><strong>Amount Requested:</strong> ₹{s.amountRequested}</p>
              <p><strong>Government Site:</strong> {s.governmentSiteName || 'N/A'}</p> {/* ✅ Updated to handle missing/blank field */}

              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {s.status === 'approved' ? (
                    <span className="text-green-600 flex items-center">
                      <CheckCircle className="mr-2" /> Approved
                    </span>
                  ) : s.status === 'rejected' ? (
                    <span className="text-red-600 flex items-center">
                      <XCircle className="mr-2" /> Rejected
                    </span>
                  ) : (
                    <span className="text-yellow-500">Pending</span>
                  )}
                </div>
                <div className="space-x-3">
                  {s.status !== 'approved' && (
                    <button
                      onClick={() => updateStatus(s._id, 'approved')}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-shadow shadow-md hover:shadow-lg"
                    >
                      Approve
                    </button>
                  )}
                  {s.status !== 'rejected' && (
                    <button
                      onClick={() => updateStatus(s._id, 'rejected')}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-shadow shadow-md hover:shadow-lg"
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
};

export default AllSubsidies;
