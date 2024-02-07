import { ChangeEvent, useContext } from 'react';
import { PlacesContext } from '../context';
import { useDebounce } from '../../hooks/useDobounce';
import { SearchResult } from './SearchResult';

export const SearchBar = () => {
  const { searchPlaces } = useContext(PlacesContext);
  const debouncedSearch = useDebounce(searchPlaces, 1000);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    debouncedSearch(value);
  };

  return (
    <div className={`flex flex-col fixed top-5 left-5 text-black rounded-md px-2 py-2 bg-white`}>
      <input
        onChange={onChange}
        className={`bg-transparent-white p-1.5 rounded-md border-solid border-2 border-stone-300 shadow-2xl w-full`}
        type='text'
        placeholder='Search...'
        title='places near you'
      />
      <SearchResult />
    </div>
  );
};
