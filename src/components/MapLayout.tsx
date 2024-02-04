import { MapView } from './MapView';
import { Coordenaces } from './Coordenaces';
import { PlacesState } from '../context/places/PlacesProvider';
import { FindMe } from './FindMe';
import { Dropdown } from './MapViewStyle';
import { memo } from 'react';
import { SearchBar } from './SearchBar';

export const MapLayout = memo(({ isLoading, userLocation }: PlacesState) => {
  return (
    <>
      <MapView isLoading={isLoading} userLocation={userLocation} />
      <SearchBar />
      <Coordenaces />
      <FindMe />
      <Dropdown />
    </>
  );
});
