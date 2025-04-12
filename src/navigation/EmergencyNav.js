import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import EmergencyDashboard from '../screens/emergency/EmergencyDashboard';
import RouteOptimization from '../screens/emergency/RouteOptimization';
import ProfileScreen from '../screens/common/ProfileScreen';
import NotificationsScreen from '../screens/common/NotificationsScreen';
import ChatScreen from '../screens/common/ChatScreen';

// Theme
import { COLORS } from '../constants/theme';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Dashboard Stack
const DashboardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="EmergencyDashboardScreen" component={EmergencyDashboard} />
      <Stack.Screen name="RouteOptimization" component={RouteOptimization} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

// Routes Stack
const RoutesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="RouteOptimizationScreen" component={RouteOptimization} />
    </Stack.Navigator>
  );
};

// Notifications Stack
const NotificationsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
    </Stack.Navigator>
  );
};

// Profile Stack
const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const EmergencyNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.emergencyRed,
        tabBarInactiveTintColor: COLORS.darkGray,
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
          } else if (route.name === 'Routes') {
            iconName = focused ? 'map-marker-path' : 'map-marker-path';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'bell' : 'bell-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      <Tab.Screen name="Routes" component={RoutesStack} />
      <Tab.Screen name="Notifications" component={NotificationsStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default EmergencyNavigator;
