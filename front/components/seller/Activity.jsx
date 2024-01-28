import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Activity = () => {
  const data = {
    totalSales: 50000,
    totalRevenue: 25000,
    activeOrders: 10,
    totalVisitors: 1000,
    totalOrders: 50,
    totalPublishedItems: 200,
    totalInactiveItems: 30,
    outOfStockProducts: 5,
  };

  const activities = [
    { label: 'Total Sales', value: data.totalSales, icon: 'attach-money', color: '#3498db' },
    { label: 'Total Revenue', value: `₹${data.totalRevenue}`, icon: 'monetization-on', color: '#e67e22' },
    { label: 'Active Orders', value: data.activeOrders, icon: 'shopping-cart', color: '#2ecc71' },
    { label: 'Total Visitors', value: data.totalVisitors, icon: 'people', color: '#9b59b6' },
    { label: 'Total Orders', value: data.totalOrders, icon: 'assignment', color: '#e74c3c' },
    { label: 'Published Items', value: data.totalPublishedItems, icon: 'list', color: '#f39c12' },
    { label: 'Inactive Items', value: data.totalInactiveItems, icon: 'block', color: '#c0392b' },
    { label: 'Out of Stock', value: data.outOfStockProducts, icon: 'remove-shopping-cart', color: '#3498db' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity</Text>

      <View style={styles.gridContainer}>
        {activities.map((activity, index) => (
          <View key={index} style={styles.activityItem}>
            <Icon name={activity.icon} size={30} color={activity.color} />
            <Text style={styles.activityLabel}>{activity.label}</Text>
            <Text style={styles.activityValue}>{activity.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityItem: {
    width: '48%', // Adjust as needed
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  activityLabel: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  activityValue: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default Activity;
