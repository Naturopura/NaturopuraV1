import React, { useState, useEffect } from 'react';
import { createApiClient, ENDPOINTS, handleApiError } from '../../config/api';
import AdminLayout from '../layouts/AdminLayout';
import { format } from 'date-fns';
import axios from 'axios';

const apiClient = createApiClient();

const GEOCODING_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Helper function to get address from coordinates
const getAddressFromCoords = async (lat: number, lng: number) => {
  try {
    console.log('Attempting to fetch address for coordinates:', { lat, lng });
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GEOCODING_API_KEY}`
    );
    console.log('Geocoding API response status:', response.status);

    if (response.data.results.length > 0) {
      console.log('Found address:', response.data.results[0].formatted_address);
      return response.data.results[0].formatted_address;
    }
    console.log('No results found for coordinates:', { lat, lng });
    return null;
  } catch (error) {
    console.error('Error getting address:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data || error.message);
    }
    return null;
  }
};

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

const DroneScheduleList: React.FC = () => {
  const [schedules, setSchedules] = useState<DroneSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locations, setLocations] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    fetchDroneSchedules();
  }, []);

  const fetchDroneSchedules = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(ENDPOINTS.DRONE_SCHEDULES);
      const newSchedules = response.data;
      setSchedules(newSchedules);
      setError(null);

      // Fetch locations for all schedules that don't have them yet
      const locationPromises = newSchedules
        .filter((schedule: DroneSchedule) => !locations[schedule._id])
        .map(async (schedule: DroneSchedule) => {
          try {
            // Log the coordinates being parsed
            console.log('Fetching address for:', schedule._id, 'with coordinates:', schedule.currentLocation);

            // Parse coordinates with error handling
            const coords = schedule.currentLocation.split(',');
            if (coords.length !== 2) {
              console.error('Invalid coordinates format:', schedule.currentLocation);
              return { id: schedule._id, address: null };
            }

            const lat = parseFloat(coords[0]);
            const lng = parseFloat(coords[1]);

            if (isNaN(lat) || isNaN(lng)) {
              console.error('Invalid coordinate values:', schedule.currentLocation);
              return { id: schedule._id, address: null };
            }

            // Check if coordinates are within valid range
            if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
              console.error('Coordinates out of range:', schedule.currentLocation);
              return { id: schedule._id, address: null };
            }

            // Log the parsed coordinates
            console.log('Parsed coordinates:', { lat, lng });

            // Add a small delay to avoid API rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Fetch address with retry logic
            let address = null;
            for (let attempt = 1; attempt <= 3; attempt++) {
              try {
                address = await getAddressFromCoords(lat, lng);
                if (address) {
                  console.log('Successfully fetched address (attempt', attempt, '):', address);
                  break;
                }
              } catch (error) {
                console.error('Error fetching address (attempt', attempt, '):', error);
                if (attempt === 3) {
                  throw error; // Rethrow on last attempt
                }
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
              }
            }

            return { id: schedule._id, address };
          } catch (error) {
            console.error('Final error fetching address for:', schedule._id, error);
            return { id: schedule._id, address: null };
          }
        });

      const locationResults = await Promise.all(locationPromises);
      const newLocations = locationResults.reduce((acc, { id, address }) => ({
        ...acc,
        [id]: address
      }), {});

      setLocations(prev => ({
        ...prev,
        ...newLocations
      }));
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (scheduleId: string, status: 'approved' | 'rejected') => {
    try {
      await apiClient.put(`${ENDPOINTS.DRONE_SCHEDULES}/${scheduleId}/status`, { status });
      await fetchDroneSchedules();
    } catch (err) {
      setError(handleApiError(err));
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Drone Schedules" subtitle="Manage drone flight schedules">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="bg-gradient-to-r from-blue-100/60 to-cyan-100/60 backdrop-blur-sm rounded-2xl h-16 border border-blue-200/50 shadow-lg"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gradient-to-r from-white/80 to-blue-50/60 backdrop-blur-sm rounded-xl h-40 border border-blue-200/30 shadow-md"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout title="Drone Schedules" subtitle="Manage drone flight schedules">
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
              onClick={fetchDroneSchedules}
              className="mt-6 group relative px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
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
      </AdminLayout>
    );
  }

  // Now you can safely return early
  if (!GEOCODING_API_KEY) {
    console.error('Google Maps API key is not configured. Please set VITE_Maps_API_KEY in your environment variables.');
    return (
      <AdminLayout title="Drone Schedules" subtitle="Manage drone flight schedules">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-red-50 to-rose-50 backdrop-blur-sm border border-red-200 text-red-800 px-6 py-4 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold">Warning</h3>
                  <p className="mt-2">Google Maps API key is not configured. Please contact your administrator.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Drone Schedules" subtitle="Manage drone flight schedules">
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Mission Control Center
                  </h2>
                  <p className="text-gray-600 mt-1">Authorize and manage drone flight operations</p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="flex space-x-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 backdrop-blur-sm border border-green-200 rounded-xl px-4 py-2 shadow-md">
                  <div className="text-green-600 text-sm font-medium">Approved</div>
                  <div className="text-green-800 text-xl font-bold">
                    {schedules.filter(s => s.status === 'approved').length}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 backdrop-blur-sm border border-yellow-200 rounded-xl px-4 py-2 shadow-md">
                  <div className="text-yellow-600 text-sm font-medium">Pending</div>
                  <div className="text-yellow-800 text-xl font-bold">
                    {schedules.filter(s => s.status === 'pending').length}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-rose-50 backdrop-blur-sm border border-red-200 rounded-xl px-4 py-2 shadow-md">
                  <div className="text-red-600 text-sm font-medium">Rejected</div>
                  <div className="text-red-800 text-xl font-bold">
                    {schedules.filter(s => s.status === 'rejected').length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Schedules Table */}
          {schedules.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-6 shadow-lg">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Flight Requests</h3>
              <p className="text-gray-500">No drone flight schedules to review at this time.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm border border-blue-200/50 shadow-xl">
              <div className="bg-white rounded-xl shadow-lg overflow-x-auto sm:overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-200/50">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>Farmer</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          <span>Field Name</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Date</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span>Provider</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          <span>Location</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Status</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-blue-700 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                          </svg>
                          <span>Actions</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-100/50">
                    {schedules.map((schedule, index) => (
                      <tr
                        key={schedule._id}
                        className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-cyan-50/50 transition-all duration-300 group whitespace-nowrap sm:whitespace-normal"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-md">
                              <span className="text-white text-xs font-bold">
                                {schedule.farmerId.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span className="font-medium">{schedule.farmerId}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
                            <span className="font-medium">{schedule.fieldName}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          <div className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg border border-blue-200/50 shadow-sm">
                            <span className="text-blue-700 font-medium">
                              {format(new Date(schedule.date), 'dd MMM yyyy')}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-md flex items-center justify-center shadow-md">
                              <span className="text-white text-xs font-bold">
                                {schedule.provider.charAt(0)}
                              </span>
                            </div>
                            <span>{schedule.provider}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            {locations[schedule._id] ? (
                              <span className="text-blue-700">{locations[schedule._id]}</span>
                            ) : (
                              <span className="text-blue-700">Coordinates: {schedule.currentLocation}</span>
                            )}
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${schedule.currentLocation}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline ml-2"
                            >
                              View on Map
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border shadow-sm ${
                              schedule.status === 'approved'
                                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200'
                                : schedule.status === 'rejected'
                                ? 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200'
                                : 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border-yellow-200'
                            }`}
                          >
                            <div className="flex items-center space-x-1">
                              <div className={`w-2 h-2 rounded-full ${
                                schedule.status === 'approved' ? 'bg-green-400' :
                                schedule.status === 'rejected' ? 'bg-red-400' : 'bg-yellow-400'
                              } animate-pulse`}></div>
                              <span className="capitalize">{schedule.status}</span>
                            </div>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {schedule.status === 'pending' ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleStatusChange(schedule._id, 'approved')}
                                className="group relative px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
                              >
                                <span className="flex items-center space-x-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span>Approve</span>
                                </span>
                              </button>
                              <button
                                onClick={() => handleStatusChange(schedule._id, 'rejected')}
                                className="group relative px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
                              >
                                <span className="flex items-center space-x-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                  <span>Reject</span>
                                </span>
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
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
    </AdminLayout>
  );
};

export default DroneScheduleList;