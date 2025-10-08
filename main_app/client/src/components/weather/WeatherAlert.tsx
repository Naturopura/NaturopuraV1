import { useEffect, useState } from 'react';
import axios from 'axios';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudDrizzle, Wind, Droplets, Gauge, Bell, AlertTriangle } from 'lucide-react';
import FarmerLayout from '../layouts/FarmerLayout';
import { useAuth } from '../../context/AuthContext';
import { getApiUrl } from '../../lib/utils'

// Add WeatherError interface
interface WeatherError extends Error {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
}

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
    main: string;
  }>;
  wind: {
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
}

interface ForecastData {
  dt_txt: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    main: string;
  }>;
  wind: {
    speed: number;
  };
}

interface DailyForecast {
  date: string;
  avgTemp: string;
  minTemp: string;
  maxTemp: string;
  description: string;
  humidity: number;
  windSpeed: string;
}

interface WeatherAlert {
  type: 'severe' | 'moderate' | 'info';
  condition: string;
  message: string;
  severity: number;
}

// First, add an interface for the grouped data
interface GroupedForecast {
  [key: string]: ForecastData[];
}

const WeatherAlert = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<ForecastData[]>([]);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number | null; lon: number | null }>({ lat: null, lon: null });
  const [weatherAlerts, setWeatherAlerts] = useState<WeatherAlert[]>([]);
  const [isSendingAlert, setIsSendingAlert] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  const [alertError, setAlertError] = useState<string | null>(null);

  const { user } = useAuth();

  // Use an environment variable for the API key in a real app
  const API_KEY = 'b7dc63f9b5cefc78ba57679620791467';

  const getWeatherIcon = (condition: string, className: string = "h-8 w-8 text-gray-600") => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className={className} />;
      case 'clouds':
        return <Cloud className={className} />;
      case 'rain':
        return <CloudRain className={className} />;
      case 'snow':
        return <CloudSnow className={className} />;
      case 'thunderstorm':
        return <CloudLightning className={className} />;
      case 'drizzle':
        return <CloudDrizzle className={className} />;
      default:
        return <Cloud className={className} />;
    }
  };

  const analyzeWeatherForAlerts = (weatherData: WeatherData): WeatherAlert[] => {
    const alerts: WeatherAlert[] = [];

    // Temperature alerts - Adjusted for Indian weather patterns
    if (weatherData.main.temp >= 32) { // Lowered from 35°C
      alerts.push({
        type: 'severe',
        condition: 'High Temperature',
        message: `⚠️ HIGH TEMPERATURE ALERT: Temperature is ${weatherData.main.temp}°C. This may affect crop growth. Consider additional irrigation and shade protection.`,
        severity: 4
      });
    } else if (weatherData.main.temp <= 8) { // Raised from 5°C
      alerts.push({
        type: 'moderate',
        condition: 'Low Temperature',
        message: `❄️ LOW TEMPERATURE ALERT: Temperature is ${weatherData.main.temp}°C. Protect sensitive crops from frost damage.`,
        severity: 3
      });
    }

    // Humidity alerts - Adjusted for Indian conditions
    if (weatherData.main.humidity >= 80) { // Lowered from 85%
      alerts.push({
        type: 'moderate',
        condition: 'High Humidity',
        message: `💧 HIGH HUMIDITY ALERT: Humidity is ${weatherData.main.humidity}%. Monitor for fungal diseases and ensure proper ventilation.`,
        severity: 2
      });
    } else if (weatherData.main.humidity <= 25) { // Raised from 20%
      alerts.push({
        type: 'moderate',
        condition: 'Low Humidity',
        message: `🌵 LOW HUMIDITY ALERT: Humidity is ${weatherData.main.humidity}%. Increase irrigation frequency to prevent crop stress.`,
        severity: 2
      });
    }

    // Wind alerts - Adjusted for Indian conditions
    if (weatherData.wind.speed >= 10) { // Lowered from 15 m/s
      alerts.push({
        type: 'severe',
        condition: 'High Wind',
        message: `💨 HIGH WIND ALERT: Wind speed is ${weatherData.wind.speed} m/s. Secure loose items and protect crops from wind damage.`,
        severity: 4
      });
    }

    // Pressure alerts - Adjusted for Indian conditions
    if (weatherData.main.pressure <= 1005) { // Raised from 1000 hPa
      alerts.push({
        type: 'info',
        condition: 'Low Pressure',
        message: `🌧️ WEATHER CHANGE ALERT: Low atmospheric pressure detected (${weatherData.main.pressure} hPa). Rain or storm conditions likely. Prepare for wet weather.`,
        severity: 2
      });
    } else if (weatherData.main.pressure >= 1025) { // Lowered from 1030 hPa
      alerts.push({
        type: 'info',
        condition: 'High Pressure',
        message: `☀️ WEATHER CHANGE ALERT: High atmospheric pressure detected (${weatherData.main.pressure} hPa). Clear, stable weather expected.`,
        severity: 1
      });
    }

    // Weather condition specific alerts - Added more conditions
    switch (weatherData.weather[0].main.toLowerCase()) {
      case 'thunderstorm':
        alerts.push({
          type: 'severe',
          condition: 'Thunderstorm',
          message: `⚡ SEVERE WEATHER ALERT: Thunderstorm detected! Take shelter immediately. Avoid open fields and tall structures.`,
          severity: 5
        });
        break;
      case 'rain':
        if (weatherData.main.humidity > 85) { // Lowered from 90%
          alerts.push({
            type: 'moderate',
            condition: 'Heavy Rain',
            message: `🌧️ RAIN ALERT: Heavy rainfall expected. Check drainage systems and protect crops from waterlogging.`,
            severity: 3
          });
        }
        break;
      case 'snow':
        alerts.push({
          type: 'moderate',
          condition: 'Snow',
          message: `❄️ SNOW ALERT: Snow conditions detected. Protect crops from frost and ensure proper insulation.`,
          severity: 3
        });
        break;
      case 'clouds':
        // Add alert for cloudy conditions
        if (weatherData.main.humidity > 70) {
          alerts.push({
            type: 'info',
            condition: 'Cloudy Conditions',
            message: `☁️ CLOUDY WEATHER ALERT: Overcast conditions with ${weatherData.main.humidity}% humidity. Monitor crop health and ensure adequate sunlight exposure.`,
            severity: 1
          });
        }
        break;
      case 'fog':
        alerts.push({
          type: 'info',
          condition: 'Fog',
          message: `🌫️ FOG ALERT: Reduced visibility due to fog. Exercise caution during outdoor activities.`,
          severity: 1
        });
        break;
    }

    // Always add a test alert if no other alerts are generated
    if (alerts.length === 0) {
      alerts.push({
        type: 'info',
        condition: 'Weather Update',
        message: `🌤️ WEATHER UPDATE: Current conditions are ${weatherData.weather[0].description} with temperature ${weatherData.main.temp}°C, humidity ${weatherData.main.humidity}%, and wind speed ${weatherData.wind.speed} m/s.`,
        severity: 1
      });
    }

    return alerts;
  };

  const sendWeatherAlert = async () => {
    if (!weather || !user) {
      console.log('Cannot send alert:', { weather: !!weather, user: !!user });
      return;
    }

    console.log('Sending weather alert for user:', user);
    console.log('Weather data:', weather);

    setIsSendingAlert(true);
    setAlertError(null);
    setAlertSent(false);

    try {
      const weatherData = {
        temp: weather.main.temp,
        humidity: weather.main.humidity,
        windSpeed: weather.wind.speed,
        pressure: weather.main.pressure,
        weatherMain: weather.weather[0].main,
        weatherDescription: weather.weather[0].description
      };

      console.log('Sending weather data to API:', weatherData);
      console.log('Auth token:', localStorage.getItem('token') ? 'Present' : 'Missing');
      console.log('Token value:', localStorage.getItem('token'));
      console.log('User data:', localStorage.getItem('user'));
      console.log('User from context:', user);
      console.log('Token length:', localStorage.getItem('token')?.length);
      console.log('Authorization header:', `Bearer ${localStorage.getItem('token')}`);

      const response = await axios.post(getApiUrl('/weather-alerts/user'), weatherData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log('API response:', response.data);

      if (response.data.message === 'Weather alert sent successfully') {
        setAlertSent(true);
        console.log('SMS alert sent successfully!');
        // Reset after 5 seconds
        setTimeout(() => setAlertSent(false), 5000);
      } else {
        console.log('Unexpected response message:', response.data.message);
      }
    } catch (error: unknown) {
      console.error('Error sending weather alert:', error);
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as any;
        console.error('Response error:', axiosError.response?.data);
        console.error('Response status:', axiosError.response?.status);
      }
      setAlertError('Failed to send weather alert. Please try again.');
      // Reset error after 5 seconds
      setTimeout(() => setAlertError(null), 5000);
    } finally {
      setIsSendingAlert(false);
    }
  };

  useEffect(() => {
    console.log('Geolocation useEffect triggered');
    if (navigator.geolocation) {
      console.log('Geolocation available, requesting position...');
      
      // Add timeout for geolocation request
      const timeoutId = setTimeout(() => {
        console.log('Geolocation timeout, setting fallback location');
        setError('Location request timed out. Using default location.');
        setIsLoading(false);
        setLocation({ lat: 20.2961, lon: 85.8245 });
      }, 10000); // 10 second timeout
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeoutId);
          console.log('Geolocation success:', position.coords);
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          clearTimeout(timeoutId);
          console.error('Geolocation error:', error);
          setError('Location access denied or unavailable. Please enable location services in your browser.');
          setIsLoading(false);
          // Set fallback location (Bhubaneswar, India)
          console.log('Setting fallback location');
          setLocation({ lat: 20.2961, lon: 85.8245 });
        },
        {
          enableHighAccuracy: false,
          timeout: 8000,
          maximumAge: 300000 // 5 minutes
        }
      );
    } else {
      console.log('Geolocation not available, setting fallback location');
      setError('Geolocation not supported by this browser.');
      setIsLoading(false);
      setLocation({ lat: 20.2961, lon: 85.8245 });
    }
  }, []);

  // Ensure component initializes even if geolocation fails
  useEffect(() => {
    if (location.lat && location.lon && !weather && !isLoading && !error) {
      console.log('Location set but no weather data, triggering fetch');
      setIsLoading(true);
    }
  }, [location.lat, location.lon, weather, isLoading, error]);

  useEffect(() => {
    const fetchWeather = async () => {
      if (location.lat === null || location.lon === null) {
        console.log('Location not set yet:', location);
        return;
      }

      console.log('Fetching weather for location:', location);

      try {
        setIsLoading(true);
        setError(null);

        const current = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`
        );
        console.log('Current weather data:', current.data);
        setWeather(current.data);

        // Analyze weather for alerts
        const alerts = analyzeWeatherForAlerts(current.data);
        console.log('Weather alerts generated:', alerts);
        setWeatherAlerts(alerts);

        const forecastRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`
        );
        console.log('Forecast data:', forecastRes.data);

        setHourlyForecast(forecastRes.data.list.slice(0, 8)); // Get next 8 entries (24 hours)

        // Add proper type assertion for the grouped data
        const groupedByDay = forecastRes.data.list.reduce((acc: GroupedForecast, item: ForecastData) => {
          const date = item.dt_txt.split(' ')[0];
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(item);
          return acc;
        }, {} as GroupedForecast);

        // First, update the groupedByDay mapping with proper types
        const dailySummaries = Object.entries<ForecastData[]>(groupedByDay)
          .slice(0, 5)
          .map(([date, entries]) => {
            const temps = entries.map(entry => entry.main.temp);
            const minTemp = Math.min(...temps);
            const maxTemp = Math.max(...temps);
            const avgTemp = temps.reduce((sum, val) => sum + val, 0) / temps.length;

            const descriptions = entries.map(entry => entry.weather[0].description);
            const descriptionCounts: Record<string, number> = {};
            descriptions.forEach(desc => {
              descriptionCounts[desc] = (descriptionCounts[desc] || 0) + 1;
            });
            const commonDescription = Object.keys(descriptionCounts)
              .sort((a, b) => descriptionCounts[b] - descriptionCounts[a])[0] || 'N/A';

            const humidity = entries.reduce((sum, entry) => 
              sum + entry.main.humidity, 0) / entries.length;

            const windSpeed = entries.reduce((sum, entry) => 
              sum + entry.wind.speed, 0) / entries.length;

            return {
              date,
              minTemp: minTemp.toFixed(1),
              maxTemp: maxTemp.toFixed(1),
              avgTemp: avgTemp.toFixed(1),
              description: commonDescription,
              humidity: Math.round(humidity),
              windSpeed: windSpeed.toFixed(1)
            };
          });

        console.log('Daily summaries:', dailySummaries);
        setDailyForecast(dailySummaries);
        setIsLoading(false);
      } catch (err: unknown) {
        const error = err as WeatherError;
        console.error("Weather API error:", {
          message: error.message,
          status: error.response?.status,
          details: error.response?.data?.message
        });
        setError('Weather data could not be fetched. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [location.lat, location.lon, API_KEY]); // Added API_KEY to dependency array for clarity

  if (error) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full mx-auto">
          <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-center shadow-md">
            <h2 className="text-xl sm:text-2xl font-semibold text-red-700 mb-2">Oops!</h2>
            <p className="text-red-600 text-base sm:text-lg">{error}</p>
            <p className="text-sm text-red-500 mt-2">Try refreshing the page or check your browser's location permissions.</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl w-full mx-auto space-y-6 sm:space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Loading Weather Data...</h2>
            <p className="text-gray-500 mb-6">Fetching current weather and forecast information</p>
          </div>
          <div className="h-48 sm:h-64 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="h-32 sm:h-48 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="h-64 sm:h-96 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!weather || hourlyForecast.length === 0 || dailyForecast.length === 0) {
    // This case might occur if data is empty but no explicit error
    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="text-center text-gray-600 max-w-md">
                <h2 className="text-xl font-semibold mb-4">Weather Data Unavailable</h2>
                <p className="mb-4">Unable to load weather information. This could be due to:</p>
                <ul className="text-sm text-left space-y-2 mb-6">
                  <li>• Location services not enabled</li>
                  <li>• Network connectivity issues</li>
                  <li>• Weather API service problems</li>
                </ul>
                <button
                  onClick={() => {
                    setError(null);
                    setIsLoading(true);
                    // Force re-fetch with current location
                    if (location.lat && location.lon) {
                                             const fetchWeather = async () => {
                         try {
                           const current = await axios.get(
                             `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`
                           );
                           setWeather(current.data);
                           const alerts = analyzeWeatherForAlerts(current.data);
                           setWeatherAlerts(alerts);
                           
                           const forecastRes = await axios.get(
                             `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`
                           );
                           setHourlyForecast(forecastRes.data.list.slice(0, 8));
                           
                           const groupedByDay = forecastRes.data.list.reduce((acc: GroupedForecast, item: ForecastData) => {
                             const date = item.dt_txt.split(' ')[0];
                             if (!acc[date]) acc[date] = [];
                             acc[date].push(item);
                             return acc;
                           }, {} as GroupedForecast);
                           
                           const dailySummaries = Object.entries<ForecastData[]>(groupedByDay)
                             .slice(0, 5)
                             .map(([date, entries]) => {
                               const temps = entries.map(entry => entry.main.temp);
                               const minTemp = Math.min(...temps);
                               const maxTemp = Math.max(...temps);
                               const avgTemp = temps.reduce((sum, val) => sum + val, 0) / temps.length;
                               const descriptions = entries.map(entry => entry.weather[0].description);
                               const descriptionCounts: Record<string, number> = {};
                               descriptions.forEach(desc => {
                                 descriptionCounts[desc] = (descriptionCounts[desc] || 0) + 1;
                               });
                               const commonDescription = Object.keys(descriptionCounts)
                                 .sort((a, b) => descriptionCounts[b] - descriptionCounts[a])[0] || 'N/A';
                               const humidity = entries.reduce((sum, entry) => sum + entry.main.humidity, 0) / entries.length;
                               const windSpeed = entries.reduce((sum, entry) => sum + entry.wind.speed, 0) / entries.length;
                               return {
                                 date,
                                 minTemp: minTemp.toFixed(1),
                                 maxTemp: maxTemp.toFixed(1),
                                 avgTemp: avgTemp.toFixed(1),
                                 description: commonDescription,
                                 humidity: Math.round(humidity),
                                 windSpeed: windSpeed.toFixed(1)
                               };
                             });
                           
                           setDailyForecast(dailySummaries);
                           setIsLoading(false);
                         } catch (error) {
                           console.error('Retry fetch error:', error);
                           setError('Failed to retry weather data fetch');
                           setIsLoading(false);
                         }
                       };
                      fetchWeather();
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Try Again
                </button>
            </div>
        </div>
    );
  }

  const now = new Date();
  const sunrise = new Date(weather.sys.sunrise * 1000);
  const sunset = new Date(weather.sys.sunset * 1000);
  const isDaytime = now > sunrise && now < sunset;

  const getBgGradient = () => {
    const weatherMain = weather.weather[0].main;
    if (!isDaytime) return 'from-indigo-900 to-purple-900';
    switch (weatherMain) {
      case 'Clear':
        return 'from-blue-400 to-blue-600';
      case 'Clouds':
        return 'from-blue-300 to-gray-400';
      case 'Rain':
      case 'Drizzle':
        return 'from-gray-400 to-gray-600';
      case 'Snow':
        return 'from-blue-100 to-blue-300';
      case 'Thunderstorm':
        return 'from-gray-700 to-gray-900'; // Darker for thunderstorms
      default:
        return 'from-blue-400 to-blue-600';
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8"> {/* Responsive padding */}
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8"> {/* Responsive vertical spacing */}

        {/* Weather Alerts Section */}
        {weatherAlerts.length > 0 && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-red-500">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center">
                  <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
                  Weather Alerts
                </h2>
                {user && (
                  <button
                    onClick={sendWeatherAlert}
                    disabled={isSendingAlert}
                    className={`px-4 py-2 rounded-lg font-medium text-white flex items-center space-x-2 ${
                      isSendingAlert 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isSendingAlert ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Bell className="h-4 w-4" />
                        <span>Send SMS Alert</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Alert Status Messages */}
              {alertSent && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 text-sm">✅ Weather alert sent successfully via SMS!</p>
                </div>
              )}

              {alertError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">❌ {alertError}</p>
                </div>
              )}

              <div className="space-y-3">
                {weatherAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      alert.severity >= 4
                        ? 'bg-red-50 border-red-400 text-red-800'
                        : alert.severity >= 2
                        ? 'bg-yellow-50 border-yellow-400 text-yellow-800'
                        : 'bg-blue-50 border-blue-400 text-blue-800'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {alert.severity >= 4 ? (
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        ) : alert.severity >= 2 ? (
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium">{alert.condition}</h3>
                        <p className="text-sm mt-1">{alert.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Test SMS Section - Always visible for testing */}
        {user && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-green-500">
            <div className="p-4 sm:p-6">
             

              {/* Alert Status Messages */}
              {alertSent && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 text-sm">✅ Test SMS sent successfully! Check your phone.</p>
                </div>
              )}

              {alertError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">❌ {alertError}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Current Weather Card */}
        <div className={`rounded-xl overflow-hidden shadow-lg bg-gradient-to-br ${getBgGradient()}`}>
          <div className="p-6 sm:p-8 text-white"> {/* Responsive padding */}
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
              <div className="mb-6 md:mb-0">
                <div className="flex flex-col items-center md:items-start">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{weather.name}</h2> {/* Responsive font size */}
                  <p className="text-base sm:text-lg opacity-90"> {/* Responsive font size */}
                    {new Date().toLocaleDateString(undefined, {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="mt-4 sm:mt-6"> {/* Responsive margin-top */}
                  <p className="text-5xl sm:text-6xl font-bold">{Math.round(weather.main.temp)}°C</p> {/* Responsive font size */}
                  <p className="text-lg sm:text-xl mt-1 sm:mt-2 capitalize">{weather.weather[0].description}</p> {/* Responsive font size */}
                </div>
              </div>

              <div className="flex flex-col items-center mt-6 md:mt-0"> {/* Responsive margin-top */}
                {getWeatherIcon(weather.weather[0].main, "h-20 w-20 sm:h-24 sm:w-24 mb-4 text-white")} {/* Responsive icon size & color */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base"> {/* Responsive gap & font size */}
                  <div className="flex items-center justify-center md:justify-start">
                    <Gauge className="h-4 w-4 sm:h-5 sm:w-5 mr-2 opacity-80" /> {/* Responsive icon size */}
                    <span>Feels like: {Math.round(weather.main.feels_like)}°C</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Droplets className="h-4 w-4 sm:h-5 sm:w-5 mr-2 opacity-80" /> {/* Responsive icon size */}
                    <span>Humidity: {weather.main.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Wind className="h-4 w-4 sm:h-5 sm:w-5 mr-2 opacity-80" /> {/* Responsive icon size */}
                    <span>Wind: {weather.wind.speed} m/s</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Gauge className="h-4 w-4 sm:h-5 sm:w-5 mr-2 opacity-80" /> {/* Responsive icon size */}
                    <span>Pressure: {weather.main.pressure} hPa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 sm:p-6"> {/* Responsive padding */}
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Hourly Forecast</h2> {/* Responsive font size */}
            <div className="overflow-x-auto pb-4 -mb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"> {/* Added custom scrollbar classes */}
              <div className="flex space-x-4 sm:space-x-6 min-w-max"> {/* Responsive spacing, min-width for scroll */}
                {hourlyForecast.map((hour, idx) => {
                  const date = new Date(hour.dt_txt);
                  const isNow = idx === 0;

                  return (
                    <div
                      key={hour.dt_txt}
                      className={`flex flex-col items-center p-3 sm:p-4 rounded-lg flex-shrink-0 w-28 text-center ${ /* Responsive padding, fixed width for items */
                        isNow ? 'bg-blue-50 border border-blue-100' : ''
                      }`}
                    >
                      <p className="font-medium text-gray-600 text-sm sm:text-base">
                        {isNow ? 'Now' : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <div className="my-2 sm:my-3"> {/* Responsive margin */}
                        {getWeatherIcon(hour.weather[0].main, "h-7 w-7 sm:h-8 sm:w-8 text-gray-700")} {/* Responsive icon size */}
                      </div>
                      <p className="text-lg sm:text-xl font-semibold text-gray-800">
                        {Math.round(hour.main.temp)}°C
                      </p>
                      <div className="mt-1 flex items-center text-xs text-gray-500"> {/* Responsive font size */}
                        <Wind className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> {/* Responsive icon size */}
                        <span>{hour.wind.speed} m/s</span>
                      </div>
                      <div className="mt-1 flex items-center text-xs text-gray-500"> {/* Responsive font size */}
                        <Droplets className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> {/* Responsive icon size */}
                        <span>{hour.main.humidity}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Daily Forecast */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 sm:p-6"> {/* Responsive padding */}
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">5-Day Forecast</h2> {/* Responsive font size */}
            <div className="space-y-3 sm:space-y-4"> {/* Responsive vertical spacing */}
              {dailyForecast.map((day, idx) => {
                const date = new Date(day.date + 'T12:00:00'); // Add a time to ensure correct date parsing
                const isToday = idx === 0;
                const displayDate = isToday
                  ? 'Today'
                  : idx === 1
                    ? 'Tomorrow'
                    : date.toLocaleDateString(undefined, { weekday: 'long' });

                const minTemp = parseFloat(day.minTemp);
                const maxTemp = parseFloat(day.maxTemp);
                const range = 40; // Assuming -10 to 30 as a typical range for temperature bar
                const minPosition = ((minTemp + 10) / range) * 100;
                const maxPosition = ((maxTemp + 10) / range) * 100;
                const barWidth = maxPosition - minPosition;

                return (
                  <div
                    key={day.date}
                    className="flex flex-col sm:flex-row items-center p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-full sm:w-48 mb-2 sm:mb-0 text-center sm:text-left">
                      <p className={`text-sm sm:text-base ${isToday ? 'font-semibold text-blue-700' : 'text-gray-600'}`}>
                        {displayDate}
                      </p>
                    </div>

                    <div className="flex items-center w-full flex-grow">
                      <div className="mr-3 sm:mr-4 flex-shrink-0">
                        {getWeatherIcon(day.description.split(' ')[0], "h-7 w-7 sm:h-8 sm:w-8 text-gray-700")}
                      </div>

                      <div className="w-full max-w-xs sm:max-w-sm mr-4"> {/* Adjusted max-width for smaller screens */}
                        <p className="text-sm sm:text-base text-gray-700 mb-1 capitalize">{day.description}</p>
                        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-1">
                          <span>{Math.round(minTemp)}°C</span>
                          <span>{Math.round(maxTemp)}°C</span>
                        </div>
                        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="absolute h-full bg-gradient-to-r from-blue-400 to-red-400 rounded-full"
                            style={{
                              left: `${minPosition}%`,
                              width: `${barWidth}%`
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Hidden on small screens, shown on medium and up */}
                      <div className="ml-auto hidden md:flex flex-col items-end sm:items-center space-y-1 sm:space-y-2 flex-shrink-0">
                        <div className="flex items-center">
                          <Wind className="h-4 w-4 mr-1 text-gray-500" />
                          <span className="text-xs sm:text-sm text-gray-600">{day.windSpeed} m/s</span>
                        </div>
                        <div className="flex items-center">
                          <Droplets className="h-4 w-4 mr-1 text-gray-500" />
                          <span className="text-xs sm:text-sm text-gray-600">{day.humidity}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WrappedWeatherAlert = () => (
  <FarmerLayout 
    title="Weather Forecast"
    subtitle="View current weather and upcoming forecast"
  >
    <WeatherAlert />
  </FarmerLayout>
);

export default WrappedWeatherAlert;