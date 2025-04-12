import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  multiline = false,
  numberOfLines = 1,
  icon,
  iconPosition = 'left',
  error,
  touched,
  onBlur,
  onFocus,
  editable = true,
  style,
  inputStyle,
  labelStyle,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  const containerStyles = [
    styles.container,
    isFocused && styles.focusedContainer,
    error && touched && styles.errorContainer,
    !editable && styles.disabledContainer,
    style,
  ];

  const inputStyles = [
    styles.input,
    icon && iconPosition === 'left' && { paddingLeft: 40 },
    icon && iconPosition === 'right' && { paddingRight: 40 },
    multiline && { textAlignVertical: 'top', height: numberOfLines * 20 },
    !editable && styles.disabledInput,
    inputStyle,
  ];

  const labelStyles = [
    styles.label,
    error && touched && styles.errorLabel,
    !editable && styles.disabledLabel,
    labelStyle,
  ];

  return (
    <View style={styles.wrapper}>
      {label && <Text style={labelStyles}>{label}</Text>}
      
      <View style={containerStyles}>
        {icon && iconPosition === 'left' && (
          <Icon 
            name={icon} 
            size={20} 
            color={
              error && touched 
                ? COLORS.error 
                : isFocused 
                  ? COLORS.primary 
                  : COLORS.darkGray
            } 
            style={styles.leftIcon} 
          />
        )}
        
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : undefined}
          style={inputStyles}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={editable}
          placeholderTextColor={COLORS.darkGray}
          {...rest}
        />
        
        {icon && iconPosition === 'right' && (
          <Icon 
            name={icon} 
            size={20} 
            color={
              error && touched 
                ? COLORS.error 
                : isFocused 
                  ? COLORS.primary 
                  : COLORS.darkGray
            } 
            style={styles.rightIcon} 
          />
        )}
      </View>
      
      {error && touched && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  container: {
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    position: 'relative',
  },
  focusedContainer: {
    borderColor: COLORS.primary,
  },
  errorContainer: {
    borderColor: COLORS.error,
  },
  disabledContainer: {
    backgroundColor: COLORS.lightGray,
    borderColor: COLORS.mediumGray,
  },
  input: {
    ...FONTS.body4,
    color: COLORS.black,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 50,
  },
  disabledInput: {
    color: COLORS.darkGray,
  },
  label: {
    ...FONTS.body4,
    marginBottom: 8,
    color: COLORS.black,
  },
  errorLabel: {
    color: COLORS.error,
  },
  disabledLabel: {
    color: COLORS.darkGray,
  },
  leftIcon: {
    position: 'absolute',
    left: 12,
    top: 15,
    zIndex: 1,
  },
  rightIcon: {
    position: 'absolute',
    right: 12,
    top: 15,
    zIndex: 1,
  },
  errorText: {
    ...FONTS.body5,
    color: COLORS.error,
    marginTop: 4,
  },
});

export default Input;
