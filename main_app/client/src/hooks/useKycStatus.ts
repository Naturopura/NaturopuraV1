import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createApiClient } from '../config/api';

export const useKycStatus = () => {
  const { user, token, updateUser } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshKycStatus = async () => {
    if (!token || !user) return;
    
    setIsRefreshing(true);
    try {
      const apiClient = createApiClient(token);
      const response = await apiClient.get('/api/ekyc/status');
      if (response.data.success) {
        updateUser({
          ...user,
          kyc: response.data.data
        });
      }
    } catch (error) {
      console.error('Failed to refresh KYC status:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return { refreshKycStatus, isRefreshing };
};