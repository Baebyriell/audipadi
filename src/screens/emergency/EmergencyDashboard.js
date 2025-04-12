import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EmergencyDashboard = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('active');
  const [location, setLocation] = useState(null);
  
  // In a real app, this would use the device's location
  useEffect(() => {
    // Mock location data
    setLocation({
      latitude: 6.6745,
      longitude: -1.5716,
      address: 'Kumasi, Ghana'
    });
  }, []);
  
  // Mock data for emergency requests
  const emergencyRequests = [
    {
      id: '1',
      customerName: 'John Doe',
      vehicleInfo: 'Toyota Camry (2019)',
      emergencyType: 'Towing',
      status: 'Active',
      location: {
        address: '123 Main Street, Kumasi, Ghana',
        distance: '3.2 km',
        coordinates: {
          latitude: 6.6845,
          longitude: -1.5816,
        }
      },
      time: '10 minutes ago',
      phone: '+233 50 123 4567',
      description: 'Car broke down and won't start. Need towing service urgently.',
    },
    {
      id: '2',
      customerName: 'Sarah Johnson',
      vehicleInfo: 'Honda Civic (2020)',
      emergencyType: 'Battery Jump',
      status: 'Active',
      location: {
        address: '456 Oak Street, Kumasi, Ghana',
        distance: '5.7 km',
        coordinates: {
          latitude: 6.6945,
          longitude: -1.5616,
        }
      },
      time: '15 minutes ago',
      phone: '+233 50 987 6543',
      description: 'Battery died while parked. Need jump start assistance.',
    },
    {
      id: '3',
      customerName: 'Michael Brown',
      vehicleInfo: 'Ford Focus (2018)',
      emergencyType: 'Flat Tire',
      status: 'En Route',
      location: {
        address: '789 Pine Avenue, Kumasi, Ghana',
        distance: '2.1 km',
        coordinates: {
          latitude: 6.6645,
          longitude: -1.5516,
        }
      },
      time: '25 minutes ago',
      phone: '+233 50 456 7890',
      description: 'Got a flat tire on the highway. Need assistance changing it.',
      responder: 'David K.',
      eta: '5 minutes',
    },
    {
      id: '4',
      customerName: 'Emily Wilson',
      vehicleInfo: 'Nissan Altima (2017)',
      emergencyType: 'Lockout',
      status: 'Completed',
      location: {
        address: '321 Maple Road, Kumasi, Ghana',
        distance: '4.3 km',
        coordinates: {
          latitude: 6.6545,
          longitude: -1.5916,
        }
      },
      time: '1 hour ago',
      phone: '+233 50 234 5678',
      description: 'Locked keys in car. Need help getting back in.',
      responder: 'James T.',
      completionTime: '20 minutes',
    },
    {
      id: '5',
      customerName: 'David Lee',
      vehicleInfo: 'Hyundai Sonata (2021)',
      emergencyType: 'Fuel Delivery',
      status: 'Completed',
      location: {
        address: '654 Elm Street, Kumasi, Ghana',
        distance: '6.8 km',
        coordinates: {
          latitude: 6.7045,
          longitude: -1.5416,
        }
      },
      time: '2 hours ago',
      phone: '+233 50 345 6789',
      description: 'Ran out of fuel. Need emergency fuel delivery.',
      responder: 'Samuel O.',
      completionTime: '35 minutes',
    },
  ];

  const getFilteredRequests = () => {
    switch (activeTab) {
      case 'active':
        return emergencyRequests.filter(request => 
          request.status === 'Active' || request.status === 'En Route'
        );
      case 'completed':
        return emergencyRequests.filter(request => 
          request.status === 'Completed'
        );
      case 'all':
        return emergencyRequests;
      default:
        return emergencyRequests;
    }
  };

  const handleAcceptRequest = (requestId) => {
    Alert.alert(
      'Accept Request',
      'Are you sure you want to accept this emergency request?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Accept',
          onPress: () => {
            // In a real app, this would update the request status in the database
            Alert.alert(
              'Request Accepted',
              'You have accepted the emergency request. Please proceed to the location.',
              [{ text: 'OK' }]
            );
          }
        }
      ]
    );
  };

  const handleCallCustomer = (phone) => {
    // In a real app, this would initiate a phone call
    Alert.alert(
      'Call Customer',
      `Calling ${phone}`,
      [{ text: 'OK' }]
    );
  };

  const handleViewRoute = (request) => {
    // In a real app, this would open the map with directions
    navigation.navigate('RouteOptimization', { 
      destination: request.location.coordinates,
      customerName: request.customerName,
      emergencyType: request.emergencyType
    });
  };

  const handleCompleteRequest = (requestId) => {
    Alert.alert(
      'Complete Request',
      'Has this emergency request been successfully resolved?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Complete',
          onPress: () => {
            // In a real app, this would update the request status in the database
            Alert.alert(
              'Request Completed',
              'The emergency request has been marked as completed.',
              [{ text: 'OK' }]
            );
          }
        }
      ]
    );
  };

  const renderRequestItem = ({ item }) => {
    const isActive = item.status === 'Active';
    const isEnRoute = item.status === 'En Route';
    const isCompleted = item.status === 'Completed';
    
    return (
      <View style={styles.requestItem}>
        <View style={styles.requestHeader}>
          <View 
            style={[
              styles.statusBadge,
              isActive ? styles.activeBadge : 
              isEnRoute ? styles.enRouteBadge : 
              styles.completedBadge
            ]}
          >
            <Text 
              style={[
                styles.statusText,
                isActive ? styles.activeText : 
                isEnRoute ? styles.enRouteText : 
                styles.completedText
              ]}
            >
              {item.status}
            </Text>
          </View>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{item.customerName}</Text>
          <Text style={styles.vehicleInfo}>{item.vehicleInfo}</Text>
        </View>
        
        <View style={styles.emergencyTypeContainer}>
          <Icon 
            name={
              item.emergencyType === 'Towing' ? 'tow-truck' : 
              item.emergencyType === 'Battery Jump' ? 'car-battery' : 
              item.emergencyType === 'Flat Tire' ? 'tire' : 
              item.emergencyType === 'Lockout' ? 'car-door' : 
              'gas-station'
            } 
            size={20} 
            color={COLORS.primary} 
          />
          <Text style={styles.emergencyType}>{item.emergencyType}</Text>
        </View>
        
        <View style={styles.locationContainer}>
          <Icon name="map-marker" size={20} color={COLORS.primary} />
          <View style={styles.locationInfo}>
            <Text style={styles.locationAddress}>{item.location.address}</Text>
            <View style={styles.distanceContainer}>
              <Icon name="map-marker-distance" size={16} color={COLORS.darkGray} />
              <Text style={styles.distanceText}>{item.location.distance}</Text>
            </View>
          </View>
        </View>
        
        {item.description ? (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>Description:</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </View>
        ) : null}
        
        {isEnRoute && (
          <View style={styles.responderInfo}>
            <Text style={styles.responderLabel}>Responder:</Text>
            <Text style={styles.responderName}>{item.responder}</Text>
            <Text style={styles.etaText}>ETA: {item.eta}</Text>
          </View>
        )}
        
        {isCompleted && (
          <View style={styles.completionInfo}>
            <Text style={styles.responderLabel}>Responder:</Text>
            <Text style={styles.responderName}>{item.responder}</Text>
            <Text style={styles.completionText}>Resolved in {item.completionTime}</Text>
          </View>
        )}
        
        <View style={styles.actionButtons}>
          {isActive && (
            <Button 
              title="Accept Request" 
              onPress={() => handleAcceptRequest(item.id)}
              style={styles.acceptButton}
            />
          )}
          
          {isEnRoute && (
            <Button 
              title="Complete" 
              onPress={() => handleCompleteRequest(item.id)}
              style={styles.completeButton}
            />
          )}
          
          <View style={styles.secondaryActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleCallCustomer(item.phone)}
            >
              <Icon name="phone" size={20} color={COLORS.primary} />
              <Text style={styles.actionText}>Call</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleViewRoute(item)}
            >
              <Icon name="map-marker-path" size={20} color={COLORS.primary} />
              <Text style={styles.actionText}>View Route</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => navigation.navigate('RequestDetails', { requestId: item.id })}
            >
              <Icon name="information-outline" size={20} color={COLORS.primary} />
              <Text style={styles.actionText}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Emergency Dashboard" 
        leftIcon="menu"
        rightIcon="bell"
        onLeftPress={() => {}}
        onRightPress={() => navigation.navigate('Notifications')}
      />
      
      <View style={styles.statusContainer}>
        <View style={styles.statusCard}>
          <Text style={styles.statusValue}>Online</Text>
          <Text style={styles.statusLabel}>Status</Text>
          <TouchableOpacity style={styles.statusToggle}>
            <View style={styles.toggleTrack}>
              <View style={styles.toggleThumb} />
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.locationCard}>
          <Text style={styles.locationValue}>
            {location ? location.address : 'Detecting location...'}
          </Text>
          <Text style={styles.locationLabel}>Current Location</Text>
          <TouchableOpacity style={styles.refreshButton}>
            <Icon name="refresh" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>2</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>1</Text>
          <Text style={styles.statLabel}>En Route</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Today</Text>
        </View>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tabButton,
            activeTab === 'active' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('active')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'active' && styles.activeTabText
            ]}
          >
            Active
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tabButton,
            activeTab === 'completed' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('completed')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'completed' && styles.activeTabText
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tabButton,
            activeTab === 'all' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('all')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'all' && styles.activeTabText
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={getFilteredRequests()}
        renderItem={renderRequestItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="alert-circle-outline" size={60} color={COLORS.lightGray} />
            <Text style={styles.emptyText}>No emergency requests found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  statusContainer: {
    flexDirection: 'row',
    padding: SIZES.padding,
  },
  statusCard: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    padding: 12,
    marginRight: 8,
    position: 'relative',
  },
  statusValue: {
    ...FONTS.h4,
    color: COLORS.success,
  },
  statusLabel: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  statusToggle: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  toggleTrack: {
    width: 40,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.success,
    padding: 2,
  },
  toggleThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    alignSelf: 'flex-end',
  },
  locationCard: {
    flex: 2,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    padding: 12,
    marginLeft: 8,
    position: 'relative',
  },
  locationValue: {
    ...FONTS.body4,
    marginRight: 20,
  },
  locationLabel: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  refreshButton: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statValue: {
    ...FONTS.h3,
    color: COLORS.white,
    marginBottom: 4,
  },
  statLabel: {
    ...FONTS.body5,
    color: COLORS.white,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    ...FONTS.body4,
    color: COLORS.darkGray,
  },
  activeTabText: {
    ...FONTS.h4,
    color: COLORS.primary,
  },
  listContent: {
    padding: SIZES.padding,
  },
  requestItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: '#FFF3CD',
  },
  enRouteBadge: {
    backgroundColor: '#CCE5FF',
  },
  completedBadge: {
    backgroundColor: '#D4EDDA',
  },
  statusText: {
    ...FONTS.body5,
    fontWeight: 'bold',
  },
  activeText: {
    color: '#856404',
  },
  enRouteText: {
    color: '#004085',
  },
  completedText: {
    color: '#155724',
  },
  timeText: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  customerInfo: {
    marginBottom: 12,
  },
  customerName: {
    ...FONTS.h4,
    marginBottom: 4,
  },
  vehicleInfo: {
    ...FONTS.body4,
    color: COLORS.darkGray,
  },
  emergencyTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: SIZES.radius,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  emergencyType: {
    ...FONTS.body4,
    marginLeft: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  locationInfo: {
    flex: 1,
    marginLeft: 8,
  },
  locationAddress: {
    ...FONTS.body4,
    marginBottom: 4,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    ...FONTS.body5,
    color: COLORS.darkGray,
    marginLeft: 4,
  },
  descriptionContainer: {
    backgroundColor: COLORS.lightGray,
    padding: 12,
    borderRadius: SIZES.radius,
    marginBottom: 12,
  },
  descriptionLabel: {
    ...FONTS.body5,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  descriptionText: {
    ...FONTS.body5,
  },
  responderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CCE5FF',
    padding: 8,
    borderRadius: SIZES.radius,
    marginBottom: 12,
  },
  responderLabel: {
    ...FONTS.body5,
    fontWeight: 'bold',
    marginRight: 4,
  },
  responderName: {
    ...FONTS.body5,
    flex: 1,
  },
  etaText: {
    ...FONTS.body5,
    fontWeight: 'bold',
    color: '#004085',
  },
  completionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D4EDDA',
    padding: 8,
    borderRadius: SIZES.radius,
    marginBottom: 12,
  },
  completionText: {
    ...FONTS.body5,
    fontWeight: 'bold',
    color: '#155724',
  },
  actionButtons: {
    marginTop: 8,
  },
  acceptButton: {
    marginBottom: 12,
  },
  completeButton: {
    marginBottom: 12,
    backgroundColor: COLORS.success,
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    ...FONTS.body5,
    color: COLORS.primary,
    marginLeft: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    ...FONTS.body3,
    color: COLORS.darkGray,
    marginTop: 10,
  },
});

export default EmergencyDashboard;
