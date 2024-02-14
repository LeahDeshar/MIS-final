import { View, Text, StyleSheet, Button } from "react-native";
import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Footer from "../../components/layout/Footer";
import Login from "../../components/auth/Login";
import Screen from "../../components/Screen";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../redux/userAction";
import { fetchDataFromStorage } from "../../components/auth/localstorage";
import ImageUpload from "../../components/ImageUpload";
import DefaultProfileImage from "../../components/DefaultProfileImage";

const Notifications = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.products.theme);
  useEffect(() => {
    dispatch(getUserData());
    fetchDataFromStorage();
  }, [dispatch]);

  const navigation = useNavigation();
  return (
    <Layout>
      <Text
        style={{
          color: theme === "dark" ? "#ADBC9F" : "#000",
          textAlign: "center",
          paddingTop: 20,
        }}
      >
        No Notification Yet!
      </Text>
    </Layout>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    // height: 500,
  },
  footerContainer: {
    bottom: -390,
  },
});
