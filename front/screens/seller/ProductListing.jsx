import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import Layout from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { createProduct } from "../../redux/productAction";
import { useNavigation } from "@react-navigation/native";
const ProductListing = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const theme = useSelector((state) => state.products.theme);
  const [selectedValue, setSelectedValue] = useState("");
  const [catList, setCatList] = useState([]);
  console.log(selectedValue);
  const [catId, setCatId] = useState("");

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleAddProduct = async () => {
    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productQuantity ||
      !productCategory
    ) {
      alert("Please fill in all fields.");
      return;
    }
    const formData = {
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      quantity: parseInt(productQuantity),
      categoryId: productCategory,
    };

    const storednewproIdString = await AsyncStorage.getItem("@newProduct");
    dispatch(createProduct(formData))
      .then(() => {
        // If the dispatch is successful, show an alert
        const storednewproId = JSON.parse(storednewproIdString);
        Alert.alert("Product  added successfully");
        navigation.navigate("CreateProduct1", { id: storednewproId });
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

  // const [loading, setLoading] = useState(true);
  return (
    <Layout style={styles.container}>
      {/* {loading && <ActivityIndicator size="large" color="#ADBC9F" />} */}
      <View>
        <Text
          style={[
            styles.title,
            { color: theme === "dark" ? "#ADBC9F" : "#102c00" },
          ]}
        >
          Add New Product
        </Text>

        <TextInput
          style={styles.input}
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
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
});

export default ProductListing;
