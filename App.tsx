import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Navigation
import RootNavigator from './src/navigation';

// Context
import { AuthContext } from './src/contexts/AuthContext';
import { LocationContext } from './src/contexts/LocationContext';

export default function App() {
  // Auth state
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  
  // Location state
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        // Load user token and type from storage
        const token = await AsyncStorage.getItem('userToken');
        const type = await AsyncStorage.getItem('userType');
        
        // Simulate a loading delay
        setTimeout(() => {
          setUserToken(token);
          setUserType(type);
          setIsLoading(false);
        }, 1000);
      } catch (e) {
        console.error('Failed to load auth data', e);
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  // Request location permissions
  useEffect(() => {
    const getLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status === 'granted') {
          setLocationPermission(true);
          
          // Get current location
          const currentLocation = await Location.getCurrentPositionAsync({});
          setLocation(currentLocation);
        } else {
          setLocationError('Permission to access location was denied');
          setLocationPermission(false);
        }
      } catch (error) {
        setLocationError('Error getting location: ' + error.message);
        setLocationPermission(false);
      }
    };

    getLocationPermission();
  }, []);

  // Auth context
  const authContext = React.useMemo(() => ({
    signIn: async (token: string, type: string) => {
      try {
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userType', type);
        
        setUserToken(token);
        setUserType(type);
      } catch (e) {
        console.error('Failed to save auth data', e);
      }
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userType');
        
        setUserToken(null);
        setUserType(null);
      } catch (e) {
        console.error('Failed to remove auth data', e);
      }
    },
    signUp: async (token: string, type: string) => {
      try {
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userType', type);
        
        setUserToken(token);
        setUserType(type);
      } catch (e) {
        console.error('Failed to save auth data', e);
      }
    },
    userToken,
    userType,
    isLoading
  }), [userToken, userType, isLoading]);

  // Location context
  const locationContext = React.useMemo(() => ({
    location,
    locationPermission,
    locationError,
    refreshLocation: async () => {
      if (locationPermission) {
        try {
          const currentLocation = await Location.getCurrentPositionAsync({});
          setLocation(currentLocation);
          setLocationError(null);
        } catch (error) {
          setLocationError('Error refreshing location: ' + error.message);
        }
      }
    }
  }), [location, locationPermission, locationError]);

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={authContext}>
        <LocationContext.Provider value={locationContext}>
          <NavigationContainer>
            <RootNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </LocationContext.Provider>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}
