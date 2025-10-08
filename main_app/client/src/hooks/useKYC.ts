import { useState, useEffect } from 'react';
import { createApiClient } from '../config/api';
import { useAuth } from '../context/AuthContext';

interface KYCStatus {
  status: 'pending' | 'verified' | 'rejected';
  phoneVerified: boolean;
  documents: {
    aadhar?: string;
    pan?: string;
    selfie?: string;
  };
  verifiedAt?: Date;
  remarks?: string;
}

interface UseKYCResult {
  kyc: KYCStatus | null;
  loading: boolean;
  error: string | null;
  updateKYC: (data: Partial<KYCStatus>) => Promise<void>;
  refreshKYC: () => Promise<void>;
}

export const useKYC = (): UseKYCResult => {
  const [kyc, setKyc] = useState<KYCStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const apiClient = createApiClient(token || '');

  const fetchKYC = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      const response = await apiClient.get('/ekyc/status');
      setKyc(response.data.kyc);
      setError(null);
    } catch {
      setError('Failed to fetch KYC status');
    } finally {
      setLoading(false);
    }
  };

  const updateKYC = async (data: Partial<KYCStatus>) => {
    if (!token) return;
    
    try {
      setLoading(true);
      const response = await apiClient.put('/ekyc/update', data);
      setKyc(response.data.kyc);
      setError(null);
    } catch {
      setError('Failed to update KYC');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKYC();
  }, [token]);

  return {
    kyc,
    loading,
    error,
    updateKYC,
    refreshKYC: fetchKYC,
  };
};

export default useKYC;
