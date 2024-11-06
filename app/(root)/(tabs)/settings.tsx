import { StyleSheet, Text, View, TouchableOpacity, Switch, TextInput, Modal, Animated } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from 'expo-router';

const Settings = () => {
  const router = useRouter();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteText, setDeleteText] = useState("");

  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showDeleteConfirmation) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      slideAnim.setValue(0);
    }
  }, [showDeleteConfirmation]);

  const toggleNotifications = () => setIsNotificationsEnabled(!isNotificationsEnabled);

  const handleLogout = () => {
    router.push('/sign-in');
  };

  const handleDeleteAccount = () => {
    if (deleteText === "delete") {
      console.log("Account deleted");
      setShowDeleteConfirmation(false);
    } else {
      alert("Please type 'delete' to confirm.");
    }
  };

  const slideUp = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      {/* Notifications Container */}
      <View style={styles.notificationsContainer}>
        <Text style={styles.panelTitle}>Notifications</Text>
            <View style={styles.contentContainer}>
                <Text style={styles.bodyText}>
                Enable or disable push notifications to stay updated with the latest alerts.
                </Text>
                <Switch
                value={isNotificationsEnabled}
                onValueChange={toggleNotifications}
                style={styles.switch}
                />
            </View>
        </View>

      {/* My Account Container */}
      <View style={styles.myAccountContainer}>
        <Text style={styles.panelTitle}>My Account</Text>
        {/* Space between My Account and the links */}
        <View style={styles.accountLinksContainer}>
          <TouchableOpacity style={styles.link} onPress={handleLogout}>
            <Text style={styles.logOutText}>Log Out</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.link} onPress={() => setShowDeleteConfirmation(true)}>
            <Text style={styles.deleteText}>Delete My Account</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Delete Account Modal */}
      <Modal
        transparent={true}
        visible={showDeleteConfirmation}
        animationType="fade"
        onRequestClose={() => setShowDeleteConfirmation(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={() => setShowDeleteConfirmation(false)}
          />
          <Animated.View style={[styles.deleteConfirmation, { transform: [{ translateY: slideUp }] }]}>
            <Text style={styles.confirmText}>
              Type "delete" to confirm account deletion:
            </Text>
            <TextInput
              style={styles.input}
              value={deleteText}
              onChangeText={setDeleteText}
              placeholder="delete"
            />
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

export default Settings;

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
  
    notificationsContainer: {
        top: 10,
      backgroundColor: "#d8d8d8",
      padding: 20,
      marginVertical: 10,
      borderRadius: 10,
      width: "90%",
      alignSelf: "center",
      elevation: 6,  // Increased for a more elevated effect
      shadowColor: "#000",  // iOS shadow support
      shadowOffset: { width: 0, height: 3 },  // iOS
      shadowOpacity: 0.3,  // iOS
      shadowRadius: 4,  // iOS
      position: "relative",
    },
    contentContainer: {
        position: "relative",
    },
    myAccountContainer: {
        top: 10,
      backgroundColor: "#e0e0e0",
      padding: 20,
      marginVertical: 10,
      borderRadius: 10,
      width: "90%",
      alignSelf: "center",
      elevation: 6,  // Increased elevation for a shadow effect
      shadowColor: "#000",  // iOS
      shadowOffset: { width: 0, height: 3 },  // iOS
      shadowOpacity: 0.3,  // iOS
      shadowRadius: 4,  // iOS
    },
    panelTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    switchContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    switch: {
      alignSelf: "flex-end",
    },
    bodyText: {
      marginTop: 10,
      fontSize: 14,
      color: "#333",
      paddingRight: 10,
      paddingBottom: 10,
    },
    accountLinksContainer: {
      marginTop: 20,
    },
    link: {
      marginTop: 10,
    },
    logOutText: {
      color: "#000",
      fontSize: 16,
      fontWeight: "semibold",
    },
    deleteText: {
      color: "#FF3B30",
      fontSize: 16,
      fontWeight: "semibold",
    },
    modalOverlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalBackground: {
      flex: 1,
    },
    deleteConfirmation: {
      backgroundColor: "#FDF7F8",
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    confirmText: {
      fontSize: 16,
      marginBottom: 10,
      textAlign: "center",
    },
    input: {
      height: 40,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    deleteButton: {
      backgroundColor: "#FF3B30",
      padding: 12,
      borderRadius: 5,
      alignItems: "center",
    },
    deleteButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
  });
  