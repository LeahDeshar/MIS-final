import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";

const PopularProduct = () => {
  const popularProducts = [
    {
      id: 1,
      name: "Product A",
      price: 50,
      quantitySold: 20,
      date: "2023-11-14",
      category: "Electronics",
      image: require("../../assets/p1.jpg"),
    },
    {
      id: 2,
      name: "Product B",
      price: 30,
      quantitySold: 15,
      date: "2023-11-13",
      category: "Clothing",
      image: require("../../assets/p2.jpg"),
    },
    {
      id: 3,
      name: "Product C",
      price: 40,
      quantitySold: 18,
      date: "2023-11-12",
      category: "Home & Kitchen",
      image: require("../../assets/p3.jpg"),
    },
    // Add more products as needed
  ];
  const theme = useSelector((state) => state.products.theme);
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          { color: theme === "dark" ? "#ADBC9F" : "#102c00" },
        ]}
      >
        Popular Products
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Image</Text>
            <Text style={styles.headerCell}>Product</Text>
            <Text style={styles.headerCell}>Price</Text>
            <Text style={styles.headerCell}>Sold</Text>
            <Text style={styles.headerCell}>Date</Text>
            <Text style={styles.headerCell}>Category</Text>
          </View>

          {popularProducts.map((product, index) => (
            <View key={index} style={styles.productRow}>
              <Image source={product.image} style={styles.productImage} />
              <Text style={styles.productCell}>{product.name}</Text>
              <Text style={styles.productCell}>₹{product.price}</Text>
              <Text style={styles.productCell}>{product.quantitySold}</Text>
              <Text style={styles.productCell}>{product.date}</Text>
              <Text style={styles.productCell}>{product.category}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#ADBC9F",
    padding: 12,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  headerCell: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  productRow: {
    flexDirection: "row",
    backgroundColor: "#ced3ca",
    padding: 12,
    alignItems: "center",
  },
  productCell: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 8,
    borderRadius: 8,
  },
});

export default PopularProduct;
