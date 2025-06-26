import React, { createContext, useContext, useState, useEffect } from 'react';
import { createApiClient, ENDPOINTS } from '../config/api';
import posthog from 'posthog-js';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'farmer' | 'delivery_partner';
  token: string | null;
  phoneNumber?: string;
  isPhoneVerified?: boolean;
  phoneVerifiedAt?: Date;
  location?: {
    latitude: number;
    longitude: number;
  };
  kyc?: {
    status: 'pending' | 'verified' | 'rejected';
    phoneVerified?: boolean;
    documents?: {
      aadhar?: string;
      pan?: string;
      selfie?: string;
    };
    verifiedAt?: Date;
  };
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  updateUser: (userData: User) => void; // Add this line
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const login = (userData: User, authToken: string) => {
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));

    if (userData.phoneNumber) {
      localStorage.setItem('userPhoneNumber', userData.phoneNumber);
    }

    setToken(authToken);
    setUser(userData);
  };

  // Add this useEffect to identify user to PostHog when user state changes
  useEffect(() => {
    if (user && posthog && posthog.identify) {
      posthog.identify(user.id, {
        email: user.email,
        name: user.name,
        role: user.role,
      });
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userPhoneNumber');
    setUser(null);
    setToken(null);
    posthog.reset();
  };

  const updateUser = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const verifyToken = React.useCallback(async () => {
    if (!token) {
      setLoading(false);
      return false;
    }

    try {
      const apiClient = createApiClient(token);
      const response = await apiClient.get(ENDPOINTS.VALIDATE_TOKEN);

      if (response.data.success) {
        if (response.data.user && JSON.stringify(response.data.user) !== JSON.stringify(user)) {
          setUser(response.data.user);
        }
        return true;
      } else {
        throw new Error('Token validation failed');
      }
    } catch (error) {
      console.error('Token verification failed:', error);

      if (error instanceof Error && error.message === 'Request failed with status code 401') {
        try {
          const refreshApi = createApiClient(token);
          const refreshResponse = await refreshApi.get(ENDPOINTS.VALIDATE_TOKEN);
          if (refreshResponse.data.success && refreshResponse.data.token) {
            const newToken = refreshResponse.data.token;
            localStorage.setItem('token', newToken);
            setToken(newToken);

            const retryApi = createApiClient(newToken);
            const retryResponse = await retryApi.get(ENDPOINTS.VALIDATE_TOKEN);
            if (retryResponse.data.success) {
              return true;
            }
          }
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
        }
      }

      logout();
      return false;
    }
  }, [token, user]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  useEffect(() => {
    let refreshInterval: NodeJS.Timeout;

    if (token) {
      refreshInterval = setInterval(async () => {
        try {
          const isValid = await verifyToken();
          if (!isValid) {
            logout();
          }
        } catch (error) {
          console.error('Token refresh failed:', error);
          logout();
        }
      }, 30 * 60 * 1000); // Refresh every 30 minutes
    }

    return () => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [token, verifyToken]);

  useEffect(() => {
    const verifyTokenInner = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const apiClient = createApiClient(token);
        const response = await apiClient.get(ENDPOINTS.VALIDATE_TOKEN);

        if (response.data.success && response.data.user) {
          setUser(response.data.user);

          if (response.data.user.phoneNumber) {
            localStorage.setItem('userPhoneNumber', response.data.user.phoneNumber);
          }
        } else {
          throw new Error('Token verification failed');
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyTokenInner();
  }, [token]);

  const value = {
    user,
    token,
    login,
    logout,
    updateUser, // Add this line
    isAuthenticated: !!user && !!token,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
