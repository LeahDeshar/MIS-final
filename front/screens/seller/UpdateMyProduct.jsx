import { View, Text, TextInput, StyleSheet, Alert } from "react-native";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";

import InputBox from "../../components/form/InputBox";
import { createProduct, updateProduct } from "../../redux/productAction";
import { useNavigation } from "@react-navigation/native";

const UpdateMyProduct = ({ route }) => {
  const { params } = route;
  const [mypro, setMyPro] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [catList, setCatList] = useState([]);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    const fetchmyproducts = async () => {
      const storedmyProString = await AsyncStorage.getItem("@myproducts");
      const storedMyProduct = JSON.parse(storedmyProString);
      const myuppro = storedMyProduct?.filter(
        (product) => product._id === params._id
      );
      setProductName(myuppro[0].name);
      setProductDescription(myuppro[0].description);
      setProductPrice(myuppro[0].price.toString());
      setProductQuantity(myuppro[0].quantity.toString());
    };
    fetchmyproducts();
  }, []);
  console.log(productName);
  const handleAddProduct = async () => {
    const formData = {
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      quantity: parseInt(productQuantity),
      categoryId: productCategory,
    };

    dispatch(updateProduct(formData, { id: params._id }))
      .then(() => {
        Alert.alert("Product updated successfully");
        navigation.navigate("home");
      })
      .catch((error) => {
        setLoading(false);

        console.error("Error adding product :", error);
        Alert.alert("Failed to add product");
      });
  };
  useEffect(() => {
    const filterCatId = async () => {
      const storedCategoryString = await AsyncStorage.getItem("@category");
      if (storedCategoryString) {
        const storedCategory = JSON.parse(storedCategoryString);
        const category = storedCategory.find(
          (cat) => cat.name === selectedValue
        );
        if (category) {
          setProductCategory(category._id);
        }
      }
    };
    filterCatId();
  }, [selectedValue]);
  useEffect(() => {
    const filterCatName = async () => {
      const storedCategoryString = await AsyncStorage.getItem("@category");
      const storedCategory = JSON.parse(storedCategoryString);
      const catName = storedCategory.map((cat) => cat.name);
      setCatList(catName);
    };
    filterCatName();
  }, []);

  const theme = useSelector((state) => state.products.theme);
  return (
    <Layout>
      <TextInput
        style={[
          styles.input,
          {
            marginTop: 30,
          },
        ]}
        placeholder="Product Name"
        value={productName}
        onChangeText={(text) => setProductName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Description"
        multiline
        value={productDescription}
        onChangeText={(text) => setProductDescription(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        keyboardType="numeric"
        value={productPrice}
        onChangeText={(text) => setProductPrice(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        keyboardType="numeric"
        value={productQuantity}
        onChangeText={(text) => setProductQuantity(text)}
      />

      <View
        style={{
          backgroundColor: theme === "dark" ? "#f9faf9" : "#000",
          marginHorizontal: 20,
          borderRadius: 10,
        }}
      >
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedValue(itemValue);
            // getRole(itemValue.toLowerCase());
          }}
        >
          {catList?.map((cat) => (
            <Picker.Item label={`${cat}`} value={`${cat}`} />
          ))}
        </Picker>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          // width: 500,
        }}
      >
        <TouchableOpacity
          onPress={handleAddProduct}
          style={{
            backgroundColor: theme === "dark" ? "#ADBC9F" : "#000",
            // width: "80%",
            paddingHorizontal: 50,
            justifyContent: "center",
            alignItems: "center",
            height: 40,
            borderRadius: 10,
            marginHorizontal: 20,
            marginVertical: 20,
            marginBottom: 150,
          }}
        >
          <Text>Add Product</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default UpdateMyProduct;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 300,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    paddingTop: 30,
    paddingBottom: 5,
    marginBottom: 16,
    marginHorizontal: 20,
  },
  input: {
    marginHorizontal: 20,
    backgroundColor: "white",
    height: 40,
    marginBottom: 12,
    borderRadius: 9,
    paddingHorizontal: 8,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  image: {
    width: 300,
    height: 250,
    marginBottom: 30,
    resizeMode: "cover",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
