import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
// import { CartData } from "../../data/CartData";
import CartItem from "../cart/CartItem";
import PriceTable from "../cart/PriceTable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetModal } from "@gorhom/bottom-sheet/src";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import AppCheckBox from "../AppCheckBox";
import Footer from "../layout/Footer";
import { useSelector } from "react-redux";
const Checkout = () => {
  const navigation = useNavigation();
  const paymentMethods = [
    { label: "PayPal", value: "paypal" },
    { label: "Cash on Delivery", value: "cod" },
  ];
  const shippingMethods = [
    { label: "Inside Kathmandu", value: "in" },
    { label: "Outside Kathmandu", value: "out" },
  ];

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentMethods[0]
  );
  const BottomRef = useRef(null);
  const handlePresentModalPress = () => {
    BottomRef.current.present();
  };
  const handleCloseModalPress = () => {
    BottomRef.current.close();
  };

  const BottomShipRef = useRef(null);
  const handleShipPresentModalPress = () => {
    BottomShipRef.current.present();
  };
  const handleShipCloseModalPress = () => {
    BottomShipRef.current.close();
  };

  const cartData = useSelector((state) => state.products.cart);
  return (
    <View style={{ paddingHorizontal: 15, flex: 1 }}>
      <BottomSheetModalProvider>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Location")}
          >
            <Text>Location</Text>
            <FontAwesome name="angle-right" color={"#b7b7b7"} size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handlePresentModalPress}
          >
            <Text>Payment Method</Text>
            <FontAwesome name="angle-right" color={"#b7b7b7"} size={25} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={handleShipPresentModalPress}
          >
            <Text>Shipping Method</Text>
            <FontAwesome name="angle-right" color={"#b7b7b7"} size={25} />
          </TouchableOpacity>

          {cartData && (
            <>
              <ScrollView>
                {cartData?.map((item) => (
                  <CartItem item={item} key={item._id} />
                ))}
              </ScrollView>

              <View>
                <PriceTable price={999} title={"Total Price"} />
                <PriceTable price={0} title={"Discount"} />

                <PriceTable price={999} title={"Tax"} />
                <PriceTable price={999} title={"Shipping charges"} />
                <View style={styles.grandTotal}>
                  <PriceTable title={"Net Total"} price={2000} />
                </View>
                <TouchableOpacity
                  style={styles.btnCheckout}
                  onPress={() => navigation.navigate("Confirmation")}
                >
                  <Text style={styles.btnCheckoutText}>CHECKOUT</Text>
                </TouchableOpacity>
              </View>

              <View style={{ top: 380 }}>
                <Footer />
              </View>
            </>
          )}

          <BottomSheetModal ref={BottomRef} index={0} snapPoints={[250]}>
            <AppCheckBox label={"PayPal"} value={"paypal"} />
            <AppCheckBox label={"Cash On Delivery"} value={"cod"} />
          </BottomSheetModal>

          <BottomSheetModal ref={BottomShipRef} index={0} snapPoints={[250]}>
            <AppCheckBox label={"Inside Kathmandu"} value={"in"} />
            <AppCheckBox label={"Outside Kathmandu"} value={"out"} />
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </View>
  );
};

export default Checkout;
const styles = StyleSheet.create({
  button: {
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#a4a4a4c5",
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 5,
    paddingHorizontal: 15,
    alignItems: "center",
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
