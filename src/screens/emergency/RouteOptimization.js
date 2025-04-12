import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RouteOptimization = ({ route, navigation }) => {
  const { destination, customerName, emergencyType } = route.params || {};
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  
  // In a real app, this would use the device's location
  useEffect(() => {
    // Mock location data
    setCurrentLocation({
      latitude: 6.6745,
      longitude: -1.5716,
      address: 'Kumasi, Ghana'
    });
    
    // Mock routes data
    const mockRoutes = [
      {
        id: '1',
        name: 'Fastest Route',
        distance: '3.2 km',
        duration: '8 mins',
        trafficLevel: 'Low',
        description: 'Via Main Street and Oak Avenue',
        isRecommended: true,
      },
      {
        id: '2',
        name: 'Alternative Route',
        distance: '3.8 km',
        duration: '10 mins',
        trafficLevel: 'Low',
        description: 'Via Pine Road and Maple Street',
        isRecommended: false,
      },
      {
        id: '3',
        name: 'Shortest Route',
        distance: '2.9 km',
        duration: '12 mins',
        trafficLevel: 'Medium',
        description: 'Via Downtown and Market Street',
        isRecommended: false,
      },
    ];
    
    setRoutes(mockRoutes);
    setSelectedRoute(mockRoutes[0]);
  }, []);

  const handleStartNavigation = () => {
    if (!selectedRoute) {
      Alert.alert('Error', 'Please select a route first');
      return;
    }
    
    setIsNavigating(true);
    
    // In a real app, this would start turn-by-turn navigation
    Alert.alert(
      'Navigation Started',
      `Following ${selectedRoute.name} to the customer location.`,
      [{ text: 'OK' }]
    );
  };

  const handleStopNavigation = () => {
    setIsNavigating(false);
    
    // In a real app, this would stop the navigation
    Alert.alert(
      'Navigation Stopped',
      'You have stopped the navigation.',
      [{ text: 'OK' }]
    );
  };

  const handleCallCustomer = () => {
    // In a real app, this would initiate a phone call
    Alert.alert(
      'Call Customer',
      `Calling ${customerName}`,
      [{ text: 'OK' }]
    );
  };

  const handleShareETA = () => {
    // In a real app, this would send an ETA to the customer
    Alert.alert(
      'ETA Shared',
      `Your estimated arrival time has been shared with ${customerName}.`,
      [{ text: 'OK' }]
    );
  };

  const getTrafficLevelColor = (level) => {
    switch (level) {
      case 'Low':
        return COLORS.success;
      case 'Medium':
        return '#FFC107';
      case 'High':
        return COLORS.error;
      default:
        return COLORS.darkGray;
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Route Optimization" 
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.mapPlaceholder}>
          <Icon name="map" size={60} color={COLORS.primary} />
          <Text style={styles.mapPlaceholderText}>Map View</Text>
          <Text style={styles.mapPlaceholderSubtext}>
            In a real app, this would be a map showing the route
          </Text>
        </View>
        
        <View style={styles.destinationInfo}>
          <View style={styles.locationContainer}>
            <View style={styles.locationDot} />
            <Text style={styles.locationText}>
              {currentLocation ? currentLocation.address : 'Current Location'}
            </Text>
          </View>
          
          <View style={styles.locationLine} />
          
          <View style={styles.locationContainer}>
            <View style={[styles.locationDot, styles.destinationDot]} />
            <View style={styles.destinationDetails}>
              <Text style={styles.locationText}>
                {destination ? destination.address : 'Destination'}
              </Text>
              <Text style={styles.customerInfo}>
                {customerName} • {emergencyType}
              </Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Available Routes</Text>
        
        {routes.map(route => (
          <TouchableOpacity 
            key={route.id}
            style={[
              styles.routeItem,
              selectedRoute && selectedRoute.id === route.id && styles.selectedRouteItem
            ]}
            onPress={() => setSelectedRoute(route)}
          >
            <View style={styles.routeHeader}>
              <Text style={styles.routeName}>{route.name}</Text>
              {route.isRecommended && (
                <View style={styles.recommendedBadge}>
                  <Text style={styles.recommendedText}>Recommended</Text>
                </View>
              )}
            </View>
            
            <View style={styles.routeDetails}>
              <View style={styles.routeDetail}>
                <Icon name="map-marker-distance" size={16} color={COLORS.primary} />
                <Text style={styles.routeDetailText}>{route.distance}</Text>
              </View>
              
              <View style={styles.routeDetail}>
                <Icon name="clock-outline" size={16} color={COLORS.primary} />
                <Text style={styles.routeDetailText}>{route.duration}</Text>
              </View>
              
              <View style={styles.routeDetail}>
                <Icon name="car" size={16} color={getTrafficLevelColor(route.trafficLevel)} />
                <Text 
                  style={[
                    styles.routeDetailText, 
                    { color: getTrafficLevelColor(route.trafficLevel) }
                  ]}
                >
                  {route.trafficLevel} Traffic
                </Text>
              </View>
            </View>
            
            <Text style={styles.routeDescription}>{route.description}</Text>
          </TouchableOpacity>
        ))}
        
        <View style={styles.navigationActions}>
          {isNavigating ? (
            <Button 
              title="Stop Navigation" 
              onPress={handleStopNavigation}
              style={styles.stopButton}
            />
          ) : (
            <Button 
              title="Start Navigation" 
              onPress={handleStartNavigation}
              style={styles.startButton}
            />
          )}
        </View>
        
        <View style={styles.additionalActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleCallCustomer}
          >
            <Icon name="phone" size={24} color={COLORS.white} />
            <Text style={styles.actionButtonText}>Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleShareETA}
          >
            <Icon name="clock-outline" size={24} color={COLORS.white} />
            <Text style={styles.actionButtonText}>Share ETA</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('RequestDetails', { requestId: '1' })}
          >
            <Icon name="information-outline" size={24} color={COLORS.white} />
            <Text style={styles.actionButtonText}>Details</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.etaContainer}>
          <Text style={styles.etaLabel}>Estimated Time of Arrival</Text>
          <Text style={styles.etaTime}>
            {selectedRoute ? selectedRoute.duration : 'Calculating...'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    ...FONTS.h3,
    marginTop: 8,
  },
  mapPlaceholderSubtext: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  destinationInfo: {
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    marginRight: 12,
  },
  destinationDot: {
    backgroundColor: COLORS.error,
  },
  locationText: {
    ...FONTS.body4,
  },
  locationLine: {
    width: 2,
    height: 30,
    backgroundColor: COLORS.lightGray,
    marginLeft: 6,
  },
  destinationDetails: {
    flex: 1,
  },
  customerInfo: {
    ...FONTS.body5,
    color: COLORS.darkGray,
    marginTop: 4,
  },
  sectionTitle: {
    ...FONTS.h4,
    padding: SIZES.padding,
    paddingBottom: 0,
  },
  routeItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: 16,
    margin: SIZES.padding,
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  selectedRouteItem: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightGray + '20', // 20% opacity
  },
  routeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeName: {
    ...FONTS.h4,
  },
  recommendedBadge: {
    backgroundColor: COLORS.primary + '20', // 20% opacity
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  recommendedText: {
    ...FONTS.body5,
    color: COLORS.primary,
  },
  routeDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  routeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  routeDetailText: {
    ...FONTS.body5,
    marginLeft: 4,
  },
  routeDescription: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  navigationActions: {
    padding: SIZES.padding,
  },
  startButton: {
    backgroundColor: COLORS.success,
  },
  stopButton: {
    backgroundColor: COLORS.error,
  },
  additionalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    ...FONTS.body5,
    color: COLORS.white,
    marginTop: 4,
  },
  etaContainer: {
    backgroundColor: COLORS.lightGray,
    padding: SIZES.padding,
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  etaLabel: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  etaTime: {
    ...FONTS.h3,
    color: COLORS.primary,
  },
});

export default RouteOptimization;
