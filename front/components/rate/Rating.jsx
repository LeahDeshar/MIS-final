import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons

const Rating = ({ initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
    onRatingChange(selectedRating);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Rate this:</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => handleStarPress(star)}
          >
            <FontAwesome
              name={star <= rating ? 'star' : 'star-o'}
              size={30}
              color="#ffa600" // Golden color for the stars
            />
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.ratingText}>{`Rating: ${rating}/5`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  ratingText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default Rating;
