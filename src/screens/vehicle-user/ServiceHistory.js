import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { SERVICE_HISTORY } from '../../utils/mockData';
import Header from '../../components/common/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ServiceHistory = ({ navigation }) => {
  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'recent', label: 'Recent' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' },
  ];

  // Add some mock data with different statuses
  const mockHistory = [
    ...SERVICE_HISTORY,
    {
      id: '3',
      providerName: 'Premium Auto Parts',
      service: 'Oil Filter Replacement',
      date: '2023-02-20',
      cost: '$25',
      rating: 0,
      status: 'Pending',
      time: '10:30 AM',
    },
    {
      id: '4',
      providerName: 'Quick Auto Fix',
      service: 'Tire Rotation',
      date: '2023-03-05',
      cost: '$60',
      rating: 0,
      status: 'Scheduled',
      time: '2:00 PM',
    },
  ];

  const filteredHistory = mockHistory.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'recent') return new Date(item.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    if (filter === 'pending') return item.status === 'Pending' || item.status === 'Scheduled';
    if (filter === 'completed') return !item.status || item.status === 'Completed';
    return true;
  });

  const renderServiceItem = ({ item }) => {
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    return (
      <TouchableOpacity 
        style={styles.serviceItem}
        onPress={() => navigation.navigate('ServiceDetails', { 
          historyItem: item,
          isHistory: true
        })}
      >
        <View style={styles.serviceHeader}>
          <Text style={styles.providerName}>{item.providerName}</Text>
          {item.status ? (
            <View style={[
              styles.statusBadge,
              item.status === 'Pending' ? styles.pendingBadge : 
              item.status === 'Scheduled' ? styles.scheduledBadge : styles.completedBadge
            ]}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          ) : (
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <Icon 
                  key={star}
                  name="star" 
                  size={16} 
                  color={star <= item.rating ? "#FFC107" : COLORS.lightGray} 
                />
              ))}
            </View>
          )}
        </View>
        
        <Text style={styles.serviceText}>{item.service}</Text>
        
        <View style={styles.serviceFooter}>
          <View style={styles.dateContainer}>
            <Icon name="calendar" size={16} color={COLORS.darkGray} />
            <Text style={styles.dateText}>{formattedDate}</Text>
            {item.time && (
              <>
                <Icon name="clock-outline" size={16} color={COLORS.darkGray} style={styles.timeIcon} />
                <Text style={styles.dateText}>{item.time}</Text>
              </>
            )}
          </View>
          <Text style={styles.costText}>{item.cost}</Text>
        </View>
        
        <View style={styles.actionButtons}>
          {(item.status === 'Pending' || item.status === 'Scheduled') && (
            <>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="calendar-edit" size={16} color={COLORS.primary} />
                <Text style={styles.actionText}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
                <Icon name="close-circle" size={16} color={COLORS.error} />
                <Text style={[styles.actionText, styles.cancelText]}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
          {!item.status && item.rating === 0 && (
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="star-outline" size={16} color={COLORS.primary} />
              <Text style={styles.actionText}>Rate Service</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="repeat" size={16} color={COLORS.primary} />
            <Text style={styles.actionText}>Book Again</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Service History" 
        leftIcon="menu"
        rightIcon="filter"
        onLeftPress={() => {}}
        onRightPress={() => {}}
      />
      
      <View style={styles.filterContainer}>
        {filterOptions.map(option => (
          <TouchableOpacity 
            key={option.id}
            style={[
              styles.filterOption,
              filter === option.id && styles.activeFilterOption
            ]}
            onPress={() => setFilter(option.id)}
          >
            <Text 
              style={[
                styles.filterText,
                filter === option.id && styles.activeFilterText
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <FlatList
        data={filteredHistory}
        renderItem={renderServiceItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="history" size={60} color={COLORS.lightGray} />
            <Text style={styles.emptyText}>No service history found</Text>
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  filterOption: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray,
  },
  activeFilterOption: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  activeFilterText: {
    color: COLORS.white,
  },
  listContent: {
    padding: SIZES.padding,
  },
  serviceItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  providerName: {
    ...FONTS.h4,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  pendingBadge: {
    backgroundColor: '#FFF3CD',
  },
  scheduledBadge: {
    backgroundColor: '#D1ECF1',
  },
  completedBadge: {
    backgroundColor: '#D4EDDA',
  },
  statusText: {
    ...FONTS.body5,
    fontWeight: 'bold',
  },
  serviceText: {
    ...FONTS.body4,
    marginBottom: 8,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    ...FONTS.body5,
    color: COLORS.darkGray,
    marginLeft: 4,
  },
  timeIcon: {
    marginLeft: 8,
  },
  costText: {
    ...FONTS.body4,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray,
  },
  cancelButton: {
    backgroundColor: '#FFEBEE',
  },
  actionText: {
    ...FONTS.body5,
    color: COLORS.primary,
    marginLeft: 4,
  },
  cancelText: {
    color: COLORS.error,
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

export default ServiceHistory;
