import { useContext, useState } from 'react';
import { PlacesContext } from '../context';
import { Loading } from './Loading';
import { MapContext } from '../context/map/MapContext';
import { Feature } from '../context/interfaces/places';

export const SearchResult = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const [isActive, setIsActive] = useState('');
  const { map, getDirections } = useContext(MapContext);

  if (isLoadingPlaces) {
    return <Loading />;
  }

  if (!places) {
    return <p>we couldnt find any places</p>;
  }

  const onClick = (place: Feature) => {
    const [lng, lat] = place.center;
    if (!userLocation) return;

    getDirections(userLocation, [lng, lat]);
  };

  const onHover = (place: Feature) => {
    setIsActive(place.id);
    const [lng, lat] = place.center;
    if (map) {
      map.flyTo({
        center: [lng, lat],
        essential: true,
        zoom: 15,
      });
    }
  };
  return (
    <ul className={`w-72 overflow-y-auto ${places.length > 0 ? 'mt-2' : null}`}>
      {places.map((place) => {
        return (
          <li
            onMouseEnter={() => onHover(place)}
            key={place.id}
            className={`rounded-md border-solid border-2 border-stone-300 mb-1.5 p-2 hover:shadow-lg transition duration-300 ease-in-out ${
              isActive === place.id ? 'bg-blue-500 text-white' : ''
            }`}
          >
            <h6 className='font-bold'> {place.text} </h6>
            <p>{place.place_name}</p>
            <button
              onClick={() => onClick(place)}
              className={`rounded-md border-solid border-2 border-blue-700 p-1 text-blue-700 mt-2.5 hover:bg-blue-700 hover:text-white duration-300 ease-in-out ${
                isActive === place.id ? 'text-white border-white' : ''
              }`}
            >
              Directions
            </button>
          </li>
        );
      })}
    </ul>
  );
};
