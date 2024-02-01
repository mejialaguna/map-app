import { memo, useCallback, useContext, useLayoutEffect, useRef } from 'react';
import { PlacesState } from '../context/places/PlacesProvider';
import { Map } from 'mapbox-gl';
import { MapContext } from '../context/map/MapContext';


export const MapView = memo(
  ({ isLoading, userLocation }: PlacesState): JSX.Element => {
    const { setMap } = useContext(MapContext);
    const mapRef = useRef<HTMLDivElement>(null);

    const initializeMap = useCallback(() => {
      if (mapRef.current && !isLoading) {
       const map = new Map({
          // * container ID
          container: mapRef.current!,
          // * style URL
          style: 'mapbox://styles/mapbox/streets-v12',
          // * starting position [lng, lat]
          center: userLocation ? userLocation : [1000, 20],
          // * starting zoom
          zoom: userLocation ? 9 : 2,
       });

        // * Ensure we possess the user's location before initializing the map and executing subsequent processes, such as adding markers, etc.
        if (userLocation) setMap(map);
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
