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
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isSelected, setIsSelected] = useState('light');
  const { map, isMapReady } = useContext(MapContext);

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [setIsOpen, isOpen]);

  const closeSettings = useCallback(() => {
    if (isSettingOpen) {
      setIsSettingOpen(false);
    }
    if (!isSettingOpen) {
      setIsSettingOpen(true);
    }
    if (isSettingOpen && isOpen) {
      setIsSettingOpen(false);
      setIsOpen(false);
    }
  }, [isSettingOpen, isOpen]);

  const handleOptionClick = useCallback(
    (option: string, value: string) => {
      setIsOpen(false);
      setIsSettingOpen(false);
      setIsSelected(option);

      if (isMapReady && map) {
        map.setStyle(`mapbox://styles/mapbox/${value}`);
      }
    },
    [isMapReady, map]
  );

  return (
    isMapReady && (
      <div className='absolute cursor-pointer text-slate-50 block bottom-32 right-3.5 rounded-lg py-1 md:bottom-24'>
        {isOpen && (
          <ul
            className={`text-center absolute bottom-20 right-[35px] bg-slate-50 text-gray-950 p-3 rounded-md `}
          >
            {dropdownOptions.map(({ name, value }, i) => {
              if (isSelected !== name) {
                return (
                  <li
                    className={`hover:border-b border-blue-500 items-center my-[2px] p-[2px] animate__animated ${
                      isOpen ? 'animate__fadeInDown' : ''
                    }`}
                    key={i}
                    onClick={() => handleOptionClick(name, value)}
                  >
                    {isSelected !== name && name.toUpperCase()}
                  </li>
                );
              }
            })}
          </ul>
        )}

        <button onClick={closeSettings}>
          <img
            width='40'
            height='40'
            src='https://img.icons8.com/flat-round/64/settings--v1.png'
            alt='settings--v1'
          />
        </button>

        {isSettingOpen && (
          <button
            className={`text-gray-950 absolute bottom-4 right-[60px] bg-slate-50 py-1 px-4 rounded-md animate__animated ${
              !isSettingOpen ? 'animate__fadeOutUp' : 'animate__fadeInDown'
            }`}
            onClick={handleToggle}
          >
            View
          </button>
        )}
      </div>
    )
  );
});
