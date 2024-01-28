import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { OrderData } from "../../data/OrderData";

// import OrderItem from "../../components/form/OrderItem";
import Layout from "../../components/layout/Layout";

const MyOrders = () => {
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.heading}>My Orders</Text>
        <ScrollView>
          {OrderData?.map((order) => (
            <Text></Text>
            // <OrderItem key={order._id} order={order} />
          ))}
        </ScrollView>
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  heading: {
    textAlign: "center",
    color: "gray",
    fontWeight: "bold",
    fontSize: 20,
  },
});
export default MyOrders;