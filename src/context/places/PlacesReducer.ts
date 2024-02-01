import { PlacesState } from './PlacesProvider';

export interface PlacesAction {
  type: 'setUserLocation';
  payload: {
    userLocation?: [number, number];
    errorMessage?: string
  };
};

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
    default:
      return state;
  }
};
