import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Toggle from '@radix-ui/react-toggle';
import type { MapProvider } from '../types';
import './Header.css';

interface Props {
  provider: MapProvider;
  onProviderChange: (provider: MapProvider) => void;
  showLocations: boolean;
  onToggleLocations: () => void;
}

// Hamburger menu icon (simple 3-line SVG)
function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function Header({ provider, onProviderChange, showLocations, onToggleLocations }: Props) {
  return (
    <header className="header">
      <h1 className="header-title">Hey React Map</h1>

      {/* Toggle button for showing/hiding location list */}
      {/* Radix Toggle maintains pressed state automatically */}
      <Toggle.Root
        className="locations-toggle"
        pressed={showLocations}
        onPressedChange={onToggleLocations}
        aria-label="Toggle locations panel"
      >
        Locations
      </Toggle.Root>

      {/* Radix DropdownMenu handles accessibility, keyboard nav, and focus management */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="menu-trigger" aria-label="Select map provider">
          <HamburgerIcon />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="menu-content" sideOffset={5}>
            <DropdownMenu.Label className="menu-label">Map Provider</DropdownMenu.Label>
            <DropdownMenu.Separator className="menu-separator" />

            {/* RadioGroup ensures only one item is selected at a time */}
            <DropdownMenu.RadioGroup value={provider} onValueChange={(v) => onProviderChange(v as MapProvider)}>
              <DropdownMenu.RadioItem className="menu-item" value="leaflet">
                <DropdownMenu.ItemIndicator className="item-indicator">*</DropdownMenu.ItemIndicator>
                Leaflet (OpenStreetMap)
              </DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem className="menu-item" value="mapbox">
                <DropdownMenu.ItemIndicator className="item-indicator">*</DropdownMenu.ItemIndicator>
                Mapbox
              </DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem className="menu-item" value="google">
                <DropdownMenu.ItemIndicator className="item-indicator">*</DropdownMenu.ItemIndicator>
                Google Maps
              </DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </header>
  );
}
