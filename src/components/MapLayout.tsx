import { MapView } from './MapView';
import { Coordenaces } from './Coordenaces';
import { FindMe } from './FindMe';
import { Dropdown } from './MapViewStyle';
import { memo } from 'react';
import { SearchBar } from './SearchBar';

interface MapLayoutProps {
  isLoading: boolean;
  userLocation: [number, number] | undefined;
}

export const MapLayout = memo(({ isLoading, userLocation }: MapLayoutProps) => {
  return (
    <>
      <MapView isLoading={isLoading} userLocation={userLocation} />
      {userLocation ? <SearchBar /> : null}
      <Coordenaces />
      <FindMe />
      <Dropdown />
    </>
  );
});
