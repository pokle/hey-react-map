// Represents a waypoint/location loaded from the CSV
export interface Location {
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  altitude: number;
}

// The available map providers
export type MapProvider = 'leaflet' | 'mapbox' | 'google';
