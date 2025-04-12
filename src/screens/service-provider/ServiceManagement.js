(Promise may not be supported in the following browsers: IE
    Promise(27, 18): MDN Documentation
    var Promise: PromiseConstructor
    new <any>(executor: (resolve: (value: any) => void, reject: (reason?: any) => void) => void) => Promise<any>
    Creates a new Promise.
    
    @param executor
    A callback used to initialize the promise. This callback is passed two arguments: a resolve callback used to resolve the promise with a value or the result of another promise, and a reject callback used to reject the promise with a provided reason or error.import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Modal, ScrollView, Alert } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ServiceManagement = ({ navigation }) => {
  const [services, setServices] = useState([
    { id: '1', name: 'Oil Change', price: '₦5,000', description: 'Full synthetic oil change service', isActive: true },
    { id: '2', name: 'Brake Service', price: '₦15,000', description: 'Brake pad replacement and inspection', isActive: true },
    { id: '3', name: 'Tire Rotation', price: '₦3,000', description: 'Rotate and balance all tires', isActive: true },
    { id: '4', name: 'Engine Diagnostic', price: '₦7,500', description: 'Full computer diagnostic of engine systems', isActive: false },
    { id: '5', name: 'AC Service', price: '₦12,000', description: 'Air conditioning system check and recharge', isActive: true },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceActive, setServiceActive] = useState(true);

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddService = () => {
    setEditingService(null);
    setServiceName('');
    setServicePrice('');
    setServiceDescription('');
    setServiceActive(true);
    setModalVisible(true);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceName(service.name);
    setServicePrice(service.price);
    setServiceDescription(service.description);
    setServiceActive(service.isActive);
    setModalVisible(true);
  };

  const handleDeleteService = (serviceId) => {
    Alert.alert(
      'Delete Service',
      'Are you sure you want to delete this service?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => {
            setServices(services.filter(service => service.id !== serviceId));
          },
          style: 'destructive'
        }
      ]
    );
  };

  const handleToggleServiceStatus = (serviceId) => {
    setServices(
      services.map(service => 
        service.id === serviceId 
          ? { ...service, isActive: !service.isActive } 
          : service
      )
    );
  };

  const handleSaveService = () => {
    if (!serviceName || !servicePrice) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (editingService) {
      // Update existing service
      setServices(
        services.map(service => 
          service.id === editingService.id 
            ? { 
                ...service, 
                name: serviceName, 
                price: servicePrice, 
                description: serviceDescription,
                isActive: serviceActive
              } 
            : service
        )
      );
    } else {
      // Add new service
      const newService = {
        id: Date.now().toString(),
        name: serviceName,
        price: servicePrice,
        description: serviceDescription,
        isActive: serviceActive
      };
      setServices([...services, newService]);
    }

    setModalVisible(false);
  };

  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceItem}>
      <View style={styles.serviceHeader}>
        <View style={styles.serviceNameContainer}>
          <Text style={styles.serviceName}>{item.name}</Text>
          <View 
            style={[
              styles.statusBadge,
              item.isActive ? styles.activeBadge : styles.inactiveBadge
            ]}
          >
            <Text 
              style={[
                styles.statusText,
                item.isActive ? styles.activeText : styles.inactiveText
              ]}
            >
              {item.isActive ? 'Active' : 'Inactive'}
            </Text>
          </View>
        </View>
        <Text style={styles.servicePrice}>{item.price}</Text>
      </View>
      
      <Text style={styles.serviceDescription}>{item.description}</Text>
      
      <View style={styles.serviceActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleToggleServiceStatus(item.id)}
        >
          <Icon 
            name={item.isActive ? 'eye-off-outline' : 'eye-outline'} 
            size={20} 
            color={COLORS.primary} 
          />
          <Text style={styles.actionText}>
            {item.isActive ? 'Deactivate' : 'Activate'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleEditService(item)}
        >
          <Icon name="pencil-outline" size={20} color={COLORS.primary} />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteService(item.id)}
        >
          <Icon name="delete-outline" size={20} color={COLORS.error} />
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Service Management" 
        leftIcon="menu"
        onLeftPress={() => {}}
      />
      
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color={COLORS.darkGray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search services..."
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
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{services.length}</Text>
          <Text style={styles.statLabel}>Total Services</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {services.filter(service => service.isActive).length}
          </Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {services.filter(service => !service.isActive).length}
          </Text>
          <Text style={styles.statLabel}>Inactive</Text>
        </View>
      </View>
      
      <FlatList
        data={filteredServices}
        renderItem={renderServiceItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="package-variant" size={60} color={COLORS.lightGray} />
            <Text style={styles.emptyText}>No services found</Text>
          </View>
        }
      />
      
      <TouchableOpacity 
        style={styles.addButton}
        onPress={handleAddService}
      >
        <Icon name="plus" size={24} color={COLORS.white} />
      </TouchableOpacity>
      
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingService ? 'Edit Service' : 'Add New Service'}
              </Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Icon name="close" size={24} color={COLORS.darkGray} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalContent}>
              <Input 
                label="Service Name *"
                placeholder="Enter service name"
                value={serviceName}
                onChangeText={setServiceName}
              />
              
              <Input 
                label="Price *"
                placeholder="Enter price (e.g. ₦5,000)"
                value={servicePrice}
                onChangeText={setServicePrice}
                keyboardType="numeric"
              />
              
              <Input 
                label="Description"
                placeholder="Enter service description"
                value={serviceDescription}
                onChangeText={setServiceDescription}
                multiline
                numberOfLines={3}
                style={styles.descriptionInput}
              />
              
              <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>Service Status</Text>
                <View style={styles.switchRow}>
                  <Text style={styles.switchText}>
                    {serviceActive ? 'Active' : 'Inactive'}
                  </Text>
                  <TouchableOpacity 
                    style={[
                      styles.switchButton,
                      serviceActive ? styles.switchActive : styles.switchInactive
                    ]}
                    onPress={() => setServiceActive(!serviceActive)}
                  >
                    <View 
                      style={[
                        styles.switchThumb,
                        serviceActive ? styles.switchThumbActive : styles.switchThumbInactive
                      ]} 
                    />
                  </TouchableOpacity>
                </View>
              </View>
              
              <Button 
                title="Save Service" 
                onPress={handleSaveService}
                style={styles.saveButton}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    marginBottom: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...FONTS.h3,
    color: COLORS.primary,
  },
  statLabel: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  listContent: {
    padding: SIZES.padding,
    paddingBottom: 80, // Extra padding for FAB
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
  serviceNameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceName: {
    ...FONTS.h4,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: '#D4EDDA',
  },
  inactiveBadge: {
    backgroundColor: '#F8D7DA',
  },
  statusText: {
    ...FONTS.body5,
    fontWeight: 'bold',
  },
  activeText: {
    color: '#155724',
  },
  inactiveText: {
    color: '#721C24',
  },
  servicePrice: {
    ...FONTS.h4,
    color: COLORS.primary,
  },
  serviceDescription: {
    ...FONTS.body4,
    color: COLORS.darkGray,
    marginBottom: 12,
  },
  serviceActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    ...FONTS.body5,
    color: COLORS.primary,
    marginLeft: 4,
  },
  deleteButton: {
    marginLeft: 'auto',
  },
  deleteText: {
    ...FONTS.body5,
    color: COLORS.error,
    marginLeft: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  modalTitle: {
    ...FONTS.h3,
  },
  closeButton: {
    padding: 5,
  },
  modalContent: {
    padding: SIZES.padding,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  switchContainer: {
    marginBottom: 20,
  },
  switchLabel: {
    ...FONTS.body4,
    marginBottom: 8,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchText: {
    ...FONTS.body4,
  },
  switchButton: {
    width: 50,
    height: 30,
    borderRadius: 15,
    padding: 2,
  },
  switchActive: {
    backgroundColor: COLORS.primary,
  },
  switchInactive: {
    backgroundColor: COLORS.lightGray,
  },
  switchThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.white,
  },
  switchThumbActive: {
    alignSelf: 'flex-end',
  },
  switchThumbInactive: {
    alignSelf: 'flex-start',
  },
  saveButton: {
    marginTop: 20,
    marginBottom: 30,
  },
});

export default ServiceManagement;
