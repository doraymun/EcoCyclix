import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Animated, StyleSheet, View, Dimensions, Image, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import * as Location from 'expo-location';
import { images } from "@/constants";
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'

type Page = 'profile' | 'payment' | 'history' | 'settings' | 'help';

export default function Home() {
  const router = useRouter();

  const [mapRegion, setMapRegion] = useState({
    latitude: 14.59037,
    longitude: 121.02531,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownHeight = useRef(new Animated.Value(0)).current;
  const [parkingSlots, setParkingSlots] = useState(Array(8).fill('green')); // All slots available initially
  const [showParkingButtons, setShowParkingButtons] = useState(false);
  const [name, setName] = useState('user')

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setMapRegion({
      latitude: 14.59037,
      longitude: 121.02531,
      latitudeDelta: 0.050,
      longitudeDelta: 0.050,
    });
  };

  useEffect(() => {
    userLocation();
  }, []);

  const fixedMarker = {
    latitude: 14.59037,
    longitude: 121.02531,
  };

  const CustomMarker = () => (
    <Image
      source={images.ecocyclixMarker}
      style={styles.markerImage}
      resizeMode="contain"
    />
  );

  const handleMarkerPress = () => {
    setShowParkingButtons(true);
  };

  const handleHamburgerPress = () => {
    setDropdownVisible(prev => !prev);
    Animated.timing(dropdownHeight, {
      toValue: dropdownVisible ? 0 : Dimensions.get('window').height * 0.4,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      if (dropdownVisible) {
        setDropdownVisible(false);
      }
    });
  };

  const handleOutsidePress = () => {
    if (dropdownVisible) {
      Animated.timing(dropdownHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setDropdownVisible(false);
      });
    }
    // Hide parking buttons if they are visible
    // if (showParkingButtons) {
    //   setShowParkingButtons(false);
    // }
  };

  const handleSlotPress = (slotIndex: number) => {
    if (showParkingButtons) {
      router.replace('/(root)/(tabs)/payment')
    }
  };

  const handleNavigation = (page: Page) => {
    console.log(`Navigating to ${page}`);
    router.push(`/${page}`);
  };

  const parkingSlotMarker1 = {
    latitude: (fixedMarker.latitude + (60 * Math.sin((0 * (360 / 8)) * (Math.PI / 180))) / 111300),
    longitude: (fixedMarker.longitude + (60 * Math.cos((0 * (360 / 8)) * (Math.PI / 180))) / (111300 * Math.cos(fixedMarker.latitude * (Math.PI / 180))))
  };

  const parkingSlotMarker2 = {
    latitude: (fixedMarker.latitude + (60 * Math.sin((1 * (360 / 8)) * (Math.PI / 180))) / 111300),
    longitude: (fixedMarker.longitude + (60 * Math.cos((1 * (360 / 8)) * (Math.PI / 180))) / (111300 * Math.cos(fixedMarker.latitude * (Math.PI / 180))))
  };

  const parkingSlotMarker3 = {
    latitude: (fixedMarker.latitude + (60 * Math.sin((2 * (360 / 8)) * (Math.PI / 180))) / 111300),
    longitude: (fixedMarker.longitude + (60 * Math.cos((2 * (360 / 8)) * (Math.PI / 180))) / (111300 * Math.cos(fixedMarker.latitude * (Math.PI / 180))))
  };

  const parkingSlotMarker4 = {
    latitude: (fixedMarker.latitude + (60 * Math.sin((3 * (360 / 8)) * (Math.PI / 180))) / 111300),
    longitude: (fixedMarker.longitude + (60 * Math.cos((3 * (360 / 8)) * (Math.PI / 180))) / (111300 * Math.cos(fixedMarker.latitude * (Math.PI / 180))))
  };

  const parkingSlotMarker5 = {
    latitude: (fixedMarker.latitude + (60 * Math.sin((4 * (360 / 8)) * (Math.PI / 180))) / 111300),
    longitude: (fixedMarker.longitude + (60 * Math.cos((4 * (360 / 8)) * (Math.PI / 180))) / (111300 * Math.cos(fixedMarker.latitude * (Math.PI / 180))))
  };

  const parkingSlotMarker6 = {
    latitude: (fixedMarker.latitude + (60 * Math.sin((5 * (360 / 8)) * (Math.PI / 180))) / 111300),
    longitude: (fixedMarker.longitude + (60 * Math.cos((5 * (360 / 8)) * (Math.PI / 180))) / (111300 * Math.cos(fixedMarker.latitude * (Math.PI / 180))))
  };

  const parkingSlotMarker7 = {
    latitude: (fixedMarker.latitude + (60 * Math.sin((6 * (360 / 8)) * (Math.PI / 180))) / 111300),
    longitude: (fixedMarker.longitude + (60 * Math.cos((6 * (360 / 8)) * (Math.PI / 180))) / (111300 * Math.cos(fixedMarker.latitude * (Math.PI / 180))))
  };

  const parkingSlotMarker8 = {
    latitude: (fixedMarker.latitude + (60 * Math.sin((7 * (360 / 8)) * (Math.PI / 180))) / 111300),
    longitude: (fixedMarker.longitude + (60 * Math.cos((7 * (360 / 8)) * (Math.PI / 180))) / (111300 * Math.cos(fixedMarker.latitude * (Math.PI / 180))))
  };

  AsyncStorage.getItem('ecocyclix-appdata', (error, result) => {
    let appData: {
        isAlreadyInit:boolean,
        user:{
            id:number,
            firstName:string,
            middleName:string,
            lastName:string,
            email:string,
            error:{ message:string} }
    } = (result != null || result != undefined) ? JSON.parse(result.replace('\\', '')) : {};

    if (result != null || result != undefined) {
      setName((appData.user.firstName + ' ' + appData.user.lastName))
    }
  })

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <MapView style={styles.map} region={mapRegion}>
          {/* <Marker coordinate={mapRegion} title="Your location" /> */}
          <Marker coordinate={fixedMarker} onPress={handleMarkerPress}>
            <CustomMarker />
          </Marker>

          <Marker
            key={0}
            coordinate={parkingSlotMarker1}
            title={(showParkingButtons) ? `Slot ${0 + 1}` : ''}
            pinColor={'green'} // Color based on availability
            onPress={() => handleSlotPress(0)}
            opacity={(showParkingButtons) ? 1 : 0}
          >
            <TouchableOpacity
              style={styles.parkingButton}
              // Call the handler with the index
            >
              <Text style={styles.parkingText}>{0 + 1}</Text>
            </TouchableOpacity>
          </Marker>

          <Marker
            key={1}
            coordinate={parkingSlotMarker2}
            title={`Slot ${1 + 1}`}
            pinColor={'green'} // Color based on availability
            onPress={() => handleSlotPress(0)}
            opacity={(showParkingButtons) ? 1 : 0}
          >
            <TouchableOpacity
              style={styles.parkingButton}
              // Call the handler with the index
            >
              <Text style={styles.parkingText}>{1 + 1}</Text>
            </TouchableOpacity>
          </Marker>

          <Marker
            key={2}
            coordinate={parkingSlotMarker3}
            title={`Slot ${2 + 1}`}
            pinColor={'green'} // Color based on availability
            onPress={() => handleSlotPress(2)}
            opacity={(showParkingButtons) ? 1 : 0}
          >
            <TouchableOpacity
              style={styles.parkingButton}
              // Call the handler with the index
            >
              <Text style={styles.parkingText}>{2 + 1}</Text>
          </TouchableOpacity>
        </Marker>

        <Marker
          key={3}
          coordinate={parkingSlotMarker4}
          title={`Slot ${3 + 1}`}
          pinColor={'green'} // Color based on availability
          onPress={() => handleSlotPress(3)}
          opacity={(showParkingButtons) ? 1 : 0}
        >
          <TouchableOpacity
            style={styles.parkingButton}
            // Call the handler with the index
          >
            <Text style={styles.parkingText}>{3+ 1}</Text>
          </TouchableOpacity>
        </Marker>

        <Marker
          key={4}
          coordinate={parkingSlotMarker5}
          title={`Slot ${4 + 1}`}
          pinColor={'green'} // Color based on availability
          onPress={() => handleSlotPress(4)}
          opacity={(showParkingButtons) ? 1 : 0}
        >
          <TouchableOpacity
            style={styles.parkingButton}
            // Call the handler with the index
          >
            <Text style={styles.parkingText}>{4 + 1}</Text>
          </TouchableOpacity>
        </Marker>

        <Marker
          key={5}
          coordinate={parkingSlotMarker6}
          title={`Slot ${5 + 1}`}
          pinColor={'green'} // Color based on availability
          onPress={() => handleSlotPress(5)}
          opacity={(showParkingButtons) ? 1 : 0}
        >
          <TouchableOpacity
            style={styles.parkingButton}
            // Call the handler with the index
          >
            <Text style={styles.parkingText}>{5 + 1}</Text>
          </TouchableOpacity>
        </Marker>
              
        <Marker
          key={6}
          coordinate={parkingSlotMarker7}
          title={`Slot ${6 + 1}`}
          pinColor={'green'} // Color based on availability
          onPress={() => handleSlotPress(6)}
          opacity={(showParkingButtons) ? 1 : 0}
        >
          <TouchableOpacity
            style={styles.parkingButton}
            // Call the handler with the index
          >
            <Text style={styles.parkingText}>{6 + 1}</Text>
          </TouchableOpacity>
        </Marker>
              
        <Marker
          key={7}
          coordinate={parkingSlotMarker8}
          title={`Slot ${7 + 1}`}
          pinColor={'green'} // Color based on availability
          onPress={() => handleSlotPress(7)}
          opacity={(showParkingButtons) ? 1 : 0}
        >
          <TouchableOpacity
            style={styles.parkingButton}
            // Call the handler with the index
          >
            <Text style={styles.parkingText}>{7 + 1}</Text>
          </TouchableOpacity>
        </Marker>


          {/* {showParkingButtons && parkingSlots.map((slot, index) => {
            const angle = (index * (360 / 8)) * (Math.PI / 180); // Convert to radians
            const radius = 60; // Distance from the center
            const latitude = fixedMarker.latitude + (radius * Math.sin(angle)) / 111300; // Convert meters to degrees
            const longitude = fixedMarker.longitude + (radius * Math.cos(angle)) / (111300 * Math.cos(fixedMarker.latitude * (Math.PI / 180))); // Convert meters to degrees

            return (
              <Marker
                key={index}
                coordinate={{ latitude, longitude }}
                title={`Slot ${index + 1}`}
                pinColor={slot} // Color based on availability
              >
                <TouchableOpacity
                  style={styles.parkingButton}
                  // Call the handler with the index
                  onPress={() => handleSlotPress(index)}
                >
                  <Text style={styles.parkingText}>{index + 1}</Text>
                </TouchableOpacity>
              </Marker>
            );
          })} */}
        </MapView>

        <TouchableOpacity style={styles.hamburgerButton} onPress={handleHamburgerPress}>
          <Icon name="menu" size={30} color="#74A94D" />
        </TouchableOpacity>

        {dropdownVisible && (
          <>
            <View style={styles.overlay} />
            <Animated.View style={[styles.dropdown, { height: dropdownHeight }]}>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => handleNavigation('profile')}>
                <Icon name="person-circle-outline" size={50} color="#000" style={styles.profileIcon} />
                <Text style={styles.profileText}>{name}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => handleNavigation('payment')}>
                <Icon name="wallet" size={30} color="#000" style={styles.icon} />
                <Text style={styles.dropdownText}>Payments</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => handleNavigation('history')}>
                <Icon name="time" size={30} color="#000" style={styles.icon} />
                <Text style={styles.dropdownText}>History</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={() => handleNavigation('settings')}>
                <Icon name="settings" size={30} color="#000" style={styles.icon} />
                <Text style={styles.dropdownText}>Settings</Text>
              </TouchableOpacity>
            </Animated.View>
          </>
        )}

        <TouchableOpacity style={styles.helpButton} onPress={() => handleNavigation('help')}>
          <Icon name="help" size={25} color="#74A94D" />
        </TouchableOpacity>

        <View style={styles.statusBar}>
          <Text style={styles.statusText}>Status: Your parking status here</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  markerImage: {
    width: 80,
    height: 80,
  },
  hamburgerButton: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: '#FDF7F8',
    padding: 3,
    borderRadius: 5,
    elevation: 3,
  },
  helpButton: {
    position: 'absolute',
    bottom: 140,
    left: 20,
    backgroundColor: '#FDF7F8',
    width: 35,
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  dropdown: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#74A94D',
    borderRadius: 5,
    elevation: 3,
    width: 430,
    maxHeight: 400,
    overflow: 'hidden',
    zIndex: 2,
  },
  dropdownItem: {
    top: 70,
    left: 40,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  dropdownText: {
    left: 10,
    fontSize: 18,
    fontWeight: 'semibold',
    fontFamily: 'Helvetica',
    color: '#000',
    marginLeft: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  profileIcon: {
    right: 10,
    width: 50,
    height: 50,
  },
  profileText: {
    right: 5,
    fontSize: 30,
    fontWeight: 'semibold',
    fontFamily: 'Helvetica',
    color: '#000',
  },
  parkingButton: {
    backgroundColor: '#74A94D',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    elevation: 2
  },
  parkingText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  statusBar: {
    position: 'absolute',
    bottom: 70,
    width: 385,
    height: 50,
    left: 20,
    backgroundColor: '#FDF7F8',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  statusText: {
    top: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
