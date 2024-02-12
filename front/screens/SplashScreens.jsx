import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
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
      {/* <LottieView
        source={require("../assets/sparkle.json")} // Adjust the path to your animation JSON file
        autoPlay
        loop={false}
      /> */}
      <LottieView
        source={require("../assets/splash.json")}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Adjust as needed
  },
});

export default SplashScreens;
