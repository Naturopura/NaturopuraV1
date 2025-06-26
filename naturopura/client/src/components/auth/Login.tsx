import React, { useState } from 'react';
import {
  LucideEye,
  LucideEyeOff,
  LucideMail,
  LucideLock,
  LucideLoader2,
  LucideSprout,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createApiClient, ENDPOINTS, handleApiError } from '../../config/api';
import FloatingParticles from '../home/FloatingParticles';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Attempting login with:', { email });

      // Create API client without token for login
      const apiClient = createApiClient();
      const response = await apiClient.post(ENDPOINTS.LOGIN, {
        email,
        password
      });

      console.log('Login response:', response.data);

      const { token, user } = response.data;

      if (!token || !user) {
        throw new Error('Invalid response format from server');
      }

      // Debug log before context update
      console.log('Logging in user:', user);

      // Login using context
      login(user, token);

      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/farmer/dashboard');
      }
    } catch (error) {
      const errorMessage = handleApiError(error);
      console.error('Login error:', {
        message: errorMessage,
        error
      });

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-400/20 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-yellow-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <FloatingParticles />

      <div className="flex flex-col md:flex-row min-h-screen relative z-10">
        {/* Left side - Decorative */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-12">
          <motion.div
            className="text-center max-w-lg space-y-8"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-6xl font-bold mb-4 flex items-center justify-center space-x-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <LucideSprout className="w-12 h-12 text-blue-600" />
              <span className="bg-gradient-to-r from-blue-600 via-green-500 to-purple-600 text-transparent bg-clip-text">
                Welcome to Naturopura
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Secure, elegant, and powerful. Manage your farm operations efficiently with our platform.
            </motion.p>
            <motion.div
              className="flex justify-center space-x-6 mt-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50K+</div>
                <div className="text-sm text-gray-600">Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">₹100Cr+</div>
                <div className="text-sm text-gray-600">Transactions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">15+</div>
                <div className="text-sm text-gray-600">States</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right side - Login form */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <motion.div
            className="w-full max-w-md bg-white/60 backdrop-blur-md p-10 rounded-3xl border border-white/50 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-600 to-green-600 text-transparent bg-clip-text">
                  Welcome back
                </span>
              </h2>
              <p className="text-gray-600 text-xl">
                Please sign in to your account
              </p>
            </div>

            {error && (
              <div className="mb-6 font-semibold p-4 rounded-2xl border border-red-200/50 text-red-600 bg-red-100/60 backdrop-blur-md">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-gray-700 text-sm font-semibold">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-600">
                      <LucideMail className="h-4 w-4" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10 w-full bg-transparent border border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-300/50 transition-all duration-200 text-gray-700 placeholder-gray-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-gray-700 text-sm font-semibold">
                      Password
                    </label>
                    <a
                      href="#forgot-password"
                      className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-600">
                      <LucideLock className="h-4 w-4" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-10 w-full bg-transparent border border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-300/50 transition-all duration-200 text-gray-700 placeholder-gray-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <LucideEyeOff className="h-4 w-4" />
                      ) : (
                        <LucideEye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white py-4 font-semibold transition-all duration-300 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white/60 px-2 text-gray-600">
                    New to the platform?
                  </span>
                </div>
              </div>

              <div className="text-center text-gray-600 text-sm">
                <a
                  href="/register"
                  className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-all duration-200"
                >
                  Create an account
                </a>
              </div>
            </form>

            <div className="pt-4 text-center text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <a href="#terms" className="text-blue-600 hover:text-blue-700">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#privacy" className="text-blue-600 hover:text-blue-700">
                Privacy Policy
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Login;
