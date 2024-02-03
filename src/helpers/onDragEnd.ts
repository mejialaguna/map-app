import { Marker } from 'mapbox-gl';

export const onDragEnd = (marker: Marker) => {
  const coordinates = document.getElementById('coordinates');
  const lngLat = marker?.getLngLat();
  if (coordinates) {
    coordinates.style.display = 'block';
    coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
  }
};
