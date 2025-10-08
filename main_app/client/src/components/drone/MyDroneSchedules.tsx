import React, { useState, useEffect } from 'react';
import FarmerLayout from '../layouts/FarmerLayout';
import { createApiClient, ENDPOINTS, handleApiError } from '../../config/api';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';

const apiClient = createApiClient();

interface DroneSchedule {
  _id: string;
  farmerId: string;
  date: string;
  fieldName: string;
  provider: string;
  currentLocation: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

const MyDroneSchedules: React.FC = () => {
  const { user } = useAuth();
  const userId = user?.id || '';
  const [schedules, setSchedules] = useState<DroneSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMySchedules();
  }, []);

  const fetchMySchedules = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`${ENDPOINTS.DRONE_SCHEDULES}/farmer/${userId}`);
      setSchedules(response.data);
      setError(null);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <FarmerLayout title='Your Drone Schedule' subtitle='See The Schedule Details'>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="bg-gradient-to-r from-blue-100/60 to-cyan-100/60 backdrop-blur-sm rounded-2xl h-16 border border-blue-200/50 shadow-lg"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gradient-to-r from-white/80 to-blue-50/60 backdrop-blur-sm rounded-xl h-32 border border-blue-200/30 shadow-md"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FarmerLayout>
    );
  }

  if (error) {
    return (
      <FarmerLayout title='Your Drone Schedule' subtitle='See The Schedule Details'>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-red-50 to-rose-50 backdrop-blur-sm border border-red-200 text-red-800 px-6 py-4 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="font-medium">{error}</span>
              </div>
            </div>
            <button
              onClick={fetchMySchedules}
              className="mt-6 group relative px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Retry Connection</span>
              </span>
            </button>
          </div>
        </div>
      </FarmerLayout>
    );
  }

  return (
    <FarmerLayout title='Your Drone Schedule' subtitle='See The Schedule Details'>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-naturopura-gradient rounded-xl shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-naturopura-gradient">
                  Flight Operations Dashboard
                </h2>
                <p className="text-gray-600 mt-1">Monitor your scheduled drone missions</p>
              </div>
            </div>
          </div>

          {/* Schedules Grid */}
          {schedules.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-6 shadow-lg">
                <svg className="w-12 h-12 naturopura-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Flight Schedules</h3>
              <p className="text-gray-500">You haven't scheduled any drone flights yet.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-blue-200/50 shadow-xl">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-200/50">
                      <th className="px-6 py-4 text-left text-xs font-bold naturopura-text uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          <span>Field Name</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold naturopura-text uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Mission Date</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold naturopura-text uppercase tracking-wider">
                        <div className="flex items-center space-x-2 ">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span>Provider</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold naturopura-text uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Status</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold naturopura-text uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          <span>Location</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-100/50">
                    {schedules.map((schedule, index) => (
                      <tr 
                        key={schedule._id} 
                        className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-cyan-50/50 transition-all duration-300 group"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
                            <span className="text-gray-800 font-medium group-hover:text-blue-700 transition-colors">
                              {schedule.fieldName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg border border-blue-200/50 shadow-sm">
                              <span className="text-blue-700 text-sm font-medium">
                                {format(new Date(schedule.date), 'MMM d, yyyy')}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
                              <span className="text-white text-xs font-bold">
                                {schedule.provider.charAt(0)}
                              </span>
                            </div>
                            <span className="text-gray-700">{schedule.provider}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border shadow-sm ${
                            schedule.status === 'approved' 
                              ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200' :
                            schedule.status === 'rejected' 
                              ? 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200' :
                              'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border-yellow-200'
                          }`}>
                            <div className="flex items-center space-x-1">
                              <div className={`w-2 h-2 rounded-full ${
                                schedule.status === 'approved' ? 'bg-green-400' :
                                schedule.status === 'rejected' ? 'bg-red-400' : 'bg-yellow-400'
                              } animate-pulse`}></div>
                              <span className="capitalize">{schedule.status}</span>
                            </div>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            <span className="text-gray-600 text-sm">{schedule.currentLocation}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </FarmerLayout>
  );
};

export default MyDroneSchedules;