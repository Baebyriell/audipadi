import { Linking, Platform } from 'react-native';
import * as Location from 'expo-location';

/**
 * Class for interacting with Waze navigation features
 */
export class WazeAPI {
  /**
   * Opens Waze app with navigation to the specified destination
   * @param {Object} destination - Destination coordinates
   * @param {number} destination.latitude - Destination latitude
   * @param {number} destination.longitude - Destination longitude
   * @param {string} [destination.name] - Optional destination name
   * @returns {Promise<boolean>} - Returns true if Waze was opened successfully
   */
  static async navigateTo(destination) {
    try {
      const { latitude, longitude, name = 'Destination' } = destination;
      
      let url = `https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`;
      
      if (name) {
        url += `&q=${encodeURIComponent(name)}`;
      }
      
      // Check if Waze is installed
      const wazeUrl = Platform.select({
        ios: `waze://?ll=${latitude},${longitude}&navigate=yes`,
        android: url
      });
      
      const canOpenWaze = await Linking.canOpenURL(wazeUrl);
      
      if (canOpenWaze) {
        await Linking.openURL(wazeUrl);
        return true;
      } else {
        // If Waze is not installed, open in browser
        await Linking.openURL(url);
        return true;
      }
    } catch (error) {
      console.error('Error opening Waze:', error);
      return false;
    }
  }
  
  /**
   * Gets the current location and opens Waze for navigation
   * @param {Object} destination - Destination coordinates
   * @returns {Promise<boolean>} - Returns true if successful
   */
  static async navigateFromCurrentLocation(destination) {
    try {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        console.error('Location permission denied');
        return false;
      }
      
      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      
      // Construct Waze URL with current location and destination
      let url = `https://waze.com/ul?ll=${destination.latitude},${destination.longitude}&navigate=yes&from=${latitude},${longitude}`;
      
      if (destination.name) {
        url += `&q=${encodeURIComponent(destination.name)}`;
      }
      
      // Try to open Waze
      const wazeUrl = Platform.select({
        ios: `waze://?ll=${destination.latitude},${destination.longitude}&navigate=yes&from=${latitude},${longitude}`,
        android: url
      });
      
      const canOpenWaze = await Linking.canOpenURL(wazeUrl);
      
      if (canOpenWaze) {
        await Linking.openURL(wazeUrl);
        return true;
      } else {
        // If Waze is not installed, open in browser
        await Linking.openURL(url);
        return true;
      }
    } catch (error) {
      console.error('Error navigating with Waze:', error);
      return false;
    }
  }
  
  /**
   * Checks if Waze is installed on the device
   * @returns {Promise<boolean>} - Returns true if Waze is installed
   */
  static async isWazeInstalled() {
    try {
      const wazeUrl = Platform.select({
        ios: 'waze://',
        android: 'waze://'
      });
      
      return await Linking.canOpenURL(wazeUrl);
    } catch (error) {
      console.error('Error checking Waze installation:', error);
      return false;
    }
  }
  
  /**
   * Searches for locations in Waze
   * @param {string} query - Search query
   * @returns {Promise<boolean>} - Returns true if search was initiated
   */
  static async searchLocation(query) {
    try {
      const encodedQuery = encodeURIComponent(query);
      const url = `https://waze.com/ul?q=${encodedQuery}`;
      
      const wazeUrl = Platform.select({
        ios: `waze://?q=${encodedQuery}`,
        android: url
      });
      
      const canOpenWaze = await Linking.canOpenURL(wazeUrl);
      
      if (canOpenWaze) {
        await Linking.openURL(wazeUrl);
        return true;
      } else {
        // If Waze is not installed, open in browser
        await Linking.openURL(url);
        return true;
      }
    } catch (error) {
      console.error('Error searching in Waze:', error);
      return false;
    }
  }
}

export default WazeAPI;