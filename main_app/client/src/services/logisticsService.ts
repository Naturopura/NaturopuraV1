import { io, Socket } from 'socket.io-client';
import { createApiClient, ENDPOINTS } from '../config/api';
// Removed import of AuthContextType to fix error

class LogisticsService {
  private static instance: LogisticsService | null = null;
  private socket: Socket | null = null;
  private apiClient: ReturnType<typeof createApiClient>;
  private listeners: Map<string, ((data: any) => void)[]> = new Map();
  
  private constructor(authContext?: any) {
    if (!authContext?.token) {
      throw new Error('Authentication token is required');
    }
    this.apiClient = createApiClient(authContext.token);
  }

  static getInstance(authContext?: any): LogisticsService {
    if (!this.instance) {
      this.instance = new LogisticsService(authContext);
    }
    return this.instance;
  }

  getSocket() {
    return this.socket;
  }

  updateToken(token: string) {
    this.apiClient = createApiClient(token);
  }

  connect() {
    if (this.socket) {
      return;
    }

    // Use the same port as the API server
    let socketUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    if (socketUrl.endsWith('/')) {
      socketUrl = socketUrl.slice(0, -1);
    }
    
    this.socket = io(socketUrl + '/logistics', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });
    
    this.socket.on('connect', () => {
      // Rejoin all rooms on reconnect
      this.listeners.forEach((_, productId) => {
        this.socket?.emit('join-logistics-room', productId);
      });
    });

    this.socket.on('disconnect', () => {
    });

    this.socket.on('connect_error', (err) => {
      console.error('Socket.IO connection error:', err);
    });

    this.socket.on('logistics-update', (data: any) => {
      const { productId } = data;
      const callbacks = this.listeners.get(productId);
      if (callbacks) {
        callbacks.forEach(callback => callback(data));
      }
    });
  }

  subscribeToLogistics(productId: string, callback: (data: any) => void) {
    if (!this.socket) {
      this.connect();
    }

    // Store the callback
    if (!this.listeners.has(productId)) {
      this.listeners.set(productId, []);
    }
    const callbacks = this.listeners.get(productId);
    if (callbacks) {
      callbacks.push(callback);
    }
    this.socket?.emit('join-logistics-room', productId);
    this.socket?.on('join-logistics-room', (productId: string) => {
      console.log(`Joined logistics room for product ${productId}`);
    });
    
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
    const callbacks = this.listeners.get(productId);
    if (callbacks) {
      callbacks.length = 0; // Clear callbacks
      this.listeners.delete(productId);
    }
   
    this.socket?.emit('leave-logistics-room', productId);
    this.socket?.off('join-logistics-room');
    this.socket?.off('leave-logistics-room');
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
    const response = await this.apiClient.get(ENDPOINTS.GET_LOGISTICS_STATUS(productId));
    return response.data;
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

export default LogisticsService;

export const getLogisticsService = (authContext?: any) => {
  return LogisticsService.getInstance(authContext);
}
