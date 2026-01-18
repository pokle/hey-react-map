import { useState } from 'react';
import { Header } from './components/Header';
import { LocationList } from './components/LocationList';
import { MapContainer } from './components/MapContainer';
import { useLocations } from './hooks/useLocations';
import type { Location, MapProvider } from './types';
import './App.css';

function App() {
  // State for which map provider is currently active
  // useState returns [currentValue, setterFunction]
  const [provider, setProvider] = useState<MapProvider>('leaflet');

  // State for location list visibility
  const [showLocations, setShowLocations] = useState(false);

  // State for the currently selected/focused location
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  // Load locations from CSV using our custom hook
  const { locations, loading, error } = useLocations();

  // Handler to toggle the location panel
  // Using a function that receives previous state ensures we get the latest value
  const toggleLocations = () => setShowLocations((prev) => !prev);

  // Handler for when a location is clicked in the list
  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location);
  };

  if (error) {
    return <div className="error">Failed to load locations: {error}</div>;
  }

  return (
    <div className="app">
      <Header
        provider={provider}
        onProviderChange={setProvider}
        showLocations={showLocations}
        onToggleLocations={toggleLocations}
      />

      <main className="map-area">
        {loading ? (
          <div className="loading">Loading waypoints...</div>
        ) : (
          <>
            <MapContainer
              provider={provider}
              locations={locations}
              selectedLocation={selectedLocation}
            />

            {/* Conditionally render location list when showLocations is true */}
            {showLocations && (
              <LocationList
                locations={locations}
                selectedLocation={selectedLocation}
                onSelectLocation={handleSelectLocation}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
