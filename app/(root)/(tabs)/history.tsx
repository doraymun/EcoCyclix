import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from 'expo-router';

import noResult from "@/assets/images/no-result.png";

const History = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>History</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Image 
            source={noResult}
            style={styles.image} 
            resizeMode="contain"
          />
          <Text style={styles.heading}>No Results Found</Text>
          <Text style={styles.body}>It seems there are no results to display at the moment. Please check back later.</Text>
        </View>
      </View>
    </View>
  );
};

export default History;

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
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 5,
    bottom: 100,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
    marginTop: 0,
    bottom: 100,
  },
  body: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 5,
    bottom: 100,
  },
});
