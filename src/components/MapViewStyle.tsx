import { memo, useCallback, useContext, useState } from 'react';
import { MapContext } from '../context/map/MapContext';

const dropdownOptions = [
  { name: 'satellite', value: 'satellite-streets-v12' },
  { name: 'light', value: 'light-v11' },
  { name: 'dark', value: 'dark-v11' },
  { name: 'streets', value: 'streets-v12' },
  { name: 'outdoors', value: 'outdoors-v12' },
];

export const Dropdown = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState('light');
  const { map, isMapReady } = useContext(MapContext);

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [setIsOpen, isOpen]);

  const handleOptionClick = useCallback(
    (option: string, value: string) => {
      // You can perform any action when an option is clicked
      // Close the dropdown after selecting an option
      setIsOpen(false);
      setIsSelected(option);

      if (isMapReady && map) {
        map.setStyle(`mapbox://styles/mapbox/${value}`);
      }
    },
    [isMapReady, map]
  );

  return (
    isMapReady &&
    <div className='absolute flex flex-col cursor-pointer bg-transparent-black text-slate-50 top-9 right-16 rounded-lg w-[165px] py-1'>
        <button onClick={handleToggle}>{isSelected.toUpperCase()} VIEW
        </button>

      {isOpen && (
        <ul className={`w-[100%] text-center  ${!isOpen ? 'opacity-0': 'transition-opacity duration-500 ease-in-out' }`}>
          {dropdownOptions.map(({ name, value }, i) => (
            <li
              className='hover:bg-slate-700 hover:rounded-lg items-center my-[2px]'
              key={i}
              onClick={() => handleOptionClick(name, value)}
            >
              {isSelected !== name && name.toUpperCase()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
