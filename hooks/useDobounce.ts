import { useEffect, useRef } from 'react';
import { Feature } from '../src/context/interfaces/places';

export const useDebounce = (
  callback: (query: string) => Promise<Feature[]>,
  delay: number,
  resultCallback: React.Dispatch<Feature[]>
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
      const data = await callback(args);
      resultCallback(data); // Pass the result to the provided callback
    }, delay);
  };

  return debounce;
};
