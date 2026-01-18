import { useEffect, useRef, useCallback } from 'react';
import { GoogleMap as GMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import type { Location } from '../types';

interface Props {
  locations: Location[];
  selectedLocation: Location | null;
  apiKey: string;
}

export function GoogleMap({ locations, selectedLocation, apiKey }: Props) {
  // Store the map instance so we can call methods on it
  const mapRef = useRef<google.maps.Map | null>(null);

  // useCallback memoizes functions to prevent unnecessary re-creation
  // This is important for callbacks passed to child components
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  // Pan to selected location
  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      mapRef.current.panTo({
        lat: selectedLocation.latitude,
        lng: selectedLocation.longitude,
      });
      mapRef.current.setZoom(14);
    }
  }, [selectedLocation]);

  const containerStyle = { width: '100%', height: '100%' };
  const center = { lat: -36.185, lng: 147.8914 };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        onLoad={onLoad}
        options={{ mapTypeId: 'terrain' }}
      >
        {locations.map((loc) => (
          <Marker
            key={loc.name}
            position={{ lat: loc.latitude, lng: loc.longitude }}
            title={loc.name}
          />
        ))}
        {selectedLocation && (
          <InfoWindow
            position={{
              lat: selectedLocation.latitude,
              lng: selectedLocation.longitude,
            }}
          >
            <div>
              <strong>{selectedLocation.name}</strong>
              <br />
              {selectedLocation.description}
            </div>
          </InfoWindow>
        )}
      </GMap>
    </LoadScript>
  );
}
