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
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GEOCODING_API_KEY}`
    );

    if (response.data.results.length > 0) {
      return response.data.results[0].formatted_address;
    }
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

      // Fetch locations in background without blocking UI
      fetchLocationsInBackground(newSchedules);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const fetchLocationsInBackground = async (schedules: DroneSchedule[]) => {
    // Fetch locations for schedules that don't have them yet
    const schedulesToFetch = schedules.filter((schedule: DroneSchedule) => !locations[schedule._id]);
    
    if (schedulesToFetch.length === 0) return;

    // Process locations in batches to avoid overwhelming the API
    const batchSize = 3;
    for (let i = 0; i < schedulesToFetch.length; i += batchSize) {
      const batch = schedulesToFetch.slice(i, i + batchSize);
      
      const locationPromises = batch.map(async (schedule: DroneSchedule) => {
        try {
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

          // Fetch address with retry logic
          let address = null;
          for (let attempt = 1; attempt <= 2; attempt++) { // Reduced from 3 to 2 attempts
            try {
              address = await getAddressFromCoords(lat, lng);
              if (address) {
                break;
              }
            } catch (error) {
              console.error('Error fetching address (attempt', attempt, '):', error);
              if (attempt === 2) {
                break; // Don't throw, just break
              }
              await new Promise(resolve => setTimeout(resolve, 500 * attempt)); // Reduced delay
            }
          }

          return { id: schedule._id, address };
        } catch (error) {
          console.error('Final error fetching address for:', schedule._id, error);
          return { id: schedule._id, address: null };
        }
      });

      try {
        const locationResults = await Promise.all(locationPromises);
        const newLocations = locationResults.reduce((acc, { id, address }) => ({
          ...acc,
          [id]: address
        }), {});

        // Update locations state incrementally
        setLocations(prev => ({
          ...prev,
          ...newLocations
        }));
      } catch (error) {
        console.error('Error processing location batch:', error);
      }

      // Add delay between batches to respect API rate limits
      if (i + batchSize < schedulesToFetch.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  };

  const handleStatusChange = async (scheduleId: string, status: 'approved' | 'rejected') => {
    try {
      // Optimistic update - update UI immediately
      setSchedules(prevSchedules => 
        prevSchedules.map(schedule => 
          schedule._id === scheduleId 
            ? { ...schedule, status } 
            : schedule
        )
      );

      // Make API call in background
      await apiClient.put(`${ENDPOINTS.DRONE_SCHEDULES}/${scheduleId}/status`, { status });
    } catch (err) {
      // Revert optimistic update on error
      setSchedules(prevSchedules => 
        prevSchedules.map(schedule => 
          schedule._id === scheduleId 
            ? { ...schedule, status: schedule.status === 'approved' ? 'pending' : schedule.status === 'rejected' ? 'pending' : 'pending' } 
            : schedule
        )
      );
      setError(handleApiError(err));
    }
  };

  // Mobile Card Component
  const MobileScheduleCard: React.FC<{ schedule: DroneSchedule; index: number }> = ({ schedule, index }) => (
    <div 
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white text-sm font-bold">
              {schedule.farmerId.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{schedule.farmerId}</h3>
            <p className="text-sm text-gray-600">{schedule.fieldName}</p>
          </div>
        </div>
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
      </div>

      {/* Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm text-gray-600">Date:</span>
          <span className="text-sm font-medium text-gray-800">
            {format(new Date(schedule.date), 'dd MMM yyyy')}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span className="text-sm text-gray-600">Provider:</span>
          <span className="text-sm font-medium text-gray-800">{schedule.provider}</span>
        </div>

        <div className="flex items-start space-x-2">
          <svg className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <div className="flex-1">
            <span className="text-sm text-gray-600">Location:</span>
            <div className="mt-1">
              {locations[schedule._id] ? (
                <p className="text-sm text-gray-800">{locations[schedule._id]}</p>
              ) : (
                <p className="text-sm text-gray-800">Coordinates: {schedule.currentLocation}</p>
              )}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${schedule.currentLocation}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center space-x-1 mt-1"
              >
                <span>View on Map</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      {schedule.status === 'pending' && (
        <div className="flex space-x-3 pt-4 border-t border-gray-200">
          <button
            onClick={() => handleStatusChange(schedule._id, 'approved')}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center justify-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Approve</span>
            </span>
          </button>
          <button
            onClick={() => handleStatusChange(schedule._id, 'rejected')}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <span className="flex items-center justify-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Reject</span>
            </span>
          </button>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <AdminLayout title="Drone Schedules" subtitle="Manage drone flight schedules">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="bg-gradient-to-r from-blue-100/60 to-cyan-100/60 backdrop-blur-sm rounded-2xl h-16 border border-blue-200/50 shadow-lg"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-red-50 to-rose-50 backdrop-blur-sm border border-red-200 text-red-800 px-4 md:px-6 py-4 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span className="font-medium">{error}</span>
              </div>
            </div>
            <button
              onClick={fetchDroneSchedules}
              className="mt-6 w-full md:w-auto group relative px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
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

  if (!GEOCODING_API_KEY) {
    console.error('Google Maps API key is not configured. Please set VITE_GOOGLE_MAPS_API_KEY in your environment variables.');
    return (
      <AdminLayout title="Drone Schedules" subtitle="Manage drone flight schedules">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-red-50 to-rose-50 backdrop-blur-sm border border-red-200 text-red-800 px-4 md:px-6 py-4 rounded-2xl shadow-lg">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-naturopura-gradient rounded-xl shadow-lg">
                  <svg className="w-6 md:w-8 h-6 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-naturopura-gradient">
                    Mission Control Center
                  </h2>
                  <p className="text-gray-600 mt-1 text-sm md:text-base">Authorize and manage drone flight operations</p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="flex space-x-2 md:space-x-4 overflow-x-auto pb-2 md:pb-0">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 backdrop-blur-sm border border-green-200 rounded-xl px-3 md:px-4 py-2 shadow-md flex-shrink-0">
                  <div className="text-green-600 text-xs md:text-sm font-medium">Approved</div>
                  <div className="text-green-800 text-lg md:text-xl font-bold">
                    {schedules.filter(s => s.status === 'approved').length}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 backdrop-blur-sm border border-yellow-200 rounded-xl px-3 md:px-4 py-2 shadow-md flex-shrink-0">
                  <div className="text-yellow-600 text-xs md:text-sm font-medium">Pending</div>
                  <div className="text-yellow-800 text-lg md:text-xl font-bold">
                    {schedules.filter(s => s.status === 'pending').length}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-rose-50 backdrop-blur-sm border border-red-200 rounded-xl px-3 md:px-4 py-2 shadow-md flex-shrink-0">
                  <div className="text-red-600 text-xs md:text-sm font-medium">Rejected</div>
                  <div className="text-red-800 text-lg md:text-xl font-bold">
                    {schedules.filter(s => s.status === 'rejected').length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          {schedules.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 md:w-24 h-20 md:h-24 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-6 shadow-lg">
                <svg className="w-10 md:w-12 h-10 md:h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-2">No Flight Requests</h3>
              <p className="text-gray-500 text-sm md:text-base">No drone flight schedules to review at this time.</p>
            </div>
          ) : (
            <>
              {/* Mobile View - Cards */}
              <div className="block lg:hidden">
                <div className="space-y-4">
                  {schedules.map((schedule, index) => (
                    <MobileScheduleCard 
                      key={schedule._id} 
                      schedule={schedule} 
                      index={index}
                    />
                  ))}
                </div>
              </div>

              {/* Desktop View - Table */}
              <div className="hidden lg:block">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200/50 shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-200/50">
                        <tr>
                          <th className="px-4 py-4 text-left text-xs font-semibold naturopura-text uppercase tracking-wider w-48">
                            <div className="flex items-center space-x-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span>Farmer</span>
                            </div>
                          </th>
                          <th className="px-4 py-4 text-left text-xs font-semibold naturopura-text uppercase tracking-wider w-40">
                            <div className="flex items-center space-x-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                              </svg>
                              <span>Field Name</span>
                            </div>
                          </th>
                          <th className="px-4 py-4 text-left text-xs font-semibold naturopura-text uppercase tracking-wider w-32">
                            <div className="flex items-center space-x-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>Date</span>
                            </div>
                          </th>
                          <th className="px-4 py-4 text-left text-xs font-semibold naturopura-text uppercase tracking-wider w-40">
                            <div className="flex items-center space-x-2 ">
                              <svg className="w-4 h-4 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                              <span>Provider</span>
                            </div>
                          </th>
                          <th className="px-4 py-4 text-left text-xs font-semibold naturopura-text uppercase tracking-wider w-64">
                            <div className="flex items-center space-x-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              </svg>
                              <span>Location</span>
                            </div>
                          </th>
                          <th className="px-4 py-4 text-left text-xs font-semibold naturopura-text uppercase tracking-wider w-32">
                            <div className="flex items-center space-x-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>Status</span>
                            </div>
                          </th>
                          <th className="px-4 py-4 text-left text-xs font-semibold naturopura-text uppercase tracking-wider w-48">
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
                            className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-cyan-50/50 transition-all duration-300 group"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-naturopura-gradient rounded-full flex items-center justify-center shadow-md">
                                  <span className="text-white text-xs font-bold">
                                    {schedule.farmerId.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <span className="font-medium">{schedule.farmerId}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
                                <span className="font-medium">{schedule.fieldName}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                              <div className="px-3 py-1 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg border border-blue-200/50 shadow-sm">
                                <span className="text-blue-700 font-medium">
                                  {format(new Date(schedule.date), 'dd MMM yyyy')}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-naturopura-gradient rounded-md flex items-center justify-center shadow-md">
                                  <span className="text-white text-xs font-bold">
                                    {schedule.provider.charAt(0)}
                                  </span>
                                </div>
                                <span>{schedule.provider}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-600">
                              <div className="flex items-center space-x-2">
                                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                </svg>
                                <div className="flex-1 min-w-0 max-w-xs">
                                  {locations[schedule._id] ? (
                                    <p className="text-blue-700 text-sm truncate">{locations[schedule._id]}</p>
                                  ) : (
                                    <p className="text-blue-700 text-sm truncate">Coordinates: {schedule.currentLocation}</p>
                                  )}
                                  <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${schedule.currentLocation}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center space-x-1"
                                  >
                                    <span>View on Map</span>
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                  </a>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
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
                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                              {schedule.status === 'pending' ? (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleStatusChange(schedule._id, 'approved')}
                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-green-500/25 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={loading}
                                  >
                                    <span className="flex items-center space-x-1">
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                      </svg>
                                      <span className="hidden xl:inline">Approve</span>
                                      <span className="xl:hidden">✓</span>
                                    </span>
                                  </button>
                                  <button
                                    onClick={() => handleStatusChange(schedule._id, 'rejected')}
                                    className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-red-500/25 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={loading}
                                  >
                                    <span className="flex items-center space-x-1">
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                      <span className="hidden xl:inline">Reject</span>
                                      <span className="xl:hidden">✕</span>
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
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default DroneScheduleList;