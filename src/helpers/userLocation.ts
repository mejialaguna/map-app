import { PlacesAction } from '../context/places/PlacesReducer';

export const userLocation = async (
  dispatch: React.Dispatch<PlacesAction>
): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve([coords.longitude, coords.latitude]),
      (err) => {
        dispatch({
          type: 'setUserLocation',
          payload: { errorMessage: err.message },
        });
        console.error(`cant get current position reason: ${err.message}`);
        reject();
      }
    );
  });
};
