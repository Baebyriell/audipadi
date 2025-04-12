import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { NOTIFICATIONS } from '../../utils/mockData';
import Header from '../../components/common/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([
    ...NOTIFICATIONS,
    {
      id: '3',
      title: 'Service Completed',
      message: 'Your vehicle service has been completed. Please rate your experience.',
      time: '2 days ago',
      read: true,
      type: 'service',
    },
    {
      id: '4',
      title: 'Promotion',
      message: 'Get 20% off on your next oil change at Quick Auto Fix.',
      time: '3 days ago',
      read: true,
      type: 'promotion',
    },
    {
      id: '5',
      title: 'Payment Successful',
      message: 'Your payment of $45 to John\'s Auto Repair has been processed successfully.',
      time: '1 week ago',
      read: true,
      type: 'payment',
    }
  ]);

  const [filter, setFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'service', label: 'Services' },
    { id: 'promotion', label: 'Promotions' },
  ];

  const filteredNotifications = notifications.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !item.read;
    return item.type === filter;
  });

  const markAsRead = (id) => {
    setNotifications(
      notifications.map(item => 
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(item => ({ ...item, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter(item => item.id !== id)
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getIconForNotificationType = (type) => {
    switch (type) {
      case 'service':
        return { name: 'car-wrench', color: COLORS.primary };
      case 'promotion':
        return { name: 'tag', color: '#FF9800' };
      case 'payment':
        return { name: 'cash', color: '#4CAF50' };
      default:
        return { name: 'bell', color: COLORS.primary };
    }
  };

  const renderNotificationItem = ({ item }) => {
    const icon = getIconForNotificationType(item.type);
    
    return (
      <TouchableOpacity 
        style={[
          styles.notificationItem,
          !item.read && styles.unreadNotification
        ]}
        onPress={() => {
          markAsRead(item.id);
          // Navigate to relevant screen based on notification type
          if (item.type === 'service') {
            navigation.navigate('ServiceHistory');
          } else if (item.type === 'payment') {
            navigation.navigate('PaymentHistory');
          }
        }}
      >
        <View 
          style={[
            styles.iconContainer,
            { backgroundColor: icon.color + '20' } // 20% opacity
          ]}
        >
          <Icon name={icon.name} size={24} color={icon.color} />
        </View>
        
        <View style={styles.notificationContent}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationTime}>{item.time}</Text>
          </View>
          <Text style={styles.notificationMessage}>{item.message}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => deleteNotification(item.id)}
        >
          <Icon name="delete-outline" size={20} color={COLORS.darkGray} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Notifications" 
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
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
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={markAllAsRead}
        >
          <Icon name="check-all" size={16} color={COLORS.primary} />
          <Text style={styles.actionText}>Mark all as read</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={clearAll}
        >
          <Icon name="delete-sweep" size={16} color={COLORS.primary} />
          <Text style={styles.actionText}>Clear all</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredNotifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="bell-off" size={60} color={COLORS.lightGray} />
            <Text style={styles.emptyText}>No notifications</Text>
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
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    ...FONTS.body5,
    color: COLORS.primary,
    marginLeft: 4,
  },
  listContent: {
    padding: SIZES.padding,
  },
  notificationItem: {
    flexDirection: 'row',
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
  unreadNotification: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
    backgroundColor: COLORS.lightGray + '40', // 40% opacity
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    ...FONTS.h4,
  },
  notificationTime: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  notificationMessage: {
    ...FONTS.body4,
    color: COLORS.darkGray,
  },
  deleteButton: {
    padding: 8,
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

export default NotificationsScreen;
