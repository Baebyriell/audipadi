import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import Button from '../../components/common/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UserTypeSelection = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState(null);

  const userTypes = [
    {
      id: 'vehicle-user',
      title: 'Vehicle Owner',
      description: 'Find and book auto services, access emergency assistance, and manage your vehicle maintenance.',
      icon: 'car',
    },
    {
      id: 'service-provider',
      title: 'Service Provider',
      description: 'Manage your auto service business, handle appointments, and connect with customers.',
      icon: 'tools',
    },
    {
      id: 'emergency-service',
      title: 'Emergency Service',
      description: 'Provide roadside assistance, towing services, and emergency support to vehicle owners.',
      icon: 'ambulance',
    },
  ];

  const handleContinue = () => {
    if (selectedType) {
      navigation.navigate('Login', { userType: selectedType });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image 
            source={require('../../assets/icon.png')} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Welcome to AudiPadi</Text>
          <Text style={styles.subtitle}>Select your user type to continue</Text>
        </View>

        <View style={styles.userTypesContainer}>
          {userTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.userTypeCard,
                selectedType === type.id && styles.selectedCard,
              ]}
              onPress={() => setSelectedType(type.id)}
              activeOpacity={0.8}
            >
              <View style={[
                styles.iconContainer,
                selectedType === type.id && styles.selectedIconContainer,
              ]}>
                <Icon 
                  name={type.icon} 
                  size={32} 
                  color={selectedType === type.id ? COLORS.white : COLORS.primary} 
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.userTypeTitle}>{type.title}</Text>
                <Text style={styles.userTypeDescription}>{type.description}</Text>
              </View>
              <View style={styles.radioContainer}>
                <View style={[
                  styles.radioOuter,
                  selectedType === type.id && styles.selectedRadioOuter,
                ]}>
                  {selectedType === type.id && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title="Continue" 
          onPress={handleContinue} 
          disabled={!selectedType}
          style={styles.continueButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: SIZES.padding * 2,
  },
  header: {
    alignItems: 'center',
    marginBottom: SIZES.padding * 2,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: SIZES.padding,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.black,
    marginBottom: SIZES.base,
    textAlign: 'center',
  },
  subtitle: {
    ...FONTS.body3,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginBottom: SIZES.padding,
  },
  userTypesContainer: {
    marginBottom: SIZES.padding * 2,
  },
  userTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedCard: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  selectedIconContainer: {
    backgroundColor: COLORS.primary,
  },
  textContainer: {
    flex: 1,
  },
  userTypeTitle: {
    ...FONTS.h3,
    marginBottom: SIZES.base / 2,
  },
  userTypeDescription: {
    ...FONTS.body4,
    color: COLORS.darkGray,
  },
  radioContainer: {
    marginLeft: SIZES.padding,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.mediumGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadioOuter: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  footer: {
    padding: SIZES.padding * 2,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  continueButton: {
    width: '100%',
  },
});

export default UserTypeSelection;
