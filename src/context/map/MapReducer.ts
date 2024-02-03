import { MapStateProps } from './MapProvider';
import { Map } from 'mapbox-gl';

export type MapAction =
  | {
    type: 'setMap';
    payload: Map;
  };

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

    default:
      return state;
  }
};
