import React, { createContext, useContext, useState, useEffect } from 'react';
import { createApiClient, ENDPOINTS } from '../config/api';
import posthog from 'posthog-js';

// AuthContext.tsx
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'farmer' | 'delivery_partner' | 'store_manager' | 'vendor';
  token: string | null;
  phoneNumber?: string;
  isPhoneVerified?: boolean;
  phoneVerifiedAt?: Date;
  location?: {
    latitude: number;
    longitude: number;
  };
  // Add the kyc property here
  kyc?: {
    status: 'pending' | 'verified' | 'rejected';
    phoneVerified: boolean;
    aadhaarDetails?: {
      number: string;
      otpSent: boolean;
      otpVerified: boolean;
      transactionId: string;
      verifiedAt: Date;
    };
    documents: {
      aadhar?: string;
      pan?: string;
      selfie?: string;
    };
    verifiedAt?: Date;
    remarks?: string;
  };
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  updateUser: (userData: User) => void;
  setToken: (token: string | null) => void;
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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");

    if (tokenFromUrl && !localStorage.getItem("token")) {
      const role = urlParams.get("role");
      const tempUser: User = {
        id: "",
        name: "",
        email: "",
        role: role as User["role"],
        token: tokenFromUrl,
      };

      setToken(tokenFromUrl);
      login(tempUser, tokenFromUrl);

      const cleanUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  const fetchUserProfile = React.useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const apiClient = createApiClient(token);
      const response = await apiClient.get(ENDPOINTS.GET_USER_PROFILE);

      if (response.data.success && response.data.user) {
        setUser(response.data.user);

        if (response.data.user.phoneNumber) {
          localStorage.setItem('userPhoneNumber', response.data.user.phoneNumber);
        }
      } else {
        throw new Error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Fetching user profile failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const value = {
    user,
    token,
    login,
    logout,
    updateUser,
    setToken,
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
