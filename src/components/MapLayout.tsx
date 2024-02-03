import { MapView } from './MapView';
import { Coordenaces } from './Coordenaces';
import { PlacesState } from '../context/places/PlacesProvider';

export const MapLayout = ({ isLoading, userLocation }: PlacesState) => {
  return (
    <>
      <MapView isLoading={isLoading} userLocation={userLocation} />
      <Coordenaces />
    </>
  );
};
