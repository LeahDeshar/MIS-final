import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const RecentOrder = () => {
    const recentOrders = [
        { orderNumber: '12345', orderDate: '2023-11-14', totalAmount: 1500 },
        { orderNumber: '12346', orderDate: '2023-11-13', totalAmount: 2000 },
        { orderNumber: '12347', orderDate: '2023-11-12', totalAmount: 1200 },
        { orderNumber: '12348', orderDate: '2023-11-11', totalAmount: 1800 },
        { orderNumber: '12349', orderDate: '2023-11-10', totalAmount: 2500 },
      ];
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Recent Orders</Text>
            <TouchableOpacity>
                <Text>See All</Text>
            </TouchableOpacity>
        </View>

      {recentOrders.map((order, index) => (
        <View key={index} style={styles.orderItem}>
          <Text style={styles.orderNumber}>Order #{order.orderNumber}</Text>
          <Text style={styles.orderDate}>{order.orderDate}</Text>
          <Text style={styles.orderTotal}>Total: ₹{order.totalAmount}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderItem: {
    backgroundColor: '#ecf0f1',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  orderDate: {
    marginTop: 4,
    fontSize: 14,
    color: '#7f8c8d',
  },
  orderTotal: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
});

export default RecentOrder;
