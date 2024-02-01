import { useReducer } from 'react';
import { MapContext } from './MapContext';
import { MapReducer } from './MapReducer';
import { Map, Marker } from 'mapbox-gl';

export interface MapProviderProps {
  children: JSX.Element | JSX.Element[];
}

export interface MapStateProps {
  isMapReady: boolean;
  map?: Map;
}

const INITIAL_STATE: MapStateProps = {
  isMapReady: false,
  map: undefined,
};

export const MapProvider = ({ children }: MapProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);

  const setMap = (map: Map) => {
    new Marker({color: 'red'})
      .setLngLat(map.getCenter())
      .addTo(map)

    dispatch({
      type: 'setMap',
      payload: map,
    });
  };

  return (
    <MapContext.Provider
      value={{
        ...state,

        // ? Methods
        setMap,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
