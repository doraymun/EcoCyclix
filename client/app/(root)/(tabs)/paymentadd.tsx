import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from 'expo-router';

interface LabeledInputProps {
  label: string;
  [key: string]: any;
}

const LabeledInput: React.FC<LabeledInputProps> = ({ label, ...props }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...props} />
    </View>
  );
};

const PaymentAdd = () => {
  const router = useRouter();

  const handleAddPaymentMethod = () => {
    alert("Payment method added!");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Add Payment Method</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.content}>
            {/* Name Inputs */}
            <View style={styles.row}>
              <LabeledInput label="First Name" />
              <LabeledInput label="Last Name" />
            </View>

            {/* Card Number Input */}
            <LabeledInput label="Card Number" keyboardType="numeric" maxLength={16} />

            {/* Expiration Date and CVV Inputs */}
            <View style={styles.row}>
              <LabeledInput label="Expiration Date (MM/YY)" keyboardType="numeric" maxLength={5} />
              <LabeledInput label="CVV" keyboardType="numeric" maxLength={3} />
            </View>

            {/* Email Input */}
            <LabeledInput label="Email" keyboardType="email-address" />

            {/* Phone Number Input */}
            <LabeledInput label="Phone Number" keyboardType="phone-pad" maxLength={15} />

            {/* Save Button */}
            <TouchableOpacity style={styles.saveButton} onPress={handleAddPaymentMethod}>
              <Text style={styles.saveButtonText}>Save Payment Method</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PaymentAdd;

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
    padding: 20,
  },
  content: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#d8d8d8",
    paddingHorizontal: 10,
    marginBottom: 5, // Set a smaller margin to bring inputs closer
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 5,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  saveButton: {
    backgroundColor: "#191919",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 200,
  },
  saveButtonText: {
    color: "#FDF7F8",
    fontWeight: "bold",
    fontSize: 16,
  },
});
