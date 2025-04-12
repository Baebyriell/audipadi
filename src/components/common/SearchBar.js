import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchBar = ({
  placeholder = 'Search...',
  value,
  onChangeText,
  onSubmit,
  onClear,
  autoFocus = false,
  style,
  inputStyle,
  iconColor = COLORS.darkGray,
  backgroundColor = COLORS.lightGray,
  borderColor,
  showFilterIcon = false,
  onFilterPress,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClear = () => {
    if (onChangeText) onChangeText('');
    if (onClear) onClear();
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (onSubmit) onSubmit(value);
  };

  return (
    <View 
      style={[
        styles.container,
        { backgroundColor },
        borderColor && { borderWidth: 1, borderColor },
        isFocused && styles.focusedContainer,
        style
      ]}
    >
      <Icon 
        name="magnify" 
        size={20} 
        color={iconColor} 
        style={styles.searchIcon} 
      />
      
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, inputStyle]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
        autoFocus={autoFocus}
        placeholderTextColor={COLORS.darkGray}
        {...rest}
      />
      
      {value && value.length > 0 && (
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={handleClear}
        >
          <Icon name="close" size={18} color={iconColor} />
        </TouchableOpacity>
      )}
      
      {showFilterIcon && (
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={onFilterPress}
        >
          <Icon name="filter-variant" size={20} color={iconColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderRadius: SIZES.radius,
    paddingHorizontal: 12,
    backgroundColor: COLORS.lightGray,
  },
  focusedContainer: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    ...FONTS.body4,
    flex: 1,
    height: '100%',
    color: COLORS.black,
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    padding: 4,
    marginLeft: 8,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.mediumGray,
    paddingLeft: 12,
  },
});

export default SearchBar;
