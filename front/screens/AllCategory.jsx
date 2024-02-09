import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { CategoriesData } from "../data/CategoriesData";
import Footer from "../components/layout/Footer";
import Categories from "../components/categories/Categories";
import Header from "../components/layout/Header";
import FeatureCard from "../components/features/FeatureCard";
import { ScrollView } from "react-native";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppImage from "../components/AppImage";

const AllCategory = () => {
  const navigation = useNavigation();
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedCategoryString = await AsyncStorage.getItem("@category");
        const storedCategory = JSON.parse(storedCategoryString);
        setCategory(storedCategory);
      } catch (error) {
        console.log("Error fetching category:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.topCategory}>
        <Categories />
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {category?.map((item) => (
            <View key={item._id}>
              <TouchableOpacity
                style={styles.categoryContainer}
                onPress={() =>
                  navigation.navigate("Category", { _id: item._id })
                }
              >
                <AppImage
                  source={{
                    uri: item.image.url,
                  }}
                  alt="Example Image"
                  style={styles.imgStyle}
                  // contain={true}
                  noCache={false}
                />
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

export default AllCategory;

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
    // backgroundColor: 'white',
    bottom: -90,
  },
});
