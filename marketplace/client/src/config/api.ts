import axios, {  AxiosError } from "axios";

// Ensure base URL ends with /api
export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

export const ENDPOINTS = {
  // Drone Schedule endpoints
  DRONE_SCHEDULES: '/drone-schedules',
  UPDATE_DRONE_SCHEDULE: (id: string) => `/drone-schedules/${id}`,

  // Admin endpoints
  GET_DASHBOARD_STATS: '/admin/dashboard-stats',
  GET_STORE_MANAGER_DASHBOARD_STATS: "/store-manager/dashboard-stats",

  // Other endpoints...
  // Cart endpoints
  GET_CART: "/cart",
  ADD_TO_CART: "/cart/add",
  UPDATE_CART_ITEM: "/cart/update",
  REMOVE_FROM_CART: "/cart/remove",
  CLEAR_CART: "/cart/clear",

  // Auth endpoints
  LOGIN: "/users/login",
  REGISTER: "/users/register",
  GET_USER_PROFILE: "/users/profile",
  UPDATE_PROFILE: (id: string) => `/users/profile/${id}`,
  VALIDATE_TOKEN: "/users/validate",
  FORGOT_PASSWORD: "/users/forgot-password",
  RESET_PASSWORD: (token: string) => `/users/reset-password/${token}`,

  GET_VENDORS : '/users/vendors',
  UPDATE_VENDOR_STATUS : (id: string) => `/users/vendors/${id}/status`,
  GET_VENDOR_EQUIPMENTS: '/vendors/equipments',
  ADD_VENDOR_EQUIPMENTS: '/vendors/equipments/add',

  CHECK_PHONE_VERIFICATION: '/users/phone-verification-status',

  // Product endpoints
  GET_PRODUCTS: '/products',
  CREATE_PRODUCT: '/products',
  UPDATE_PRODUCT: (id: string) => `/products/${id}`,
  DELETE_PRODUCT: (id: string) => `/products/${id}`,
  GET_PRODUCT: (id: string) => `/products/${id}`,

  // Loan endpoints
  CREATE_LOAN: "/loans",
  GET_FARMER_LOANS: "/loans/farmer",
  GET_ALL_LOANS: "/loans",
  GET_LOAN_BY_ID: (id: string) => `/loans/${id}`,
  UPDATE_LOAN_STATUS: (id: string) => `/loans/${id}/status`,
  GET_LOAN_STATS: "/loans/stats",

  // Subsidy endpoints
  CREATE_SUBSIDY: "/subsidy/apply",
  GET_MY_SUBSIDIES: "/subsidy/my",
  GET_ALL_SUBSIDIES: "/subsidy/all",
  UPDATE_SUBSIDY_STATUS: (id: string) => `/subsidy/${id}/status`,

  // Insurance endpoints
  APPLY_INSURANCE: "/insurance/apply",
  GET_MY_INSURANCE: "/insurance/my",
  GET_ALL_INSURANCE: "/insurance/all",
  UPDATE_INSURANCE_STATUS: (id: string) => `/insurance/${id}/status`,

  // Dashboard endpoints
  GET_DASHBOARD_CHARTS: "/dashboard/charts",
  GET_FARMERS: "/users/farmers",

  // Delivery Partner endpoints
  GET_DELIVERY_PARTNER_PURCHASES: '/delivery-partner/assigned',
  ASSIGN_PURCHASE: (id: string) => `/delivery-partner/assign/${id}`,

  // eKYC endpoints
  VERIFY_EKYC: '/ekyc/verify',
  GET_EKYC_STATUS: "/ekyc/status",

  // Logistics endpoints
  LOGISTICS: '/logistics',
  INITIALIZE_LOGISTICS: '/logistics/initialize',
  UPDATE_LOGISTICS_STATUS: (productId: string) => `/logistics/${productId}/status`,
  GET_LOGISTICS_STATUS: (productId: string) => `/logistics/${productId}`,
  UPDATE_LOGISTICS_STEP: (productId: string) => `/logistics/${productId}/update`,

  // Payment endpoints
  TEST_PAYMENT: "/payments/test-payment",
  PURCHASE: "/payments/purchase",
  PROCESS_CRYPTO_PURCHASE: "/payments/purchase", // Changed to match server route
  PREDICT_PRICE: "/products/predict-price", // Remove the /api prefix
  GET_PAYMENT_STATUS: "/payments/status",
  VERIFY_PAYMENT: "/payments/verify",

  // Razorpay endpoints
  CREATE_RAZORPAY_ORDER: "/payments/razorpay/order",
  VERIFY_RAZORPAY_PAYMENT: "/payments/razorpay/verify",

  // Admin endpoints
  GET_PURCHASES: '/admin/purchases',
  GET_USER_PURCHASES: '/payments/user/purchases',
  GET_DELIVERY_PARTNERS: '/admin/delivery-partners',
  UPDATE_DELIVERY_PARTNER_STATUS: (id: string) => `/admin/delivery-partners/${id}/approval`,
  GET_STORE_MANAGERS: '/admin/store-managers',
  UPDATE_STORE_MANAGER_STATUS: (id: string) => `/admin/store-managers/${id}/approval`,
  UPDATE_STORE_MANAGER_PRODUCT_STATUS: (id: string) => `/store-manager/products/${id}/status`,

  // Motion Event endpoints
  GET_MOTION_EVENTS: "/motion",

  // OTP endpoints
  SEND_OTP: "/otp/send-otp",
  VERIFY_OTP: "/otp/verify-otp",

  // AI endpoints
  AI_MESSAGES: "/ai/messages",
  AI_ANALYZE_IMAGE: "/ai/analyze-image",
  AI_CHAT: "/ai/chat",

  // Drone Schedule endpoints
  GET_DRONE_SCHEDULES_BY_FARMER: (farmerId: string) => `/drone-schedules/farmer/${farmerId}`,
  UPDATE_DRONE_SCHEDULE_STATUS: (id: string) => `/drone-schedules/${id}/status`,

  // Equipment request endpoints
  GET_EQUIPMENT_REQUEST_STATUSES: '/equipment/requests/status',
  CREATE_EQUIPMENT_REQUEST: '/equipment/requests',
};

// Global API error handler
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;

    if (axiosError.response) {
      return axiosError.response.data?.message || axiosError.message;
    }

    if (axiosError.request) {
      return "Network error. Please check your connection.";
    }

    return axiosError.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
};

// Authenticated Axios client creator
export const createApiClient = (token?: string) => {
  const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  });

  // Add request interceptor to log requests
  client.interceptors.request.use(
    config => {
      return config;
    },
    error => {
      console.error('API request error:', error);
      return Promise.reject(error);
    }
  );



   // Add response interceptor to handle errors
  client.interceptors.response.use(
    response => response,
    async (error) => {
      if (error.response?.status === 401) {
        console.error('Auth error details:', {
          config: error.config,
          status: error.response.status,
          headers: error.response.headers
        });

        // Check if we have a token in localStorage
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          try {
            // Create a new client with the stored token
            const verificationClient = createApiClient(storedToken);
            try {
              const response = await verificationClient.get(ENDPOINTS.VALIDATE_TOKEN);
              
              if (response.data.success) {
                // If token is valid, retry the original request
                return client(error.config);
              } else {
                // Token invalid or expired, remove it
                localStorage.removeItem('token');
                localStorage.removeItem('user');
              }
            } catch (error) {
              console.error('Token validation failed:', error);
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              return Promise.reject(error);
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            // Remove invalid token
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }

        // If token refresh fails or no auth context, reject with original error
        return Promise.reject(error);
      }

      // For other errors, just reject with the error
      return Promise.reject(error);
    }
  );

  return client;
};

// Add this new type file for API related types
export interface UploadProgressEvent {
  loaded: number;
  total: number;
}

export interface ApiError {
  message: string;
  response?: {
    data?: {
      message?: string;
      code?: number;
      success?: boolean;
      verificationToken?: string;
    };
    status?: number;
  };
}
