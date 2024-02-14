import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
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
import AppImage from "../AppImage";
import { getAllProducts } from "../../redux/productAction";

const FeatureCard = React.memo(({ product, cardWidth, imgWidth }) => {
  const navigation = useNavigation();
  const [isBookmarked, setBookmark] = useState(false);
  const dispatch = useDispatch();

  let token;
  useEffect(() => {
    const fetchToken = async () => {
      token = await AsyncStorage.getItem("@auth");
    };
    fetchToken();
  }, []);
  const auth = useSelector((state) => state.user.token);
  const handleBookmark = () => {
    if (token || auth) {
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
    } else {
      Alert.alert(
        "Please Login",
        "You need to login to add to cart",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => navigation.navigate("login") },
        ]
        // { cancelable: false }
      );
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      onPress={() => navigation.navigate("Details", { product })}
    >
      <View>
        {product && product.images && (
          <>
            {product.images.url && (
              <AppImage
                source={{ uri: product.images.url }}
                alt="Example Image"
                style={[styles.cardImage, { width: imgWidth }]}
                noCache={false}
              />
            )}
          </>
        )}

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
          <Text>{product.rating}</Text>
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
          <Text style={styles.cardTitle}>{product?.name}</Text>
          <Text style={{ fontSize: 17, marginTop: 5 }}>
            Rs.{product?.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});
export default FeatureCard;

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderRadius: 20,

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
