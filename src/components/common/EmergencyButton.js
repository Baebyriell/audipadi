import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Easing,
  Alert
} from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EmergencyButton = ({ 
  onPress, 
  style, 
  size = 'large',
  label = 'Emergency',
  confirmBeforeAction = true,
  disabled = false
}) => {
  const [animation] = useState(new Animated.Value(1));
  const [isPressed, setIsPressed] = useState(false);
  
  // Pulsating animation
  useEffect(() => {
    const pulsate = Animated.sequence([
      Animated.timing(animation, {
        toValue: 1.1,
        duration: 800,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: 800,
        easing: Easing.ease,
        useNativeDriver: true,
      })
    ]);
    
    const animationLoop = Animated.loop(pulsate);
    
    if (!isPressed && !disabled) {
      animationLoop.start();
    } else {
      animation.setValue(1);
      animationLoop.stop();
    }
    
    return () => {
      animationLoop.stop();
    };
  }, [animation, isPressed, disabled]);
  
  const handlePress = () => {
    if (disabled) return;
    
    setIsPressed(true);
    
    if (confirmBeforeAction) {
      Alert.alert(
        'Emergency Assistance',
        'Are you sure you want to request emergency assistance?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => setIsPressed(false)
          },
          {
            text: 'Yes, I Need Help',
            style: 'destructive',
            onPress: () => {
              if (onPress) onPress();
            }
          }
        ]
      );
    } else {
      if (onPress) onPress();
    }
  };
  
  const buttonSize = size === 'large' ? 80 : size === 'medium' ? 60 : 40;
  const iconSize = size === 'large' ? 40 : size === 'medium' ? 30 : 20;
  
  const buttonStyles = [
    styles.button,
    { width: buttonSize, height: buttonSize, borderRadius: buttonSize / 2 },
    disabled && styles.disabledButton,
    style
  ];
  
  const animatedStyle = {
    transform: [{ scale: animation }]
  };
  
  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        <TouchableOpacity
          style={buttonStyles}
          onPress={handlePress}
          activeOpacity={0.7}
          disabled={disabled}
        >
          <Icon name="ambulance" size={iconSize} color={COLORS.white} />
        </TouchableOpacity>
      </Animated.View>
      
      {label && (
        <Text style={[
          styles.label,
          disabled && styles.disabledLabel
        ]}>
          {label}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.emergencyRed || COLORS.error,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: COLORS.mediumGray,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  label: {
    ...FONTS.body4,
    color: COLORS.emergencyRed || COLORS.error,
    marginTop: 8,
    fontWeight: 'bold',
  },
  disabledLabel: {
    color: COLORS.darkGray,
  },
});

export default EmergencyButton;
