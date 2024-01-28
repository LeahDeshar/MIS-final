import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const StockStatus = () => {
  const stockStatus = {
    totalItems: 100,
    inStockItems: 75,
    outOfStockItems: 25,
  };

  const data = [
    {
      name: 'In Stock',
      population: stockStatus.inStockItems,
      color: '#272626c2',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Out of Stock',
      population: stockStatus.outOfStockItems,
      color: '#000000',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stock Status</Text>
      <View style={styles.pieContainer}>
      <PieChart
        data={data}
        width={300}
        height={200}
        chartConfig={{
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ecf0f1',
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
pieContainer:{
    paddingLeft: 30
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default StockStatus;
