import { Map, Marker } from 'mapbox-gl';

export const onDragEnd = (marker: Marker, map:Map) => {
  const coordinates = document.getElementById('coordinates');
  const lngLat = marker?.getLngLat();
  if (coordinates) {
    coordinates.style.display = 'block';
    coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;

    map.setCenter(lngLat);
    map.flyTo({
      center: lngLat,
      zoom: map.getZoom(), // You can adjust the zoom level if needed
    });
  }
};
