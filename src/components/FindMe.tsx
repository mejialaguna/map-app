import { memo, useCallback, useContext } from 'react';
import { PlacesContext } from '../context';
import { MapContext } from '../context/map/MapContext';

export const FindMe = memo(() => {
  const { userLocation } = useContext(PlacesContext);
  const { map } = useContext(MapContext);

  const onclick = useCallback(() => {
    if (userLocation && map?.flyTo) {
      map.flyTo({
        center: userLocation,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        zoom: 15,
      });
    }
  }, [userLocation, map]);

  return (
    <button onClick={onclick} className='absolute block bottom-10 right-2.5'>
      <img
        width='48'
        height='48'
        src='https://img.icons8.com/sf-regular-filled/48/center-direction.png'
        alt='center-direction'
      />
    </button>
  );
});
