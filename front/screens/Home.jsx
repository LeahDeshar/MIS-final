import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
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

const Home = () => {
  // const user = 'seller'
  const user = "buyer";

  return (
    <View style={styles.container}>
      <Header />
      <Layout>
        {user === "buyer" ? (
          <>
            <CategoryCard />
            <NewProducts />
            <Banner />
            <Featured />
            <Topsell />
            <Recommend />
            <Tail />
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
});
