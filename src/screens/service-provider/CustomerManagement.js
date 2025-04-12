import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import Header from '../../components/common/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomerManagement = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'recent', 'visits'
  
  // Mock data for customers
  const customers = [
    {
      id: '1',
      name: 'John Doe',
      phone: '+233 50 123 4567',
      email: 'john.doe@example.com',
      vehicles: [
        { id: 'v1', name: 'Toyota Camry', year: '2019', color: 'Black' }
      ],
      lastVisit: '2023-05-10',
      totalVisits: 5,
      totalSpent: '₦45,000',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      phone: '+233 50 987 6543',
      email: 'sarah.j@example.com',
      vehicles: [
        { id: 'v2', name: 'Honda Civic', year: '2020', color: 'Silver' }
      ],
      lastVisit: '2023-05-12',
      totalVisits: 3,
      totalSpent: '₦28,000',
    },
    {
      id: '3',
      name: 'Michael Brown',
      phone: '+233 50 456 7890',
      email: 'michael.b@example.com',
      vehicles: [
        { id: 'v3', name: 'Ford Focus', year: '2018', color: 'Blue' }
      ],
      lastVisit: '2023-04-28',
      totalVisits: 2,
      totalSpent: '₦17,500',
    },
    {
      id: '4',
      name: 'Emily Wilson',
      phone: '+233 50 234 5678',
      email: 'emily.w@example.com',
      vehicles: [
        { id: 'v4', name: 'Nissan Altima', year: '2017', color: 'White' }
      ],
      lastVisit: '2023-05-05',
      totalVisits: 4,
      totalSpent: '₦32,000',
    },
    {
      id: '5',
      name: 'David Lee',
      phone: '+233 50 345 6789',
      email: 'david.l@example.com',
      vehicles: [
        { id: 'v5', name: 'Hyundai Sonata', year: '2021', color: 'Red' },
        { id: 'v6', name: 'Kia Sportage', year: '2019', color: 'Gray' }
      ],
      lastVisit: '2023-05-08',
      totalVisits: 6,
      totalSpent: '₦52,500',
    },
  ];

  const getFilteredCustomers = () => {
    // Filter by search query
    let filtered = customers.filter(customer => 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.vehicles.some(vehicle => 
        vehicle.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    
    // Sort customers
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'recent':
        filtered.sort((a, b) => new Date(b.lastVisit) - new Date(a.lastVisit));
        break;
      case 'visits':
        filtered.sort((a, b) => b.totalVisits - a.totalVisits);
        break;
      default:
        break;
    }
    
    return filtered;
  };

  const handleCallCustomer = (phone) => {
    // In a real app, this would initiate a phone call
    Alert.alert(
      'Call Customer',
      `Calling ${phone}`,
      [{ text: 'OK' }]
    );
  };

  const handleEmailCustomer = (email) => {
    // In a real app, this would open email app
    Alert.alert(
      'Email Customer',
      `Sending email to ${email}`,
      [{ text: 'OK' }]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderCustomerItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.customerItem}
      onPress={() => navigation.navigate('CustomerDetails', { customerId: item.id })}
    >
      <View style={styles.customerHeader}>
        <View style={styles.customerInitials}>
          <Text style={styles.initialsText}>
            {item.name.split(' ').map(n => n[0]).join('')}
          </Text>
        </View>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{item.name}</Text>
          <Text style={styles.customerEmail}>{item.email}</Text>
        </View>
      </View>
      
      <View style={styles.vehiclesContainer}>
        {item.vehicles.map(vehicle => (
          <View key={vehicle.id} style={styles.vehicleItem}>
            <Icon name="car" size={16} color={COLORS.darkGray} />
            <Text style={styles.vehicleText}>
              {vehicle.name} ({vehicle.year}, {vehicle.color})
            </Text>
          </View>
        ))}
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Last Visit</Text>
          <Text style={styles.statValue}>{formatDate(item.lastVisit)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Visits</Text>
          <Text style={styles.statValue}>{item.totalVisits}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Total Spent</Text>
          <Text style={styles.statValue}>{item.totalSpent}</Text>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleCallCustomer(item.phone)}
        >
          <Icon name="phone" size={16} color={COLORS.primary} />
          <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleEmailCustomer(item.email)}
        >
          <Icon name="email" size={16} color={COLORS.primary} />
          <Text style={styles.actionText}>Email</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Chat', { customerId: item.id })}
        >
          <Icon name="message-text" size={16} color={COLORS.primary} />
          <Text style={styles.actionText}>Message</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('ServiceBooking', { customerId: item.id })}
        >
          <Icon name="calendar-plus" size={16} color={COLORS.primary} />
          <Text style={styles.actionText}>Book</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Customer Management" 
        leftIcon="menu"
        rightIcon="account-plus"
        onLeftPress={() => {}}
        onRightPress={() => navigation.navigate('AddCustomer')}
      />
      
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color={COLORS.darkGray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search customers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={() => setSearchQuery('')}
          >
            <Icon name="close" size={20} color={COLORS.darkGray} />
          </TouchableOpacity>
        ) : null}
      </View>
      
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <TouchableOpacity 
          style={[
            styles.sortButton,
            sortBy === 'name' && styles.activeSortButton
          ]}
          onPress={() => setSortBy('name')}
        >
          <Text 
            style={[
              styles.sortButtonText,
              sortBy === 'name' && styles.activeSortButtonText
            ]}
          >
            Name
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.sortButton,
            sortBy === 'recent' && styles.activeSortButton
          ]}
          onPress={() => setSortBy('recent')}
        >
          <Text 
            style={[
              styles.sortButtonText,
              sortBy === 'recent' && styles.activeSortButtonText
            ]}
          >
            Recent
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.sortButton,
            sortBy === 'visits' && styles.activeSortButton
          ]}
          onPress={() => setSortBy('visits')}
        >
          <Text 
            style={[
              styles.sortButtonText,
              sortBy === 'visits' && styles.activeSortButtonText
            ]}
          >
            Visits
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={getFilteredCustomers()}
        renderItem={renderCustomerItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="account-group" size={60} color={COLORS.lightGray} />
            <Text style={styles.emptyText}>No customers found</Text>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    paddingHorizontal: 10,
    margin: SIZES.padding,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  clearButton: {
    padding: 5,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  sortLabel: {
    ...FONTS.body4,
    marginRight: 10,
  },
  sortButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray,
  },
  activeSortButton: {
    backgroundColor: COLORS.primary,
  },
  sortButtonText: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  activeSortButtonText: {
    color: COLORS.white,
  },
  listContent: {
    padding: SIZES.padding,
  },
  customerItem: {
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
  customerHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  customerInitials: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  initialsText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  customerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  customerName: {
    ...FONTS.h4,
    marginBottom: 4,
  },
  customerEmail: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  vehiclesContainer: {
    marginBottom: 12,
  },
  vehicleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  vehicleText: {
    ...FONTS.body5,
    color: COLORS.darkGray,
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingVertical: 12,
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    ...FONTS.body5,
    color: COLORS.darkGray,
    marginBottom: 4,
  },
  statValue: {
    ...FONTS.body4,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default CustomerManagement;
