import { createContext } from 'react';
import * as Location from 'expo-location';

type LocationContextType = {
  location: Location.LocationObject | null;
  locationPermission: boolean;
  locationError: string | null;
  refreshLocation: () => Promise<void>;
};

export const LocationContext = createContext<LocationContextType>({
  location: null,
  locationPermission: false,
  locationError: null,
  refreshLocation: async () => {}
});
