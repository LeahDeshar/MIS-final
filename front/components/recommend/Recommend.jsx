import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FeaturedProducts } from "../../data/FeaturedData";
import newProducts from "../../data/NewProductsData";
import FeatureCard from "../features/FeatureCard";
import { useDispatch } from "react-redux";
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

  return (
    <View style={styles.outerContainer}>
      <View style={styles.featureContainer}>
        <Text style={styles.featureTitle}>Recommend</Text>
        <TouchableOpacity style={styles.searchBtn} onPress={seeAllHandler}>
          <Text style={styles.seeall}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {allproducts
          ?.map((item) => (
            <View key={item._id}>
              <TouchableOpacity style={styles.categoryContainer}>
                <View style={styles.card}>
                  {item && item.images && item.images.length > 0 && (
                    <>
                      <AppImage
                        source={{ uri: item.images[0].url }}
                        alt="Example Image"
                        style={styles.cardImage}
                        // contain={true}
                        noCache={false}
                      />
                    </>
                  )}
                  <View style={styles.cardDetail}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text>{item.description.split(".")[0]}</Text>
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
    // marginBottom: 300
  },
  container: {
    padding: 5,
    paddingTop: 25,
    // flexDirection: "row",
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
