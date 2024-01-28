import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { CategoriesData } from "../../data/CategoriesData";
import newProducts from "../../data/NewProductsData";
import Footer from "../layout/Footer";
import { useNavigation } from "@react-navigation/native";
import Entypo from "react-native-vector-icons/Entypo";
import Categories from "./Categories";

const CategoryDetail = ({ route }) => {
  const [category, setCategory] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { params } = route;
  const navigation = useNavigation();

  useEffect(() => {
    const getCategory = CategoriesData.find((p) => p?._id === params?._id);
    setCategory(getCategory);

    // Filter products based on category
    const filteredProducts = newProducts.filter(
      (product) => product.category === getCategory?.name
    );
    setFilteredProducts(filteredProducts);
  }, [params?._id]);

  return (
    <View style={styles.container}>
      <View>
        <Categories />
      </View>
      <Text style={styles.categoryTitle}>{category?.name}</Text>
      <ScrollView>
        <View style={styles.cardContainer}>
          {filteredProducts.map((item, index) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Product Details", { _id: item._id })
              }
            >
              <View style={styles.card} key={index}>
                <Image source={item.image} style={styles.cardImage} />
                <View>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.relatedTitle}>
                    <Entypo name="star" style={styles.starName} />
                    {item.rating | 0} (0 reviews)
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={{ top: 60 }}>
        <Footer />
      </View>
    </View>
  );
};

export default CategoryDetail;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height: "100%",
    backgroundColor: "white",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  cardImage: {
    height: 120,
    width: "100%",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  card: {
    width: 190,
    height: 210,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#00000056",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 19,
    padding: 8,
    fontWeight: "bold",
  },
  relatedTitle: {
    fontSize: 14,
    paddingLeft: 8,
  },
  starName: {
    fontSize: 17,
    color: "orange",
  },
  categoryTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginVertical: 15,
  },
});
