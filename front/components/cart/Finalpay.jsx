import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const Finalpay = () => {
  const navigation = useNavigation();

  const goToOrderPage = () => {
    navigation.navigate("myorders");
  };
  return (
    <SafeAreaView>
      <LottieView
        source={require("../../assets/thumbs.json")}
        style={{
          height: 360,
          width: 250,
          alignSelf: "center",
          marginTop: 60,
          right: 40,
          justifyContent: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />

      <Text
        style={{
          marginTop: 20,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Your order has been placed
      </Text>

      <LottieView
        source={require("../../assets/sparkle.json")}
        style={{
          height: 300,
          position: "absolute",
          top: 100,
          width: 300,
          alignSelf: "center",
        }}
        autoPlay
        loop={false}
        speed={0.6}
        onAnimationFinish={goToOrderPage}
      />
    </SafeAreaView>
  );
};

export default Finalpay;

const styles = StyleSheet.create({});
