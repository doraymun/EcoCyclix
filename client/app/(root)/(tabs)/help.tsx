import { StyleSheet, Text, View, TouchableOpacity, Image, Linking } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from 'expo-router';

import message from "@/assets/images/message.png";

const Help = () => {
  const router = useRouter();

  const handleEmailPress = () => {
    const email = "mailto:support@company.com";
    Linking.openURL(email).catch((err) => console.error("Failed to open email app", err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Contact Us</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Image 
            source={message}
            style={styles.image}
            resizeMode="contain"
          />
          <TouchableOpacity onPress={handleEmailPress} style={styles.emailPanel}>
            <View style={styles.emailContainer}>
              <Icon name="mail-outline" size={24} color="#000" />
              <Text style={styles.emailText}>support@ecocyclix.com</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Help;

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
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 20,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  image: {
    width: 200,
    height: 200, 
    marginBottom: 10, 
  },
  emailPanel: {
    width: 400,
    backgroundColor: "#d8d8d8", 
    borderRadius: 10, 
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    elevation: 5,
    marginTop: 10,
  },
  emailContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
  },
  emailText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 10,
    fontWeight: 'semibold',
  },
});
