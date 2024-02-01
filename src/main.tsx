import React from 'react';
import ReactDOM from 'react-dom/client';
import MapApp from './MapApp.tsx';
import { getEnvironmentVar } from './helpers/getEnvironmentVar.ts';

import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = getEnvironmentVar('VITE_MAPBOX_ACCESS_TOKEN');

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MapApp />
  </React.StrictMode>,
)