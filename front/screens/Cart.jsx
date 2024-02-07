import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { CartData } from "../data/CartData";
import PriceTable from "../components/cart/PriceTable";
import CartItem from "../components/cart/CartItem";
import { ScrollView } from "react-native";
import SellerOrderPlacementScreen from "../components/order/SellerOrderPlacementScreen ";
import OrderDetails from "../components/order/OrderDetails";
import { useSelector } from "react-redux";

const Cart = ({ navigation, route }) => {
  const { params } = route;
  const cart = useSelector((state) => state.products.cart);
  const totalPrice = cart?.reduce(
    (acc, cur) => acc + Number(cur.totalPrice),
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert(
        "Your cart is empty!",
        "Please add some items to cart to proceed to checkout"
      );
      return;
    }
    navigation.navigate("Confirmation");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {cart?.length > 0
          ? `You have ${cart?.length} items in the cart`
          : "Your cart is empty!"}
      </Text>
      <View>
        {cart && (
          <>
            <ScrollView>
              {cart?.map((item) => (
                <CartItem item={item} key={item._id} />
              ))}
            </ScrollView>

            <View>
              <View style={styles.grandTotal}>
                <PriceTable title={"Net Total"} price={totalPrice} />
              </View>
              <TouchableOpacity
                style={styles.btnCheckout}
                onPress={handleCheckout}
              >
                <Text style={styles.btnCheckoutText}>CHECKOUT</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  heading: {
    textAlign: "center",
    color: "green",
    marginTop: 10,
  },
  grandTotal: {
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "#fff",
    padding: 5,
    margin: 5,
    marginHorizontal: 20,
  },
  btnCheckout: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: "#000",
    width: "90%",
    marginHorizontal: 20,
    borderRadius: 20,
  },
  btnCheckoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
