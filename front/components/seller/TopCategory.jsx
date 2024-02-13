import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";

const TopCategory = () => {
  const topCategories = [
    { id: 1, name: "Crops", sales: 1500 },
    { id: 2, name: "Livestock", sales: 1200 },
    { id: 3, name: "Equipment", sales: 800 },
    // Add more categories as needed
  ];
  const data = {
    labels: topCategories.map((category) => category.name),
    datasets: [
      {
        data: topCategories.map((category) => category.sales),
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#0a0b09", // Dark background color
    backgroundGradientTo: "#ADBC9F", // Lighter background color
    color: (opacity = 1) => `rgba(231, 250, 15, ${opacity})`, // Yellow color for bars
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color for labels
    style: {
      borderRadius: 8,
    },
  };
  const theme = useSelector((state) => state.products.theme);
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          { color: theme === "dark" ? "#ADBC9F" : "#102c00" },
        ]}
      >
        Top Farming Categories
      </Text>

      <BarChart
        data={data}
        width={400}
        height={350}
        yAxisLabel=""
        chartConfig={chartConfig}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
    // marginHorizontal: 40
  },
});

export default TopCategory;
