import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Header from '../../components/common/Header';
import { AuthContext } from '../../contexts/AuthContext';

const Login = ({ navigation, route }) => {
  const { userType } = route.params || { userType: 'vehicle-user' };
  const { signIn } = useContext(AuthContext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const getUserTypeTitle = () => {
    switch (userType) {
      case 'vehicle-user':
        return 'Vehicle Owner';
      case 'service-provider':
        return 'Service Provider';
      case 'emergency-service':
        return 'Emergency Service';
      default:
        return 'User';
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validate()) {
      setLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // For demo purposes, any credentials will work
        const token = 'demo-token-' + Date.now();
        signIn(token, userType);
      } catch (error) {
        Alert.alert('Login Failed', error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleForgotPassword = () => {
    // Navigate to forgot password screen or show modal
    Alert.alert(
      'Reset Password',
      'A password reset link will be sent to your email address.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Send Link',
          onPress: () => {
            if (email) {
              Alert.alert('Success', 'Password reset link has been sent to your email.');
            } else {
              Alert.alert('Error', 'Please enter your email address first.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={`${getUserTypeTitle()} Login`}
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.formContainer}>
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              icon="email"
              error={errors.email}
              touched={true}
            />
            
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              icon="lock"
              error={errors.password}
              touched={true}
            />
            
            <TouchableOpacity
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
            
            <Button
              title="Login"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />
          </View>
          
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register', { userType })}
            >
              <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: SIZES.padding * 2,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: SIZES.padding * 2,
  },
  logo: {
    width: 120,
    height: 120,
  },
  formContainer: {
    marginBottom: SIZES.padding * 2,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: SIZES.padding * 2,
  },
  forgotPasswordText: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
  loginButton: {
    marginTop: SIZES.padding,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.padding,
  },
  registerText: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    marginRight: 5,
  },
  registerLink: {
    ...FONTS.body4,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default Login;
