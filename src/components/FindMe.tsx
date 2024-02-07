import { memo, useCallback, useContext, useState } from 'react';
import { PlacesContext } from '../context';
import { MapContext } from '../context/map/MapContext';
import { onDragEnd } from '../helpers/onDragEnd';
import mapboxgl, { Marker } from 'mapbox-gl';

export const FindMe = memo(() => {
  const { userLocation } = useContext(PlacesContext);
  const { map, isMapReady } = useContext(MapContext);
  const [userMarker, setUserMarker] = useState<Marker | null>(null);

  const onclick = useCallback(() => {
    if (userLocation && map?.flyTo) {
      if (userMarker) {
        // If marker exists, update its position
        userMarker.setLngLat(userLocation);
      } else {
        // If marker does not exist, create a new one
        const popup = new mapboxgl.Popup({ closeButton: false }).setLngLat(userLocation).setHTML(`
          <div class='flex flex-col text-center'>
            <h1> you are here!</h1>
            <p>${userLocation}</p>
          </div>
        `);

        const newMarker = new mapboxgl.Marker({ color: 'red', draggable: true })
          .setLngLat(userLocation)
          .setPopup(popup)
          .addTo(map);

        newMarker.on('dragend', () => onDragEnd(newMarker, map));

        // Save the new marker to local state
        setUserMarker(newMarker);
      }

      // Center the map on the user's location
      map.flyTo({
        center: userLocation,
        essential: true,
        zoom: 15,
      });
    }
  }, [userLocation, map, userMarker]);

  return (
    isMapReady &&
    <button onClick={onclick} className='absolute block bottom-20 md:bottom-10 right-2.5'>
      <img
        width='48'
        height='48'
        src='https://img.icons8.com/sf-regular-filled/48/center-direction.png'
        alt='center-direction'
      />
    </button>
  );
});
