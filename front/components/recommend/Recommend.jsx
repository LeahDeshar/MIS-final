import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FeaturedProducts } from "../../data/FeaturedData";
import newProducts from "../../data/NewProductsData";
import FeatureCard from "../features/FeatureCard";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllProducts } from "../../redux/productAction";
import AppImage from "../AppImage";

const Recommend = () => {
  const navigation = useNavigation();
  const seeAllHandler = () => {
    navigation.navigate("Recommend Products");
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
    <View style={styles.outerContainer}>
      <View style={styles.featureContainer}>
        <Text
          style={[
            styles.featureTitle,
            { color: theme === "dark" ? "#ADBC9F" : "#102c00" },
          ]}
        >
          Recommend
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
      <View style={styles.container}>
        {allproducts
          ?.map((item) => (
            <View key={item._id}>
              <TouchableOpacity style={styles.categoryContainer}>
                <View style={styles.card}>
                  {item && item.images && (
                    <>
                      {item.images.url && (
                        <AppImage
                          source={{ uri: item?.images?.url }}
                          alt="Example Image"
                          style={styles.cardImage}
                          // contain={true}
                          noCache={false}
                        />
                      )}
                    </>
                  )}
                  <View style={styles.cardDetail}>
                    <Text
                      style={[
                        styles.cardTitle,
                        { color: theme === "dark" ? "#fff" : "#000" },
                      ]}
                    >
                      {item.name}
                    </Text>
                    <Text style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                      {item.description.split(".")[0]}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))
          .slice(0, 5)}
      </View>
    </View>
  );
};

export default Recommend;

const styles = StyleSheet.create({
  outerContainer: {
    marginBottom: 100,
  },
  container: {
    padding: 5,
    paddingTop: 25,
  },
  featureContainer: {
    marginHorizontal: 22,
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardImage: {
    height: 80,
    width: 80,
    // width: "100%",
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    width: "100%",
  },
  cardDetail: {
    paddingLeft: 10,
    width: "82%",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
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
    marginHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
