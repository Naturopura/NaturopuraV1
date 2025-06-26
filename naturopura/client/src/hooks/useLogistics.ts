import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { createApiClient, ENDPOINTS } from '../config/api';

interface LogisticsStatus {
  productId: string;
  status: {
    collection: {
      completed: boolean;
      timestamp?: Date;
      location?: string;
      notes?: string;
    };
    transportation: {
      completed: boolean;
      timestamp?: Date;
      location?: string;
      vehicleId?: string;
      estimatedArrival?: Date;
    };
    storage: {
      completed: boolean;
      timestamp?: Date;
      warehouseId?: string;
      temperature?: number;
      humidity?: number;
    };
    packaging: {
      completed: boolean;
      timestamp?: Date;
      packageType?: string;
      quantity?: number;
    };
    delivery: {
      completed: boolean;
      timestamp?: Date;
      location?: string;
      trackingId?: string;
      estimatedDelivery?: Date;
    };
  };
  currentStep: string;
  lastUpdated: Date;
}

export const useLogistics = (productId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [logisticsStatus, setLogisticsStatus] = useState<LogisticsStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (socket && productId) {
      // Join the logistics room for this product
      socket.emit('join-logistics-room', productId);

      // Listen for logistics updates
      socket.on('logistics-update', (updatedStatus: LogisticsStatus) => {
        setLogisticsStatus(updatedStatus);
      });

      // Fetch initial logistics status
      const fetchLogisticsStatus = async () => {
        try {
          const api = createApiClient();
          const response = await api.get(ENDPOINTS.GET_LOGISTICS_STATUS(productId));
          setLogisticsStatus(response.data);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch logistics status');
          setLoading(false);
        }
      };

      fetchLogisticsStatus();

      return () => {
        socket.emit('leave-logistics-room', productId);
        socket.off('logistics-update');
      };
    }
  }, [socket, productId]);

  const updateLogisticsStep = async (step: string, stepData: any) => {
    try {
      const api = createApiClient();
      await api.put(ENDPOINTS.UPDATE_LOGISTICS_STATUS(productId), {
        step,
        ...stepData
      });
    } catch (err) {
      setError('Failed to update logistics status');
    }
  };

  return {
    logisticsStatus,
    loading,
    error,
    updateLogisticsStep
  };
};