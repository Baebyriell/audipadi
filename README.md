# AutoPadi - Vehicle Service App

AudiPadi is a comprehensive mobile application designed to connect vehicle owners with auto service providers and emergency services. The app facilitates service search, booking, and management for vehicle maintenance and emergency assistance.

## Features

### For Vehicle Users
- **Service Search & Request**: Find and request auto services based on location, ratings, and service types
- **Location Detection**: Discover nearby service providers
- **Emergency Services**: Quick access to roadside assistance and towing services
- **Profile Management**: Manage user profile and vehicle information
- **Service Booking**: Schedule service appointments
- **Service History**: Track maintenance records and past services
- **Notifications**: Receive updates on appointments, service reminders, and promotions
- **In-app Chat**: Communicate with service providers
- **Ratings and Reviews**: Rate and review service providers
- **Directions**: Get directions to service providers

### For Auto Service Providers
- **Service Listings**: Display available services with pricing
- **Service Requests**: Receive and respond to customer requests
- **Scheduling**: Manage availability and appointments
- **Customer Management**: Access customer profiles and service history
- **Profile Management**: Manage business information and service offerings
- **Location Services**: Be discoverable by nearby customers
- **Invoice Generation**: Create and send invoices
- **Feedback & Ratings**: View and respond to customer reviews
- **In-app Chat**: Communicate with customers

### For Emergency Services
- **Location Detection**: Find users in emergency situations
- **Quick Access**: Be easily accessible to users in emergencies
- **Route Optimization**: Find the fastest route to the emergency location
- **Service Requests**: Receive emergency alerts and requests

## Technology Stack

- **Frontend**: React Native with Expo
- **Navigation**: React Navigation (Stack and Tab navigators)
- **State Management**: React Context API and Hooks
- **Maps & Location**: Expo Location and React Native Maps
- **UI Components**: Custom components with React Native
- **Storage**: AsyncStorage for local data persistence
- **Forms**: Formik with Yup validation

## Project Structure

```
autopadi/
├── src/
│   ├── assets/              # Images, icons, and other static assets
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Shared components (Button, Input, etc.)
│   │   ├── vehicle-user/    # Components specific to vehicle users
│   │   ├── service-provider/ # Components specific to service providers
│   │   └── emergency/       # Components specific to emergency services
│   ├── constants/           # App constants and theme configuration
│   ├── navigation/          # Navigation configuration
│   ├── screens/             # Screen components
│   │   ├── auth/            # Authentication screens
│   │   ├── vehicle-user/    # Vehicle user screens
│   │   ├── service-provider/ # Service provider screens
│   │   ├── emergency/       # Emergency service screens
│   │   └── common/          # Shared screens
│   └── utils/               # Utility functions and helpers
├── App.tsx                  # Main app component
├── app.json                 # Expo configuration
└── package.json             # Dependencies and scripts
```

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/audipadi.git
cd audipadi
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Run on a device or emulator
- Scan the QR code with the Expo Go app on your device
- Press 'a' to run on an Android emulator
- Press 'i' to run on an iOS simulator

## User Types

The app supports three types of users:
1. **Vehicle Owners**: Users who own vehicles and seek services
2. **Service Providers**: Auto repair shops, mechanics, and other service businesses
3. **Emergency Services**: Towing services, roadside assistance providers

## Future Enhancements

- Payment integration
- Service provider verification system
- Advanced analytics for service providers
- Maintenance scheduling and reminders
- Vehicle diagnostics integration
- Loyalty program for frequent users

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Icons provided by Material Community Icons
- Sample images from Unsplash
