import React, { useEffect, useState, useCallback } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import FarmerLayout from "../layouts/FarmerLayout";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Replace with your key

const containerStyle = {
  width: "100%",
  height: "350px",
  borderRadius: "1.5rem",
  marginBottom: "2rem"
};

// Example: Your own cold store capacity data (replace with API call if needed)
const coldStoreCapacities = [
  { placeId: "ChIJd8BlQ2BZwokRAFUEcm_qrcA", capacity: 120, available: 40 },
  { placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4", capacity: 80, available: 10 },
  // Add more as needed
];

const FarmerColdStoreTracker: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [coldStores, setColdStores] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ["places"]
  });

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setError("Unable to get your location.")
    );
  }, []);

  // Search for cold stores
  const onMapLoad = useCallback((map: google.maps.Map) => {
    if (!location) return;
    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(
      {
        location,
        radius: 10000, // 10km
        keyword: "cold storage",
        type: "storage"
      },
      (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          setColdStores(results);
        } else {
          setError("No cold stores found nearby.");
        }
      }
    );
  }, [location]);

  // Helper to get capacity info for a place
  const getCapacity = (placeId: string) =>
    coldStoreCapacities.find((c) => c.placeId === placeId);

  return (
    <FarmerLayout title="Cold Store" subtitle="Cold Store Tracker">
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white/80 rounded-3xl shadow-2xl border border-emerald-200">
        <h2 className="text-2xl font-bold text-emerald-700 mb-6 flex items-center">
          <svg className="w-7 h-7 mr-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v18m9-9H3" />
          </svg>
          Nearby Cold Stores
        </h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {isLoaded && location && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={location}
            zoom={12}
            onLoad={onMapLoad}
          >
            <Marker position={location} />
            {coldStores.map((store, idx) => (
              <Marker
                key={store.place_id || idx}
                position={{
                  lat: store.geometry.location.lat(),
                  lng: store.geometry.location.lng()
                }}
                icon={{
                  url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                }}
              />
            ))}
          </GoogleMap>
        )}
        <div className="flex gap-5 overflow-x-auto pb-2">
          {coldStores.map((store) => {
            const capacityInfo = getCapacity(store.place_id);
            return (
              <div
                key={store.place_id}
                className="min-w-[320px] flex-shrink-0 flex flex-col md:w-96 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100 rounded-2xl px-5 py-4 shadow hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div className="text-lg font-semibold text-emerald-800">{store.name}</div>
                  <div className="text-sm text-emerald-600">{store.vicinity}</div>
                  {store.rating && (
                    <div className="text-xs text-emerald-400">Rating: {store.rating} ⭐</div>
                  )}
                  {capacityInfo ? (
                    <div className="text-xs text-emerald-700 mt-1">
                      Capacity: <span className="font-bold">{capacityInfo.available}</span> / {capacityInfo.capacity} tons
                      <div className="w-full bg-emerald-100 rounded-full h-2 mt-1">
                        <div
                          className="bg-emerald-400 h-2 rounded-full"
                          style={{ width: `${(capacityInfo.available / capacityInfo.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-emerald-400 mt-1 italic">Capacity info not available</div>
                  )}
                </div>
                <div className="flex flex-col md:items-end mt-3 md:mt-0">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + " " + store.vicinity)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 underline text-sm font-medium"
                  >
                    View on Map
                  </a>
                </div>
              </div>
            );
          })}
          {!error && coldStores.length === 0 && (
            <div className="text-emerald-400 italic text-center">No cold stores found nearby.</div>
          )}
        </div>
      </div>
    </FarmerLayout>
  );
};

export default FarmerColdStoreTracker;
