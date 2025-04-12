import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ServiceCard = ({
  service,
  onPress,
  style,
  showRating = true,
  showDistance = true,
  showPrice = true,
  compact = false,
}) => {
  // Default service object structure if not provided
  const defaultService = {
    id: '0',
    name: 'Service Name',
    category: 'Category',
    rating: 4.5,
    reviews: 120,
    price: '₦5,000',
    distance: '3.2 km',
    image: null,
    isOpen: true,
    isFeatured: false,
  };

  // Merge with defaults
  const serviceData = { ...defaultService, ...service };

  // Get icon based on category
  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
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
      case 'diagnostics':
        return 'car-info';
      case 'parts':
        return 'car-cog';
      default:
        return 'car-cog';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        compact ? styles.compactContainer : {},
        style
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {serviceData.isFeatured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>Featured</Text>
        </View>
      )}

      <View style={styles.imageContainer}>
        {serviceData.image ? (
          <Image 
            source={{ uri: serviceData.image }} 
            style={styles.image} 
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Icon 
              name={getCategoryIcon(serviceData.category)} 
              size={compact ? 30 : 40} 
              color={COLORS.primary} 
            />
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text 
            style={compact ? styles.compactName : styles.name}
            numberOfLines={1}
          >
            {serviceData.name}
          </Text>
          
          {!compact && (
            <View style={[
              styles.statusBadge,
              serviceData.isOpen ? styles.openBadge : styles.closedBadge
            ]}>
              <Text style={[
                styles.statusText,
                serviceData.isOpen ? styles.openText : styles.closedText
              ]}>
                {serviceData.isOpen ? 'Open' : 'Closed'}
              </Text>
            </View>
          )}
        </View>

        <Text 
          style={compact ? styles.compactCategory : styles.category}
          numberOfLines={1}
        >
          <Icon 
            name={getCategoryIcon(serviceData.category)} 
            size={12} 
            color={COLORS.darkGray} 
          /> {serviceData.category}
        </Text>

        <View style={styles.detailsContainer}>
          {showRating && (
            <View style={styles.ratingContainer}>
              <Icon name="star" size={14} color="#FFC107" />
              <Text style={styles.ratingText}>
                {serviceData.rating} ({serviceData.reviews})
              </Text>
            </View>
          )}

          {showDistance && (
            <View style={styles.distanceContainer}>
              <Icon name="map-marker" size={14} color={COLORS.primary} />
              <Text style={styles.distanceText}>{serviceData.distance}</Text>
            </View>
          )}

          {showPrice && !compact && (
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>From {serviceData.price}</Text>
            </View>
          )}
        </View>
      </View>

      {compact && serviceData.isOpen && (
        <View style={styles.compactOpenIndicator} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
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
    position: 'relative',
  },
  compactContainer: {
    padding: 8,
    marginBottom: 8,
  },
  featuredBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 1,
  },
  featuredText: {
    ...FONTS.body5,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    ...FONTS.h4,
    flex: 1,
    marginRight: 8,
  },
  compactName: {
    ...FONTS.body4,
    fontWeight: 'bold',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  openBadge: {
    backgroundColor: '#D4EDDA',
  },
  closedBadge: {
    backgroundColor: '#F8D7DA',
  },
  statusText: {
    ...FONTS.body5,
    fontWeight: 'bold',
  },
  openText: {
    color: '#155724',
  },
  closedText: {
    color: '#721C24',
  },
  category: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  compactCategory: {
    ...FONTS.body5,
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  ratingText: {
    ...FONTS.body5,
    marginLeft: 4,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  distanceText: {
    ...FONTS.body5,
    marginLeft: 4,
  },
  priceContainer: {
    marginTop: 4,
  },
  priceText: {
    ...FONTS.body4,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  compactOpenIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#28A745',
  },
});

export default ServiceCard;
