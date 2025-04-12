import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Linking
} from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { LocationContext } from '../../contexts/LocationContext';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Mock data
import { emergencyServices } from '../../utils/mockData';

const EmergencyServices = ({ navigation }) => {
  const { location } = useContext(LocationContext);
  const [services, setServices] = useState([]);
  
  useEffect(() => {
    // In a real app, this would fetch emergency services based on location
    setServices(emergencyServices);
  }, []);
  
  const handleCallService = (phone) => {
    Linking.openURL(`tel:${phone}`)
      .catch(err => {
        Alert.alert('Error', 'Could not open phone dialer');
      });
  };
  
  const handleRequestService = (service) => {
    Alert.alert(
      'Request Emergency Service',
      `Are you sure you want to request emergency assistance from ${service.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Request', 
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Request Sent',
              `Your emergency request has been sent to ${service.name}. They will contact you shortly.`
            );
          }
        },
      ]
    );
  };
  
  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceCard}>
      <View style={styles.serviceHeader}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFC107" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      
      <View style={styles.serviceDetails}>
        <View style={styles.detailItem}>
          <Icon name="map-marker" size={16} color={COLORS.primary} />
          <Text style={styles.detailText}>{item.distance}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Icon name="clock-outline" size={16} color={COLORS.primary} />
          <Text style={styles.detailText}>{item.responseTime}</Text>
        </View>
      </View>
      
      <View style={styles.servicesContainer}>
        {item.services.map((service, index) => (
          <View key={index} style={styles.serviceItem}>
            <Icon name="check-circle" size={14} color={COLORS.primary} />
            <Text style={styles.serviceItemText}>
              {service.name} - {service.price}
            </Text>
          </View>
        ))}
      </View>
      
      <View style={styles.actionsContainer}>
        <Button
          title="Request"
          icon="send"
          type="primary"
          size="small"
          onPress={() => handleRequestService(item)}
          style={styles.actionButton}
        />
        
        <Button
          title="Call"
          icon="phone"
          type="outline"
          size="small"
          onPress={() => handleCallService(item.phone)}
          style={styles.actionButton}
        />
        
        <Button
          title="Chat"
          icon="chat"
          type="outline"
          size="small"
          onPress={() => navigation.navigate('Chat', { service: item })}
          style={styles.actionButton}
        />
      </View>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Emergency Services"
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
      />
      
      <View style={styles.emergencyCallContainer}>
        <Text style={styles.emergencyCallText}>
          In case of severe emergency, call national emergency services directly:
        </Text>
        <TouchableOpacity
          style={styles.emergencyCallButton}
          onPress={() => handleCallService('911')}
        >
          <Icon name="phone" size={20} color={COLORS.white} />
          <Text style={styles.emergencyCallButtonText}>Call 911</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={services}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  emergencyCallContainer: {
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    alignItems: 'center',
  },
  emergencyCallText: {
    ...FONTS.body4,
    textAlign: 'center',
    marginBottom: SIZES.base,
  },
  emergencyCallButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.emergencyRed,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: SIZES.radius,
  },
  emergencyCallButtonText: {
    ...FONTS.body4,
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  listContainer: {
    padding: SIZES.padding,
  },
  serviceCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  serviceName: {
    ...FONTS.h3,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...FONTS.body4,
    marginLeft: 4,
  },
  serviceDetails: {
    flexDirection: 'row',
    marginBottom: SIZES.padding,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  detailText: {
    ...FONTS.body4,
    marginLeft: 4,
  },
  servicesContainer: {
    marginBottom: SIZES.padding,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  serviceItemText: {
    ...FONTS.body4,
    marginLeft: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default EmergencyServices;
