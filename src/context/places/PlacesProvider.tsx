import { useCallback, useEffect, useReducer } from 'react';
import { PlacesContext } from './PlacesContext';
import { PlacesReducer } from './PlacesReducer';
import { userLocation } from '../../apis/userLocation';

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number]
  errorMessage?: string | null;
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  errorMessage: null,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(PlacesReducer, INITIAL_STATE);

  //* =====> Fetch user location and dispatch the result <======
  const getUserLocation = useCallback(() => {
    userLocation(dispatch).then((userLocation) => {
      dispatch({
        type: 'setUserLocation',
        payload: {userLocation},
      });
    })
  }, [dispatch]);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  return (
    <PlacesContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
