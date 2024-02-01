import { createContext } from "react";

export interface PlacesContextProps {
    isLoading: boolean;
    userLocation?: [number, number];
    errorMessage?: string | null;
}

export const PlacesContext = createContext<PlacesContextProps>( {} as PlacesContextProps );