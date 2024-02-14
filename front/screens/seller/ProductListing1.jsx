import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import DefaultProfileImage from "../../components/DefaultProfileImage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AddProductImage } from "../../redux/productAction";
import { useNavigation } from "@react-navigation/native";
// import ActivityIndicator from "../../components/ActivityIndicator";

const ProductListing1 = ({ route }) => {
  const { params } = route;
  console.log(params?.id);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

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
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const handleImagePickerResult = (pickerResult) => {
    if (!pickerResult.canceled && pickerResult.assets.length > 0) {
      const firstAsset = pickerResult.assets[0];
      setSelectedImage(firstAsset.uri);
    }
  };
  const handleAddProduct = () => {
    setLoading(true);
    let formData = new FormData();
    formData.append("file", {
      uri: selectedImage,
      type: "image/png",
      name: "profilePic.png",
    });
    dispatch(AddProductImage(formData, { id: params?.id }))
      .then(() => {
        // If the dispatch is successful, show an alert
        setLoading(false);
        Alert.alert("Product image added successfully");
        navigation.navigate("MyProducts");
      })
      .catch((error) => {
        setLoading(false);

        console.error("Error adding product image:", error);
        Alert.alert("Failed to add product image");
      });
  };
  const theme = useSelector((state) => state.products.theme);
  return (
    <Layout>
      {loading && <ActivityIndicator size="large" color="#ADBC9F" />}
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.image} />
          ) : (
            <DefaultProfileImage name={"C V"} />
          )}
        </TouchableOpacity>
      </View>
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
    </Layout>
  );
};

export default ProductListing1;

const styles = StyleSheet.create({
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
