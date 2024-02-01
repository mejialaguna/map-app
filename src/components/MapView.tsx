import { memo, useCallback, useLayoutEffect, useRef } from 'react';
import { PlacesState } from '../context/places/PlacesProvider';
import { Map } from 'mapbox-gl';

export const MapView = memo(
  ({ isLoading, userLocation }: PlacesState): JSX.Element => {
    const mapRef = useRef<HTMLDivElement>(null);

    const initializeMap = useCallback(() => {
      if (mapRef.current && !isLoading) {
        new Map({
          // * container ID
          container: mapRef.current!,
          // * style URL
          style: 'mapbox://styles/mapbox/streets-v12',
          // * starting position [lng, lat]
          center: userLocation ? userLocation : [1000, 20],
          // * starting zoom
          zoom: userLocation ? 9 : 2,
        });
      }
    }, [mapRef.current, isLoading, userLocation]);

    useLayoutEffect(() => {
      initializeMap();
    }, [initializeMap]);

    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div className='h-[100vh] w-[100vw] fixed top-0 left-0'
        ref={mapRef}
      />
    );
  }
);
