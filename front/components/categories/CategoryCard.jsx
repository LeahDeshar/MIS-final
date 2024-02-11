import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Categories from "./Categories";
import Categoriesii from "./Categoriesii";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../redux/categoryAction";
import { fetchDataFromStorage } from "../auth/localstorage";

const CategoryCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const seeAllHandler = () => {
    navigation.navigate("All Category");
    dispatch(getAllCategory());
    fetchDataFromStorage();
  };
  const theme = useSelector((state) => state.products.theme);
  return (
    <View>
      <View style={styles.cateContainer}>
        <Text
          style={[
            styles.cateTitle,
            { color: theme === "dark" ? "#ADBC9F" : "#102c00" },
          ]}
        >
          Categories
        </Text>
        <TouchableOpacity style={styles.seeBtn} onPress={seeAllHandler}>
          <Text
            style={[
              styles.seeall,
              { color: theme === "dark" ? "#ADBC9F" : "#343434" },
            ]}
          >
            See All
          </Text>
        </TouchableOpacity>
      </View>
      <Categoriesii />
      {/* <Categories/> */}
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  cateContainer: {
    marginHorizontal: 22,
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  seeBtn: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  seeall: {
    fontSize: 14,
  },
  cateTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#102c00",
  },
});
