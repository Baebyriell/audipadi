import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomerDetails = ({ route, navigation }) => {
  const { customerId } = route.params || {};
  const [activeTab, setActiveTab] = useState('info');
  
  // Mock customer data - in a real app, this would be fetched based on customerId
  const customer = {
    id: '1',
    name: 'John Doe',
    phone: '+233 50 123 4567',
    email: 'john.doe@example.com',
    address: '123 Main Street, Accra, Ghana',
    joinDate: '2022-09-15',
    vehicles: [
      { 
        id: 'v1', 
        name: 'Toyota Camry', 
        year: '2019', 
        color: 'Black',
        licensePlate: 'GH-1234-19',
        vin: 'ABC123XYZ456789',
        lastService: '2023-04-10'
      }
    ],
    serviceHistory: [
      {
        id: 's1',
        date: '2023-04-10',
        service: 'Oil Change',
        vehicle: 'Toyota Camry',
        cost: '₦5,000',
        notes: 'Used synthetic oil as requested',
        status: 'Completed'
      },
      {
        id: 's2',
        date: '2023-02-22',
        service: 'Brake Service',
        vehicle: 'Toyota Camry',
        cost: '₦15,000',
        notes: 'Replaced front brake pads',
        status: 'Completed'
      },
      {
        id: 's3',
        date: '2023-01-05',
        service: 'Tire Rotation',
        vehicle: 'Toyota Camry',
        cost: '₦3,000',
        notes: '',
        status: 'Completed'
      },
      {
        id: 's4',
        date: '2022-11-18',
        service: 'Engine Diagnostic',
        vehicle: 'Toyota Camry',
        cost: '₦7,500',
        notes: 'Check engine light was on. Fixed oxygen sensor issue.',
        status: 'Completed'
      },
      {
        id: 's5',
        date: '2022-09-30',
        service: 'AC Service',
        vehicle: 'Toyota Camry',
        cost: '₦12,000',
        notes: 'Recharged AC system',
        status: 'Completed'
      }
    ],
    upcomingAppointments: [
      {
        id: 'a1',
        date: '2023-05-20',
        time: '10:00 AM',
        service: 'Oil Change',
        vehicle: 'Toyota Camry',
        status: 'Scheduled'
      }
    ],
    notes: [
      {
        id: 'n1',
        date: '2023-04-10',
        text: 'Customer prefers synthetic oil for all oil changes',
        author: 'Service Advisor'
      },
      {
        id: 'n2',
        date: '2023-02-22',
        text: 'Customer mentioned hearing a noise from the rear of the vehicle. Should check during next visit.',
        author: 'Mechanic'
      }
    ],
    totalSpent: '₦42,500',
    totalVisits: 5,
    preferredPaymentMethod: 'Credit Card'
  };

  const handleCallCustomer = () => {
    // In a real app, this would initiate a phone call
    Alert.alert(
      'Call Customer',
      `Calling ${customer.phone}`,
      [{ text: 'OK' }]
    );
  };

  const handleEmailCustomer = () => {
    // In a real app, this would open email app
    Alert.alert(
      'Email Customer',
      `Sending email to ${customer.email}`,
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <View style={styles.tabContent}>
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <View style={styles.infoItem}>
                <Icon name="phone" size={20} color={COLORS.primary} />
                <Text style={styles.infoText}>{customer.phone}</Text>
              </View>
              <View style={styles.infoItem}>
                <Icon name="email" size={20} color={COLORS.primary} />
                <Text style={styles.infoText}>{customer.email}</Text>
              </View>
              <View style={styles.infoItem}>
                <Icon name="map-marker" size={20} color={COLORS.primary} />
                <Text style={styles.infoText}>{customer.address}</Text>
              </View>
              <View style={styles.infoItem}>
                <Icon name="calendar" size={20} color={COLORS.primary} />
                <Text style={styles.infoText}>Customer since {formatDate(customer.joinDate)}</Text>
              </View>
            </View>
            
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Vehicles</Text>
              {customer.vehicles.map(vehicle => (
                <View key={vehicle.id} style={styles.vehicleCard}>
                  <View style={styles.vehicleHeader}>
                    <Text style={styles.vehicleName}>{vehicle.name}</Text>
                    <TouchableOpacity 
                      style={styles.editButton}
                      onPress={() => navigation.navigate('EditVehicle', { vehicleId: vehicle.id })}
                    >
                      <Icon name="pencil" size={16} color={COLORS.darkGray} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.vehicleDetails}>
                    <View style={styles.vehicleDetail}>
                      <Text style={styles.detailLabel}>Year:</Text>
                      <Text style={styles.detailValue}>{vehicle.year}</Text>
                    </View>
                    <View style={styles.vehicleDetail}>
                      <Text style={styles.detailLabel}>Color:</Text>
                      <Text style={styles.detailValue}>{vehicle.color}</Text>
                    </View>
                    <View style={styles.vehicleDetail}>
                      <Text style={styles.detailLabel}>License Plate:</Text>
                      <Text style={styles.detailValue}>{vehicle.licensePlate}</Text>
                    </View>
                    <View style={styles.vehicleDetail}>
                      <Text style={styles.detailLabel}>VIN:</Text>
                      <Text style={styles.detailValue}>{vehicle.vin}</Text>
                    </View>
                    <View style={styles.vehicleDetail}>
                      <Text style={styles.detailLabel}>Last Service:</Text>
                      <Text style={styles.detailValue}>{formatDate(vehicle.lastService)}</Text>
                    </View>
                  </View>
                </View>
              ))}
              <Button 
                title="Add Vehicle" 
                onPress={() => navigation.navigate('AddVehicle', { customerId: customer.id })}
                type="secondary"
                style={styles.addButton}
              />
            </View>
            
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Customer Notes</Text>
              {customer.notes.length > 0 ? (
                customer.notes.map(note => (
                  <View key={note.id} style={styles.noteItem}>
                    <View style={styles.noteHeader}>
                      <Text style={styles.noteAuthor}>{note.author}</Text>
                      <Text style={styles.noteDate}>{formatDate(note.date)}</Text>
                    </View>
                    <Text style={styles.noteText}>{note.text}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>No notes available</Text>
              )}
              <Button 
                title="Add Note" 
                onPress={() => navigation.navigate('AddNote', { customerId: customer.id })}
                type="secondary"
                style={styles.addButton}
              />
            </View>
          </View>
        );
      case 'history':
        return (
          <View style={styles.tabContent}>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{customer.totalVisits}</Text>
                <Text style={styles.statLabel}>Total Visits</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{customer.totalSpent}</Text>
                <Text style={styles.statLabel}>Total Spent</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{customer.preferredPaymentMethod}</Text>
                <Text style={styles.statLabel}>Payment Method</Text>
              </View>
            </View>
            
            <Text style={styles.sectionTitle}>Service History</Text>
            {customer.serviceHistory.map(service => (
              <View key={service.id} style={styles.serviceItem}>
                <View style={styles.serviceHeader}>
                  <Text style={styles.serviceDate}>{formatDate(service.date)}</Text>
                  <View 
                    style={[
                      styles.statusBadge,
                      service.status === 'Completed' ? styles.completedBadge : 
                      service.status === 'Scheduled' ? styles.scheduledBadge : 
                      styles.pendingBadge
                    ]}
                  >
                    <Text 
                      style={[
                        styles.statusText,
                        service.status === 'Completed' ? styles.completedText : 
                        service.status === 'Scheduled' ? styles.scheduledText : 
                        styles.pendingText
                      ]}
                    >
                      {service.status}
                    </Text>
                  </View>
                </View>
                <Text style={styles.serviceName}>{service.service}</Text>
                <Text style={styles.vehicleName}>{service.vehicle}</Text>
                {service.notes ? (
                  <Text style={styles.serviceNotes}>{service.notes}</Text>
                ) : null}
                <View style={styles.serviceFooter}>
                  <Text style={styles.serviceCost}>{service.cost}</Text>
                  <TouchableOpacity 
                    style={styles.viewDetailsButton}
                    onPress={() => navigation.navigate('ServiceDetails', { serviceId: service.id })}
                  >
                    <Text style={styles.viewDetailsText}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        );
      case 'appointments':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            {customer.upcomingAppointments.length > 0 ? (
              customer.upcomingAppointments.map(appointment => (
                <View key={appointment.id} style={styles.appointmentItem}>
                  <View style={styles.appointmentHeader}>
                    <View style={styles.appointmentDateContainer}>
                      <Text style={styles.appointmentDate}>{formatDate(appointment.date)}</Text>
                      <Text style={styles.appointmentTime}>{appointment.time}</Text>
                    </View>
                    <View 
                      style={[
                        styles.statusBadge,
                        appointment.status === 'Scheduled' ? styles.scheduledBadge : 
                        appointment.status === 'Confirmed' ? styles.confirmedBadge : 
                        styles.pendingBadge
                      ]}
                    >
                      <Text 
                        style={[
                          styles.statusText,
                          appointment.status === 'Scheduled' ? styles.scheduledText : 
                          appointment.status === 'Confirmed' ? styles.confirmedText : 
                          styles.pendingText
                        ]}
                      >
                        {appointment.status}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.appointmentService}>{appointment.service}</Text>
                  <Text style={styles.appointmentVehicle}>{appointment.vehicle}</Text>
                  <View style={styles.appointmentActions}>
                    <TouchableOpacity 
                      style={styles.appointmentAction}
                      onPress={() => navigation.navigate('EditAppointment', { appointmentId: appointment.id })}
                    >
                      <Icon name="calendar-edit" size={16} color={COLORS.primary} />
                      <Text style={styles.appointmentActionText}>Reschedule</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.appointmentAction}
                      onPress={() => Alert.alert('Confirm', 'Are you sure you want to cancel this appointment?')}
                    >
                      <Icon name="calendar-remove" size={16} color={COLORS.error} />
                      <Text style={[styles.appointmentActionText, { color: COLORS.error }]}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>No upcoming appointments</Text>
            )}
            <Button 
              title="Schedule Appointment" 
              onPress={() => navigation.navigate('ServiceBooking', { customerId: customer.id })}
              style={styles.scheduleButton}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Customer Details" 
        leftIcon="arrow-back"
        rightIcon="dots-vertical"
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => {}}
      />
      
      <View style={styles.customerHeader}>
        <View style={styles.customerInitials}>
          <Text style={styles.initialsText}>
            {customer.name.split(' ').map(n => n[0]).join('')}
          </Text>
        </View>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{customer.name}</Text>
          <View style={styles.contactButtons}>
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={handleCallCustomer}
            >
              <Icon name="phone" size={20} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={handleEmailCustomer}
            >
              <Icon name="email" size={20} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={() => navigation.navigate('Chat', { customerId: customer.id })}
            >
              <Icon name="message-text" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[
            styles.tabButton,
            activeTab === 'info' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('info')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'info' && styles.activeTabText
            ]}
          >
            Info
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tabButton,
            activeTab === 'history' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('history')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'history' && styles.activeTabText
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tabButton,
            activeTab === 'appointments' && styles.activeTabButton
          ]}
          onPress={() => setActiveTab('appointments')}
        >
          <Text 
            style={[
              styles.tabText,
              activeTab === 'appointments' && styles.activeTabText
            ]}
          >
            Appointments
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        {renderTabContent()}
      </ScrollView>
      
      <View style={styles.footer}>
        <Button 
          title="Book Service" 
          onPress={() => navigation.navigate('ServiceBooking', { customerId: customer.id })}
          style={styles.bookButton}
        />
        <Button 
          title="Edit Customer" 
          onPress={() => navigation.navigate('EditCustomer', { customerId: customer.id })}
          type="secondary"
          style={styles.editButton}
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
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  customerInitials: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  initialsText: {
    ...FONTS.h2,
    color: COLORS.white,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    ...FONTS.h3,
    marginBottom: 8,
  },
  contactButtons: {
    flexDirection: 'row',
  },
  contactButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
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
  scrollContainer: {
    flex: 1,
  },
  tabContent: {
    padding: SIZES.padding,
  },
  infoSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...FONTS.h4,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    ...FONTS.body4,
    marginLeft: 12,
  },
  vehicleCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    padding: 16,
    marginBottom: 12,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  vehicleName: {
    ...FONTS.h4,
  },
  editButton: {
    padding: 4,
  },
  vehicleDetails: {
    marginBottom: 8,
  },
  vehicleDetail: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  detailLabel: {
    ...FONTS.body4,
    width: 100,
    color: COLORS.darkGray,
  },
  detailValue: {
    ...FONTS.body4,
  },
  addButton: {
    marginTop: 8,
  },
  noteItem: {
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    padding: 12,
    marginBottom: 12,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  noteAuthor: {
    ...FONTS.body4,
    fontWeight: 'bold',
  },
  noteDate: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  noteText: {
    ...FONTS.body4,
  },
  emptyText: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radius,
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...FONTS.h3,
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: COLORS.mediumGray,
  },
  serviceItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceDate: {
    ...FONTS.body4,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedBadge: {
    backgroundColor: '#D4EDDA',
  },
  scheduledBadge: {
    backgroundColor: '#D1ECF1',
  },
  confirmedBadge: {
    backgroundColor: '#CCE5FF',
  },
  pendingBadge: {
    backgroundColor: '#FFF3CD',
  },
  statusText: {
    ...FONTS.body5,
    fontWeight: 'bold',
  },
  completedText: {
    color: '#155724',
  },
  scheduledText: {
    color: '#0C5460',
  },
  confirmedText: {
    color: '#004085',
  },
  pendingText: {
    color: '#856404',
  },
  serviceName: {
    ...FONTS.h4,
    marginBottom: 4,
  },
  serviceNotes: {
    ...FONTS.body5,
    color: COLORS.darkGray,
    marginTop: 4,
    marginBottom: 8,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  serviceCost: {
    ...FONTS.body4,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  viewDetailsButton: {
    padding: 4,
  },
  viewDetailsText: {
    ...FONTS.body5,
    color: COLORS.primary,
  },
  appointmentItem: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  appointmentDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentDate: {
    ...FONTS.body4,
    fontWeight: 'bold',
    marginRight: 8,
  },
  appointmentTime: {
    ...FONTS.body4,
    color: COLORS.darkGray,
  },
  appointmentService: {
    ...FONTS.h4,
    marginBottom: 4,
  },
  appointmentVehicle: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    marginBottom: 12,
  },
  appointmentActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: 12,
  },
  appointmentAction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  appointmentActionText: {
    ...FONTS.body5,
    color: COLORS.primary,
    marginLeft: 4,
  },
  scheduleButton: {
    marginTop: 16,
  },
  footer: {
    flexDirection: 'row',
    padding: SIZES.padding,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  bookButton: {
    flex: 1,
    marginRight: 8,
  },
  editButton: {
    flex: 1,
    marginLeft: 8,
  },
});

export default CustomerDetails;
