import React, { useState, useEffect } from 'react';
import { createApiClient, ENDPOINTS, handleApiError } from '../../config/api';
import FarmerLayout from '../layouts/FarmerLayout';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

// Get Google Maps API key from environment variables
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
    return null;
  }
};

const apiClient = createApiClient();

const ScheduleDrone: React.FC = () => {
  const { user } = useAuth();

  const [date, setDate] = useState(() => {
    const today = new Date();
    const todayISOString = today.toISOString().split('T')[0];
    return todayISOString;
  });
  const [fieldName, setFieldName] = useState('');
  const [provider, setProvider] = useState('');
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [locationAddress, setLocationAddress] = useState<string | null>(null);
  const [providers, setProviders] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  useEffect(() => {
    // Fetch providers from API or static list
    // For now, using static list
    setProviders(['AeroTech Drones', 'SkyVision Pro', 'AgriDrone Solutions', 'Precision Flight Co.']);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!date || !fieldName || !provider || !currentLocation) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const payload = {
        farmerId: user?.id || '', // Get farmer ID from auth context
        date,
        fieldName,
        provider,
        currentLocation,
      };
      await apiClient.post(`${ENDPOINTS.DRONE_SCHEDULES}/schedule`, payload);
      setMessage('Drone flight scheduled successfully.');
      setDate(() => {
        const today = new Date();
        const todayISOString = today.toISOString().split('T')[0];
        return todayISOString;
      });
      setFieldName('');
      setProvider('');
      setCurrentLocation('');
      setLocationAddress('');
    } catch (err: any) {
      setError(handleApiError(err));
    }
  };

  const handleGetLocation = async () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          
          // Get address from coordinates
          const address = await getAddressFromCoords(lat, lng);
          setLocationAddress(address);
          
          // Format the location string
          const locationString = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
          setCurrentLocation(locationString);
          setIsGettingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Unable to retrieve current location. Please try again.');
          setIsGettingLocation(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setIsGettingLocation(false);
    }
  };

  return (
    <FarmerLayout title="Schedule Drone Flight" subtitle='Schedule a drone flight for your farm'>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-xl mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              Mission Planning
            </h2>
            <p className="text-gray-600 text-lg">Configure your drone flight parameters</p>
          </div>

          {/* Form Container */}
          <div className="bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-2xl shadow-xl p-8">
            {/* Status Messages */}
            {message && (
              <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 backdrop-blur-sm border border-green-200 text-green-800 rounded-xl shadow-md">
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{message}</span>
                </div>
              </div>
            )}
            
            {error && (
              <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 backdrop-blur-sm border border-red-200 text-red-800 rounded-xl shadow-md">
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date Selection */}
              <div className="space-y-2">
                <label htmlFor="date" className="flex items-center space-x-2 text-blue-700 font-semibold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Mission Date</span>
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    const today = new Date().toISOString().split('T')[0];
                    if (selectedDate >= today) {
                      setDate(selectedDate);
                    } else {
                      setError('Please select a date that is today or in the future');
                    }
                  }}
                  className="w-full bg-gradient-to-r from-blue-50/50 to-cyan-50/30 border border-blue-200/50 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300 shadow-sm"
                  min={date}
                />
              </div>

              {/* Field Name */}
              <div className="space-y-2">
                <label htmlFor="fieldName" className="flex items-center space-x-2 text-blue-700 font-semibold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span>Target Field</span>
                </label>
                <input
                  type="text"
                  id="fieldName"
                  placeholder="e.g. North Farm Block A"
                  value={fieldName}
                  onChange={e => setFieldName(e.target.value)}
                  className="w-full bg-gradient-to-r from-blue-50/50 to-cyan-50/30 border border-blue-200/50 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300 shadow-sm"
                />
              </div>

              {/* Provider Selection */}
              <div className="space-y-2">
                <label htmlFor="provider" className="flex items-center space-x-2 text-blue-700 font-semibold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>Drone Service Provider</span>
                </label>
                <select
                  id="provider"
                  value={provider}
                  onChange={e => setProvider(e.target.value)}
                  className="w-full bg-gradient-to-r from-blue-50/50 to-cyan-50/30 border border-blue-200/50 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300 shadow-sm"
                >
                  <option value="" className="bg-white">Select a provider</option>
                  {providers.map((prov, index) => (
                    <option key={index} value={prov} className="bg-white">
                      {prov}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Section */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-blue-700 font-semibold">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>Flight Coordinates</span>
                </label>
                
                {currentLocation ? (
                  <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 backdrop-blur-sm border border-green-200 rounded-xl shadow-md">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-700 font-semibold">Location Acquired</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentLocation(null);
                          setLocationAddress(null);
                        }}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Coordinates:</span>
                        <span className="text-blue-700 font-mono">{currentLocation}</span>
                      </div>
                      {locationAddress && (
                        <div className="flex justify-between items-start">
                          <span className="text-gray-600">Address:</span>
                          <span className="text-gray-800 text-right max-w-xs">{locationAddress}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={isGettingLocation}
                    className="w-full group relative px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
                  >
                    <span className="flex items-center justify-center space-x-3">
                      {isGettingLocation ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span>Acquiring Location...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          <span>Share Current Location</span>
                        </>
                      )}
                    </span>
                  </button>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 mt-8"
              >
                <span className="flex items-center justify-center space-x-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Launch Mission Request</span>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </FarmerLayout>
  );
};

export default ScheduleDrone;