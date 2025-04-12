import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  View 
} from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Button = ({
  title,
  onPress,
  type = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  style,
  textStyle,
  ...rest
}) => {
  // Button types
  const getButtonStyle = () => {
    switch (type) {
      case 'primary':
        return styles.primaryButton;
      case 'secondary':
        return styles.secondaryButton;
      case 'outline':
        return styles.outlineButton;
      case 'text':
        return styles.textButton;
      case 'danger':
        return styles.dangerButton;
      case 'success':
        return styles.successButton;
      default:
        return styles.primaryButton;
    }
  };

  // Button sizes
  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return styles.smallButton;
      case 'medium':
        return styles.mediumButton;
      case 'large':
        return styles.largeButton;
      default:
        return styles.mediumButton;
    }
  };

  // Text color based on button type
  const getTextStyle = () => {
    switch (type) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      case 'outline':
        return styles.outlineText;
      case 'text':
        return styles.textButtonText;
      case 'danger':
        return styles.dangerText;
      case 'success':
        return styles.successText;
      default:
        return styles.primaryText;
    }
  };

  // Icon size based on button size
  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 16;
      case 'medium':
        return 20;
      case 'large':
        return 24;
      default:
        return 20;
    }
  };

  // Icon color based on button type
  const getIconColor = () => {
    switch (type) {
      case 'primary':
        return COLORS.white;
      case 'secondary':
        return COLORS.primary;
      case 'outline':
        return COLORS.primary;
      case 'text':
        return COLORS.primary;
      case 'danger':
        return COLORS.white;
      case 'success':
        return COLORS.white;
      default:
        return COLORS.white;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        getButtonSize(),
        disabled && styles.disabledButton,
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={type === 'outline' || type === 'text' || type === 'secondary' ? COLORS.primary : COLORS.white} 
        />
      ) : (
        <View style={styles.contentContainer}>
          {icon && iconPosition === 'left' && (
            <Icon 
              name={icon} 
              size={getIconSize()} 
              color={getIconColor()} 
              style={styles.leftIcon} 
            />
          )}
          
          <Text 
            style={[
              styles.text, 
              getTextStyle(),
              disabled && styles.disabledText,
              textStyle
            ]}
          >
            {title}
          </Text>
          
          {icon && iconPosition === 'right' && (
            <Icon 
              name={icon} 
              size={getIconSize()} 
              color={getIconColor()} 
              style={styles.rightIcon} 
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...FONTS.body3,
    fontWeight: '600',
    textAlign: 'center',
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  
  // Button types
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderWidth: 0,
  },
  secondaryButton: {
    backgroundColor: COLORS.lightGray,
    borderWidth: 0,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  textButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  dangerButton: {
    backgroundColor: COLORS.error,
    borderWidth: 0,
  },
  successButton: {
    backgroundColor: COLORS.success,
    borderWidth: 0,
  },
  
  // Button sizes
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  
  // Text colors
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.primary,
  },
  outlineText: {
    color: COLORS.primary,
  },
  textButtonText: {
    color: COLORS.primary,
  },
  dangerText: {
    color: COLORS.white,
  },
  successText: {
    color: COLORS.white,
  },
  
  // Disabled state
  disabledButton: {
    opacity: 0.6,
  },
  disabledText: {
    color: COLORS.darkGray,
  },
});

export default Button;
