import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import type { Location } from '../types';

// Shape of a row in our CSV file
interface CsvRow {
  Name: string;
  Latitude: string;
  Longitude: string;
  Description: string;
  Altitude: string;
}

// Custom hook to load and parse locations from CSV
// Hooks are reusable functions that encapsulate stateful logic
export function useLocations() {
  // useState creates a state variable that persists across re-renders
  // The generic <Location[]> tells TypeScript this is an array of Location objects
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect runs side effects (like fetching data) after render
  // The empty dependency array [] means this runs once on mount
  useEffect(() => {
    fetch('/corryong-cup-waypoints.csv')
      .then((response) => response.text())
      .then((csvText) => {
        // Papa.parse converts CSV text to JavaScript objects
        Papa.parse<CsvRow>(csvText, {
          header: true, // First row contains column names
          skipEmptyLines: true,
          complete: (results) => {
            // Map CSV columns to our Location interface, converting strings to numbers
            const locs = results.data.map((row) => ({
              name: row.Name,
              latitude: parseFloat(row.Latitude),
              longitude: parseFloat(row.Longitude),
              description: row.Description,
              altitude: parseFloat(row.Altitude),
            }));
            setLocations(locs);
            setLoading(false);
          },
        });
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { locations, loading, error };
}
