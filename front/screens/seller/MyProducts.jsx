import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import Layout from "../../components/layout/Layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import AppImage from "../../components/AppImage";
import { DeleteProduct } from "../../redux/productAction";

const MyProducts = () => {
  const navigation = useNavigation();
  const [mypro, setMyPro] = useState([]);
  const dispatch = useDispatch();
  const cardUpdateHandler = (product) => {
    navigation.navigate("updateMyProduct", { _id: product._id });
  };
  const cardPressHandler = (product) => {
    navigation.navigate("MyProDet", { _id: product._id });
  };
  const handleDeleteBtn = (id) => {
    console.log(id);
    dispatch(DeleteProduct(id))
      .then(() => {
        storedMyProduct = mypro.filter((product) => product._id !== id);

        AsyncStorage.setItem("@myproducts", JSON.stringify(storedMyProduct));

        setMyPro(storedMyProduct);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchmyproducts = async () => {
      const storedmyProString = await AsyncStorage.getItem("@myproducts");
      const storedMyProduct = JSON.parse(storedmyProString);
      setMyPro(storedMyProduct);
      console.log("My Products from AsyncStorage:", storedMyProduct);
    };
    fetchmyproducts();
  }, []);
  const theme = useSelector((state) => state.products.theme);
  return (
    <Layout style={styles.container}>
      <Text>Filtering and sorting setting</Text>
      <ScrollView style={{ marginBottom: 100 }}>
        <View>
          {mypro?.map((product) => (
            <View style={styles.outerCardContainer}>
              <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => cardPressHandler(product)}
              >
                {/* <Image
                  source={{ uri: product.images?.url }}
                  style={styles.imageStyle}
                /> */}
                <AppImage
                  source={{
                    uri:
                      product?.images?.url ||
                      "https://www.hull-o.com/wp-content/uploads/2015/10/Farmer.jpg",
                  }}
                  alt="Example Image"
                  style={styles.imageStyle}
                  contain={true}
                  noCache={false}
                />
                <View style={styles.desc}>
                  <Text
                    style={[
                      styles.title,
                      {
                        color: theme === "dark" ? "white" : "black",
                      },
                    ]}
                  >
                    {product.name}
                  </Text>
                  <Text
                    style={{
                      color: theme === "dark" ? "white" : "black",
                    }}
                  >
                    Rs.{product.price}
                  </Text>
                  <Text
                    style={{
                      color: theme === "dark" ? "white" : "black",
                    }}
                  >
                    {product.quantity}. kg
                  </Text>
                </View>
              </TouchableOpacity>
              <View>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => handleDeleteBtn(product._id)}
                >
                  <MaterialCommunityIcons
                    name="delete"
                    size={20}
                    style={{
                      color: theme === "dark" ? "white" : "black",
                    }}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.updateBtn}
                  onPress={() => cardUpdateHandler(product)}
                >
                  <MaterialIcons
                    name="edit"
                    size={20}
                    style={{
                      color: theme === "dark" ? "white" : "black",
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
};

export default MyProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imageStyle: {
    width: 85,
    height: 85,
    resizeMode: "cover",
    borderRadius: 5,
  },
  outerCardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginVertical: 10,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  deleteBtn: {
    borderWidth: 1,
    marginVertical: 5,
    padding: 8,
    borderRadius: 5,
    borderColor: "#9c9c9cba",
  },
  updateBtn: {
    borderWidth: 1,
    marginVertical: 5,
    padding: 8,
    borderRadius: 5,
    borderColor: "#9c9c9cba",
  },
  desc: {
    marginLeft: 10,
    width: "60%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 6,
  },
});
