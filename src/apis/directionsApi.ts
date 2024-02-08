import axios from 'axios';
import { getEnvironmentVar } from '../helpers/getEnvironmentVar';

const directionApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: true,
    geometries: 'geojson',
    overview: 'full',
    language: 'en-US',
    steps: false,
    access_token: getEnvironmentVar('VITE_MAPBOX_ACCESS_TOKEN'),
  },
});

export default directionApi;
