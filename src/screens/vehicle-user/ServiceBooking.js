import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ServiceBooking = ({ route, navigation }) => {
  const { provider, service } = route.params || {};
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [vehicleInfo, setVehicleInfo] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Generate dates for the next 7 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      dates.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        full: date,
      });
    }
    
    return dates;
  };

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 8; // 8 AM
    const endHour = 18; // 6 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    
    return slots;
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !vehicleInfo) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }
    
    // In a real app, this would send the booking data to an API
    Alert.alert(
      'Booking Confirmed',
      `Your appointment with ${provider.name} has been scheduled for ${selectedDate.day}, ${selectedDate.month} ${selectedDate.date} at ${selectedTime}.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home')
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Book Service" 
        leftIcon="arrow-back"
        onLeftPress={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.content}>
        <View style={styles.providerInfo}>
          <Text style={styles.providerName}>{provider.name}</Text>
          {service && (
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceLabel}>Selected Service:</Text>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.servicePrice}>{service.price}</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.sectionTitle}>Select Date</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.datesContainer}
        >
          {generateDates().map((date, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.dateItem,
                selectedDate && selectedDate.date === date.date && styles.selectedDateItem
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Text 
                style={[
                  styles.dateDay,
                  selectedDate && selectedDate.date === date.date && styles.selectedDateText
                ]}
              >
                {date.day}
              </Text>
              <Text 
                style={[
                  styles.dateNumber,
                  selectedDate && selectedDate.date === date.date && styles.selectedDateText
                ]}
              >
                {date.date}
              </Text>
              <Text 
                style={[
                  styles.dateMonth,
                  selectedDate && selectedDate.date === date.date && styles.selectedDateText
                ]}
              >
                {date.month}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <Text style={styles.sectionTitle}>Select Time</Text>
        <View style={styles.timeContainer}>
          {generateTimeSlots().map((time, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.timeItem,
                selectedTime === time && styles.selectedTimeItem
              ]}
              onPress={() => setSelectedTime(time)}
            >
              <Text 
                style={[
                  styles.timeText,
                  selectedTime === time && styles.selectedTimeText
                ]}
              >
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <Text style={styles.sectionTitle}>Vehicle Information</Text>
        <Input 
          placeholder="e.g. Toyota Camry 2019, Black"
          value={vehicleInfo}
          onChangeText={setVehicleInfo}
        />
        
        <Text style={styles.sectionTitle}>Additional Notes (Optional)</Text>
        <Input 
          placeholder="Describe your issue or any special requirements"
          value={additionalNotes}
          onChangeText={setAdditionalNotes}
          multiline
          numberOfLines={4}
          style={styles.notesInput}
        />
        
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <TouchableOpacity style={styles.paymentOption}>
            <Icon name="cash" size={24} color={COLORS.primary} />
            <Text style={styles.paymentText}>Cash on Service</Text>
            <Icon name="check-circle" size={24} color={COLORS.primary} style={styles.checkIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}>
            <Icon name="credit-card" size={24} color={COLORS.darkGray} />
            <Text style={styles.paymentText}>Credit/Debit Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentOption}>
            <Icon name="bank" size={24} color={COLORS.darkGray} />
            <Text style={styles.paymentText}>Bank Transfer</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Booking Summary</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Service Provider:</Text>
            <Text style={styles.summaryValue}>{provider.name}</Text>
          </View>
          {service && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Service:</Text>
              <Text style={styles.summaryValue}>{service.name}</Text>
            </View>
          )}
          {selectedDate && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Date:</Text>
              <Text style={styles.summaryValue}>{`${selectedDate.day}, ${selectedDate.month} ${selectedDate.date}`}</Text>
            </View>
          )}
          {selectedTime && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Time:</Text>
              <Text style={styles.summaryValue}>{selectedTime}</Text>
            </View>
          )}
          {service && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Price:</Text>
              <Text style={styles.summaryValue}>{service.price}</Text>
            </View>
          )}
        </View>
        
        <Button 
          title="Confirm Booking" 
          onPress={handleBooking}
          style={styles.bookButton}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    padding: SIZES.padding,
  },
  providerInfo: {
    marginBottom: 20,
  },
  providerName: {
    ...FONTS.h3,
    marginBottom: 8,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  serviceLabel: {
    ...FONTS.body4,
    marginRight: 8,
  },
  serviceName: {
    ...FONTS.h4,
    marginRight: 8,
  },
  servicePrice: {
    ...FONTS.body4,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  sectionTitle: {
    ...FONTS.h4,
    marginTop: 20,
    marginBottom: 10,
  },
  datesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  dateItem: {
    width: 70,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray,
  },
  selectedDateItem: {
    backgroundColor: COLORS.primary,
  },
  dateDay: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  dateNumber: {
    ...FONTS.h3,
    marginVertical: 4,
  },
  dateMonth: {
    ...FONTS.body5,
    color: COLORS.darkGray,
  },
  selectedDateText: {
    color: COLORS.white,
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  timeItem: {
    width: '22%',
    paddingVertical: 10,
    alignItems: 'center',
    marginRight: '3%',
    marginBottom: 10,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray,
  },
  selectedTimeItem: {
    backgroundColor: COLORS.primary,
  },
  timeText: {
    ...FONTS.body5,
  },
  selectedTimeText: {
    color: COLORS.white,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  paymentSection: {
    marginVertical: 10,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray,
  },
  paymentText: {
    ...FONTS.body4,
    marginLeft: 12,
    flex: 1,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
  summarySection: {
    marginVertical: 10,
    padding: 16,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.mediumGray,
  },
  summaryLabel: {
    ...FONTS.body4,
    color: COLORS.darkGray,
  },
  summaryValue: {
    ...FONTS.body4,
    fontWeight: 'bold',
  },
  bookButton: {
    marginVertical: 20,
  },
});

export default ServiceBooking;
