 import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ServiceDetails = ({ route, navigation }) => {
  const { item } = route.params;
  const [selectedTab, setSelectedTab] = useState('info');

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'info':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{item.description}</Text>
            
            <Text style={styles.sectionTitle}>Address</Text>
            <View style={styles.addressContainer}>
              <Icon name="map-marker" size={20} color={COLORS.primary} />
              <Text style={styles.addressText}>{item.address}</Text>
            </View>
            
            <Text style={styles.sectionTitle}>Contact</Text>
            <TouchableOpacity style={styles.contactItem}>
              <Icon name="phone" size={20} color={COLORS.primary} />
              <Text style={styles.contactText}>{item.phoneNumber}</Text>
            </TouchableOpacity>
          </View>
        );
      case 'services':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Available Services</Text>
            {item.services ? (
              item.services.map((service, index) => (
                <View key={index} style={styles.serviceItem}>
                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <Text style={styles.servicePrice}>{service.price}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.bookButton}
                    onPress={() => navigation.navigate('ServiceBooking', { service, provider: item })}
                  >
                    <Text style={styles.bookButtonText}>Book</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : item.inventory ? (
              item.inventory.map((part, index) => (
                <View key={index} style={styles.serviceItem}>
                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceName}>{part.name}</Text>
                    <Text style={styles.servicePrice}>{part.price}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.bookButton}
                    onPress={() => navigation.navigate('ServiceBooking', { service: part, provider: item })}
                  >
                    <Text style={styles.bookButtonText}>Order</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.noDataText}>No services available</Text>
            )}
          </View>
        );
      case 'reviews':
        return (
          <View style={styles.tabContent}>
            <View style={styles.ratingOverview}>
              <Text style={styles.ratingValue}>{item.rating}</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map(star => (
                  <Icon 
                    key={star}
                    name="star" 
                    size={20} 
                    color={star <= Math.floor(item.rating) ? "#FFC107" : COLORS.lightGray} 
                  />
                ))}
              </View>
              <Text style={styles.reviewCount}>Based on 24 reviews</Text>
            </View>
            
            {/* Mock reviews */}
            {[
              { id: '1', name: 'John D.', rating: 5, comment: 'Great service, very professional and quick.', date: '2 weeks ago' },
              { id: '2', name: 'Sarah M.', rating: 4, comment: 'Good work but a bit expensive.', date: '1 month ago' },
              { id: '3', name: 'Michael T.', rating: 5, comment: 'Excellent service! Fixed my car in no time.', date: '2 months ago' },
            ].map(review => (
              <View key={review.id} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewerName}>{review.name}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <View style={styles.reviewRating}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <Icon 
                      key={star}
                      name="star" 
                      size={16} 
                      color={star <= review.rating ? "#FFC107" : COLORS.lightGray} 
                    />
                  ))}
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        );
      case 'availability':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Working Hours</Text>
            {item.availability ? (
              Object.entries(item.availability).map(([day, hours], index) => (
                <View key={index} style={styles.availabilityItem}>
                  <Text style={styles.dayText}>{day.charAt(0).toUpperCase() + day.slice(1)}</Text>
                  <Text style={styles.hoursText}>{hours}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noDataText}>No availability information</Text>
            )}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title={item.name}
        leftIcon="arrow-back"
        rightIcon="heart-outline"
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => {}}
      />
      
      <ScrollView>
        <View style={styles.imageContainer}>
          {item.image ? (
            <Image source={item.image} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Icon name="car-service" size={60} color={COLORS.primary} />
            </View>
          )}
        </View>
        
        <View style={styles.infoHeader}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={18} color="#FFC107" />
              <Text style={styles.rating}>{item.rating}</Text>
              <Text style={styles.reviewsCount}>(24 reviews)</Text>
            </View>
          </View>
          <View style={styles.distanceContainer}>
            <Icon name="map-marker" size={18} color={COLORS.primary} />
            <Text style={styles.distance}>{item.distance}</Text>
          </View>
        </View>
        
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'info' && styles.selectedTab]} 
            onPress={() => setSelectedTab('info')}
          >
            <Text style={[styles.tabText, selectedTab === 'info' && styles.selectedTabText]}>Info</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'services' && styles.selectedTab]} 
            onPress={() => setSelectedTab('services')}
          >
            <Text style={[styles.tabText, selectedTab === 'services' && styles.selectedTabText]}>
              {item.services ? 'Services' : 'Products'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'reviews' && styles.selectedTab]} 
            onPress={() => setSelectedTab('reviews')}
          >
            <Text style={[styles.tabText, selectedTab === 'reviews' && styles.selectedTabText]}>Reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, selectedTab === 'availability' && styles.selectedTab]} 
            onPress={() => setSelectedTab('availability')}
          >
            <Text style={[styles.tabText, selectedTab === 'availability' && styles.selectedTabText]}>Hours</Text>
          </TouchableOpacity>
        </View>
        
        {renderTabContent()}
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.callButton}>
          <Icon name="phone" size={20} color={COLORS.white} />
          <Text style={styles.callButtonText}>Call</Text>
        </TouchableOpacity>
        <Button 
          title={item.services ? "Book Service" : "Place Order"} 
          onPress={() => navigation.navigate('ServiceBooking', { provider: item })}
          style={styles.bookServiceButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.lightGray,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  name: {
    ...FONTS.h3,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...FONTS.body4,
    marginLeft: 4,
    marginRight: 4,
  },
  reviewsCount: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: SIZES.radius,
  },
  distance: {
    ...FONTS.body5,
    marginLeft: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    ...FONTS.body4,
    color: COLORS.darkGray,
  },
  selectedTabText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  tabContent: {
    padding: SIZES.padding,
  },
  sectionTitle: {
    ...FONTS.h4,
    marginBottom: 8,
    marginTop: 16,
  },
  description: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    lineHeight: 22,
    marginBottom: 16,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  addressText: {
    ...FONTS.body4,
    marginLeft: 8,
    color: COLORS.darkGray,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    ...FONTS.body4,
    marginLeft: 8,
    color: COLORS.darkGray,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    ...FONTS.body3,
    marginBottom: 4,
  },
  servicePrice: {
    ...FONTS.body4,
    color: COLORS.darkGray,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: SIZES.radius,
  },
  bookButtonText: {
    ...FONTS.body5,
    color: COLORS.white,
  },
  ratingOverview: {
    alignItems: 'center',
    marginBottom: 24,
  },
  ratingValue: {
    ...FONTS.h1,
    color: COLORS.primary,
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewCount: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  reviewItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reviewerName: {
    ...FONTS.h4,
  },
  reviewDate: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  reviewRating: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewComment: {
    ...FONTS.body4,
    color: COLORS.darkGray,
  },
  availabilityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  dayText: {
    ...FONTS.body4,
    textTransform: 'capitalize',
  },
  hoursText: {
    ...FONTS.body4,
    color: COLORS.darkGray,
  },
  noDataText: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    padding: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: SIZES.radius,
    marginRight: 12,
  },
  callButtonText: {
    ...FONTS.body4,
    color: COLORS.white,
    marginLeft: 8,
  },
  bookServiceButton: {
    flex: 1,
  },
});

export default ServiceDetails;
