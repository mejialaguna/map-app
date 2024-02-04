import { ChangeEvent, useContext, useState } from "react";
import { PlacesContext } from "../context";
import { useDebounce } from '../../hooks/useDobounce';
import { Feature } from "../context/interfaces/places";

export const SearchBar = () => {
  const { searchPlaces } = useContext(PlacesContext);
  const [searchResult, setSearchResult] = useState<Feature[]>([]); 

  const debouncedSearch = useDebounce(searchPlaces, 1000, setSearchResult);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    debouncedSearch(value);
  };

  console.log(searchResult);

  return (
    <div className='last:bg-white text-black h-[100vh] w-[100vw]'>
      <input
        onChange={onChange}
        className='fixed top-5 left-5 bg-transparent-white w-60 p-1.5 rounded-md border-solid border-2 border-stone-300 shadow-2xl'
        type='text'
        placeholder='Search'
        title='places near you'
      />
    </div>
  );
};
