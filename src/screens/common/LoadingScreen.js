import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Image } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

const LoadingScreen = ({ message = 'Loading...' }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/icon.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color={COLORS.primary} style={styles.spinner} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  spinner: {
    marginBottom: 20,
  },
  message: {
    ...FONTS.body3,
    color: COLORS.darkGray,
    textAlign: 'center',
  },
});

export default LoadingScreen;
