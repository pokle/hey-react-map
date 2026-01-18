# hey-react-map

Demo React application showcasing Leaflet, Mapbox and Google Maps integration with the rest of the React ecosystem.

## Technologies

- [React](https://react.dev/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript that compiles to plain JavaScript
- [Vite](https://vite.dev/) - Next generation frontend build tool with fast HMR
- [Leaflet](https://leafletjs.com/) - Open-source JavaScript library for interactive maps
- [react-leaflet](https://react-leaflet.js.org/) - React components for Leaflet maps
- [Mapbox GL JS](https://www.mapbox.com/mapbox-gljs) - JavaScript library for vector maps
- [react-map-gl](https://visgl.github.io/react-map-gl/) - React wrapper for Mapbox GL JS
- [Google Maps](https://developers.google.com/maps) - Google's mapping platform
- [@react-google-maps/api](https://react-google-maps-api-docs.netlify.app/) - React wrapper for Google Maps JavaScript API
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible UI component primitives
- [PapaParse](https://www.papaparse.com/) - Fast and powerful CSV parser for JavaScript
- [ESLint](https://eslint.org/) - Pluggable JavaScript linter for code quality

## Prompts

I created a new React + TypeScript + Vite project using the following command:

```bash
npm create vite@latest hey-react-map -- --template react-ts
```

Then, I prompted Claude Code to help me with the rest of the UI:
```
Create a simple app to help me try out the various mapping providers (Leaflet, MapBox, Google) with React.

Use Vite, Radix UI, Typescript, and help me find React component libraries to wrap the map.

I've initialised this project with `npm create vite@latest hey-react-map-temp -- --template react-ts`

The screen layout should have a header with the name of the app on the top left. 

A hamburger menu on the top right, and the rest of the area should show the map. The menu should let you select a map provider. 

There also needs to be a button on the header somewhere in the middle called 'Locations'. When clicked, it should pop up a list of locations (displayed with their Geo Co-ordinates). The list of locations should float over the map on the left hand side. When a location is tapped/clicked, the map should move to it. The locations come from @public/corryong-cup-waypoints.csv

Even when clicked or tapped, the location list should remain on the screen. It can be dismissed by clicking on the Location button again.

Keep the code concise. And add explainatory comments. I've used React many years ago, so I'm familiar with TSX, but I'm not familiar with all the new state and hook management.
```

When finished, it summarised:
```
  Summary

  I've created a map provider comparison app with:

  Structure

  src/
  ├── types/index.ts          # Location and MapProvider types
  ├── hooks/useLocations.ts   # Custom hook to load CSV waypoints
  ├── components/
  │   ├── Header.tsx/css      # App header with menu and location toggle
  │   ├── LocationList.tsx/css # Floating waypoint list panel
  │   ├── MapContainer.tsx    # Provider switcher component
  │   ├── LeafletMap.tsx      # OpenStreetMap (works immediately)
  │   ├── MapboxMap.tsx       # Requires API key
  │   └── GoogleMap.tsx       # Requires API key
  └── App.tsx                 # Main app with state management

  Libraries Used

  - react-leaflet - Leaflet wrapper (free, no API key needed)
  - react-map-gl - Mapbox GL wrapper
  - @react-google-maps/api - Google Maps wrapper
  - @radix-ui/react-dropdown-menu - Accessible menu component
  - @radix-ui/react-toggle - Toggle button for locations panel
  - papaparse - CSV parsing

  Key React Concepts (commented in code)

  - useState - State that persists across renders (App.tsx:12-18)
  - useEffect - Side effects like data fetching (useLocations.ts:25)
  - useRef - Mutable references for map instances (MapboxMap.tsx:15)
  - useCallback - Memoized callbacks (GoogleMap.tsx:17)
  - Custom hooks - Reusable stateful logic (useLocations.ts)

  To Use Mapbox/Google

  Create a .env file (see .env.example):
  VITE_MAPBOX_API_KEY=your_key
  VITE_GOOGLE_API_KEY=your_key

  Leaflet with OpenStreetMap works immediately without any keys.
```


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
