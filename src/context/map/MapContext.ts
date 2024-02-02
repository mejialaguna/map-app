import { createContext } from "react";
import { Map } from "mapbox-gl";

export interface MapContextProps {
  isMapReady: boolean;
  map?: Map;
  zoomLevel: number;

  // ? Methods
  setMap: (map: Map) => void;
  setMapZoom: (zoom: number) => void;
}


export const MapContext = createContext<MapContextProps>({} as MapContextProps);