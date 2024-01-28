import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
// import FeatureCard from './FeatureCard';
import { FeaturedProducts } from '../data/FeaturedData';
import FeatureCard from '../components/features/FeatureCard';
import Categories from '../components/categories/Categories';
const numColumns = 2; // Number of columns in the grid
const AllFeatures = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>All Featured Products</Text>
      <View>
      <Categories/>

      </View>
      <FlatList
        data={FeaturedProducts}
        keyExtractor={(item) => item._id.toString()}
        numColumns={numColumns} // Set the number of columns
        renderItem={({ item }) => <FeatureCard product={item} cardWidth={'48%'}/>}
        columnWrapperStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default AllFeatures;
