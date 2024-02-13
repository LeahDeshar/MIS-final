import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import Layout from "../../components/layout/Layout";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import DefaultProfileImage from "../../components/DefaultProfileImage";
import * as ImagePicker from "expo-image-picker";
const ProductListing = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productCategory, setProductCategory] = useState("");

  const handleAddProduct = () => {
    // Validate input fields before adding the product
    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productQuantity ||
      !productCategory ||
      !selectedImage
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Create a new product object
    const newProduct = {
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      quantity: parseInt(productQuantity),
      category: productCategory,
    };

    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setProductQuantity("");
    setProductCategory("");
  };
  const theme = useSelector((state) => state.products.theme);
  const [selectedValue, setSelectedValue] = useState("");
  const [catList, setCatList] = useState([]);
  console.log(selectedValue);
  const [catId, setCatId] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const filterCatId = async () => {
      const storedCategoryString = await AsyncStorage.getItem("@category");
      if (storedCategoryString) {
        const storedCategory = JSON.parse(storedCategoryString);
        const category = storedCategory.find(
          (cat) => cat.name === selectedValue
        );
        if (category) {
          setCatId(category._id);
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
  // const handleSelectImage = async () => {
  //   try {
  //     const permissionResult =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (!permissionResult.granted) {
  //       alert("Permission to access camera roll is required!");
  //       return;
  //     }

  //     const pickerResult = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       quality: 1,
  //     });

  //     if (!pickerResult.canceled && pickerResult.assets.length > 0) {
  //       const firstAsset = pickerResult.assets[0];
  //       setSelectedImage(firstAsset.uri);

  //       let formData = new FormData();
  //       formData.append("file", {
  //         uri: firstAsset.uri,
  //         type: "image/png",
  //         name: "profilePic.png",
  //       });

  //       dispatch(UpdateUserProfileImage(formData));
  //     }
  //   } catch (error) {
  //     console.log("Error picking an image:", error);
  //   }
  // };
  // const handleSelectImage = async (capture = true) => {
  //   try {
  //     let pickerResult;

  //     // Request permission to access camera roll
  //     const permissionResult =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (!permissionResult.granted) {
  //       alert("Permission to access camera roll is required!");
  //       return;
  //     }

  //     // Pick image from gallery
  //     if (!capture) {
  //       pickerResult = await ImagePicker.launchImageLibraryAsync({
  //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //         allowsEditing: true,
  //         quality: 1,
  //       });
  //     }
  //     // Capture new image using camera
  //     else {
  //       pickerResult = await ImagePicker.launchCameraAsync({
  //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //         allowsEditing: true,
  //         quality: 1,
  //       });
  //     }

  //     if (!pickerResult.canceled && pickerResult.assets.length > 0) {
  //       const firstAsset = pickerResult.assets[0];
  //       setSelectedImage(firstAsset.uri);

  //       let formData = new FormData();
  //       formData.append("file", {
  //         uri: firstAsset.uri,
  //         type: "image/png",
  //         name: "profilePic.png",
  //       });

  //       // dispatch(UpdateUserProfileImage(formData));
  //     }
  //   } catch (error) {
  //     console.log("Error picking an image:", error);
  //   }
  // };
  const handleSelectImage = async () => {
    try {
      const permissionResultLibrary =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const permissionResultCamera =
        await ImagePicker.requestCameraPermissionsAsync();
      if (!permissionResultLibrary.granted || !permissionResultCamera.granted) {
        Alert.alert("Permission to access camera roll and camera is required!");
        return;
      }

      const options = ["Take Photo", "Choose from Library", "Cancel"];
      const selectedIndex = await new Promise((resolve) => {
        Alert.alert(
          "Select Image Source",
          null,
          options.map((option, index) => ({
            text: option,
            onPress: () => resolve(index),
          }))
        );
      });

      if (selectedIndex === 0) {
        // User selected 'Take Photo'
        const pickerResult = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          quality: 1,
        });
        handleImagePickerResult(pickerResult);
      } else if (selectedIndex === 1) {
        // User selected 'Choose from Library'
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
        handleImagePickerResult(pickerResult);
      }
    } catch (error) {
      console.log("Error picking an image:", error);
    }
  };

  const handleImagePickerResult = (pickerResult) => {
    if (!pickerResult.canceled && pickerResult.assets.length > 0) {
      const firstAsset = pickerResult.assets[0];
      setSelectedImage(firstAsset.uri);

      let formData = new FormData();
      formData.append("file", {
        uri: firstAsset.uri,
        type: "image/png",
        name: "profilePic.png",
      });
    }
  };
  return (
    <Layout style={styles.container}>
      <Text
        style={[
          styles.title,
          { color: theme === "dark" ? "#ADBC9F" : "#102c00" },
        ]}
      >
        Add New Product
      </Text>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.image} />
          ) : (
            <DefaultProfileImage name={"C V"} />
          )}
        </TouchableOpacity>
      </View>
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
      {/* <TextInput
        style={styles.input}
        placeholder="Category"
        value={productCategory}
        onChangeText={(text) => setProductCategory(text)}
      /> */}
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

export default ProductListing;
