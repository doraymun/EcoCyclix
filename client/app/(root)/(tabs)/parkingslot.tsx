import CustomButton from "@/components/CustomButton";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useState } from "react";
import { Link, useRouter } from 'expo-router';
import Icon from "react-native-vector-icons/Ionicons";
import { images } from "@/constants";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from 'react-native-paper';
import { Snackbar } from 'react-native-paper'

const ParkingSlot = () => {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [parkingAreaName, setParkingAreaName] = useState("");
    const [parkingDetails, setParkingDetails] = useState({
      parkingAreaID: 0,
      parkingSlot:0,
      userID: 0
    })
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: ""
    };

    // const reserveSlot = () => {
    //   // let ipAddress = '192.168.1.2' // await network.getIpAddressAsync()
    //   // let apiEndpoint = ('http://' + ipAddress + ':5000/parking/reserveSlot')

    //   // requestOptions.body = JSON.stringify(parkingDetails)

    //   // fetch(apiEndpoint, requestOptions)
    //   // .then(response => response.json())
    //   // .then(json => {
    //     // let data:{code:number, body: { message:string, error:{message:string} }} = json

    //     // console.log("got here.")

    //     // if (data.code == 200) {
    //     //   setMessage(data.body.message)
    //     //   setVisible(true)

    //     //   router.replace('/(root)/(tabs)/home')
    //     // } else {
    //     //     setMessage(data.body.error.message)
    //     //     setVisible(true)
    //     // }
        
    //     // AsyncStorage.getItem('ecocyclix-appdata', (error, result) => { 
    //     //   let appData: {
    //     //       isAlreadyInit:boolean,
    //     //       user:{
    //     //           id:number,
    //     //           firstName:string,
    //     //           middleName:string,
    //     //           lastName:string,
    //     //           email:string
    //     //       },
    //     //       selectedParkingSlot: {
    //     //         parkingAreaID:number,
    //     //         parkingAreaName:string,
    //     //         parkingSlot:number
    //     //       }
    //     //   } = JSON.parse(result!)
    //     //   let reservations = [{
    //     //     parkingAreaID: appData.selectedParkingSlot.parkingAreaID,
    //     //     parkingSlot:appData.selectedParkingSlot.parkingSlot,
    //     //     userID:appData.user.id
    //     //   }]

    //     AsyncStorage.getItem('ecocyclix-appdata', (error, result) => {
    //       let appData: {
    //           isAlreadyInit:boolean,
    //           user:{
    //               id:number,
    //               firstName:string,
    //               middleName:string,
    //               lastName:string,
    //               email:string
    //           },
    //           selectedParkingSlot: {
    //             parkingAreaID:number,
    //             parkingAreaName:string,
    //             parkingSlot:number
    //           },
    //           reservations: {
    //             parkingAreaID:number,
    //             parkingSlot:number,
    //             userID:number,
    //             status:number
    //           }[]
    //       } = {
    //           isAlreadyInit: JSON.parse(result!).isAlreadyInit,
    //           user: JSON.parse(result!).user,
    //           selectedParkingSlot: { parkingAreaID: 1, parkingAreaName: 'Don Bosco Technical College', parkingSlot: 0 },
    //           reservations: JSON.parse(result!).reservations
    //       } 
        
    //       if (appData.reservations == undefined) {
    //         appData.reservations = [{
    //           parkingAreaID: parkingDetails.parkingAreaID,
    //           parkingSlot: parkingDetails.parkingSlot,
    //           userID: parkingDetails.userID,
    //           status: 0
    //         }]
    //       } else {
    //         appData.reservations.push({
    //           parkingAreaID: parkingDetails.parkingAreaID,
    //           parkingSlot: parkingDetails.parkingSlot,
    //           userID: parkingDetails.userID,
    //           status: 0
    //         })
    //       }
    //     // })
    //   })
    //   .catch(err => {
    //       console.error(err)
    //   })
    // }

    AsyncStorage.getItem('ecocyclix-appdata', (error, result) => { 
      let appData: {
          isAlreadyInit:boolean,
          user:{
              id:number,
              firstName:string,
              middleName:string,
              lastName:string,
              email:string
          },
          selectedParkingSlot: {
            parkingAreaID:number,
            parkingAreaName:string,
            parkingSlot:number
          }
      } = JSON.parse(result!)
      
      setParkingDetails({ parkingAreaID: appData.selectedParkingSlot.parkingAreaID, parkingSlot: appData.selectedParkingSlot.parkingSlot, userID: appData.user.id })
      setParkingAreaName(appData.selectedParkingSlot.parkingAreaName)
    })

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Icon name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title} numberOfLines={2}>{parkingAreaName}</Text>
            </View>
            <Image 
                style={styles.slotBGImage}
                source={images.dbtcParkingSLotBg}
                className="w-full h-[300px]"
                resizeMode="contain"
            />

            <View style={styles.slotViewArea}>
              <Text style={styles.parkingSlotTitle}>
                <Icon name="location" size={24} color="#74A94D" /> Parking Slot {parkingDetails.parkingSlot.toString()}
              </Text>

              <Text style={styles.parkingSlotDescription}>
              Bike racks can be located at..
              </Text>

              <Text style={styles.statusField}>
              Status: <Text style={styles.status}>Available</Text>
              </Text>

              <Button style={styles.reserveButton} buttonColor='#74A94D' mode="contained" onPress={() => router.replace('/(root)/(tabs)/home')}>
                RESERVE SLOT
              </Button>
            </View>
            <Snackbar
                visible={visible}
                onDismiss={() => {
                    setVisible(false)
                }}
                action={{
                label: 'OK',
                onPress: () => {
                    // Do something
                },
                }}>
                {message}
            </Snackbar>
        </View>
    );
}

export default ParkingSlot;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FDF7F8",
    },
    topBar: {
      height: 120,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
      backgroundColor: "#74A94D",
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    slotBGImage: {
        height: 273,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    backButton: {
      position: "absolute",
      left: 20,
      top: 70,
    },
    title: {
      top: 20,
      left: 10,
      right: 50,
      bottom: 20,
      fontSize: 20,
      fontWeight: "bold",
      color: "#000",
      flexWrap: "wrap"
    },
    slotViewArea: {      
      position: 'relative',
      bottom: 30,
      width: 385,
      height: 200,
      left: 15,
      backgroundColor: '#FDF7F8',
      padding: 10,
      borderRadius: 5,
      elevation: 3
    },
    parkingSlotTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    parkingSlotDescription: {
      fontSize: 14,
      color: "#A9A9A9",
      top: 10,
      left: 30
    },
    statusField: {
      fontSize: 14,
      top: 50,
      left: 30
    },
    status: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    reserveButton: {
      top: 60,
      left: 30,
      width: 300
    },
    contentContainer: {
      top: 20,
      flex: 1,
      alignItems: "center",
    },
    profileCard: {
      alignItems: "center",
      backgroundColor: "#d8d8d8",
      padding: 20,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 8,
      width: "80%",
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    name: {
      fontSize: 22,
      fontWeight: "600",
      marginVertical: 10,
      color: "#333",
    },
    email: {
      fontSize: 16,
      color: "#777",
    },
    number: {
      fontSize: 16,
      color: "#777",
      marginBottom: 20,
    },
    editButton: {
      marginTop: 20,
      backgroundColor: "#181818",
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 5,
    },
    editButtonText: {
      color: "#FFF",
      fontWeight: "600",
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "80%",
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
    },
    input: {
      width: "100%",
      padding: 10,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
    },
    saveButton: {
      backgroundColor: "#181818",
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 5,
      marginBottom: 10,
    },
    saveButtonText: {
      color: "#FFF",
      fontWeight: "600",
      fontSize: 16,
    },
    cancelButtonText: {
      color: "red",
      fontSize: 16,
    },
  });