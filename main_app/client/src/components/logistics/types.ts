export interface Location {
  latitude: number;
  longitude: number;
  timestamp: number;
  accuracy?: number;
  speed?: number;
}

export interface DeliveryStatus {
  id: string;
  status: 'pending' | 'in_transit' | 'delivered';
  currentLocation: Location;
  lastUpdated: number;
  estimatedDeliveryTime?: number;
}
