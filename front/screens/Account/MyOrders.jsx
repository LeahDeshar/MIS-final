import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { OrderData } from "../../data/OrderData";
import Layout from "../../components/layout/Layout";
import OrderItem from "../../components/form/OrderItem";
import { useSelector } from "react-redux";

const MyOrders = () => {
  const cart = useSelector((state) => state.products.cart);
  const netTotal = useSelector((state) => state.products.netTotal);
  const shipping = useSelector((state) => state.products.shipMethod);
  const payMethod = useSelector((state) => state.products.paymentMethod);

  console.log(netTotal);

  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.heading}>My Orders</Text>
        <View style={styles.orderinfo}>
          <Text>Order ID : 124215135235</Text>
          <Text>Date : {new Date().toLocaleDateString()}</Text>
        </View>
        <ScrollView>
          {cart?.map((order) => (
            <>
              <OrderItem key={order._id} order={order} />
            </>
          ))}
        </ScrollView>
        <View>
          <Text style={styles.status}>Total : {netTotal}$</Text>
          <Text style={[styles.status, styles.shipping]}>
            Shipping :{" "}
            {shipping === "in" ? "Inside Kathmandu" : "Outside Kathmandu"}
          </Text>
          <Text style={styles.status}>
            Payment Method : {payMethod.toUpperCase()}
          </Text>
          <Text style={styles.status}>Status: pending...</Text>
        </View>
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    alignItems: "center",
  },
  heading: {
    textAlign: "center",
    color: "gray",
    fontWeight: "bold",
    fontSize: 20,
  },
  orderinfo: {
    // flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "lightgray",
    paddingBottom: 5,
  },
  status: {
    borderTopWidth: 1,
    fontWeight: "bold",
    borderColor: "lightgray",
    padding: 5,
  },
});
export default MyOrders;
