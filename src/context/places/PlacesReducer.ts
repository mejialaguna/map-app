import { PlacesState } from './PlacesProvider';
import { Feature } from '../interfaces/places';

export type PlacesAction =
  | {
      type: 'setUserLocation';
      payload: {
        userLocation?: [number, number];
        errorMessage?: string;
      };
    }
  | {
      type: 'setPlaces';
      payload: Feature[];
    }
  | {
      type: 'setLoadingPlaces';
    }

export const PlacesReducer = (
  state: PlacesState,
  action: PlacesAction
): PlacesState => {
  switch (action.type) {
    case 'setUserLocation':
      return {
        ...state,
        isLoading: false,
        userLocation: action?.payload?.userLocation,
        errorMessage: action?.payload?.errorMessage,
      };
    case 'setLoadingPlaces':
      return {
        ...state,
        isLoadingPlaces: true,
        places: [],
      }
    case 'setPlaces':
      return {
        ...state,
        isLoadingPlaces: false,
        places: action?.payload,
      };
    default:
      return state;
  }
};
