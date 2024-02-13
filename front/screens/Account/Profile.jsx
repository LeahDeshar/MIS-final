import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { UserData } from "../../data/UserData";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import InputBox from "../../components/form/InputBox";
import Footer from "../../components/layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateUserData,
  UpdateUserProfileImage,
  getUserData,
} from "../../redux/userAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchDataFromStorage } from "../../components/auth/localstorage";
import * as ImagePicker from "expo-image-picker";
import DefaultProfileImage from "../../components/DefaultProfileImage";
import Layout from "../../components/layout/Layout";
const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [contact, setContact] = useState("");
  const theme = useSelector((state) => state.products.theme);
  const handleUpdate = () => {
    if (!email || !name || !address || !contact) {
      return alert("Please enter your information");
    }
    dispatch(UpdateUserData({ email, name, address, phone: contact }));
    dispatch(getUserData());
    fetchDataFromStorage();
    alert("Profile Updated Successfully");
    navigation.navigate("Account");
  };

  useEffect(() => {
    dispatch(getUserData());
    fetchDataFromStorage();
    const fetchData = async () => {
      const storedProfileString = await AsyncStorage.getItem("@profile");
      const profile = JSON.parse(storedProfileString);

      if (profile) {
        setEmail(profile?.email);
        setName(profile?.name);
        setProfilePic(profile?.profilePic?.url);
        setAddress(profile?.address);
        setContact(profile?.phone);
      }
    };

    fetchData();
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);
  console.log(selectedImage);
  const handleSelectImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access camera roll is required!");
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!pickerResult.canceled && pickerResult.assets.length > 0) {
        const firstAsset = pickerResult.assets[0];
        setSelectedImage(firstAsset.uri);

        let formData = new FormData();
        formData.append("file", {
          uri: firstAsset.uri,
          type: "image/png",
          name: "profilePic.png",
        });

        dispatch(UpdateUserProfileImage(formData));
      }
    } catch (error) {
      console.log("Error picking an image:", error);
    }
  };
  return (
    <Layout style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSelectImage}>
            {profilePic && selectedImage === null ? (
              <Image source={{ uri: profilePic }} style={styles.image} />
            ) : selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.image} />
            ) : (
              <DefaultProfileImage name={name} />
            )}
          </TouchableOpacity>
        </View>
        <InputBox
          value={name}
          setValue={setName}
          placeholder={"Enter Your Name"}
          autoComplete={"name"}
        />
        <InputBox
          value={email}
          setValue={setEmail}
          placeholder={"Enter Your Email"}
          autoComplete={"email"}
        />
        <InputBox
          value={address}
          setValue={setAddress}
          placeholder={"Enter Your Address"}
          autoComplete={"address-line1"}
        />
        <InputBox
          value={contact}
          setValue={setContact}
          placeholder={"Enter Your Contact"}
          autoComplete={"tel"}
        />
        <TouchableOpacity
          style={[
            styles.btnUpdate,
            {
              backgroundColor: theme === "dark" ? "#ADBC9F" : "#000",
            },
          ]}
          onPress={handleUpdate}
        >
          <Text style={styles.btnUpdateText}>Update Profile</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* <Footer /> */}
    </Layout>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flex: 1,
    backgroundColor: "white",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  btnUpdate: {
    backgroundColor: "#000",
    height: 40,
    borderRadius: 20,
    marginHorizontal: 50,
    justifyContent: "center",
    marginTop: 10,
  },
  btnUpdateText: {
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
  },
});
