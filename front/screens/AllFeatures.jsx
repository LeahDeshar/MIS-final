import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
// import FeatureCard from './FeatureCard';
import { FeaturedProducts } from "../data/FeaturedData";
import FeatureCard from "../components/features/FeatureCard";
import Categories from "../components/categories/Categories";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../redux/productAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
const numColumns = 2; // Number of columns in the grid
const AllFeatures = () => {
  const dispatch = useDispatch();
  const [allproducts, setAllProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getAllProducts());
      const storedProductsString = await AsyncStorage.getItem("@allproducts");
      const storedProducts = JSON.parse(storedProductsString);
      setAllProducts(storedProducts);
    };
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Featured Products</Text>
      <View>
        <Categories />
      </View>
      <FlatList
        data={allproducts}
        keyExtractor={(item) => item._id.toString()}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <FeatureCard product={item} cardWidth={"48%"} />
        )}
        columnWrapperStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
  },
  gridContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default AllFeatures;
