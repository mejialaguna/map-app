import { MapContextProps } from './MapContext';
import { Map } from 'mapbox-gl';

export interface MapAction {
  type: 'setMap';
  payload: Map;
}

export const MapReducer = (state: MapContextProps, action: MapAction ): MapContextProps => {
  switch (action.type) {
    case 'setMap':
      return {
        ...state,
        isMapReady: true,
        map: action.payload,
      }

    default:
      return state
  }
};
