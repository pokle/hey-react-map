import { useEffect, useRef } from 'react';
import Map, { Marker, Popup } from 'react-map-gl/mapbox';
import type { MapRef } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Location } from '../types';

interface Props {
  locations: Location[];
  selectedLocation: Location | null;
  apiKey: string;
}

export function MapboxMap({ locations, selectedLocation, apiKey }: Props) {
  // useRef gives us a mutable reference that persists across renders
  // Unlike state, changing a ref doesn't trigger a re-render
  const mapRef = useRef<MapRef>(null);

  // Fly to selected location when it changes
  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      mapRef.current.flyTo({
        center: [selectedLocation.longitude, selectedLocation.latitude],
        zoom: 14,
        duration: 1500,
      });
    }
  }, [selectedLocation]);

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={apiKey}
      initialViewState={{
        latitude: -36.185,
        longitude: 147.8914,
        zoom: 11,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
    >
      {locations.map((loc) => (
        <Marker
          key={loc.name}
          latitude={loc.latitude}
          longitude={loc.longitude}
          color="#e74c3c"
        />
      ))}
      {/* Show popup for selected location */}
      {selectedLocation && (
        <Popup
          latitude={selectedLocation.latitude}
          longitude={selectedLocation.longitude}
          closeButton={false}
          anchor="bottom"
        >
          <strong>{selectedLocation.name}</strong>
          <br />
          {selectedLocation.description}
        </Popup>
      )}
    </Map>
  );
}
