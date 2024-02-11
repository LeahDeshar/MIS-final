import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const theme = useSelector((state) => state.products.theme);
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#000" : "#fff" },
      ]}
    >
      {/* <StatusBar barStyle="light-content" /> */}
      <ScrollView>
        <View>{children}</View>
      </ScrollView>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  footer: {
    // backgroundColor: "white",
    // display: "flex",
    // width: "90%",
    // flex: 1,
    // justifyContent: "flex-end",
    // marginHorizontal: 25,
    // zIndex: 200,
    // elevation: 10,
    // borderRadius: 35,
    // position: "absolute",
    // // bottom: 210,
    // bottom: 210,
    // padding: 10,
    // shadowColor: 'black',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
    // marginTop: 100,
    top: 80,
  },
  container: {
    flex: 1,
  },
});
