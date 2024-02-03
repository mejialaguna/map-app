import { useContext, useState } from 'react';
import { PlacesContext } from '../context/places/PlacesContext';
import { GeolocationError } from '../components/GeolocationError';
import { MapLayout } from '../components/MapLayout';

export const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { isLoading, userLocation, errorMessage } = useContext(PlacesContext);

  return (
    <>
      {!userLocation && errorMessage && (
        <GeolocationError
          errorMessage={errorMessage}
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
        />
      )}
      <MapLayout isLoading={isLoading} userLocation={userLocation} />
    </>
  );
};
