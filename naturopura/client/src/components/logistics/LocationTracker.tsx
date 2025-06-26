import { useLocation } from './LocationContext';


interface MapProps {
  latitude: number;
  longitude: number;
  zoom: number;
}

const Map = ({ latitude, longitude, zoom }: MapProps) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY';
  console.log(apiKey);
  return (
    <iframe
      width="100%"
      height="400"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      src={`https://www.google.com/maps/embed/v1/place?q=${latitude},${longitude}&zoom=${zoom}&key=${apiKey}`}
      title="Delivery Location"
    />
  );
};

export const LocationTracker = () => {
  const { location, error, isTracking, startTracking, stopTracking } = useLocation();

  if (error) {
    return (
      <div className="p-4 border rounded-md bg-red-50 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button
          onClick={isTracking ? stopTracking : startTracking}
          className={`px-4 py-2 rounded-md ${
            isTracking
              ? 'bg-red-500 text-white'
              : 'bg-green-500 text-white'
          }`}
        >
          {isTracking ? 'Stop Tracking' : 'Start Tracking'}
        </button>
        <span className="text-sm">
          {isTracking ? 'Tracking active' : 'Not tracking'}
        </span>
      </div>

      {location && (
        <div className="w-full">
          <Map
            latitude={location.latitude}
            longitude={location.longitude}
            zoom={13}
          />
        </div>
      )}
    </div>
  );
};
