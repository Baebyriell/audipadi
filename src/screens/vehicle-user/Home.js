import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { LocationContext } from '../../contexts/LocationContext';
import { AuthContext } from '../../contexts/AuthContext';
import Header from '../../components/common/Header';
import SearchBar from '../../components/common/SearchBar';
import ServiceCard from '../../components/vehicle-user/ServiceCard';
import EmergencyButton from '../../components/common/EmergencyButton';

// Mock data
import { services, emergencyServices } from '../../utils/mockData';

const Home = ({ navigation }) => {
  const { location, locationPermission } = useContext(LocationContext);
  const { userToken, signOut } = useContext(AuthContext);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredServices, setFeaturedServices] = useState([]);
  const [nearbyServices, setNearbyServices] = useState([]);
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    // Filter featured services
    const featured = services.filter(service => service.isFeatured);
    setFeaturedServices(featured);
    
    // Get nearby services (all services for demo)
    setNearbyServices(services);
    
    // Extract unique categories
    const uniqueCategories = [...new Set(services.map(service => service.category))];
    setCategories(uniqueCategories);
  }, []);
  
  const handleSearch = (query) => {
    // In a real app, this would trigger an API call or filter local data
    console.log('Searching for:', query);
    navigation.navigate('Search', { query });
  };
  
  const handleServicePress = (service) => {
    navigation.navigate('ServiceDetails', { service });
  };
  
  const handleCategoryPress = (category) => {
    navigation.navigate('Search', { category });
  };
  
  const handleEmergencyPress = () => {
    navigation.navigate('Emergency');
  };
  
  const renderCategoryItem = ({ item }) => {
    // Get icon based on category
    const getCategoryIcon = (category) => {
      switch (category.toLowerCase()) {
        case 'mechanic':
          return 'car-wrench';
        case 'towing':
          return 'tow-truck';
        case 'tire':
          return 'tire';
        case 'battery':
          return 'car-battery';
        case 'oil change':
          return 'oil';
        case 'car wash':
          return 'car-wash';
        default:
          return 'car-cog';
      }
    };
    
    return (
      <TouchableOpacity
        style={styles.categoryItem}
        onPress={() => handleCategoryPress(item)}
      >
        <View style={styles.categoryIconContainer}>
          <Image
            source={require('../../assets/icon.png')}
            style={styles.categoryIcon}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.categoryName}>{item}</Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      <Header
        title="AudiPadi"
        rightIcon="bell"
        onRightPress={() => navigation.navigate('Notifications')}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search for services..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmit={handleSearch}
            showFilterIcon={true}
            onFilterPress={() => navigation.navigate('Search', { showFilters: true })}
          />
        </View>
        
        {/* Emergency Services Button */}
        <View style={styles.emergencyContainer}>
          <EmergencyButton
            onPress={handleEmergencyPress}
            size="medium"
            label="Emergency Assistance"
          />
        </View>
        
        {/* Categories */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>
        
        {/* Featured Services */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Services</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search', { featured: true })}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {featuredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onPress={() => handleServicePress(service)}
            />
          ))}
        </View>
        
        {/* Nearby Services */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Services</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search', { nearby: true })}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {nearbyServices.slice(0, 3).map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onPress={() => handleServicePress(service)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  searchContainer: {
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  emergencyContainer: {
    alignItems: 'center',
    paddingVertical: SIZES.padding,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  sectionContainer: {
    marginTop: SIZES.padding,
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.black,
  },
  seeAllText: {
    ...FONTS.body4,
    color: COLORS.primary,
  },
  categoriesList: {
    paddingVertical: SIZES.base,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: SIZES.padding * 1.5,
    width: 80,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  categoryIcon: {
    width: 30,
    height: 30,
  },
  categoryName: {
    ...FONTS.body4,
    textAlign: 'center',
  },
});

export default Home;
