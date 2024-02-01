
import { useReducer } from 'react';
import { MapContext, MapContextProps } from './MapContext';
import { MapReducer } from './MapReducer';

export interface MapProviderProps {
  children: JSX.Element | JSX.Element[];
}

const INITIAL_STATE: MapContextProps = {
  isMapReady: false,
  map: undefined,
}

export const MapProvider = ({ children }: MapProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE)
  return (
    <MapContext.Provider value={{
      ...state
    }}>
      {children}
    </MapContext.Provider>
      );
};
