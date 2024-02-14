import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import FeaturedProducts from "../../data/FeaturedData";
import newProducts from "../../data/NewProductsData";
import Categories from "../categories/Categories";
import Footer from "../layout/Footer";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../redux/productAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppImage from "../AppImage";
import Layout from "../layout/Layout";

const AllRecommend = () => {
  const navigation = useNavigation();
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
    <Layout>
      <View>
        <Categories />
      </View>
      <View style={styles.container}>
        <ScrollView style={{ marginBottom: 100 }}>
          {allproducts?.map((item) => (
            <View key={item._id}>
              <TouchableOpacity
                style={styles.categoryContainer}
                onPress={() =>
                  navigation.navigate("Details", { _id: item._id })
                }
              >
                <View style={styles.card}>
                  {/* <Image source={item.image} style={styles.cardImage} /> */}
                  {item && item.images && (
                    <>
                      <AppImage
                        source={{ uri: item?.images?.url }}
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
          ))}
        </ScrollView>
      </View>
    </Layout>
  );
};

export default AllRecommend;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "white",
    paddingBottom: 200,
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
    height: 90,
    width: 90,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  card: {
    flexDirection: "row",
    width: "100%",
  },
  cardDetail: {
    paddingLeft: 10,
    width: "75%",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
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
    marginHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 4,
    height: 90,
    borderRadius: 10,
  },
  footer: {
    bottom: -280,
  },
});
