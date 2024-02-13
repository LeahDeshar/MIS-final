import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Header from "../components/layout/Header";
import Banner from "../components/banner/Banner";
import Featured from "../components/features/Featured";
import Special from "../components/special/Special";
import Categories from "../components/categories/Categories";
import CategoryCard from "../components/categories/CategoryCard";
import Topsell from "../components/topsell/Topsell";
import NewProducts from "../components/new/NewProducts";
import Recommend from "../components/recommend/Recommend";
import Tail from "../components/recommend/Tail";
import Footer from "../components/layout/Footer";
import DashBoard from "../components/seller/DashBoard";
import { fetchDataFromStorage } from "../components/auth/localstorage";
import { LogBox } from "react-native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
LogBox.ignoreLogs([
  "Sending `onAnimatedValueUpdate` with no listeners registered.",
  "Warning: Encountered two children with the same key",
  "Error fetching address",
  "Warning: Each child in a list should have a ",
  "Error fetching user data: [AxiosError: Network Error]",
]);
const Home = () => {
  const [user, setUser] = useState("");
  // const user = 'seller'
  useEffect(() => {
    const fetchRole = async () => {
      const storedRoleString = await AsyncStorage.getItem("@role");
      const storedRole = JSON.parse(storedRoleString);
      setUser(storedRole);
      // console.log("Role from AsyncStorage:", storedRole);
    };
    fetchRole();
  }, []);

  // const user = "buyer";
  const theme = useSelector((state) => state.products.theme);
  fetchDataFromStorage();

  return (
    <View style={theme === "dark" ? styles.darkcontainer : styles.container}>
      <Header />
      <Layout>
        {user === "customer" ? (
          <>
            <CategoryCard />
            <NewProducts />
            <Banner />
            <Featured />
            <Topsell />
            <Recommend />
            {/* <Tail /> */}
          </>
        ) : (
          <>
            <DashBoard />
          </>
        )}
      </Layout>
      {/* <Footer/> */}
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  darkcontainer: {
    backgroundColor: "#000",
    flex: 1,
  },
});
