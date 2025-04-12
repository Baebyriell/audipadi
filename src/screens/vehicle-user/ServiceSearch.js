import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { MECHANICS, AUTO_PARTS } from '../../utils/mockData';
import Header from '../../components/common/Header';
import SearchBar from '../../components/common/SearchBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ServiceSearch = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('mechanics');
  const [selectedFilter, setSelectedFilter] = useState('distance');

  const categories = [
    { id: 'mechanics', name: 'Mechanics', icon: 'wrench' },
    { id: 'parts', name: 'Auto Parts', icon: 'car-cog' },
    { id: 'towing', name: 'Towing', icon: 'tow-truck' },
    { id: 'fuel', name: 'Fuel Delivery', icon: 'gas-station' },
  ];

  const filters = [
    { id: 'distance', name: 'Distance' },
    { id: 'rating', name: 'Rating' },
    { id: 'price', name: 'Price' },
  ];

  const getDataByCategory = () => {
    switch (selectedCategory) {
      case 'mechanics':
        return MECHANICS;
      case 'parts':
        return AUTO_PARTS;
      default:
        return [];
    }
  };

  const filteredData = getDataByCategory().filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (selectedFilter === 'distance') {
      return parseFloat(a.distance) - parseFloat(b.distance);
    } else if (selectedFilter === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategoryItem
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Icon 
        name={item.icon} 
        size={24} 
        color={selectedCategory === item.id ? COLORS.white : COLORS.primary} 
      />
      <Text 
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.selectedCategoryText
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderFilterItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.filterItem,
        selectedFilter === item.id && styles.selectedFilterItem
      ]}
      onPress={() => setSelectedFilter(item.id)}
    >
      <Text 
        style={[
          styles.filterText,
          selectedFilter === item.id && styles.selectedFilterText
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.serviceItem}
      onPress={() => navigation.navigate('ServiceDetails', { item })}
    >
      <View style={styles.serviceImagePlaceholder}>
        <Icon name="car-service" size={40} color={COLORS.primary} />
      </View>
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#FFC107" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <Text style={styles.serviceSpecialty}>{item.specialty}</Text>
        <View style={styles.serviceFooter}>
          <View style={styles.distanceContainer}>
            <Icon name="map-marker" size={14} color={COLORS.darkGray} />
            <Text style={styles.distanceText}>{item.distance}</Text>
          </View>
          <TouchableOpacity style={styles.callButton}>
            <Icon name="phone" size={14} color={COLORS.primary} />
            <Text style={styles.callText}>Call</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Find Services" 
        leftIcon="menu" 
        rightIcon="notifications"
        onLeftPress={() => {}}
        onRightPress={() => navigation.navigate('Notifications')}
      />
      
      <SearchBar 
        placeholder="Search for mechanics, parts or services"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onPress={() => setSearchQuery('')}
      />
      
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      
      <View style={styles.filtersContainer}>
        <Text style={styles.filterLabel}>Sort by:</Text>
        <FlatList
          data={filters}
          renderItem={renderFilterItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      
      <FlatList
        data={sortedData}
        renderItem={renderServiceItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.servicesList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="alert-circle-outline" size={50} color={COLORS.darkGray} />
            <Text style={styles.emptyText}>No services found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  categoriesContainer: {
    paddingVertical: 10,
    paddingHorizontal: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  selectedCategoryItem: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    ...FONTS.body4,
    color: COLORS.primary,
    marginLeft: 8,
  },
  selectedCategoryText: {
    color: COLORS.white,
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  filterLabel: {
    ...FONTS.body4,
    marginRight: 10,
  },
  filterItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray,
  },
  selectedFilterItem: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  selectedFilterText: {
    color: COLORS.white,
  },
  servicesList: {
    padding: SIZES.padding,
  },
  serviceItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    ...FONTS.h4,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    ...FONTS.body5,
    marginLeft: 4,
    color: COLORS.darkGray,
  },
  serviceSpecialty: {
    ...FONTS.body5,
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    ...FONTS.body5,
    marginLeft: 4,
    color: COLORS.darkGray,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  callText: {
    ...FONTS.body5,
    color: COLORS.primary,
    marginLeft: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    ...FONTS.body3,
    color: COLORS.darkGray,
    marginTop: 10,
  },
});

export default ServiceSearch;
