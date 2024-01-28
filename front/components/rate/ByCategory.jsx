import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const ByCategory = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);


    const handleProductPress = (item) => {
        // Handle when a product is pressed
        setSelectedCategory(item.name)
      };
    console.log(selectedCategory )
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filter by Category:</Text>

      <ScrollView style={styles.scrollView}>
        <View style={styles.innerContainer}>
          {products.map((item) => (
            <TouchableOpacity
              key={item._id}
              onPress={() => handleProductPress(item)}
              style={[
                styles.productItem,
                selectedCategory === item.name && styles.selectedCategory,
              ]}
            >
              
                <Text style={[
                selectedCategory === item.name && styles.selectedCategory,
              ]}>{item.name}</Text>
                {/* Add more product details as needed */}
             
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  innerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  categoriesContainer: {
    marginBottom: 15,
  },
  categoryButton: {
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedCategory: {
    backgroundColor: '#000000',
    borderColor: '#000000',
    color: 'white'
  },
  categoryButtonText: {
    color: '#007BFF',
  },
  scrollView: {
    marginTop: 10,
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

export default ByCategory;
