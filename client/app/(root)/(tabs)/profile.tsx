import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, TextInput } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("Your Name");
  const [email, setEmail] = useState("youremail@example.com");
  const [number, setNumber] = useState("123-456-7890");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSave = () => {

    setModalVisible(false);
  };

  const logout = () => {
    AsyncStorage.getItem('ecocyclix-appdata', (error, result) => {
      let appData: {
          isAlreadyInit:boolean,
          user:{
              id:number | undefined,
              firstName:string,
              middleName:string,
              lastName:string,
              email:string
          }
      } = (result != null || result != undefined) ? JSON.parse(result) : {};
      let emptyUserData:any = {}

      appData.user = emptyUserData;

      AsyncStorage.setItem('ecocyclix-appdata', JSON.stringify(appData), () => {
        router.replace('/(auth)/sign-in')
      })
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.profileCard}>
          {/* Profile picture */}
          {profilePicture ? (
            <Image source={{ uri: profilePicture }} style={styles.profileImage} />
          ) : (
            <Icon name="person-circle" size={100} color="#bbb" />
          )}

          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
          <Text style={styles.number}>{number}</Text>

          {/* Edit button */}
          <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          
          {/* Logout button */}
          <TouchableOpacity style={styles.editButton} onPress={() => logout()}>
            <Text style={styles.editButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for editing profile */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={number}
              onChangeText={setNumber}
              keyboardType="phone-pad"
            />

            {/* Button to save changes */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;

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
  backButton: {
    position: "absolute",
    left: 20,
    top: 70,
  },
  title: {
    top: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
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
