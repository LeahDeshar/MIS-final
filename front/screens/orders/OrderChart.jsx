import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const OrderChart = () => {
    const orderData = {
        labels: ['Accepted', 'Rejected', 'Dispatched', 'Delivered', 'Cancelled'],
        datasets: [
          10, 5, 15, 20, 8
          
        ],
      };
  const { labels, datasets } = orderData;
  const max = Math.max(...datasets);

  return (
    <View style={styles.outerContainer}>
        <Text style={styles.barTitle}>Order Status</Text>
    <View style={styles.container}>
      {datasets.map((value, index) => (
        <View key={index} style={styles.barContainer}>
          <Text style={styles.value}>{value}</Text>

          <View
            style={[
              styles.bar,
              { height: (value / max) * 150 }, // Normalize heights
            ]}
          />
          <Text style={styles.label}>{labels[index]}</Text>

        </View>
      ))}
    </View>
    </View>
  );
};
const styles = StyleSheet.create({
  outerContainer:{
    borderRadius: 10,
    paddingVertical:20,
    marginHorizontal: 20,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: 'white'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  barContainer: {
    alignItems: 'center',
  },
  barTitle:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 20
  },
  bar: {
    width: 10,
    backgroundColor: '#000', // Bar color
    marginTop: 8,
    borderRadius: 4,
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    color: '#555',
  },
  value: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
});
export default OrderChart;
