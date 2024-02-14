import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Layout from "../layout/Layout";
import { useSelector } from "react-redux";

const OrderDetails = ({ route }) => {
  // Assuming the route.params.order contains the details of the selected order
  // const order = route.params;
  const order = {
    orderNumber: "ORD123456",
    date: "2023-11-25",
    status: "Shipped",
    items: [
      { id: "1", name: "Product A", quantity: 2, price: 25.99 },
      { id: "2", name: "Product B", quantity: 1, price: 19.99 },
      // Add more items as needed
    ],
    subtotal: 66.97, // Sum of the prices of all items
    shippingFee: 10.0,
    total: 76.97, // subtotal + shippingFee

    customerName: "John Doe",
    customerEmail: "john.doe@example.com",

    shippingAddress: {
      street: "123 Main Street",
      city: "Cityville",
      state: "State",
      zipCode: "12345",
      country: "Country",
    },
    shippingMethod: "Express Shipping",
    trackingNumber: "TRK789012345",

    paymentMethod: "Credit Card",
    transactionID: "TXN987654321",
    paymentStatus: "Paid",

    // Add more fields as needed
  };

  const theme = useSelector((state) => state.products.theme);
  return (
    <Layout style={styles.container}>
      <View style={styles.section}>
        <Text
          style={[
            styles.heading,
            { color: theme === "dark" ? "#fff" : "#000" },
          ]}
        >
          Order Information
        </Text>
        <Text style={[{ color: theme === "dark" ? "#fff" : "#000" }]}>
          Order Number: {order.orderNumber}
        </Text>
        <Text style={[{ color: theme === "dark" ? "#fff" : "#000" }]}>
          Date: {order.date}
        </Text>
        <Text style={[{ color: theme === "dark" ? "#fff" : "#000" }]}>
          Status: {order.status}
        </Text>
      </View>

      <View style={styles.section}>
        <Text
          style={[
            styles.heading,
            { color: theme === "dark" ? "#fff" : "#000" },
          ]}
        >
          Items
        </Text>
        {order.items.map((item) => (
          <View key={item.id}>
            <Text style={[{ color: theme === "dark" ? "#fff" : "#000" }]}>
              {item.name}
            </Text>
            <Text style={[{ color: theme === "dark" ? "#fff" : "#000" }]}>
              Quantity: {item.quantity}
            </Text>
            <Text style={[{ color: theme === "dark" ? "#fff" : "#000" }]}>
              Price: ${item.price}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Shipping Information</Text>
        <Text>Address: {order.shippingAddress.street}</Text>
        <Text>Shipping Method: {order.shippingMethod}</Text>
        <Text>Tracking Number: {order.trackingNumber}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Payment Information</Text>
        <Text>Payment Method: {order.paymentMethod}</Text>
        <Text>Transaction ID: {order.transactionID}</Text>
        <Text>Payment Status: {order.paymentStatus}</Text>
      </View>

      {/* Add more sections for communication tools, refund/return processing, etc. based on your requirements */}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default OrderDetails;
