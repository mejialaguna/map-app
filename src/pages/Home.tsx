import { useContext, useState } from 'react';
import { PlacesContext } from '../context/places/PlacesContext';
import { MapView } from '../components/MapView';
import { GeolocationError } from '../components/GeolocationError';

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
      <MapView isLoading={isLoading} userLocation={userLocation} />
    </>
  );
};
