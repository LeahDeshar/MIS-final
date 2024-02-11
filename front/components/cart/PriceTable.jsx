import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const PriceTable = ({ price, title }) => {
  const theme = useSelector((state) => state.products.theme);
  return (
    <View style={styles.container}>
      <Text style={{ color: theme === "dark" ? "white" : "black" }}>
        {title}
      </Text>
      <Text style={{ color: theme === "dark" ? "white" : "black" }}>
        {price}
      </Text>
    </View>
  );
};

export default PriceTable;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    alignItems: "center",
  },
});
