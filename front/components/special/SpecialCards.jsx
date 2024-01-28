import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const SpecialCards = ({ specialOffers, onOfferPress }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onOfferPress(item)}
    >
      <Text style={styles.title}>{item.offerTitle}</Text>
      {/* Additional information can be displayed here */}
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={specialOffers}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SpecialCards;
