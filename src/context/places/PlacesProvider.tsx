import { useCallback, useEffect, useReducer } from 'react';
import { PlacesContext } from './PlacesContext';
import { PlacesReducer } from './PlacesReducer';
import { userLocation } from '../../helpers/userLocation';
import searchApi from '../../apis/searchApi';
import { Feature, PlacesResponse } from '../interfaces/places';

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
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
    userLocation(dispatch).then((userLocation) =>
      dispatch({
        type: 'setUserLocation',
        payload: { userLocation },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  const searchPlaces = useCallback(
    async (query: string): Promise<Feature[] | []> => {
      try {
        if (query.length === 0) return [];

        if (!state.userLocation) {
          throw new Error('No user location');
        }

        const response = await searchApi.get<PlacesResponse>(`/${query}.json`, {
          params: {
            proximity: state.userLocation,
          },
        });

        // Checking for successful response status
        if (response.status === 200) {
          return response.data.features;
        } else {
          console.error(`Unexpected status code: ${response.status}`);
          return [];
        }
      } catch (error: any) {
        console.error('Error in searchPlaces:', error.message);
        return [];
      }
    },
    [state.userLocation]
  );

  return (
    <PlacesContext.Provider
      value={{
        ...state,

        // ? methods
        searchPlaces,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
