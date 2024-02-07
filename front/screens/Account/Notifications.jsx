import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Footer from "../../components/layout/Footer";
import Login from "../../components/auth/Login";
import Screen from "../../components/Screen";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getUserData } from "../../redux/userAction";
import { fetchDataFromStorage } from "../../components/auth/localstorage";

const Notifications = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
    fetchDataFromStorage();
  }, [dispatch]);

  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* <View style={styles.container}>
        <Text>Notification</Text>
      </View> */}

      <Button
        title="register"
        onPress={() => navigation.navigate("register")}
      />
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
