import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";

const StockStatus = () => {
  const stockStatus = {
    totalItems: 100,
    inStockItems: 75,
    outOfStockItems: 25,
  };

  const data = [
    {
      name: "In Stock",
      population: stockStatus.inStockItems,
      color: "#494949c2",
      legendFontColor: "#ADBC9F",
      legendFontSize: 15,
    },
    {
      name: "Out of Stock",
      population: stockStatus.outOfStockItems,
      color: "#ADBC9F",
      legendFontColor: "#ADBC9F",
      legendFontSize: 15,
    },
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
        Stock Status
      </Text>
      <View style={styles.pieContainer}>
        <PieChart
          data={data}
          width={300}
          height={200}
          chartConfig={{
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ecf0f1",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  pieContainer: {
    paddingLeft: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default StockStatus;
