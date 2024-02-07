import { useContext, useEffect, useReducer } from 'react';
import { MapContext } from './MapContext';
import { MapReducer } from './MapReducer';
import { Map, Marker, Popup } from 'mapbox-gl';
import { onDragEnd } from '../../helpers/onDragEnd';
import { PlacesContext } from '..';

export interface MapProviderProps {
  children: JSX.Element | JSX.Element[];
}

export interface MapStateProps {
  isMapReady: boolean;
  map?: Map;
  markers?: Marker[];
}

const INITIAL_STATE: MapStateProps = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

export const MapProvider = ({ children }: MapProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  useEffect(() => {
    // checking whether theres is a marker.
    state?.markers?.forEach(marker => marker.remove());
    const newMarkers: Marker[] = [];

    places.forEach((place) => {
      const [long, lat] = place.geometry.coordinates;
      const popup = new Popup({ closeButton: false }).setLngLat([long, lat])
        .setHTML(`
        <div class='flex flex-col text-center'>
        <h1>${place.text}</h1>
        <p>${place.place_name.split(', ').slice(1).join(', ')}!</p>
          </div>
      `);

      const newMarker = new Marker({ color: 'blue' })
      .setLngLat([long, lat])
      .setPopup(popup)
      .addTo(state.map!)

      newMarkers.push(newMarker);
    });

  }, [places]);

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

    marker.on('dragend', () => onDragEnd(marker, map));

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
