import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from 'expo-router';

const Payment = () => {
  const router = useRouter();
  
  const userBalance = 0.00;

  const handleAddPaymentMethod = () => {
    console.log("Add payment method clicked");
    router.push('/paymentadd'); 
  };

  const handleTransactionHistory = () => {
    console.log("Transaction history clicked")
    router.push('/paymenthistory');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color="#191919" />
        </TouchableOpacity>
        <Text style={styles.title}>Payments</Text>
      </View>

      <View style={styles.contentContainer}>

        {/* Balance Panel */}
        <View style={styles.balancePanel}>
          <Text style={styles.balanceText}>Your Balance:</Text>
          <Text style={styles.balanceAmount}>{userBalance.toFixed(2)} Php</Text>
        </View>

        {/* Payment Methods Section */}
        <View style={styles.paymentMethodsContainer}>
          <Text style={styles.paymentMethodsTitle}>Payment Methods</Text>
          <TouchableOpacity onPress={handleAddPaymentMethod}>
            <Text style={styles.addPaymentMethodLink}>+ Add Payment Method</Text>
          </TouchableOpacity>
        </View>

        {/* Placeholder for any additional content */}
        <View style={styles.content}>
          <Text></Text>
        </View>

        {/* Transaction History Panel */}
        <TouchableOpacity style={styles.transactionHistoryPanel} onPress={handleTransactionHistory}>
          <Text style={styles.transactionHistoryText}>Transaction History</Text>
          <Icon name="chevron-forward" size={24} color="#191919" style={styles.transactionIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Payment;

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
    padding: 20,
    justifyContent: "space-between",
  },
  balancePanel: {
    backgroundColor: "#d8d8d8",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  balanceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#191919",
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#74A94D",
  },
  paymentMethodsContainer: {
    marginBottom: 20,
  },
  paymentMethodsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#191919",
    marginBottom: 10,
  },
  addPaymentMethodLink: {
    fontSize: 16,
    color: "#74A94D",
  },
  transactionHistoryPanel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#d8d8d8",
    borderRadius: 8,
    padding: 15,
    elevation: 2,
  },
  transactionHistoryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#191919",
  },
  transactionIcon: {
    marginLeft: 10,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
