import { MapStateProps } from './MapProvider';
import { Map, Marker } from 'mapbox-gl';

export type MapAction =
  | {
    type: 'setMap';
    payload: Map;
  }
  |
  {
    type: 'setMarkers';
    payload: Marker[];
  }

export const MapReducer = (
  state: MapStateProps,
  action: MapAction
): MapStateProps => {
  switch (action.type) {
    case 'setMap':
      return {
        ...state,
        isMapReady: true,
        map: action.payload,
      };
    case 'setMarkers':
      return {
        ...state,
        markers: action.payload,
      };

    default:
      return state;
  }
};
