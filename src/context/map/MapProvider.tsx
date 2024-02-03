import { useReducer } from 'react';
import { MapContext } from './MapContext';
import { MapReducer } from './MapReducer';
import { Map, Marker, Popup } from 'mapbox-gl';
import { onDragEnd } from '../../helpers/onDragEnd';
// import { onDragEnd } from '../../helpers/markerOnDrag';

export interface MapProviderProps {
  children: JSX.Element | JSX.Element[];
}

export interface MapStateProps {
  isMapReady: boolean;
  map?: Map;
}

const INITIAL_STATE: MapStateProps = {
  isMapReady: false,
  map: undefined,
};

export const MapProvider = ({ children }: MapProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);

  const setMap = (map: Map) => {
    const latLong = map.getCenter();
    const popup = new Popup({ closeButton: false }).setLngLat(latLong).setHTML(`
          <div class='flex flex-col text-center'>
          <h1> you are here!</h1>
          <p>${latLong}</p>
          </div>
      `);

    const marker = new Marker({ color: 'red', draggable: true })
      .setLngLat(latLong)
      .setPopup(popup)
      .addTo(map);

    marker.on('dragend', () => onDragEnd(marker));

    dispatch({
      type: 'setMap',
      payload: map,
    });
  };

  return (
    <MapContext.Provider
      value={{
        ...state,

        // ? Methods
        setMap,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
