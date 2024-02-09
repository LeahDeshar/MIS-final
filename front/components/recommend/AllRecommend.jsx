import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import FeaturedProducts from "../../data/FeaturedData";
import newProducts from "../../data/NewProductsData";
import Categories from "../categories/Categories";
import Footer from "../layout/Footer";
import { useNavigation } from "@react-navigation/native";

const AllRecommend = () => {
  const navigation = useNavigation();
  const allProducts = [...FeaturedProducts, ...newProducts];
  return (
    <View style={styles.outerContainer}>
      <View>
        <Categories />
      </View>
      <View style={styles.container}>
        <ScrollView>
          {allProducts?.map((item) => (
            <View key={item._id}>
              <TouchableOpacity
                style={styles.categoryContainer}
                onPress={() =>
                  navigation.navigate("Details", { _id: item._id })
                }
              >
                <View style={styles.card}>
                  <Image source={item.image} style={styles.cardImage} />
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
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
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
    // width: "100%",
    // marginBottom: 10,
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
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  footer: {
    bottom: -280,
  },
});
