import { createContext } from "react";
import { Map } from "mapbox-gl";

export interface MapContextProps {
  isMapReady: boolean;
  map?: Map;

  // ? Methods
  setMap: (map: Map) => void;
  getDirections: (
    start: [number, number],
    end: [number, number]
  ) => Promise<
    | {
        miles: string;
        minutes: number;
        coordinates: number[][];
      }
    | undefined
  >;
}


export const MapContext = createContext<MapContextProps>({} as MapContextProps);