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

const Register = ({ navigation, route }) => {
  const { userType } = route.params || { userType: 'vehicle-user' };
  const { signUp } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  
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

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    
    // Clear error when user types
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    // Validate full name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    // Validate email
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Validate phone
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (validate()) {
      setLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // For demo purposes, registration always succeeds
        const token = 'demo-token-' + Date.now();
        signUp(token, userType);
        
        // In a real app, you would navigate to a verification screen or login
        // navigation.navigate('VerifyEmail', { email: formData.email });
      } catch (error) {
        Alert.alert('Registration Failed', error.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={`${getUserTypeTitle()} Registration`}
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
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChangeText={(value) => handleChange('fullName', value)}
              icon="account"
              error={errors.fullName}
              touched={true}
            />
            
            <Input
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(value) => handleChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              icon="email"
              error={errors.email}
              touched={true}
            />
            
            <Input
              label="Phone Number"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChangeText={(value) => handleChange('phone', value)}
              keyboardType="phone-pad"
              icon="phone"
              error={errors.phone}
              touched={true}
            />
            
            <Input
              label="Password"
              placeholder="Create a password"
              value={formData.password}
              onChangeText={(value) => handleChange('password', value)}
              secureTextEntry
              icon="lock"
              error={errors.password}
              touched={true}
            />
            
            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange('confirmPassword', value)}
              secureTextEntry
              icon="lock-check"
              error={errors.confirmPassword}
              touched={true}
            />
            
            <Button
              title="Register"
              onPress={handleRegister}
              loading={loading}
              style={styles.registerButton}
            />
          </View>
          
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login', { userType })}
            >
              <Text style={styles.loginLink}>Login</Text>
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
    marginVertical: SIZES.padding,
  },
  logo: {
    width: 80,
    height: 80,
  },
  formContainer: {
    marginBottom: SIZES.padding,
  },
  registerButton: {
    marginTop: SIZES.padding,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.padding,
    marginBottom: SIZES.padding * 2,
  },
  loginText: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    marginRight: 5,
  },
  loginLink: {
    ...FONTS.body4,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default Register;
