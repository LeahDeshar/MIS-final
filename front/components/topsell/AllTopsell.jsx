import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import Footer from "../layout/Footer";
import newProducts from "../../data/NewProductsData";
import Categories from "../categories/Categories";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getTop6Products } from "../../redux/productAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppImage from "../AppImage";

const AllTopsell = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [allproducts, setAllProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getTop6Products());
      const storedProductsString = await AsyncStorage.getItem("@topproducts");
      const storedProducts = JSON.parse(storedProductsString);
      setAllProducts(storedProducts);
    };
    fetchData();
  }, []);
  const handleMoreBtn = (id) => {
    console.log(id);
    navigation.navigate("Product Details", { _id: id });
  };
  return (
    <View style={styles.outerContainer}>
      <View style={styles.topCategory}>
        <Categories />
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {allproducts?.map((item) => (
            <View key={item._id}>
              <TouchableOpacity
                style={styles.categoryContainer}
                onPress={() => handleMoreBtn(item._id)}
              >
                {item && item.images && item.images.length > 0 && (
                  <>
                    <AppImage
                      source={{ uri: item.images[0].url }}
                      alt="Example Image"
                      style={styles.imgStyle}
                      noCache={false}
                    />
                  </>
                )}
                <View style={styles.overlay} />
                <Text style={styles.catTitle}>{item.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

export default AllTopsell;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "white",
    // paddingBottom: 150
  },
  container: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  topCategory: {
    marginVertical: 20,
  },
  categoryContainer: {
    paddingVertical: 14,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    width: 150,
    height: 150,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  categoryIcon: {
    fontSize: 25,
    verticalAlign: "top",
  },
  catTitle: {
    fontSize: 15,
    fontWeight: "bold",
    position: "absolute",
    bottom: 50,
    width: 100,
    textAlign: "center",
    color: "white",
  },
  imgStyle: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 150,
    height: 150,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  footer: {
    bottom: -310,
  },
});
