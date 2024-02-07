import { useContext } from 'react';
import { PlacesContext } from '../context';
import { Loading } from './Loading';

export const SearchResult = () => {
  const { places, isLoadingPlaces } = useContext(PlacesContext);

  if (isLoadingPlaces) {
    return <Loading />
  }

  if (!places) {
    return <p>we couldnt find any places</p>
  }

  return (
    <ul className={`w-72 overflow-y-auto ${places.length > 0 ? 'mt-2' : null}`}>
      {places.map((place) => {
        return (
          <li
            key={place.id}
            className='rounded-md border-solid border-2 border-stone-300 mb-1.5 p-2 hover:shadow-lg transition duration-300 ease-in-out'
          >
            <h6 className='font-bold'> {place.text} </h6>
            <p>{place.place_name}</p>
            <button className='rounded-md border-solid border-2 border-blue-700 p-1 text-blue-700 mt-2.5 hover:bg-blue-700 hover:text-white duration-300 ease-in-out'>
              Directions
            </button>
          </li>
        );
      })}
    </ul>
  );
};
