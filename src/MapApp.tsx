import { MapProvider } from './context/map/MapProvider';
import { PlacesProvider } from './context/places/PlacesProvider';
import { Home } from './pages/Home';

function Map() {
  return (
    <PlacesProvider>
      <MapProvider>
       <Home />
      </MapProvider>
    </PlacesProvider>
  )
}

export default Map
