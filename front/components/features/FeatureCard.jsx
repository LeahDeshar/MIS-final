import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  toggleBookmark,
  loadCart,
  removeProductFromCart,
} from "../../redux/productReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FastImage from "react-native-fast-image";

const FeatureCard = ({ product, cardWidth, imgWidth }) => {
  const navigation = useNavigation();
  const [isBookmarked, setBookmark] = useState(false);

  const handleBookmark = () => {
    setBookmark(!isBookmarked);
    if (!isBookmarked) {
      console.log("add to cart");
      dispatch(addProductToCart({ product }));
      dispatch(toggleBookmark({ product }));
      navigation.navigate("Cart");
    } else {
      console.log("remove");
      dispatch(removeProductFromCart({ product }));
      dispatch(toggleBookmark({ product }));
    }
  };
  const { _id, name, description, image, price, rating } = product;

  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      onPress={() => navigation.navigate("Details", { _id: _id })}
    >
      <View>
        {/* <Image source={image} style={[styles.cardImage, { width: imgWidth }]} /> */}
        <FastImage
          source={image}
          // source={{ uri: product.image }} // Use FastImage with uri
          style={[styles.cardImage, { width: imgWidth }]}
          resizeMode={FastImage.resizeMode.cover} // Adjust resizeMode if needed
        />
        <View
          style={{
            position: "absolute",
            top: 10,
            flexDirection: "row",
            marginLeft: 15,
            borderRadius: 15,
            padding: 4,
            backgroundColor: "#cfcfcfc9",
          }}
        >
          <AntDesign name={"star"} color="orange" />
          <Text>{rating}</Text>
        </View>

        <TouchableOpacity
          onPress={handleBookmark}
          style={{
            position: "absolute",
            right: 0,
            backgroundColor: "#000000fe",
            borderRadius: "50%",
            height: 38,
            width: 38,
            marginRight: 10,
            marginTop: 10,
          }}
        >
          <AntDesign
            name={isBookmarked ? "heart" : "hearto"}
            size={23}
            style={{
              color: "#ffffff",
              padding: 7.5,
              textAlign: "center",
            }}
          />
        </TouchableOpacity>
        <View style={styles.detailText}>
          <Text style={styles.cardTitle}>{name}</Text>
          <Text style={{ fontSize: 17, marginTop: 5 }}>Rs.{price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeatureCard;

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailText: {
    padding: 10,
    paddingBottom: 15,
    marginLeft: 5,
  },
  cardImage: {
    height: 120,
    width: "100%",
    marginBottom: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardDesc: {
    fontSize: 11,
    width: "100%",

    textAlign: "left",
  },
  btnContainer: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#000",
    height: 20,
    width: 75,
    borderRadius: 5,
    justifyContent: "center",
  },
  btnCart: {
    backgroundColor: "#e28718",
    height: 20,
    width: 75,
    borderRadius: 5,
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    padding: 5,
    fontSize: 10,
    fontWeight: "bold",
  },
});
