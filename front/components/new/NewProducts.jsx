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
import { useDispatch } from "react-redux";
const NewProducts = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const seeAllHandler = () => {
    navigation.navigate("New Products");
  };
  const handleMoreBtn = (id) => {
    console.log(id);
    dispatch(getOneProducts(id));
    navigation.navigate("Product Details", { _id: id });
  };

  const [allproducts, setAllProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getAllProducts());
      const storedProductsString = await AsyncStorage.getItem("@allproducts");
      const storedProducts = JSON.parse(storedProductsString);

      // Sort the products by createdAt date in descending order
      storedProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      // Take the first 6 products
      const newestProducts = storedProducts.slice(0, 6);

      setAllProducts(newestProducts);
      // setAllProducts(storedProducts);
    };
    fetchData();
  }, []);

  return (
    <View>
      <View style={styles.featureContainer}>
        <Text style={styles.featureTitle}>New Products</Text>
        <TouchableOpacity style={styles.searchBtn} onPress={seeAllHandler}>
          <Text style={styles.seeall}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {allproducts?.map((item) => (
            <View key={item._id}>
              <TouchableOpacity
                style={styles.categoryContainer}
                onPress={() => handleMoreBtn(item._id)}
              >
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
