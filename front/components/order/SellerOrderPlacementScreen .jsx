// SellerOrderPlacementScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { OrderData } from '../../data/OrderData';
const SellerOrderPlacementScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Fetch the list of products from your backend
//   useEffect(() => {
//     // Assume you have a function to fetch products from your API
//     fetchProductsFromBackend()
//       .then((data) => setProducts(data))
//       .catch((error) => console.error('Error fetching products:', error));
//   }, []);

  const handleProductSelection = (productId) => {
    // Toggle product selection
    const isSelected = selectedProducts.includes(productId);
    if (isSelected) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handlePlaceOrder = () => {
    // Implement logic to send the selected products to the backend for order placement
    // You'll need to integrate with your order placement API here
    placeOrder(selectedProducts)
      .then((orderId) => {
        console.log('Order placed successfully! Order ID:', orderId);
        // Optionally, navigate to an order confirmation screen or perform other actions
        navigation.navigate('OrderConfirmation', { orderId });
      })
      .catch((error) => console.error('Error placing order:', error));
  };

  return (
    <View>
      <Text>Select Products:</Text>
      <FlatList
        data={OrderData}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Button
              title={selectedProducts.includes(item.id) ? 'Deselect' : 'Select'}
              onPress={() => handleProductSelection(item.id)}
            />
          </View>
        )}
      />
      <Button title="Place Order" onPress={handlePlaceOrder} />
    </View>
  );
};

export default SellerOrderPlacementScreen;
