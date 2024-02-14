import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/layout/Footer";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getOneProducts } from "../redux/productAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppImage from "../components/AppImage";
import DefaultProfileImage from "../components/DefaultProfileImage";
import { BottomSheetModal } from "@gorhom/bottom-sheet/src";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { addProductToCart, toggleBookmark } from "../redux/productReducer";
import Layout from "../components/layout/Layout";
const ProductDetails = ({ route }) => {
  const navigation = useNavigation();
  const [proDetails, setProdetails] = useState({});
  const [qty, setQty] = useState(1);
  const [newComment, setNewComment] = useState("");
  const auth = useSelector((state) => state.user.token);
  let token;
  useEffect(() => {
    const fetchToken = async () => {
      token = await AsyncStorage.getItem("@auth");
      console.log(token);
    };
    fetchToken();
  }, []);

  const BottomRef = useRef(null);
  const handlePresentModalPress = () => {
    if (token || auth) {
      BottomRef.current.present();
    } else {
      Alert.alert("Please Login", "You need to login to leave a review", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => navigation.navigate("login") },
      ]);
    }
  };
  const handleCloseModalPress = () => {
    BottomRef.current.close();
  };

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

  const dispatch = useDispatch();
  const [allproducts, setAllProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getOneProducts({ id: params?.product._id }));
      const storedOneProductsString = await AsyncStorage.getItem("@oneproduct");
      const storedOneProducts = JSON.parse(storedOneProductsString);
      setProdetails(storedOneProducts);
      const storedTopProductsString = await AsyncStorage.getItem(
        "@topproducts"
      );
      const storedTopProducts = JSON.parse(storedTopProductsString);
      setAllProducts(storedTopProducts);

      const storedAllProductsString = await AsyncStorage.getItem(
        "@allproducts"
      );
      const storedAllProducts = JSON.parse(storedAllProductsString);
      setTotalProducts(storedAllProducts);
    };
    fetchData();
  }, []);

  const product = totalProducts?.find(
    (item) => item._id === params?.product?._id
  );

  const handleBuyNow = () => {
    if (token || auth) {
      navigation.navigate("Confirmation");
    } else {
      Alert.alert("Please Login", "You need to login to buy", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => navigation.navigate("login") },
      ]);
    }
  };
  const handleAddTocart = () => {
    console.log(token);
    if (token || auth) {
      if (product) {
        dispatch(addProductToCart({ product }));
        dispatch(toggleBookmark({ product }));
        navigation.navigate("Cart");
      }
    } else {
      Alert.alert("Please Login", "You need to login to add to cart", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => navigation.navigate("login") },
      ]);
    }
  };
  const theme = useSelector((state) => state.products.theme);
  return (
    <BottomSheetModalProvider>
      <Layout
      // style={[
      //   styles.outerContainer,
      //   {
      //     backgroundColor: theme === "dark" ? "#000" : "#fff",
      //   },
      // ]}
      >
        <View>
          <View>
            {proDetails && proDetails.images && (
              <>
                <AppImage
                  source={{ uri: proDetails?.images?.url }}
                  alt="Example Image"
                  style={styles.image}
                  noCache={false}
                />
              </>
            )}
            {/* <Image source={proDetails?.image} style={styles.image} /> */}
            <View style={styles.rateCategory}>
              <Text
                style={[
                  {
                    color: theme === "dark" ? "#fff" : "#000",
                  },
                  styles.category,
                ]}
              >
                {proDetails?.category?.name}
              </Text>
              <Text
                style={[
                  styles.star,
                  {
                    color: theme === "dark" ? "#fff" : "#000",
                  },
                ]}
              >
                <Entypo name="star" style={styles.starName} />
                {proDetails?.rating} (0 reviews)
              </Text>
            </View>
          </View>
          <View>
            <ScrollView>
              <View style={styles.productContainer}>
                <Text
                  style={[
                    styles.title,
                    {
                      color: theme === "dark" ? "#fff" : "#000",
                    },
                  ]}
                >
                  {proDetails?.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={[
                      styles.priceTitle,
                      {
                        color: theme === "dark" ? "#fff" : "#000",
                      },
                    ]}
                  >
                    Rs. {proDetails?.price}/ per kg
                  </Text>
                  <View style={styles.btnContainer}>
                    <TouchableOpacity
                      style={styles.btnQty}
                      onPress={handleRemoveQty}
                    >
                      <Text style={styles.btnQtyTxt}>-</Text>
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.qty,
                        {
                          color: theme === "dark" ? "#fff" : "#000",
                        },
                      ]}
                    >
                      {proDetails?.quantity}
                    </Text>
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
                    onPress={handleAddTocart}
                    style={[
                      styles.btnCart,
                      {
                        backgroundColor: theme === "dark" ? "#fff" : "#000",
                      },
                    ]}
                    disabled={proDetails?.quantity < 0}
                  >
                    <Text
                      style={[
                        styles.btnCartText,
                        {
                          color: theme === "dark" ? "#000" : "#fff",
                        },
                      ]}
                    >
                      {proDetails?.quantity > 0
                        ? "ADD TO CART"
                        : "OUT OF STOCK"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleBuyNow}
                    style={[
                      styles.btnCart,
                      {
                        backgroundColor: theme === "dark" ? "#fff" : "#000",
                      },
                    ]}
                    disabled={proDetails?.quantity < 0}
                  >
                    <Text
                      style={[
                        styles.btnCartText,
                        {
                          color: theme === "dark" ? "#000" : "#fff",
                        },
                      ]}
                    >
                      {proDetails?.quantity > 0 ? "BUY NOW" : "OUT OF STOCK"}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.descContainer}>
                  <Text
                    style={[
                      styles.descTitle,
                      {
                        color: theme === "dark" ? "#fff" : "#000",
                      },
                    ]}
                  >
                    Description{" "}
                  </Text>
                  <Text
                    style={[
                      styles.desc,
                      {
                        color: theme === "dark" ? "#fff" : "#000",
                      },
                    ]}
                  >
                    {proDetails?.description}
                  </Text>
                </View>
                <View style={styles.farmerContainer}>
                  {proDetails?.farmer &&
                  proDetails?.farmer?.profilePic &&
                  proDetails.farmer?.images?.length > 0 ? (
                    <AppImage
                      source={{ uri: proDetails?.farmer?.profilePic?.url }}
                      alt="Example Image"
                      style={styles.image}
                      noCache={false}
                    />
                  ) : (
                    <DefaultProfileImage
                      name={proDetails?.farmer?.name || ""}
                      size={50}
                      radius={2}
                      backgroundColor="#3e8e0f"
                    />
                  )}
                  <View style={styles.farmerDesc}>
                    <Text
                      style={[
                        styles.farmeName,
                        {
                          color: theme === "dark" ? "#fff" : "#000",
                        },
                      ]}
                    >
                      {proDetails?.farmer?.name}
                    </Text>
                    <Text
                      style={{
                        color: theme === "dark" ? "#fff" : "#000",
                      }}
                    >
                      <Entypo
                        name="location-pin"
                        style={[
                          styles.locationPin,
                          {
                            color: theme === "dark" ? "#fff" : "#000",
                          },
                        ]}
                      />
                      {proDetails?.farmer?.address}
                    </Text>
                  </View>
                  <View style={styles.contactContainer}>
                    <Feather
                      name="message-square"
                      style={[
                        styles.contact,
                        {
                          color: theme === "dark" ? "#fff" : "#000",
                        },
                      ]}
                    />
                    <FontAwesome
                      name="phone"
                      style={[
                        styles.contact,
                        {
                          color: theme === "dark" ? "#fff" : "#000",
                        },
                      ]}
                    />
                  </View>
                </View>

                <View style={{ marginVertical: 18 }}>
                  <Text
                    style={[
                      styles.descTitle,
                      {
                        color: theme === "dark" ? "#fff" : "#000",
                      },
                    ]}
                  >
                    Leave a review
                  </Text>

                  <TouchableOpacity onPress={handlePresentModalPress}>
                    <Text
                      style={{
                        marginTop: 10,
                        fontSize: 15,

                        color: theme === "dark" ? "#fff" : "#000",
                      }}
                    >
                      {proDetails?.reviews?.length} Reviews -
                      <Entypo
                        name="star"
                        style={{}}
                        color={"orange"}
                        size={18}
                      />
                      {proDetails?.rating}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.relatedProduct}>
                <Text
                  style={[
                    styles.descTitle,
                    { color: theme === "dark" ? "#fff" : "#000" },
                  ]}
                >
                  Related Product
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {allproducts
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
                            {item.images && (
                              <AppImage
                                source={{ uri: item?.images?.url }}
                                alt="Example Image"
                                style={styles.cardImage}
                                noCache={false}
                              />
                            )}
                            {/* <Image source={item.image} style={styles.cardImage} /> */}
                            <View style={styles.overlay} />
                            <View style={styles.cardTitle}>
                              <Text style={styles.relatedTitle}>
                                {item.name}
                              </Text>
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
        {/* <View style={styles.footer}>
          <Footer />
        </View> */}
        <BottomSheetModal ref={BottomRef} index={0} snapPoints={[550]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 25,
              borderBottomWidth: 0.7,
              borderBlockColor: "#c9c9c9c7",
              paddingBottom: 13,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Comments</Text>
            <TouchableOpacity
              onPress={handleCloseModalPress}
              style={{ color: "black" }}
            >
              <Text style={{ fontSize: 16 }}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputComment}>
            <Image
              source={require("../assets/farmer/1.jpg")}
              style={styles.avatar}
            />

            <View style={{ width: "85%" }}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                value={newComment}
                multiline
                onChangeText={(text) => setNewComment(text)}
              />
              <TouchableOpacity
                style={styles.addCommentButton}
                onPress={() => handleAddComment(discussion.id)}
              >
                <Ionicons name="send-sharp" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={() => handleAddComment(discussion.id)}
              >
                <Ionicons
                  name="camera-outline"
                  style={{ color: "grey" }}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.commentsContainer}>
            {proDetails?.reviews?.map((comment) => (
              <View key={comment.id} style={styles.commentContainer}>
                <Image source={comment.user.avatar} style={styles.avatar} />
                <View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.commentAuthor}>
                      @{comment.user.username}
                    </Text>
                    <View
                      style={{
                        borderRadius: 15,
                        backgroundColor: "#ababab7b",
                        marginLeft: 10,
                      }}
                    >
                      <Text
                        style={{
                          paddingHorizontal: 5,
                          paddingVertical: 2,
                        }}
                      >
                        <Entypo name="star" color={"orange"} size={18} />
                        {comment?.rating}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.commentText}>{comment.comment}</Text>
                  <View style={{ flexDirection: "row", marginTop: 5 }}>
                    <TouchableOpacity style={styles.interactionButton}>
                      <Text style={styles.interactionButtonText}>
                        {/* {discussion.likes} */} 6
                      </Text>
                      <Ionicons name="ios-thumbs-up" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.interactionButton}>
                      <Text style={styles.interactionButtonText}>0</Text>
                      <Ionicons name="ios-thumbs-down" size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </BottomSheetModal>
      </Layout>
    </BottomSheetModalProvider>
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
  commentAuthor: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  commentText: {
    width: "64%",
    marginTop: 4,
    marginBottom: 4,
    paddingStart: 4,
  },
  commentsContainer: {
    marginTop: 8,
    paddingTop: 8,
    marginHorizontal: 30,
  },
  commentContainer: {
    // borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    flexDirection: "row",
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#ececec",
    paddingVertical: 20,
    borderRadius: 25,
    // marginBottom: 8,
    paddingRight: 40,
    paddingLeft: 38,
    paddingTop: 16,

    // flex:1
  },
  imageContent: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  addCommentButton: {
    // backgroundColor: '#000',
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: "center",
    position: "absolute",
    right: 15,
    bottom: 12,
  },

  cameraButton: {
    // paddingVertical: 8,
    // borderRadius: 4,
    // alignItems: 'center',
    position: "absolute",
    left: 13,
    bottom: 19,
  },
  avatar: {
    width: 43,
    height: 43,
    borderRadius: 20,
    marginRight: 8,
    marginTop: 7,
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
    marginLeft: 5,
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
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  inputComment: {
    flexDirection: "row",
    marginHorizontal: 25,
    marginTop: 15,
    justifyContent: "space-between",
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
    bottom: 180,
  },
});
