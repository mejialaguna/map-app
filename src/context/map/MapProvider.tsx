import { useContext, useEffect, useReducer } from 'react';
import { MapContext } from './MapContext';
import { MapReducer } from './MapReducer';
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';
import { onDragEnd } from '../../helpers/onDragEnd';
import { PlacesContext } from '..';
import directionApi from '../../apis/directionsApi';
import { DirectionResponse } from '../interfaces/direction';

export interface MapProviderProps {
  children: JSX.Element | JSX.Element[];
}

export interface MapStateProps {
  isMapReady: boolean;
  map?: Map;
  markers?: Marker[];
}

const INITIAL_STATE: MapStateProps = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

export const MapProvider = ({ children }: MapProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  useEffect(() => {
    // checking whether theres is a marker.
    state?.markers?.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = [];

    places.forEach((place) => {
      const [long, lat] = place.geometry.coordinates;
      const popup = new Popup({ closeButton: false }).setLngLat([long, lat])
        .setHTML(`
        <div class='flex flex-col text-center'>
        <h1>${place.text}</h1>
        <p>${place.place_name.split(', ').slice(1).join(', ')}!</p>
          </div>
      `);

      const newMarker = new Marker({ color: 'blue' })
        .setLngLat([long, lat])
        .setPopup(popup)
        .addTo(state.map!);

      newMarkers.push(newMarker);

      dispatch({
        type: 'setMarkers',
        payload: newMarkers,
      })
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  const setMap = (map: Map) => {
    const latLong = map.getCenter();
    const popup = new Popup({ closeButton: false }).setLngLat(latLong).setHTML(`
          <div class='flex flex-col text-center'>
          <h1> you are here!</h1>
          <p>${latLong}</p>
          </div>
      `);

    const marker = new Marker({ color: 'red' })
      .setLngLat(latLong)
      .setPopup(popup)
      .addTo(map);

    marker.on('dragend', () => onDragEnd(marker, map));

    dispatch({
      type: 'setMap',
      payload: map,
    });
  };

  const getDirections = async (
    start: [number, number],
    end: [number, number]
  ) => {
    try {
      if (start && end) {
        const response = await directionApi.get<DirectionResponse>(
          `/${start};${end}`
        );

        const {
          distance,
          duration,
          geometry: { coordinates },
        } = response.data.routes[0];
        const miles = (distance * 0.000621371).toFixed(2);
        const minutes = Math.round(duration / 60);

        const bounds = new LngLatBounds(start, end);

        for (const coord of coordinates) {
          const newCoord: [number, number] = [coord[0], coord[1]];
          bounds.extend(newCoord);
        }

        state.map?.fitBounds(bounds, { padding: 250 });

        const sourceData: AnySourceData = {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates,
                },
              },
            ],
          },
        };

        if (
          state.map?.getLayer('RouteString') &&
          state.map?.getLayer('RouteString')
        ) {
          state.map.removeLayer('RouteString');
          state.map.removeSource('RouteString');
        }

        state.map?.addSource('RouteString', sourceData);
        state.map?.addLayer({
          id: 'RouteString',
          type: 'line',
          source: 'RouteString',
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
          },
          paint: {
            'line-color': 'red',
            'line-width': 3,
          },
        });

        return { miles, minutes, coordinates };
      }
    } catch (error: any) {
      console.error(`Unexpected status code: ${error.message}`);
    }
  };

  return (
    <MapContext.Provider
      value={{
        ...state,

        // ? Methods
        setMap,
        getDirections,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
