import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Auth Context
import { AuthContext } from '../contexts/AuthContext';

// Auth Screens
import UserTypeSelection from '../screens/auth/UserTypeSelection';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';

// User Type Navigators
import VehicleUserNavigator from './VehicleUserNav';
import ProviderNavigator from './ProviderNav';
import EmergencyNavigator from './EmergencyNav';

// Loading Screen
import LoadingScreen from '../screens/common/LoadingScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { isLoading, userToken, userType } = useContext(AuthContext);

  if (isLoading) {
    // We haven't finished checking for the token yet
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken == null ? (
        // No token found, user isn't signed in
        <Stack.Group>
          <Stack.Screen name="UserTypeSelection" component={UserTypeSelection} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Group>
      ) : (
        // User is signed in, show appropriate navigator based on user type
        <>
          {userType === 'vehicle-user' && (
            <Stack.Screen name="VehicleUserApp" component={VehicleUserNavigator} />
          )}
          
          {userType === 'service-provider' && (
            <Stack.Screen name="ProviderApp" component={ProviderNavigator} />
          )}
          
          {userType === 'emergency-service' && (
            <Stack.Screen name="EmergencyApp" component={EmergencyNavigator} />
          )}
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
