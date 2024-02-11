import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { FeaturedProducts } from "../../data/FeaturedData";
import FeatureCard from "./FeatureCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/productAction";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Featured = () => {
  const navigation = useNavigation();
  const seeAllHandler = () => {
    navigation.navigate("Featured");
  };
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
          Featured
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
          {allproducts
            ?.map((item) => (
              <View key={item._id}>
                <TouchableOpacity
                  style={styles.categoryContainer}
                  onPress={() =>
                    navigation.navigate("Details", { _id: item._id })
                  }
                >
                  <FeatureCard product={item} />
                </TouchableOpacity>
              </View>
            ))
            .slice(0, 5)}
        </View>
      </ScrollView>
    </View>
  );
};

export default Featured;

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
