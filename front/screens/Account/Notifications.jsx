import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Layout from "../../components/layout/Layout";
import Footer from "../../components/layout/Footer";

const Notifications = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <Text>Notification</Text>
      </View>
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
