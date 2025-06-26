import { io, Socket } from 'socket.io-client';
import { createApiClient, ENDPOINTS } from '../config/api';
import { AuthContextType } from '../context/AuthContext';

class LogisticsService {
  private socket: Socket | null = null;
  private apiClient: ReturnType<typeof createApiClient>;
  
  constructor(authContext: AuthContextType | undefined) {
    if (!authContext?.token) {
      throw new Error('Authentication token is required');
    }
    this.apiClient = createApiClient(authContext.token);
  }

  getSocket() {
    return this.socket;
  }

  updateToken(token: string) {
    this.apiClient = createApiClient(token);
  }

  connect() {
    // Use the same port as the API server
    const socketUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    
    this.socket = io(socketUrl + '/logistics', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });
    
    this.socket.on('connect', () => {
      console.log('Connected to logistics socket');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from logistics socket');
    });

    this.socket.on('connect_error', (err) => {
      console.error('Socket.IO connection error:', err);
    });
  }

  subscribeToLogistics(productId: string, callback: (data: any) => void) {
    if (!this.socket) this.connect();
    
    this.socket?.emit('join-logistics-room', productId);
    this.socket?.on('logistics-update', callback);
  }

  async updateLogisticsStatus(productId: string, step: string, status: string, data: any) {
    try {
      const response = await this.apiClient.put(
        `${ENDPOINTS.LOGISTICS}/${productId}/status`,
        { step, status, ...data }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getStatus(productId: string) {
    try {
      const response = await this.apiClient.get(ENDPOINTS.GET_LOGISTICS_STATUS(productId));
      return response.data;
    } catch (error) {
      console.error('Error fetching logistics status:', error);
      throw error;
    }
  }

  unsubscribeFromLogistics(productId: string) {
    this.socket?.emit('leave-logistics-room', productId);
    this.socket?.off('logistics-update');
  }

  async initializeLogistics(productId: string) {
    return this.apiClient.post(ENDPOINTS.INITIALIZE_LOGISTICS, { productId });
  }

  async updateLogisticsStep(productId: string, step: string, stepData: any) {
    const response = await this.apiClient.put(ENDPOINTS.UPDATE_LOGISTICS_STEP(productId), {
      step,
      ...stepData
    });
    return response.data;
  }

  async getLogisticsStatus(productId: string) {
    return this.apiClient.get(ENDPOINTS.GET_LOGISTICS_STATUS(productId));
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

let logisticsServiceInstance: LogisticsService | undefined;

export const getLogisticsService = (authContext?: AuthContextType) => {
  if (!logisticsServiceInstance) {
    logisticsServiceInstance = new LogisticsService(authContext);
  }
  return logisticsServiceInstance;
}