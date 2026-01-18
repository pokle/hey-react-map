import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Location } from '../types';

// Fix for default marker icons not showing (known Leaflet + bundler issue)
// Delete the default _getIconUrl which tries to use webpack-style requires
// @ts-expect-error - accessing internal Leaflet property to fix icon paths
delete L.Icon.Default.prototype._getIconUrl;

// Set icon paths using CDN URLs (most reliable with bundlers)
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Props {
  locations: Location[];
  selectedLocation: Location | null;
}

// Inner component to handle map movements
// useMap() hook only works inside MapContainer
function MapController({ selectedLocation }: { selectedLocation: Location | null }) {
  const map = useMap();

  // When selectedLocation changes, fly the map to that location
  useEffect(() => {
    if (selectedLocation) {
      map.flyTo([selectedLocation.latitude, selectedLocation.longitude], 14, {
        duration: 1.5, // Animation duration in seconds
      });
    }
  }, [selectedLocation, map]);

  return null; // This component only handles side effects
}

export function LeafletMap({ locations, selectedLocation }: Props) {
  // Default center on Corryong Airport if no selection
  const defaultCenter: [number, number] = [-36.185, 147.8914];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={11}
      style={{ height: '100%', width: '100%' }}
    >
      {/* OpenStreetMap tiles - free, no API key needed */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController selectedLocation={selectedLocation} />
      {locations.map((loc) => (
        <Marker key={loc.name} position={[loc.latitude, loc.longitude]}>
          <Popup>
            <strong>{loc.name}</strong>
            <br />
            {loc.description}
            <br />
            Alt: {loc.altitude}m
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
