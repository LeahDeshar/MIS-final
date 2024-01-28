import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import Rating from '../components/rate/Rating';
import Categories from '../components/categories/Categories';
import ByCategory from '../components/rate/ByCategory';
import { CategoriesData } from '../data/CategoriesData';
import ByPrice from '../components/rate/ByPrice';
import {newProductData} from "../data/NewProductsData"
const FilterSearch = ({ onApplyFilter }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minRating, setMinRating] = useState('');

  const applyFilters = () => {
    // Convert input values to the desired format and pass them to the parent component
    const filters = {
      minPrice: parseFloat(minPrice) || undefined,
      maxPrice: parseFloat(maxPrice) || undefined,
      category: selectedCategory.trim() || undefined,
      minRating: parseFloat(minRating) || undefined,
    };

    // Call the callback function to apply the filters in the parent component
    onApplyFilter(filters);
  };
  const [userRating, setUserRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };
  const handleProductPress = (product) => {
    // Handle when a product is pressed
    console.log('Product pressed:', product);
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Filter Search</Text>

      <Rating initialRating={userRating} onRatingChange={handleRatingChange} />

      <ByCategory products={CategoriesData} onProductPress={handleProductPress} />

      <ByPrice products={newProductData}/>
      
   
      <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
        <Text style={styles.applyButtonText}>Apply Filters</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  applyButton: {
    backgroundColor: '#000000',
    paddingVertical: 10,
    marginHorizontal: 80,
    alignItems: 'center',
    borderRadius: 20,
    width: '60%',
    marginBottom: 50
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FilterSearch;
