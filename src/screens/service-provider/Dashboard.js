// src/screens/service-provider/Dashboard.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { mockAppointments, mockServiceRequests } from '../../utils/mockData';
import Button from '../../components/common/Button';

const ServiceProviderDashboard = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('requests');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'requests':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Pending Service Requests</Text>
            {mockServiceRequests.map((request, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.requestCard}
                onPress={() => navigation.navigate('RequestDetails', { request })}
              >
                <View style={styles.requestHeader}>
                  <Text style={styles.customerName}>{request.customerName}</Text>
                  <Text style={[styles.statusBadge, 
                    request.status === 'Pending' ? styles.pendingBadge : 
                    request.status === 'Accepted' ? styles.acceptedBadge : styles.completedBadge]}>
                    {request.status}
                  </Text>
                </View>
                <Text style={styles.vehicleInfo}>{request.vehicleInfo}</Text>
                <Text style={styles.serviceType}>{request.serviceType}</Text>
                <View style={styles.requestFooter}>
                  <Text style={styles.requestTime}>{request.requestTime}</Text>
                  <View style={styles.actionButtons}>
                    <Button 
                      title="Accept" 
                      onPress={() => console.log('Accept request', request.id)} 
                      style={styles.acceptButton}
                      small
                    />
                    <Button 
                      title="Decline" 
                      onPress={() => console.log('Decline request', request.id)} 
                      style={styles.declineButton}
                      small
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        );
      case 'appointments':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Today's Appointments</Text>
            {mockAppointments.map((appointment, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.appointmentCard}
                onPress={() => navigation.navigate('AppointmentDetails', { appointment })}
              >
                <View style={styles.appointmentHeader}>
                  <Text style={styles.appointmentTime}>{appointment.time}</Text>
                  <Text style={[styles.statusBadge, 
                    appointment.status === 'Scheduled' ? styles.scheduledBadge : 
                    appointment.status === 'In Progress' ? styles.progressBadge : styles.completedBadge]}>
                    {appointment.status}
                  </Text>
                </View>
                <Text style={styles.customerName}>{appointment.customerName}</Text>
                <Text style={styles.vehicleInfo}>{appointment.vehicleInfo}</Text>
                <Text style={styles.serviceType}>{appointment.serviceType}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      case 'analytics':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Performance Analytics</Text>
            <View style={styles.analyticsCard}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Completed Services</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>4.8</Text>
                <Text style={styles.statLabel}>Average Rating</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>₦85K</Text>
                <Text style={styles.statLabel}>Revenue</Text>
              </View>
            </View>
            <Text style={styles.sectionTitle}>Popular Services</Text>
            <View style={styles.analyticsCard}>
              <View style={styles.serviceStatItem}>
                <Text style={styles.serviceStatLabel}>Oil Change</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '75%' }]} />
                </View>
                <Text style={styles.serviceStatValue}>45%</Text>
              </View>
              <View style={styles.serviceStatItem}>
                <Text style={styles.serviceStatLabel}>Brake Service</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '40%' }]} />
                </View>
                <Text style={styles.serviceStatValue}>25%</Text>
              </View>
              <View style={styles.serviceStatItem}>
                <Text style={styles.serviceStatLabel}>Tire Replacement</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '30%' }]} />
                </View>
                <Text style={styles.serviceStatValue}>18%</Text>
              </View>
            </View>
          </View>
        );
      case 'inventory':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Parts Inventory</Text>
            <View style={styles.inventoryCard}>
              <View style={styles.inventoryHeader}>
                <Text style={styles.inventoryHeaderText}>Part Name</Text>
                <Text style={styles.inventoryHeaderText}>Quantity</Text>
                <Text style={styles.inventoryHeaderText}>Status</Text>
              </View>
              {[
                { name: 'Engine Oil', quantity: 24, status: 'In Stock' },
                { name: 'Oil Filter', quantity: 15, status: 'In Stock' },
                { name: 'Air Filter', quantity: 8, status: 'Low Stock' },
                { name: 'Brake Pads', quantity: 4, status: 'Low Stock' },
                { name: 'Spark Plugs', quantity: 0, status: 'Out of Stock' },
              ].map((item, index) => (
                <View key={index} style={styles.inventoryItem}>
                  <Text style={styles.partName}>{item.name}</Text>
                  <Text style={styles.partQuantity}>{item.quantity}</Text>
                  <Text style={[
                    styles.partStatus,
                    item.status === 'In Stock' ? styles.inStockText :
                    item.status === 'Low Stock' ? styles.lowStockText : styles.outOfStockText
                  ]}>{item.status}</Text>
                </View>
              ))}
            </View>
            <Button 
              title="Manage Inventory" 
              onPress={() => navigation.navigate('InventoryManagement')} 
              style={styles.manageButton}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mechanic Dashboard</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Icon name="bell" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCards}>
          <View style={styles.summaryCard}>
            <Icon name="calendar-check" size={28} color="#4CAF50" />
            <Text style={styles.summaryValue}>8</Text>
            <Text style={styles.summaryLabel}>Appointments</Text>
          </View>
          <View style={styles.summaryCard}>
            <Icon name="clock-outline" size={28} color="#FF9800" />
            <Text style={styles.summaryValue}>5</Text>
            <Text style={styles.summaryLabel}>Pending</Text>
          </View>
          <View style={styles.summaryCard}>
            <Icon name="star" size={28} color="#FFC107" />
            <Text style={styles.summaryValue}>4.8</Text>
            <Text style={styles.summaryLabel}>Rating</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'requests' && styles.activeTab]} 
            onPress={() => setActiveTab('requests')}
          >
            <Text style={[styles.tabText, activeTab === 'requests' && styles.activeTabText]}>Requests</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'appointments' && styles.activeTab]} 
            onPress={() => setActiveTab('appointments')}
          >
            <Text style={[styles.tabText, activeTab === 'appointments' && styles.activeTabText]}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'analytics' && styles.activeTab]} 
            onPress={() => setActiveTab('analytics')}
          >
            <Text style={[styles.tabText, activeTab === 'analytics' && styles.activeTabText]}>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'inventory' && styles.activeTab]} 
            onPress={() => setActiveTab('inventory')}
          >
            <Text style={[styles.tabText, activeTab === 'inventory' && styles.activeTabText]}>Inventory</Text>
          </TouchableOpacity>
        </View>

        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  summaryCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#007BFF',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabContent: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  requestCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
  },
  pendingBadge: {
    backgroundColor: '#FFF3CD',
    color: '#856404',
  },
  acceptedBadge: {
    backgroundColor: '#D1ECF1',
    color: '#0C5460',
  },
  completedBadge: {
    backgroundColor: '#D4EDDA',
    color: '#155724',
  },
  scheduledBadge: {
    backgroundColor: '#D1ECF1',
    color: '#0C5460',
  },
  progressBadge: {
    backgroundColor: '#CCE5FF',
    color: '#004085',
  },
  vehicleInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  serviceType: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  requestTime: {
    fontSize: 12,
    color: '#888',
  },
  requestFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  declineButton: {
    backgroundColor: '#F44336',
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
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
    marginBottom: 8,
  },
  appointmentTime: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  analyticsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  serviceStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  serviceStatLabel: {
    flex: 3,
    fontSize: 14,
    color: '#333',
  },
  progressBar: {
    flex: 6,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007BFF',
  },
  serviceStatValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'right',
  },
  inventoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inventoryHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 8,
    marginBottom: 8,
  },
  inventoryHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#555',
  },
  inventoryItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  partName: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  partQuantity: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  partStatus: {
    flex: 1,
    fontSize: 14,
    textAlign: 'right',
  },
  inStockText: {
    color: '#4CAF50',
  },
  lowStockText: {
    color: '#FF9800',
  },
  outOfStockText: {
    color: '#F44336',
  },
  manageButton: {
    marginTop: 8,
  },
});

export default ServiceProviderDashboard;