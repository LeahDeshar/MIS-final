import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
  const [carts, setCart] = useState([]);
  const cart = useSelector((state) => state.products.cart);
  const updateQuantity = (productId, newQty) => {
    const updatedCart = carts.map((item) => {
      if (item._id === productId) {
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
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
                <CartItem
                  item={item}
                  key={item._id}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </ScrollView>

            <View>
              <PriceTable price={999} title={"Price"} />
              <PriceTable price={999} title={"Tax"} />
              <PriceTable price={999} title={"Shipping"} />
              <View style={styles.grandTotal}>
                <PriceTable title={"Net Total"} price={calculateTotalPrice()} />
              </View>
              <TouchableOpacity
                style={styles.btnCheckout}
                onPress={() => navigation.navigate("Confirmation")}
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
