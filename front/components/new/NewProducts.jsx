import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import FeatureCard from "../features/FeatureCard";
import newProducts from "../../data/NewProductsData";
import { useNavigation } from "@react-navigation/native";
import { getAllProducts, getOneProducts } from "../../redux/productAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
const NewProducts = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const seeAllHandler = () => {
    navigation.navigate("New Products");
  };

  const [allproducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getAllProducts());
      const storedProductsString = await AsyncStorage.getItem("@allproducts");
      const storedProducts = JSON.parse(storedProductsString);

      storedProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      const newestProducts = storedProducts.slice(0, 6);
      console.log(storedProducts);

      setAllProducts(newestProducts);
      console.log(
        "allpr",
        allproducts
          .filter((item) => item && item.images && item.images.url) // Filter out undefined items
          .map((item) => item.images.url)
      );
    };
    fetchData();
  }, []);
  const theme = useSelector((state) => state.products.theme);
  return (
    <View>
      <View style={styles.featureContainer}>
        <Text
          style={[
            styles.featureTitle,
            { color: theme === "dark" ? "#ADBC9F" : "#102c00" },
          ]}
        >
          New Products
        </Text>
        <TouchableOpacity style={styles.searchBtn} onPress={seeAllHandler}>
          <Text
            style={[
              styles.seeall,
              { color: theme === "dark" ? "#ADBC9F" : "#102c00" },
            ]}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {allproducts?.map((item) => (
            <View key={item._id}>
              <TouchableOpacity style={styles.categoryContainer}>
                <FeatureCard product={item} cardWidth={200} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default NewProducts;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: "row",
  },
  featureContainer: {
    marginHorizontal: 22,
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  featureTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#102c00",
  },
  seeall: {
    fontSize: 14,
  },
  categoryContainer: {
    // backgroundColor: "#fff",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryIcon: {
    fontSize: 25,
    verticalAlign: "top",
  },
  catTitle: {
    fontSize: 12,
  },
});
