import React, { useState } from 'react';
import { createApiClient, ENDPOINTS, handleApiError } from '../../config/api';
import FarmerLayout from '../layouts/FarmerLayout';
import { useNavigate } from 'react-router-dom';
import { toast } from '../ui/use-toast';

// Add helper function for token validation
const getAuthToken = (): string => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return token;
};

const ApplyInsuranceForm = () => {
  const [form, setForm] = useState({
    insuranceType: '',
    cropType: '',
    landSize: '',
    premiumAmount: '',
    description: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = getAuthToken();
      const api = createApiClient(token);
      
      await api.post(ENDPOINTS.APPLY_INSURANCE, {
        ...form,
        landSize: Number(form.landSize),
        premiumAmount: Number(form.premiumAmount),
      });

      setSuccessMessage('Insurance application submitted successfully!');
      setTimeout(() => {
        navigate('/farmer/insurance');
      }, 2000); // Navigate after 2 seconds to allow message display
    } catch (err) {
      const error = err as Error;
      console.error(handleApiError(err));
      
      if (error.message === 'No authentication token found') {
        toast({
          title: "Authentication Error",
          description: "Please login to submit an insurance application",
          variant: "destructive",
        });
        navigate('/login', { state: { from: '/farmer/insurance/apply' } });
        return;
      }
    }
  };

  return (
    <FarmerLayout title="Apply for Insurance" subtitle="Fill in your insurance details">
      <div className="max-w-2xl mx-auto p-8 bg-gradient-to-tr from-green-100 via-white to-green-50 rounded-2xl shadow-xl">
        {successMessage && (
          <div className="bg-green-600 text-white p-4 rounded-lg mb-6 text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-gradient-to-tr from-green-50 via-white to-green-100 p-6 rounded-2xl shadow-lg">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Insurance Type</label>
            <select
              name="insuranceType"
              value={form.insuranceType}
              onChange={handleChange}
              required
              className="w-full border border-[#636d1e] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#636d1e]"
            >
              <option value="">Select Type</option>
              <option value="Crop">Crop</option>
              <option value="Livestock">Livestock</option>
              <option value="Equipment">Equipment</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Crop Type</label>
            <input
              type="text"
              name="cropType"
              value={form.cropType}
              onChange={handleChange}
              className="w-full border border-[#636d1e] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#636d1e]"
              placeholder="e.g. Wheat, Rice"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Land Size (in acres)</label>
            <input
              type="number"
              name="landSize"
              value={form.landSize}
              onChange={handleChange}
              className="w-full border border-[#636d1e] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#636d1e]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Premium Amount (₹)</label>
            <input
              type="number"
              name="premiumAmount"
              value={form.premiumAmount}
              onChange={handleChange}
              required
              className="w-full border border-[#636d1e] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#636d1e]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-[#636d1e] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#636d1e]"
              placeholder="Describe your requirement..."
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-naturopura-gradient text-white py-2 rounded-md font-semibold hover:bg-green-700 transition duration-300"
          >
            Submit Application
          </button>
        </form>
      </div>
    </FarmerLayout>
  );
};

export default ApplyInsuranceForm;
