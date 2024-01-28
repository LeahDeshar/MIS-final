import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ProductListing = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productCategory, setProductCategory] = useState('');

  const handleAddProduct = () => {
    // Validate input fields before adding the product
    if (!productName || !productDescription || !productPrice || !productQuantity || !productCategory) {
      alert('Please fill in all fields.');
      return;
    }

    // Create a new product object
    const newProduct = {
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      quantity: parseInt(productQuantity),
      category: productCategory,
      // Add other properties as needed
    };

    // Call the onAddProduct function from the parent component with the new product data
    // onAddProduct(newProduct);

    // Clear input fields after adding the product
    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setProductQuantity('');
    setProductCategory('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Product</Text>

      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={text => setProductName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Product Description"
        multiline
        value={productDescription}
        onChangeText={text => setProductDescription(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={productPrice}
        onChangeText={text => setProductPrice(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={productQuantity}
        onChangeText={text => setProductQuantity(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Category"
        value={productCategory}
        onChangeText={text => setProductCategory(text)}
      />

      <Button title="Add Product" onPress={handleAddProduct} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default ProductListing;
