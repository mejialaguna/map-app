import { MapStateProps } from './MapProvider';
import { Map } from 'mapbox-gl';

export type MapAction =
  | {
      type: 'setMap';
      payload: Map;
    }
  | {
      type: 'increaseZoomLevel';
      payload: number;
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
    case 'increaseZoomLevel':
      return {
        ...state,
        zoomLevel: action.payload
      }

    default:
      return state;
  }
};
