import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch, Alert } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation, route }) => {
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Mock user data - in a real app, this would come from a user context or API
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+233 50 123 4567',
    profileImage: null, // In a real app, this would be a URI
    userType: 'vehicle', // 'vehicle', 'provider', or 'emergency'
    memberSince: 'January 2023',
    vehicles: [
      { id: '1', name: 'Toyota Camry', year: '2019', color: 'Black' },
      { id: '2', name: 'Honda Civic', year: '2020', color: 'Silver' },
    ]
  };

  const menuItems = [
    { 
      id: 'personal',
      title: 'Personal Information',
      icon: 'account-outline',
      onPress: () => navigation.navigate('EditProfile')
    },
    { 
      id: 'vehicles',
      title: 'My Vehicles',
      icon: 'car-outline',
      onPress: () => navigation.navigate('MyVehicles'),
      showIf: user.userType === 'vehicle'
    },
    { 
      id: 'payment',
      title: 'Payment Methods',
      icon: 'credit-card-outline',
      onPress: () => navigation.navigate('PaymentMethods')
    },
    { 
      id: 'notifications',
      title: 'Notifications',
      icon: 'bell-outline',
      onPress: () => navigation.navigate('NotificationSettings')
    },
    { 
      id: 'security',
      title: 'Security',
      icon: 'shield-account-outline',
      onPress: () => navigation.navigate('SecuritySettings')
    },
    { 
      id: 'help',
      title: 'Help & Support',
      icon: 'help-circle-outline',
      onPress: () => navigation.navigate('HelpSupport')
    },
    { 
      id: 'about',
      title: 'About',
      icon: 'information-outline',
      onPress: () => navigation.navigate('About')
    },
  ];

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              // Clear user session
              await AsyncStorage.removeItem('userToken');
              await AsyncStorage.removeItem('userType');
              
              // Navigate to auth screen
              navigation.reset({
                index: 0,
                routes: [{ name: 'UserTypeSelection' }],
              });
            } catch (error) {
              console.log('Error logging out: ', error);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Profile" 
        rightIcon="settings-outline"
        onRightPress={() => navigation.navigate('Settings')}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            {user.profileImage ? (
              <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileInitials}>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
            )}
            <TouchableOpacity style={styles.editImageButton}>
              <Icon name="camera" size={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <Text style={styles.userType}>
            {user.userType === 'vehicle' ? 'Vehicle Owner' : 
             user.userType === 'provider' ? 'Service Provider' : 'Emergency Service'}
          </Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Services</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>Jan 2023</Text>
              <Text style={styles.statLabel}>Member Since</Text>
            </View>
          </View>
        </View>
        
        {user.userType === 'vehicle' && (
          <View style={styles.vehiclesSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>My Vehicles</Text>
              <TouchableOpacity onPress={() => navigation.navigate('MyVehicles')}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            
            {user.vehicles.map(vehicle => (
              <View key={vehicle.id} style={styles.vehicleItem}>
                <Icon name="car" size={24} color={COLORS.primary} />
                <View style={styles.vehicleInfo}>
                  <Text style={styles.vehicleName}>{vehicle.name}</Text>
                  <Text style={styles.vehicleDetails}>{vehicle.year} • {vehicle.color}</Text>
                </View>
                <TouchableOpacity style={styles.vehicleEditButton}>
                  <Icon name="pencil" size={20} color={COLORS.darkGray} />
                </TouchableOpacity>
              </View>
            ))}
            
            <Button 
              title="Add Vehicle" 
              onPress={() => navigation.navigate('AddVehicle')}
              type="secondary"
              style={styles.addVehicleButton}
            />
          </View>
        )}
        
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.settingItem}>
            <Icon name="bell-outline" size={24} color={COLORS.darkGray} />
            <Text style={styles.settingText}>Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Icon name="map-marker-outline" size={24} color={COLORS.darkGray} />
            <Text style={styles.settingText}>Location Services</Text>
            <Switch
              value={locationServices}
              onValueChange={setLocationServices}
              trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
          
          <View style={styles.settingItem}>
            <Icon name="theme-light-dark" size={24} color={COLORS.darkGray} />
            <Text style={styles.settingText}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
        </View>
        
        <View style={styles.menuSection}>
          {menuItems
            .filter(item => item.showIf === undefined || item.showIf)
            .map(item => (
              <TouchableOpacity 
                key={item.id}
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <Icon name={item.icon} size={24} color={COLORS.darkGray} />
                <Text style={styles.menuItemText}>{item.title}</Text>
                <Icon name="chevron-right" size={24} color={COLORS.darkGray} />
              </TouchableOpacity>
            ))
          }
        </View>
        
        <Button 
          title="Logout" 
          onPress={handleLogout}
          type="secondary"
          style={styles.logoutButton}
        />
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
  profileHeader: {
    alignItems: 'center',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    ...FONTS.h2,
    color: COLORS.white,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.secondary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  userName: {
    ...FONTS.h3,
    marginBottom: 4,
  },
  userEmail: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  userType: {
    ...FONTS.body5,
    color: COLORS.primary,
    backgroundColor: COLORS.lightGray,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...FONTS.h3,
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: COLORS.lightGray,
  },
  vehiclesSection: {
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    ...FONTS.h4,
  },
  seeAllText: {
    ...FONTS.body5,
    color: COLORS.primary,
  },
  vehicleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  vehicleInfo: {
    flex: 1,
    marginLeft: 12,
  },
  vehicleName: {
    ...FONTS.body4,
    marginBottom: 4,
  },
  vehicleDetails: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  vehicleEditButton: {
    padding: 8,
  },
  addVehicleButton: {
    marginTop: 16,
  },
  settingsSection: {
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  settingText: {
    ...FONTS.body4,
    flex: 1,
    marginLeft: 12,
  },
  menuSection: {
    padding: SIZES.padding,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  menuItemText: {
    ...FONTS.body4,
    flex: 1,
    marginLeft: 12,
  },
  logoutButton: {
    margin: SIZES.padding,
    marginBottom: 30,
  },
});

export default ProfileScreen;
