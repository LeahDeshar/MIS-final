import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Footer from "../layout/Footer";
import newProducts from "../../data/NewProductsData";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Layout from "../layout/Layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import AppImage from "../AppImage";

const MyProductDetail = ({ route }) => {
  const { params } = route;
  const [proDetails, setProdetails] = useState([]);
  useEffect(() => {
    const fetchmyproducts = async () => {
      const storedmyProString = await AsyncStorage.getItem("@myproducts");
      const storedMyProduct = JSON.parse(storedmyProString);
      const myuppro = storedMyProduct?.filter(
        (product) => product._id === params._id
      );
      setProdetails(myuppro[0]);
      console.log("peek", myuppro[0].name);
    };
    fetchmyproducts();
  }, [params?._id]);
  // console.log("det", proDetails?.images?.url);
  const theme = useSelector((state) => state.products.theme);
  return (
    <Layout>
      <View>
        <View>
          {proDetails?.images?.url && (
            <AppImage
              source={{ uri: proDetails?.images?.url }}
              noCache={false}
              style={styles.image}
            />
          )}

          <View style={styles.rateCategory}>
            <Text
              style={[
                styles.category,
                {
                  color: theme === "dark" ? "white" : "black",
                },
              ]}
            >
              {proDetails?.category?.name}
            </Text>
            <Text style={styles.star}>
              <Entypo name="star" style={styles.starName} />
              {proDetails?.rating ? proDetails?.rating : 0.0} (0 reviews)
            </Text>
          </View>
        </View>
        <View>
          <Text>Stock information (low or high | available)</Text>
          <View style={styles.productContainer}>
            <Text
              style={[
                styles.title,
                {
                  color: theme === "dark" ? "white" : "black",
                },
              ]}
            >
              {proDetails?.name}
            </Text>
            <Text
              style={[
                styles.priceTitle,
                {
                  color: theme === "dark" ? "white" : "black",
                },
              ]}
            >
              Rs. {proDetails?.price}/ per kg
            </Text>
            <Text
              style={{
                color: theme === "dark" ? "white" : "black",
              }}
            >
              {proDetails?.description}
            </Text>

            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={[
                  styles.btnCart,
                  {
                    backgroundColor: theme === "dark" ? "#ADBC9F" : "#000",
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name="delete"
                  size={20}
                  style={styles.btnCartText}
                />
                <Text style={styles.btnCartText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.btnCart,
                  {
                    backgroundColor: theme === "dark" ? "#ADBC9F" : "#000",
                  },
                ]}
              >
                <MaterialIcons
                  name="edit"
                  size={20}
                  style={styles.btnCartText}
                />
                <Text style={styles.btnCartText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {/* <Footer /> */}
    </Layout>
  );
};

export default MyProductDetail;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "white",
    flex: 1,
    // flexDirection: 'row'
    // height: '100%'
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
    alignItems: "center",
    flexDirection: "row",
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
  },
  btnQtyTxt: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 2,
    paddingVertical: 3,
  },
  footer: {
    // bottom: 80
  },
});
