import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import Header from '../../components/common/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Appointments = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Mock data for appointments
  const appointments = [
    {
      id: '1',
      customerName: 'John Doe',
      vehicleInfo: 'Toyota Camry (2019)',
      service: 'Oil Change',
      date: '2023-05-15',
      time: '10:00 AM',
      status: 'Scheduled',
      price: '₦5,000',
      phone: '+233 50 123 4567',
      notes: 'Customer requested synthetic oil',
    },
    {
      id: '2',
      customerName: 'Sarah Johnson',
      vehicleInfo: 'Honda Civic (2020)',
      service: 'Brake Service',
      date: '2023-05-15',
      time: '2:30 PM',
      status: 'Scheduled',
      price: '₦15,000',
      phone: '+233 50 987 6543',
      notes: 'Front brakes only',
    },
    {
      id: '3',
      customerName: 'Michael Brown',
      vehicleInfo: 'Ford Focus (2018)',
      service: 'Tire Rotation',
      date: '2023-05-16',
      time: '9:00 AM',
      status: 'Scheduled',
      price: '₦3,000',
      phone: '+233 50 456 7890',
      notes: '',
    },
    {
      id: '4',
      customerName: 'Emily Wilson',
      vehicleInfo: 'Nissan Altima (2017)',
      service: 'AC Service',
      date: '2023-05-14',
      time: '11:30 AM',
      status: 'Completed',
      price: '₦12,000',
      phone: '+233 50 234 5678',
      notes: 'AC was not cooling properly',
    },
    {
      id: '5',
      customerName: 'David Lee',
      vehicleInfo: 'Hyundai Sonata (2021)',
      service: 'Engine Diagnostic',
      date: '2023-05-13',
      time: '3:00 PM',
      status: 'Completed',
      price: '₦7,500',
      phone: '+233 50 345 6789',
      notes: 'Check engine light was on',
    },
    {
      id: '6',
      customerName: 'Jennifer Adams',
      vehicleInfo: 'Kia Optima (2020)',
      service: 'Oil Change',
      date: '2023-05-12',
      time: '1:00 PM',
      status: 'Cancelled',
      price: '₦5,000',
      phone: '+233 50 567 8901',
      notes: 'Customer had an emergency',
    },
  ];

  const getFilteredAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    switch (activeTab) {
      case 'upcoming':
        return appointments.filter(appointment => {
          const appointmentDate = new Date(appointment.date);
          return (
            appointmentDate >= today && 
            (appointment.status === 'Scheduled' || appointment.status === 'Confirmed')
          );
        });
      case 'today':
        return appointments.filter(appointment => {
          const appointmentDate = new Date(appointment.date);
          const todayStr = today.toISOString().split('T')[0];
          return (
            appointmentDate.toISOString().split('T')[0] === todayStr &&
            (appointment.status === 'Scheduled' || appointment.status === 'Confirmed')
          );
        });
      case 'completed':
        return appointments.filter(appointment => 
          appointment.status === 'Completed'
        );
      case 'cancelled':
        return appointments.filter(appointment => 
          appointment.status === 'Cancelled'
        );
      default:
        return appointments;
    }
  };

  const handleUpdateStatus = (id, newStatus) => {
    // In a real app, this would update the appointment status in the database
    Alert.alert(
      'Status Updated',
      `Appointment status has been updated to ${newStatus}`,
      [{ text: 'OK' }]
    );
  };

  const handleCallCustomer = (phone) => {
    // In a real app, this would initiate a phone call
    Alert.alert(
      'Call Customer',
      `Calling ${phone}`,
      [{ text: 'OK' }]
    );
  };

  const renderAppointmentItem = ({ item }) => {
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    return (
      <TouchableOpacity 
        style={styles.appointmentItem}
        onPress={() => navigation.navigate('CustomerDetails', { customerId: item.id })}
      >
        <View style={styles.appointmentHeader}>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateText}>{formattedDate}</Text>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
          <View 
            style={[
              styles.statusBadge,
              item.status === 'Scheduled' ? styles.scheduledBadge :
              item.status === 'Confirmed' ? styles.confirmedBadge :
              item.status === 'Completed' ? styles.completedBadge :
              styles.cancelledBadge
            ]}
          >
            <Text 
              style={[
                styles.statusText,
                item.status === 'Scheduled' ? styles.scheduledText :
                item.status === 'Confirmed' ? styles.confirmedText :
                item.status === 'Completed' ? styles.completedText :
                styles.cancelledText
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>
        
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{item.customerName}</Text>
          <Text style={styles.vehicleInfo}>{item.vehicleInfo}</Text>
        </View>
        
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceLabel}>Service:</Text>
          <Text style={styles.serviceText}>{item.service}</Text>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
        
        {item.notes ? (
          <View style={styles.notesContainer}>
            <Text style={styles.notesLabel}>Notes:</Text>
            <Text style={styles.notesText}>{item.notes}</Text>
          </View>
        ) : null}
        
        <View style={styles.actionButtons}>
          {(item.status === 'Scheduled' || item.status === 'Confirmed') && (
            <>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleUpdateStatus(item.id, 'Completed')}
              >
                <Icon name="check-circle" size={16} color={COLORS.success} />
                <Text style={[styles.actionText, { color: COLORS.success }]}>Complete</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => handleUpdateStatus(item.id, 'Cancelled')}
              >
                <Icon name="close-circle" size={16} color={COLORS.error} />
                <Text style={[styles.actionText, { color: COLORS.error }]}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleCallCustomer(item.phone)}
          >
            <Icon name="phone" size={16} color={COLORS.primary} />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Chat', { customerId: item.id })}
          >
            <Icon name="message-text" size={16} color={COLORS.primary} />
            <Text style={styles.actionText}>Message</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Appointments" 
        leftIcon="menu"
        rightIcon="calendar"
        onLeftPress={() => {}}
        onRightPress={() => {}}
      />
      
      <View style={styles.tabsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScrollContent}
        >
          <TouchableOpacity 
            style={[
              styles.tabButton,
              activeTab === 'upcoming' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text 
              style={[
                styles.tabText,
                activeTab === 'upcoming' && styles.activeTabText
              ]}
            >
              Upcoming
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tabButton,
              activeTab === 'today' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('today')}
          >
            <Text 
              style={[
                styles.tabText,
                activeTab === 'today' && styles.activeTabText
              ]}
            >
              Today
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tabButton,
              activeTab === 'completed' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('completed')}
          >
            <Text 
              style={[
                styles.tabText,
                activeTab === 'completed' && styles.activeTabText
              ]}
            >
              Completed
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tabButton,
              activeTab === 'cancelled' && styles.activeTabButton
            ]}
            onPress={() => setActiveTab('cancelled')}
          >
            <Text 
              style={[
                styles.tabText,
                activeTab === 'cancelled' && styles.activeTabText
              ]}
            >
              Cancelled
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <FlatList
        data={getFilteredAppointments()}
        renderItem={renderAppointmentItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="calendar-blank" size={60} color={COLORS.lightGray} />
            <Text style={styles.emptyText}>No appointments found</Text>
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
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  tabsScrollContent: {
    paddingHorizontal: SIZES.padding,
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    ...FONTS.body4,
    color: COLORS.darkGray,
  },
  activeTabText: {
    ...FONTS.h4,
    color: COLORS.primary,
  },
  listContent: {
    padding: SIZES.padding,
  },
  appointmentItem: {
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
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    ...FONTS.body4,
    fontWeight: 'bold',
    marginRight: 8,
  },
  timeText: {
    ...FONTS.body4,
    color: COLORS.darkGray,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scheduledBadge: {
    backgroundColor: '#D1ECF1',
  },
  confirmedBadge: {
    backgroundColor: '#CCE5FF',
  },
  completedBadge: {
    backgroundColor: '#D4EDDA',
  },
  cancelledBadge: {
    backgroundColor: '#F8D7DA',
  },
  statusText: {
    ...FONTS.body5,
    fontWeight: 'bold',
  },
  scheduledText: {
    color: '#0C5460',
  },
  confirmedText: {
    color: '#004085',
  },
  completedText: {
    color: '#155724',
  },
  cancelledText: {
    color: '#721C24',
  },
  customerInfo: {
    marginBottom: 12,
  },
  customerName: {
    ...FONTS.h4,
    marginBottom: 4,
  },
  vehicleInfo: {
    ...FONTS.body4,
    color: COLORS.darkGray,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceLabel: {
    ...FONTS.body4,
    marginRight: 4,
  },
  serviceText: {
    ...FONTS.body4,
    fontWeight: 'bold',
    flex: 1,
  },
  priceText: {
    ...FONTS.body4,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  notesContainer: {
    backgroundColor: COLORS.lightGray,
    padding: 8,
    borderRadius: SIZES.radius,
    marginBottom: 12,
  },
  notesLabel: {
    ...FONTS.body5,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notesText: {
    ...FONTS.body5,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
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

export default Appointments;
