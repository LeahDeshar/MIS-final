import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Categories from "./Categories";
import Categoriesii from "./Categoriesii";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
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
  return (
    <View>
      <View style={styles.cateContainer}>
        <Text style={styles.cateTitle}>Categories</Text>
        <TouchableOpacity style={styles.seeBtn} onPress={seeAllHandler}>
          <Text style={styles.seeall}>See All</Text>
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
  },
});
