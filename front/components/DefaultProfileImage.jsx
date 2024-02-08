import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DefaultProfileImage = ({ name }) => {
  const initialLetter = name
    ? name.split(" ")[0][0] + name.split(" ")[1][0]
    : "";
  console.log(initialLetter);
  return (
    <View style={styles.container}>
      <Text style={styles.initial}>{initialLetter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  initial: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default DefaultProfileImage;
