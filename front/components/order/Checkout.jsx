import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import CartItem from "../cart/CartItem";
import PriceTable from "../cart/PriceTable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetModal } from "@gorhom/bottom-sheet/src";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import AppCheckBox from "../AppCheckBox";
import Footer from "../layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateNetTotal,
  setGlobalLocation,
  setGlobalPayMethod,
  setGlobalShipMethod,
  setShipping,
} from "../../redux/productReducer";
import * as Notifications from "expo-notifications";

const Checkout = () => {
  const navigation = useNavigation();
  const BottomShipRef = useRef(null);
  const BottomRef = useRef(null);

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedpayOption, setSelectedpayOption] = useState(null);
  console.log(selectedpayOption);
  const dispatch = useDispatch();
  const handleCheckBoxChange = (option) => {
    setSelectedOption(option);
    dispatch(setShipping(option));
    dispatch(setGlobalShipMethod(option));

    dispatch(calculateNetTotal());

    BottomShipRef.current?.close();
  };
  const handlePayMethodChange = (option) => {
    setSelectedpayOption(option);
    dispatch(setGlobalPayMethod(option));
    // dispatch(calculateNetTotal());

    BottomRef.current?.close();
  };
  const shippingmethodPrice = useSelector((state) => state.products.shipping);

  const handlePresentModalPress = () => {
    BottomRef.current.present();
  };
  const handleCloseModalPress = () => {
    BottomRef.current.close();
  };

  const handleShipPresentModalPress = () => {
    BottomShipRef.current.present();
  };
  const handleShipCloseModalPress = () => {
    BottomShipRef.current.close();
  };

  const cartData = useSelector((state) => state.products.cart);

  const totalPrice = cartData?.reduce(
    (acc, cur) => acc + Number(cur.totalPrice),
    0
  );

  const netTotal = useSelector((state) => state.products.netTotal);
  useEffect(() => {
    dispatch(calculateNetTotal());
  }, []);

  const location = useSelector((state) => state.products.location);

  const handleCheckout = () => {
    if (selectedpayOption === "paypal") {
      sendNotification(); // Call the function to send notification after navigating
      navigation.navigate("Payment");
    } else if (selectedpayOption === "cod") {
      sendNotification(); // Call the function to send notification after navigating

      navigation.navigate("finalpay");
    }
  };

  // const sendNotification = async () => {
  //   const notificationTime = new Date();
  //   notificationTime.setSeconds(notificationTime.getSeconds() + 30);
  //   const notificationContent = {
  //     title: "Payment Successful",
  //     body: "Your order has been confirmed. Thank you for your purchase!",
  //   };

  //   await Notifications.scheduleNotificationAsync({
  //     handleNotification: async () => ({
  //       shouldShowAlert: true,
  //       shouldPlaySound: false,
  //       shouldSetBadge: false,
  //     }),
  //     content: notificationContent,
  //     trigger: {
  //       date: notificationTime,
  //     },
  //   });
  // };
  const sendNotification = async () => {
    const notificationTime = new Date();
    notificationTime.setSeconds(notificationTime.getSeconds() + 10);
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    // Second, call the method

    Notifications.scheduleNotificationAsync({
      content: {
        title: "CULTIVISTA",
        body: "Thank you for your order. Your items will be prepared shortly.",
      },
      trigger: {
        date: notificationTime,
      },
    });
  };
  const theme = useSelector((state) => state.products.theme);
  return (
    <View
      style={{
        paddingHorizontal: 7,
        flex: 1,
        backgroundColor: theme === "dark" ? "#000" : "#fff",
      }}
    >
      <BottomSheetModalProvider>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Location")}
          >
            <Text style={{ color: theme === "dark" ? "#fff" : "#000" }}>
              Location
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ paddingRight: 10, color: "grey" }}>
                {location}
              </Text>
              <FontAwesome name="angle-right" color={"#b7b7b7"} size={25} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handlePresentModalPress}
          >
            <Text style={{ color: theme === "dark" ? "#fff" : "#000" }}>
              Payment Method
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "grey", paddingRight: 10 }}>
                {selectedpayOption === null
                  ? "Select"
                  : selectedpayOption?.toUpperCase()}
              </Text>
              <FontAwesome name="angle-right" color={"#b7b7b7"} size={25} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button]}
            onPress={handleShipPresentModalPress}
          >
            <Text style={{ color: theme === "dark" ? "#fff" : "#000" }}>
              Shipping Method
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "grey", paddingRight: 10 }}>
                {selectedOption === null
                  ? "Select"
                  : selectedOption?.toUpperCase()}
              </Text>
              <FontAwesome name="angle-right" color={"#b7b7b7"} size={25} />
            </View>
          </TouchableOpacity>

          {cartData && (
            <>
              <ScrollView>
                {cartData?.map((item) => (
                  <CartItem item={item} key={item._id} />
                ))}
                <View style={{ marginBottom: 300 }}>
                  <PriceTable price={totalPrice} title={"Total Price"} />
                  <PriceTable price={0} title={"Discount"} />
                  <PriceTable price={"4%"} title={"Tax"} />
                  <PriceTable
                    price={shippingmethodPrice}
                    title={"Shipping charges"}
                  />
                  <View style={styles.grandTotal}>
                    <PriceTable title={"Net Total"} price={netTotal} />
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.btnCheckout,
                      {
                        backgroundColor: theme === "dark" ? "#fff" : "#000",
                      },
                    ]}
                    onPress={handleCheckout}
                  >
                    <Text
                      style={[
                        styles.btnCheckoutText,
                        { color: theme === "dark" ? "#000" : "#fff" },
                      ]}
                    >
                      {selectedpayOption === "paypal"
                        ? "PROCEED TO PAYMENT"
                        : "CHECKOUT"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>

              <View style={{ bottom: 10 }}>
                <Footer />
              </View>
            </>
          )}

          <BottomSheetModal ref={BottomRef} index={0} snapPoints={[250]}>
            <AppCheckBox
              label={"PayPal"}
              value={selectedpayOption === "paypal"}
              onValueChange={() => handlePayMethodChange("paypal")}
            />
            <AppCheckBox
              label={"Cash On Delivery"}
              value={selectedpayOption === "cod"}
              onValueChange={() => handlePayMethodChange("cod")}
            />
          </BottomSheetModal>

          <BottomSheetModal ref={BottomShipRef} index={0} snapPoints={[250]}>
            <AppCheckBox
              label={"Inside Kathmandu"}
              value={selectedOption === "in"}
              onValueChange={() => handleCheckBoxChange("in")}
            />
            <AppCheckBox
              label={"Outside Kathmandu"}
              value={selectedOption === "out"}
              onValueChange={() => handleCheckBoxChange("out")}
            />
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
    // backgroundColor: "#fff",
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
