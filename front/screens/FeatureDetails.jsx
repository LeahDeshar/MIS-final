import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ProductsData } from "../data/ProductsData";
import Layout from "../components/layout/Layout";
import newProducts from "../data/NewProductsData";
import Footer from "../components/layout/Footer";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FeaturedProducts from "../data/FeaturedData";
import { useNavigation } from "@react-navigation/native";

const ProductDetails = ({ route }) => {
  const navigation = useNavigation();
  const [proDetails, setProdetails] = useState({});
  const [qty, setQty] = useState(1);
  useEffect(() => {
    const getProduct = FeaturedProducts.find((p) => {
      return p?._id === params?._id;
    });
    setProdetails(getProduct);
  }, [params?._id]);
  const handleAddQty = () => {
    if (qty === proDetails?.quantity)
      return alert(`You can't add more than ${proDetails?.quantity} quantity`);
    setQty((prev) => prev + 1);
  };

  const handleRemoveQty = () => {
    if (qty <= 1) return;
    setQty((prev) => prev - 1);
  };

  const { params } = route;
  // Function to get a random product from an array
  const getRandomProduct = (products) => {
    const randomIndex = Math.floor(Math.random() * products.length);
    return products[randomIndex];
  };

  // Function to get an array of random products
  const getRandomProducts = (products, count) => {
    const randomProducts = [];
    for (let i = 0; i < count; i++) {
      const randomProduct = getRandomProduct(products);
      randomProducts.push(randomProduct);
    }
    return randomProducts;
  };

  // Combine the FeaturedProducts and newProducts arrays
  const allProducts = [...FeaturedProducts, ...newProducts];

  // Get 10 random products for recommendations
  const recommendedProducts = getRandomProducts(allProducts, 5);
  // console.log(recommendedProducts)
  return (
    <View style={styles.outerContainer}>
      <View>
        <View>
          <Image source={proDetails?.image} style={styles.image} />
          <View style={styles.rateCategory}>
            <Text style={styles.category}>{proDetails?.category}</Text>
            <Text style={styles.star}>
              <Entypo name="star" style={styles.starName} />
              {proDetails?.rating} (0 reviews)
            </Text>
          </View>
        </View>
        <View>
          <ScrollView>
            <View style={styles.productContainer}>
              <Text style={styles.title}>{proDetails?.name}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.priceTitle}>
                  Rs. {proDetails?.price}/ per kg
                </Text>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={styles.btnQty}
                    onPress={handleRemoveQty}
                  >
                    <Text style={styles.btnQtyTxt}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qty}>{qty}</Text>
                  <TouchableOpacity
                    style={styles.btnQty}
                    onPress={handleAddQty}
                  >
                    <Text style={styles.btnQtyTxt}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Cart")}
                  style={styles.btnCart}
                  disabled={proDetails?.quantity < 0}
                >
                  <Text style={styles.btnCartText}>
                    {proDetails?.quantity > 0 ? "ADD TO CART" : "OUT OF STOCK"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnCart}
                  disabled={proDetails?.quantity < 0}
                >
                  <Text style={styles.btnCartText}>
                    {proDetails?.quantity > 0 ? "BUY NOW" : "OUT OF STOCK"}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.descContainer}>
                <Text style={styles.descTitle}>Description </Text>
                <Text style={styles.desc}>{proDetails?.description}</Text>
              </View>
              <View style={styles.farmerContainer}>
                <Image
                  source={proDetails?.farmer?.image}
                  style={styles.farmImage}
                />
                <View style={styles.farmerDesc}>
                  <Text style={styles.farmeName}>
                    {proDetails?.farmer?.name}
                  </Text>
                  <Text>
                    <Entypo name="location-pin" style={styles.locationPin} />
                    {proDetails?.farmer?.location}
                  </Text>
                </View>
                <View style={styles.contactContainer}>
                  <Feather name="message-square" style={styles.contact} />
                  <FontAwesome name="phone" style={styles.contact} />
                </View>
              </View>
            </View>
            <View style={styles.relatedProduct}>
              <Text style={styles.descTitle}>Related Product</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {recommendedProducts
                  ?.map((item) => (
                    <View
                      key={Math.floor(Math.random() * 30)}
                      style={{ paddingBottom: 500 }}
                    >
                      <TouchableOpacity
                        style={styles.categoryContainer}
                        onPress={() =>
                          navigation.navigate("Details", { _id: item._id })
                        }
                      >
                        <View style={styles.card}>
                          <Image source={item.image} style={styles.cardImage} />
                          <View style={styles.overlay} />
                          <View style={styles.cardTitle}>
                            <Text style={styles.relatedTitle}>{item.name}</Text>
                            <Text style={styles.relatedTitle}>
                              <Entypo name="star" style={styles.starName} />
                              {item.rating | 0}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))
                  .slice(0, 5)}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  relatedTitle: {
    color: "white",
    fontSize: 16,
  },
  outerContainer: {
    backgroundColor: "white",
    height: "100%",
  },
  cardImage: {
    height: 120,
    width: 120,
    borderRadius: 20,

    // width: "100%",
    marginBottom: 10,
    marginTop: 20,
    marginHorizontal: 10,
  },
  card: {
    // flexDirection: 'row',
    width: "100%",
  },
  overlay: {
    position: "absolute",
    top: 20,
    left: 10,
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },

  cardTitle: {
    fontSize: 15,
    marginBottom: 5,
    alignContent: "space-around",
    position: "absolute",
    bottom: 10,
    padding: 5,
    color: "white",
    width: "90%",
    paddingLeft: 18,
  },
  category: {
    borderWidth: 1,
    padding: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 16,
    borderColor: "#928f8f",
    fontSize: 11,
  },
  image: {
    height: 200,
    width: "100%",
    // borderBottomEndRadius: 50,
    // borderBottomStartRadius: 50
  },
  star: {
    fontSize: 15,
  },
  starName: {
    fontSize: 23,
    color: "orange",
  },
  rateCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  },
  productContainer: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  farmerContainer: {
    // marginHorizontal: 18,
    flexDirection: "row",
    marginTop: 10,
  },
  farmerDesc: {
    paddingLeft: 18,
  },
  farmeName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  locationPin: {
    fontSize: 18,
  },
  contactContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    marginLeft: 60,
  },
  contact: {
    fontSize: 28,
    paddingHorizontal: 15,
    // marginLeft: 70
  },
  farmImage: {
    height: 60,
    width: 60,
    borderRadius: 15,
  },
  title: {
    fontSize: 33,
    fontWeight: "bold",
    textAlign: "left",
  },
  priceTitle: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#383838",
    paddingVertical: 7,
  },
  container: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  descTitle: {
    fontSize: 24,
    marginTop: 15,
    fontWeight: "bold",
  },
  relatedProduct: {
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 100,
  },
  desc: {
    fontSize: 14,
    textTransform: "capitalize",
    textAlign: "justify",
    marginVertical: 10,
  },
  descContainer: {
    borderTopWidth: 0.5,
    marginTop: 15,
    borderColor: "#b1b1b1f1",
    paddingTop: 5,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    // marginHorizontal: 10
  },
  btnCart: {
    width: 180,
    backgroundColor: "#000",
    marginVertical: 10,
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
  },
  btnCartText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  btnQty: {
    backgroundColor: "#484848",
    width: 30,
    height: 30,
    borderRadius: 7,
    alignItems: "center",
    // marginHorizontal: 10
  },
  qty: {
    fontSize: 18,
    marginHorizontal: 30,
  },
  btnQtyTxt: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 2,
    paddingVertical: 3,
  },
  footer: {
    bottom: 80,
  },
});
