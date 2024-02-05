import { useEffect, useRef } from 'react';
import { Feature } from '../src/context/interfaces/places';

export const useDebounce = (
  callback: (query: string) => Promise<Feature[]>,
  delay: number
) => {
  const debouncerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (debouncerRef.current !== null) {
        clearTimeout(debouncerRef.current);
      }
    };
  }, []);

  const debounce = (args: string) => {
    if (debouncerRef.current !== null) {
      clearTimeout(debouncerRef.current);
    }

    debouncerRef.current = setTimeout(async () => {
      //? calling searchPlaces function
      await callback(args);
    }, delay);
  };

  return debounce;
};
