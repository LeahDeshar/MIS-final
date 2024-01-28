import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const ByDate = ({ products, onProductPress }) => {
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    // Sort products by date in descending order (latest first)
    const sorted = [...products].sort((a, b) => new Date(b.date) - new Date(a.date));
    setSortedProducts(sorted);
  }, [products]);

  const handleProductPress = (product) => {
    // Handle when a product is pressed
    onProductPress(product);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sort by Date:</Text>

      <ScrollView style={styles.scrollView}>
        <View style={styles.innerContainer}>
          {sortedProducts.map((item) => (
            <TouchableOpacity
              key={item._id}
              onPress={() => handleProductPress(item)}
              style={styles.productItem}
            >
              <View>
                <Text>{item.name}</Text>
                {/* Add more product details as needed */}
                <Text>Date: {item.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  scrollView: {
    marginTop: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productItem: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#808080a7',
    marginHorizontal: 3,
    marginBottom: 10,
  },
});

export default ByDate;
