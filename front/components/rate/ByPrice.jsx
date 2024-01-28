import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from "react-native-a11y-slider";

const ByPrice = ({ products, onProductPress }) => {
  const [priceRange, setPriceRange] = useState([0, 50000]); // Default price range
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handlePriceChange = (values) => {
    console.log(values)
    setPriceRange(values);
    filterProducts(values);
  };

  const filterProducts = (range) => {
    const filtered = products?.filter(
      (product) => product.price >= range[0] && product.price <= range[1]
    );
    setFilteredProducts(filtered);
  };

  const handleProductPress = (product) => {
    // Handle when a product is pressed
    onProductPress(product);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filter by Price:</Text>

      <View style={styles.sliderContainer}>
        <Text>Min: ${priceRange[0].toFixed(2)}</Text>
        <Slider
          style={styles.slider}
          min={0}
          max={50000}
          step={1}
          values={priceRange}

         
          onChange={(values) => handlePriceChange(values)}
        />
        <Text>Max: ${priceRange[1].toFixed(2)}</Text>
      </View>

      {/* <ScrollView style={styles.scrollView}>
        <View style={styles.innerContainer}>
          {filteredProducts?.map((item) => (
            <TouchableOpacity
              key={item._id}
              onPress={() => handleProductPress(item)}
              style={styles.productItem}
            >
              <View>
                <Text>{item.name}</Text>
                <Text>${item?.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView> */}
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
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
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

export default ByPrice;
