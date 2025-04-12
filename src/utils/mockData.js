// Mock data for testing the app

export const services = [
  {
    id: '1',
    name: 'AutoFix Mechanics',
    category: 'Mechanic',
    rating: 4.8,
    reviews: 156,
    price: '₦5,000',
    distance: '2.3 km',
    image: 'https://images.unsplash.com/photo-1599256621730-535171e28e50?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    isOpen: true,
    isFeatured: true,
    address: '123 Main Street, Kumasi, Ghana',
    phone: '+233 50 123 4567',
    email: 'info@autofixmechanics.com',
    website: 'www.autofixmechanics.com',
    hours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '9:00 AM - 4:00 PM',
      sunday: 'Closed'
    },
    description: 'AutoFix Mechanics is a full-service auto repair shop specializing in all makes and models. Our certified technicians provide quality service at affordable prices.',
    services: [
      { name: 'Oil Change', price: '₦5,000', duration: '30 mins' },
      { name: 'Brake Service', price: '₦15,000', duration: '1 hour' },
      { name: 'Engine Diagnostic', price: '₦7,500', duration: '45 mins' },
      { name: 'Tire Rotation', price: '₦3,000', duration: '30 mins' },
      { name: 'Battery Replacement', price: '₦12,000', duration: '20 mins' },
      { name: 'AC Service', price: '₦10,000', duration: '1 hour' }
    ],
    reviews: [
      { id: 'r1', user: 'John D.', rating: 5, comment: 'Great service, very professional and quick.', date: '2023-04-15' },
      { id: 'r2', user: 'Sarah M.', rating: 4, comment: 'Good work but a bit pricey.', date: '2023-04-10' },
      { id: 'r3', user: 'Michael T.', rating: 5, comment: 'Fixed my car when others couldn\'t. Highly recommend!', date: '2023-04-05' }
    ]
  },
  {
    id: '2',
    name: 'QuickTow Services',
    category: 'Towing',
    rating: 4.5,
    reviews: 89,
    price: '₦10,000',
    distance: '5.1 km',
    image: 'https://images.unsplash.com/photo-1562920618-5e394c3a1e1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    isOpen: true,
    isFeatured: false,
    address: '456 Oak Street, Kumasi, Ghana',
    phone: '+233 50 987 6543',
    email: 'help@quicktow.com',
    website: 'www.quicktow.com',
    hours: {
      monday: '24 hours',
      tuesday: '24 hours',
      wednesday: '24 hours',
      thursday: '24 hours',
      friday: '24 hours',
      saturday: '24 hours',
      sunday: '24 hours'
    },
    description: 'QuickTow provides fast and reliable towing services for all vehicle types. We offer 24/7 emergency towing, roadside assistance, and long-distance towing.',
    services: [
      { name: 'Local Towing', price: '₦10,000', duration: 'Varies' },
      { name: 'Long Distance Towing', price: '₦25,000+', duration: 'Varies' },
      { name: 'Roadside Assistance', price: '₦7,500', duration: '30 mins' },
      { name: 'Flat Tire Change', price: '₦5,000', duration: '20 mins' },
      { name: 'Jump Start', price: '₦5,000', duration: '15 mins' },
      { name: 'Fuel Delivery', price: '₦6,000', duration: 'Varies' }
    ],
    reviews: [
      { id: 'r1', user: 'David L.', rating: 5, comment: 'Arrived within 15 minutes of my call. Very professional.', date: '2023-04-12' },
      { id: 'r2', user: 'Emily W.', rating: 4, comment: 'Good service but a bit expensive.', date: '2023-04-08' },
      { id: 'r3', user: 'Robert K.', rating: 5, comment: 'Saved me when I was stranded at night. Highly recommend!', date: '2023-04-01' }
    ]
  },
  {
    id: '3',
    name: 'TirePro Express',
    category: 'Tire',
    rating: 4.6,
    reviews: 112,
    price: '₦8,000',
    distance: '3.7 km',
    image: 'https://images.unsplash.com/photo-1580983218765-f663bec07b37?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    isOpen: true,
    isFeatured: false,
    address: '789 Pine Avenue, Kumasi, Ghana',
    phone: '+233 50 456 7890',
    email: 'service@tireproexpress.com',
    website: 'www.tireproexpress.com',
    hours: {
      monday: '7:30 AM - 7:00 PM',
      tuesday: '7:30 AM - 7:00 PM',
      wednesday: '7:30 AM - 7:00 PM',
      thursday: '7:30 AM - 7:00 PM',
      friday: '7:30 AM - 7:00 PM',
      saturday: '8:00 AM - 5:00 PM',
      sunday: '10:00 AM - 4:00 PM'
    },
    description: 'TirePro Express offers a wide selection of tires for all vehicle types. We provide tire sales, installation, rotation, balancing, and repair services.',
    services: [
      { name: 'Tire Replacement', price: '₦8,000+', duration: '30 mins' },
      { name: 'Tire Rotation', price: '₦3,000', duration: '20 mins' },
      { name: 'Wheel Balancing', price: '₦4,000', duration: '30 mins' },
      { name: 'Flat Tire Repair', price: '₦2,500', duration: '15 mins' },
      { name: 'Tire Pressure Check', price: 'Free', duration: '5 mins' },
      { name: 'Wheel Alignment', price: '₦7,500', duration: '45 mins' }
    ],
    reviews: [
      { id: 'r1', user: 'Jennifer A.', rating: 5, comment: 'Great prices and fast service!', date: '2023-04-14' },
      { id: 'r2', user: 'Thomas B.', rating: 4, comment: 'Good selection of tires and knowledgeable staff.', date: '2023-04-09' },
      { id: 'r3', user: 'Lisa M.', rating: 5, comment: 'Fixed my flat tire in no time. Very satisfied!', date: '2023-04-03' }
    ]
  },
  {
    id: '4',
    name: 'PowerCell Battery Shop',
    category: 'Battery',
    rating: 4.7,
    reviews: 78,
    price: '₦12,000',
    distance: '4.2 km',
    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    isOpen: false,
    isFeatured: false,
    address: '321 Maple Road, Kumasi, Ghana',
    phone: '+233 50 234 5678',
    email: 'info@powercellbattery.com',
    website: 'www.powercellbattery.com',
    hours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '9:00 AM - 5:00 PM',
      sunday: 'Closed'
    },
    description: 'PowerCell Battery Shop specializes in automotive batteries for all vehicle makes and models. We offer battery testing, replacement, and recycling services.',
    services: [
      { name: 'Battery Replacement', price: '₦12,000+', duration: '20 mins' },
      { name: 'Battery Testing', price: 'Free', duration: '10 mins' },
      { name: 'Alternator Testing', price: '₦2,000', duration: '15 mins' },
      { name: 'Jump Start', price: '₦5,000', duration: '15 mins' },
      { name: 'Battery Recycling', price: 'Free', duration: '5 mins' },
      { name: 'Electrical System Check', price: '₦6,000', duration: '30 mins' }
    ],
    reviews: [
      { id: 'r1', user: 'Richard T.', rating: 5, comment: 'Great service and fair prices for quality batteries.', date: '2023-04-13' },
      { id: 'r2', user: 'Karen S.', rating: 4, comment: 'Quick and efficient battery replacement.', date: '2023-04-07' },
      { id: 'r3', user: 'Daniel P.', rating: 5, comment: 'They diagnosed my electrical issue when other shops couldn\'t. Highly recommend!', date: '2023-04-02' }
    ]
  },
  {
    id: '5',
    name: 'LubeXpress',
    category: 'Oil Change',
    rating: 4.4,
    reviews: 95,
    price: '₦4,500',
    distance: '1.8 km',
    image: 'https://images.unsplash.com/photo-1636358837753-7ede5a7e3d5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    isOpen: true,
    isFeatured: true,
    address: '654 Elm Street, Kumasi, Ghana',
    phone: '+233 50 345 6789',
    email: 'service@lubexpress.com',
    website: 'www.lubexpress.com',
    hours: {
      monday: '7:00 AM - 8:00 PM',
      tuesday: '7:00 AM - 8:00 PM',
      wednesday: '7:00 AM - 8:00 PM',
      thursday: '7:00 AM - 8:00 PM',
      friday: '7:00 AM - 8:00 PM',
      saturday: '8:00 AM - 6:00 PM',
      sunday: '9:00 AM - 5:00 PM'
    },
    description: 'LubeXpress provides quick and affordable oil change services. No appointment necessary - just drive in and we\'ll have you back on the road in minutes.',
    services: [
      { name: 'Basic Oil Change', price: '₦4,500', duration: '15 mins' },
      { name: 'Synthetic Oil Change', price: '₦7,500', duration: '15 mins' },
      { name: 'Oil & Filter Change', price: '₦6,000', duration: '20 mins' },
      { name: 'Fluid Top-Off', price: '₦2,000', duration: '10 mins' },
      { name: 'Air Filter Replacement', price: '₦3,000', duration: '10 mins' },
      { name: 'Wiper Blade Replacement', price: '₦2,500', duration: '5 mins' }
    ],
    reviews: [
      { id: 'r1', user: 'Michelle K.', rating: 5, comment: 'In and out in 15 minutes! Great service.', date: '2023-04-14' },
      { id: 'r2', user: 'Brian J.', rating: 4, comment: 'Quick service but a bit crowded.', date: '2023-04-06' },
      { id: 'r3', user: 'Amanda L.', rating: 4, comment: 'Good value for synthetic oil change.', date: '2023-04-01' }
    ]
  }
];

export const emergencyServices = [
  {
    id: 'e1',
    name: 'Rapid Roadside Assistance',
    category: 'Roadside Assistance',
    rating: 4.9,
    reviews: 203,
    responseTime: '10-15 mins',
    distance: '2.5 km',
    image: 'https://images.unsplash.com/photo-1562920618-5e394c3a1e1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    isAvailable: true,
    phone: '+233 50 111 2222',
    services: [
      { name: 'Towing', price: '₦10,000+' },
      { name: 'Jump Start', price: '₦5,000' },
      { name: 'Flat Tire', price: '₦5,000' },
      { name: 'Fuel Delivery', price: '₦6,000' },
      { name: 'Lockout Service', price: '₦7,000' }
    ]
  },
  {
    id: 'e2',
    name: 'SOS Emergency Towing',
    category: 'Towing',
    rating: 4.7,
    reviews: 156,
    responseTime: '15-20 mins',
    distance: '3.8 km',
    image: 'https://images.unsplash.com/photo-1562920618-5e394c3a1e1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    isAvailable: true,
    phone: '+233 50 333 4444',
    services: [
      { name: 'Local Towing', price: '₦10,000' },
      { name: 'Long Distance Towing', price: '₦25,000+' },
      { name: 'Motorcycle Towing', price: '₦8,000' },
      { name: 'Heavy Vehicle Towing', price: '₦30,000+' }
    ]
  },
  {
    id: 'e3',
    name: 'QuickFix Mobile Mechanics',
    category: 'Mobile Mechanic',
    rating: 4.6,
    reviews: 118,
    responseTime: '20-30 mins',
    distance: '4.2 km',
    image: 'https://images.unsplash.com/photo-1599256621730-535171e28e50?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    isAvailable: true,
    phone: '+233 50 555 6666',
    services: [
      { name: 'On-Site Diagnosis', price: '₦5,000' },
      { name: 'Battery Replacement', price: '₦12,000+' },
      { name: 'Starter Repair', price: '₦15,000+' },
      { name: 'Belt Replacement', price: '₦8,000+' },
      { name: 'Fluid Leaks', price: 'Varies' }
    ]
  }
];

export const serviceHistory = [
  {
    id: 'h1',
    serviceName: 'AutoFix Mechanics',
    serviceType: 'Oil Change',
    date: '2023-04-10',
    time: '10:30 AM',
    price: '₦5,000',
    status: 'Completed',
    rating: 5,
    notes: 'Used synthetic oil as requested',
    invoice: 'INV-2023-0412',
    serviceProvider: {
      id: '1',
      name: 'AutoFix Mechanics',
      phone: '+233 50 123 4567'
    }
  },
  {
    id: 'h2',
    serviceName: 'TirePro Express',
    serviceType: 'Tire Rotation',
    date: '2023-03-22',
    time: '2:00 PM',
    price: '₦3,000',
    status: 'Completed',
    rating: 4,
    notes: '',
    invoice: 'INV-2023-0325',
    serviceProvider: {
      id: '3',
      name: 'TirePro Express',
      phone: '+233 50 456 7890'
    }
  },
  {
    id: 'h3',
    serviceName: 'QuickTow Services',
    serviceType: 'Towing',
    date: '2023-02-15',
    time: '8:45 PM',
    price: '₦12,000',
    status: 'Completed',
    rating: 5,
    notes: 'Emergency towing after breakdown',
    invoice: 'INV-2023-0216',
    serviceProvider: {
      id: '2',
      name: 'QuickTow Services',
      phone: '+233 50 987 6543'
    }
  },
  {
    id: 'h4',
    serviceName: 'AutoFix Mechanics',
    serviceType: 'Brake Service',
    date: '2023-01-30',
    time: '11:00 AM',
    price: '₦15,000',
    status: 'Completed',
    rating: 5,
    notes: 'Replaced front brake pads',
    invoice: 'INV-2023-0131',
    serviceProvider: {
      id: '1',
      name: 'AutoFix Mechanics',
      phone: '+233 50 123 4567'
    }
  }
];

export const upcomingAppointments = [
  {
    id: 'a1',
    serviceName: 'LubeXpress',
    serviceType: 'Oil Change',
    date: '2023-05-15',
    time: '9:00 AM',
    price: '₦4,500',
    status: 'Scheduled',
    notes: 'Regular maintenance',
    serviceProvider: {
      id: '5',
      name: 'LubeXpress',
      phone: '+233 50 345 6789',
      address: '654 Elm Street, Kumasi, Ghana'
    }
  }
];

export const vehicleData = [
  {
    id: 'v1',
    make: 'Toyota',
    model: 'Camry',
    year: '2019',
    color: 'Silver',
    licensePlate: 'GH-1234-19',
    vin: 'ABC123XYZ456789',
    fuelType: 'Petrol',
    transmission: 'Automatic',
    lastService: '2023-04-10',
    mileage: '35,000 km',
    insurance: {
      provider: 'SafeAuto Insurance',
      policyNumber: 'POL-12345-67',
      expiryDate: '2023-12-31'
    },
    documents: [
      { id: 'd1', name: 'Registration', expiryDate: '2023-10-15' },
      { id: 'd2', name: 'Insurance', expiryDate: '2023-12-31' },
      { id: 'd3', name: 'Roadworthy Certificate', expiryDate: '2024-01-15' }
    ]
  }
];

export const notifications = [
  {
    id: 'n1',
    title: 'Service Reminder',
    message: 'Your Toyota Camry is due for an oil change in 3 days.',
    date: '2023-05-12',
    time: '8:00 AM',
    read: false,
    type: 'reminder'
  },
  {
    id: 'n2',
    title: 'Appointment Confirmed',
    message: 'Your appointment with LubeXpress on May 15 at 9:00 AM has been confirmed.',
    date: '2023-05-10',
    time: '2:30 PM',
    read: true,
    type: 'appointment'
  },
  {
    id: 'n3',
    title: 'Special Offer',
    message: 'AutoFix Mechanics is offering 20% off on all brake services this week!',
    date: '2023-05-08',
    time: '10:15 AM',
    read: true,
    type: 'promotion'
  },
  {
    id: 'n4',
    title: 'Document Expiring',
    message: 'Your vehicle registration will expire in 30 days. Remember to renew it.',
    date: '2023-05-05',
    time: '9:00 AM',
    read: true,
    type: 'reminder'
  }
];

export default {
  services,
  emergencyServices,
  serviceHistory,
  upcomingAppointments,
  vehicleData,
  notifications
};
