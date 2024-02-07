import axios from 'axios';
import { getEnvironmentVar } from '../helpers/getEnvironmentVar';

const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    language: 'en-US',
    access_token: getEnvironmentVar('VITE_MAPBOX_ACCESS_TOKEN'),
  },
});

export default searchApi;