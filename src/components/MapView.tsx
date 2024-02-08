import { memo, useCallback, useContext, useLayoutEffect, useRef } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import { MapContext } from '../context/map/MapContext';

interface MapViewProps {
  isLoading?: boolean;
  userLocation?: [number, number];
}

export const MapView = memo(
  ({ isLoading, userLocation }:MapViewProps): JSX.Element => {
    const { setMap } = useContext(MapContext);
    const mapRef = useRef<HTMLDivElement>(null);

    const initializeMap = useCallback(() => {
        const map = new Map({
          // container ID
          container: mapRef.current!,
          // style URL
          style: 'mapbox://styles/mapbox/streets-v12',
          // starting position [lng, lat]
          center: userLocation ? userLocation : [1000, 20],
          // starting zoom
          zoom: userLocation ? 8 : 2.5,
        }).addControl(new mapboxgl.NavigationControl());

        // * Ensure we possess the user's location before initializing the map and executing subsequent processes, such as adding markers, etc.
        if (userLocation) setMap(map);

    }, [userLocation, setMap]);

    useLayoutEffect(() => {
      if (mapRef.current && !isLoading) initializeMap();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapRef, isLoading]);

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div className='h-[100vh] w-[100vw] fixed top-0 left-0' ref={mapRef} />
    );
  }
);
