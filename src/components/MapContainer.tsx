import { LeafletMap } from './LeafletMap';
import { MapboxMap } from './MapboxMap';
import { GoogleMap } from './GoogleMap';
import type { Location, MapProvider } from '../types';

interface Props {
  provider: MapProvider;
  locations: Location[];
  selectedLocation: Location | null;
}

// API keys for paid providers - in production, use environment variables
// For now, these are placeholders that you'll need to replace
const MAPBOX_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY || '';
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || '';

export function MapContainer({ provider, locations, selectedLocation }: Props) {
  // Render the appropriate map based on selected provider
  switch (provider) {
    case 'leaflet':
      return <LeafletMap locations={locations} selectedLocation={selectedLocation} />;

    case 'mapbox':
      if (!MAPBOX_API_KEY) {
        return <div className="api-key-notice">Set VITE_MAPBOX_API_KEY in .env</div>;
      }
      return <MapboxMap locations={locations} selectedLocation={selectedLocation} apiKey={MAPBOX_API_KEY} />;

    case 'google':
      if (!GOOGLE_API_KEY) {
        return <div className="api-key-notice">Set VITE_GOOGLE_API_KEY in .env</div>;
      }
      return <GoogleMap locations={locations} selectedLocation={selectedLocation} apiKey={GOOGLE_API_KEY} />;

    default:
      return <LeafletMap locations={locations} selectedLocation={selectedLocation} />;
  }
}
