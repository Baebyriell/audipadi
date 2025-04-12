import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  // Primary colors
  primary: '#4A6BFF',
  secondary: '#FF6B4A',
  
  // Status colors
  success: '#28A745',
  error: '#DC3545',
  warning: '#FFC107',
  info: '#17A2B8',
  
  // UI colors
  background: '#F9F9F9',
  card: '#FFFFFF',
  text: '#333333',
  textLight: '#777777',
  border: '#DDDDDD',
  
  // Grayscale
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  mediumGray: '#DDDDDD',
  darkGray: '#777777',
  black: '#333333',
  
  // Special colors
  emergencyRed: '#FF3B30',
  transparent: 'transparent',
};

export const SIZES = {
  // Global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 16,
  margin: 16,
  
  // Font sizes
  h1: 30,
  h2: 24,
  h3: 18,
  h4: 16,
  body1: 16,
  body2: 14,
  body3: 12,
  body4: 10,
  
  // App dimensions
  width,
  height,
};

export const FONTS = {
  h1: {
    fontFamily: 'System',
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  h2: {
    fontFamily: 'System',
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  h3: {
    fontFamily: 'System',
    fontSize: SIZES.h3,
    fontWeight: '600',
    color: COLORS.black,
  },
  h4: {
    fontFamily: 'System',
    fontSize: SIZES.h4,
    fontWeight: '600',
    color: COLORS.black,
  },
  body1: {
    fontFamily: 'System',
    fontSize: SIZES.body1,
    color: COLORS.text,
  },
  body2: {
    fontFamily: 'System',
    fontSize: SIZES.body2,
    color: COLORS.text,
  },
  body3: {
    fontFamily: 'System',
    fontSize: SIZES.body3,
    color: COLORS.text,
  },
  body4: {
    fontFamily: 'System',
    fontSize: SIZES.body4,
    color: COLORS.textLight,
  },
  body5: {
    fontFamily: 'System',
    fontSize: SIZES.body4,
    color: COLORS.textLight,
  },
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 6,
  },
};

const appTheme = { COLORS, SIZES, FONTS, SHADOWS };

export default appTheme;
