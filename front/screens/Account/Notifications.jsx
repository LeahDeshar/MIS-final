import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import Layout from "../../components/layout/Layout";
import Footer from "../../components/layout/Footer";
import Login from "../../components/auth/Login";
import Screen from "../../components/Screen";
import { useNavigation } from "@react-navigation/native";

const Notifications = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* <View style={styles.container}>
        <Text>Notification</Text>
      </View> */}

      <Button title="Login" onPress={() => navigation.navigate("login")} />
      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    height: 500,
  },
  footerContainer: {
    bottom: -390,
  },
});
