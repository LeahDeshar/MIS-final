import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";

const SplashScreens = ({ navigation }) => {
  useEffect(() => {
    // Add any necessary logic here, such as navigating to another screen after animation
    setTimeout(() => {
      navigation.replace("home"); // Replace 'MainScreen' with the name of your main screen
    }, 5000); // Adjust the timeout as needed
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/splash3.json")}
        style={{
          height: 160,
          width: 350,
          alignSelf: "center",
          //   marginTop: 60,
          // top: 60,
          justifyContent: "center",
          top: 180,
        }}
        autoPlay
        loop={true}
        speed={0.7}
      />
      <Text
        style={{
          fontSize: 40,
          fontWeight: "600",
          textAlign: "center",
          fontFamily: "Helvetica",
        }}
      >
        CultiVista
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff", // Adjust as needed
  },
});

export default SplashScreens;
