import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AppImage from "../AppImage";

const OrderItem = ({ order }) => {
  // console.log("order", order?.images[0]?.url);
  return (
    <View style={styles.container}>
      <AppImage
        source={{ uri: order?.images[0]?.url }}
        alt="Example Image"
        style={styles.image}
        // contain={true}
        noCache={false}
      />
      <View style={{ marginLeft: 10, marginTop: 5 }}>
        <Text>Product name : {order?.name}</Text>
        <Text>Price : {order.price}</Text>
        <Text>Quantity : {order.quantity}</Text>
      </View>

      {/* <Text>Total Amount : {order.totalAmount} $</Text>
      <Text style={styles.status}>Order Status : {order.status}</Text> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    backgroundColor: "#ffffff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  orderinfo: {
    flexDirection: "row",
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
  image: {
    height: 80,
    width: 80,
    resizeMode: "cover",
    borderRadius: 10,
  },
});
export default OrderItem;
