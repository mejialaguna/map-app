import { MapView } from './MapView';
import { Coordenaces } from './Coordenaces';
import { PlacesState } from '../context/places/PlacesProvider';
import { FindMe } from './FindMe';

export const MapLayout = ({ isLoading, userLocation }: PlacesState) => {
  return (
    <>
      <MapView isLoading={isLoading} userLocation={userLocation} />
      <Coordenaces />
      <FindMe />
    </>
  );
};
