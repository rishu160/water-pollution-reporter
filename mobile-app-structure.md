# 📱 Mobile App Structure (React Native)

## React Native Implementation Guide

### Setup Commands:
```bash
# React Native CLI install करें
npm install -g react-native-cli

# New React Native project create करें
npx react-native init WaterPollutionReporter

# Required dependencies
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install react-native-maps react-native-geolocation-service
npm install react-native-image-picker react-native-permissions
npm install axios react-native-toast-message
npm install @react-native-async-storage/async-storage
```

### Key Mobile Features:

#### 1. **Camera Integration**
```javascript
// react-native-image-picker usage
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const takePhoto = () => {
  launchCamera({
    mediaType: 'photo',
    quality: 0.8,
    maxWidth: 1024,
    maxHeight: 1024
  }, (response) => {
    if (response.assets) {
      setPhotos([...photos, response.assets[0]]);
    }
  });
};
```

#### 2. **GPS Location**
```javascript
// react-native-geolocation-service usage
import Geolocation from 'react-native-geolocation-service';

const getCurrentLocation = () => {
  Geolocation.getCurrentPosition(
    (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    (error) => console.log(error),
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
};
```

#### 3. **Offline Storage**
```javascript
// AsyncStorage for offline reports
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveOfflineReport = async (reportData) => {
  try {
    const existingReports = await AsyncStorage.getItem('offlineReports');
    const reports = existingReports ? JSON.parse(existingReports) : [];
    reports.push({...reportData, timestamp: Date.now(), synced: false});
    await AsyncStorage.setItem('offlineReports', JSON.stringify(reports));
  } catch (error) {
    console.error('Error saving offline report:', error);
  }
};
```

#### 4. **Push Notifications**
```javascript
// react-native-push-notification setup
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function(notification) {
    if (notification.data.reportId) {
      // Navigate to specific report
      navigation.navigate('ReportDetail', {id: notification.data.reportId});
    }
  },
});
```

### Mobile-Specific Components:

#### 1. **ReportFormMobile.js**
```javascript
import React, {useState} from 'react';
import {
  View, Text, TextInput, TouchableOpacity, 
  Image, ScrollView, Alert
} from 'react-native';

const ReportFormMobile = () => {
  const [photos, setPhotos] = useState([]);
  const [location, setLocation] = useState(null);
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>प्रदूषण रिपोर्ट करें</Text>
      
      {/* Photo capture section */}
      <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
        <Text>📸 फोटो लें</Text>
      </TouchableOpacity>
      
      {/* Location section */}
      <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation}>
        <Text>📍 लोकेशन लें</Text>
      </TouchableOpacity>
      
      {/* Form fields */}
      <TextInput
        style={styles.input}
        placeholder="रिपोर्ट का शीर्षक"
        multiline
      />
      
      <TouchableOpacity style={styles.submitButton} onPress={submitReport}>
        <Text style={styles.submitText}>रिपोर्ट सबमिट करें</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
```

#### 2. **MapViewMobile.js**
```javascript
import React from 'react';
import MapView, {Marker} from 'react-native-maps';

const MapViewMobile = ({reports}) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 28.6139,
        longitude: 77.2090,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {reports.map((report) => (
        <Marker
          key={report._id}
          coordinate={{
            latitude: report.location.latitude,
            longitude: report.location.longitude
          }}
          title={report.title}
          description={report.description}
        />
      ))}
    </MapView>
  );
};
```

### Mobile App Architecture:

```
WaterPollutionReporter/
├── src/
│   ├── components/
│   │   ├── ReportCard.js
│   │   ├── PhotoPicker.js
│   │   ├── LocationPicker.js
│   │   └── StatusBadge.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── ReportFormScreen.js
│   │   ├── MapScreen.js
│   │   ├── DashboardScreen.js
│   │   └── ReportDetailScreen.js
│   ├── services/
│   │   ├── api.js
│   │   ├── location.js
│   │   ├── camera.js
│   │   └── storage.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── permissions.js
│   └── navigation/
│       └── AppNavigator.js
├── android/
├── ios/
└── package.json
```

### Permissions Required:

#### Android (android/app/src/main/AndroidManifest.xml):
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.INTERNET" />
```

#### iOS (ios/WaterPollutionReporter/Info.plist):
```xml
<key>NSCameraUsageDescription</key>
<string>This app needs camera access to take photos of water pollution</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>This app needs location access to mark pollution reports</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>This app needs photo library access to select images</string>
```

### Build Commands:

```bash
# Android build
npx react-native run-android

# iOS build (Mac only)
npx react-native run-ios

# Release build for Android
cd android
./gradlew assembleRelease

# Release build for iOS
npx react-native run-ios --configuration Release
```

### Mobile-Specific Features:

1. **Offline Mode** - Reports save locally when no internet
2. **Background Sync** - Auto-upload when connection restored
3. **Push Notifications** - Status updates from authorities
4. **Native Camera** - Better photo quality and performance
5. **GPS Integration** - More accurate location detection
6. **Biometric Auth** - Fingerprint/Face ID for secure access
7. **Dark Mode** - System theme support
8. **Haptic Feedback** - Better user experience

### Performance Optimizations:

1. **Image Compression** - Reduce file sizes before upload
2. **Lazy Loading** - Load reports as needed
3. **Caching** - Store frequently accessed data
4. **Background Tasks** - Sync data in background
5. **Memory Management** - Proper cleanup of resources

यह structure आपको एक complete mobile app बनाने में मदद करेगा जो web version के साथ perfectly integrate होगा।