import React, { useState, useEffect } from 'react';
import { createApiClient, ENDPOINTS, handleApiError } from '../../config/api';
import FarmerLayout from '../layouts/FarmerLayout';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2, Sprout, Ruler, Coins, Globe, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const getAuthToken = (): string => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication token not found');
  return token;
};

const ApplySubsidyForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    cropType: '',
    landSize: '',
    amountRequested: '',
    governmentSiteName: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setMessage('User not authenticated. Please log in.');
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setMessage('You need to be logged in to apply for a subsidy.');
      return;
    }

    const { cropType, landSize, amountRequested, governmentSiteName } = formData;
    if (!cropType || !landSize || !amountRequested || !governmentSiteName) {
      setMessage('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      const token = getAuthToken();
      const api = createApiClient(token);

      const res = await api.post(ENDPOINTS.CREATE_SUBSIDY, {
        cropType,
        landSize: Number(landSize),
        amountRequested: Number(amountRequested),
        governmentSiteName,
      });

      setMessage(res.data.message);
      setFormData({
        cropType: '',
        landSize: '',
        amountRequested: '',
        governmentSiteName: '',
      });
    } catch (err) {
      if (err instanceof Error && err.message === 'Authentication token not found') {
        setMessage('Please login again to continue.');
        navigate('/login');
        return;
      }
      setMessage(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    {
      label: 'Crop Type',
      name: 'cropType',
      type: 'text',
      placeholder: 'e.g. Wheat, Rice',
      icon: Sprout,
    },
    {
      label: 'Land Size (in acres)',
      name: 'landSize',
      type: 'number',
      placeholder: 'e.g. 2.5',
      icon: Ruler,
    },
    {
      label: 'Amount Requested',
      name: 'amountRequested',
      type: 'number',
      placeholder: 'e.g. 10000',
      icon: Coins,
    },
    {
      label: 'Government Site Name',
      name: 'governmentSiteName',
      type: 'text',
      placeholder: 'e.g. agri.gov.in',
      icon: Globe,
    },
  ];

  return (
    <FarmerLayout title="Apply for Subsidy" subtitle="Submit your subsidy application for government review">
      <div className="min-h-screen bg-gradient-to-b from-white-50 to-white-100 py-12 px-4 sm:px-6 lg:px-8">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="max-w-xl mx-auto"
  >
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="px-6 py-8 sm:p-10">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-16 h-16 bg-naturopura-gradient rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Coins className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900">Subsidy Application</h2>
          <p className="mt-2 text-sm text-gray-600">
            Fill in the details below to apply for agricultural subsidies
          </p>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-700">{message}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {formFields.map(({ label, name, type, placeholder, icon: Icon }, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={type}
                  name={name}
                  value={(formData as any)[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#636d1e] focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition duration-200"
                  required
                />
              </div>
            </motion.div>
          ))}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition duration-200 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-naturopura-gradient shadow-lg hover:shadow-xl'
            } flex items-center justify-center gap-2`}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Coins className="h-5 w-5" />
                <span>Submit Application</span>
              </>
            )}
          </motion.button>
        </form>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <p className="text-xs text-center text-gray-600">
          By submitting this form, you agree to our terms and conditions for subsidy applications
        </p>
      </div>
    </div>
  </motion.div>
</div>

    </FarmerLayout>
  );
};

export default ApplySubsidyForm;