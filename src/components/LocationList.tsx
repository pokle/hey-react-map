import type { Location } from '../types';
import './LocationList.css';

interface Props {
  locations: Location[];
  selectedLocation: Location | null;
  onSelectLocation: (location: Location) => void;
}

export function LocationList({ locations, selectedLocation, onSelectLocation }: Props) {
  return (
    <div className="location-list">
      <h2 className="location-list-title">Waypoints</h2>
      <ul className="location-items">
        {locations.map((loc) => (
          <li
            key={loc.name}
            // Conditionally add 'selected' class using template literal
            className={`location-item ${selectedLocation?.name === loc.name ? 'selected' : ''}`}
            onClick={() => onSelectLocation(loc)}
          >
            <span className="location-name">{loc.name}</span>
            <span className="location-coords">
              {loc.latitude.toFixed(4)}, {loc.longitude.toFixed(4)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
