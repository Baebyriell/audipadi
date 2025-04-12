import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import Dashboard from '../screens/service-provider/Dashboard';
import ServiceManagement from '../screens/service-provider/ServiceManagement';
import Appointments from '../screens/service-provider/Appointments';
import CustomerManagement from '../screens/service-provider/CustomerManagement';
import CustomerDetails from '../screens/service-provider/CustomerDetails';
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
      <Stack.Screen name="DashboardScreen" component={Dashboard} />
      <Stack.Screen name="Appointments" component={Appointments} />
      <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

// Services Stack
const ServicesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ServiceManagementScreen" component={ServiceManagement} />
    </Stack.Navigator>
  );
};

// Appointments Stack
const AppointmentsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AppointmentsScreen" component={Appointments} />
      <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

// Customers Stack
const CustomersStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CustomerManagementScreen" component={CustomerManagement} />
      <Stack.Screen name="CustomerDetails" component={CustomerDetails} />
      <Stack.Screen name="Chat" component={ChatScreen} />
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
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
    </Stack.Navigator>
  );
};

const ProviderNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
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
          } else if (route.name === 'Services') {
            iconName = focused ? 'tools' : 'tools';
          } else if (route.name === 'Appointments') {
            iconName = focused ? 'calendar-check' : 'calendar-check-outline';
          } else if (route.name === 'Customers') {
            iconName = focused ? 'account-group' : 'account-group-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardStack} />
      <Tab.Screen name="Services" component={ServicesStack} />
      <Tab.Screen name="Appointments" component={AppointmentsStack} />
      <Tab.Screen name="Customers" component={CustomersStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default ProviderNavigator;
