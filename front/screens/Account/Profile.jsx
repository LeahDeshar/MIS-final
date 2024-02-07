import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { UserData } from "../../data/UserData";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import InputBox from "../../components/form/InputBox";
import Footer from "../../components/layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../redux/userAction";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
  const [email, setEmail] = useState(UserData.email);
  const [profilePic, setProfilePic] = useState(UserData.profilePic);
  const [password, setPassword] = useState(UserData?.password);
  const [name, setName] = useState(UserData?.name);
  const [address, setAddress] = useState(UserData?.address);
  const [city, setCity] = useState(UserData?.city);
  const [contact, setContact] = useState(UserData?.contact);

  const handleUpdate = () => {
    if (!email || !password || !name || !address || !city || !contact) {
      return alert("Please enter your information");
    }
    alert("Profile Updated Successfully");
    navigation.navigate("account");
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={profilePic} />
          <Pressable onPress={() => alert("Profile dialog box")}>
            <Text style={{ color: "red" }}>Update Your Profile Picture</Text>
          </Pressable>
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
          value={password}
          setValue={setPassword}
          placeholder={"Enter Your Password"}
          autoComplete={"password"}
          secureTextEntry={true}
        />
        <InputBox
          value={address}
          setValue={setAddress}
          placeholder={"Enter Your Address"}
          autoComplete={"address-line1"}
        />
        <InputBox
          value={city}
          setValue={setCity}
          placeholder={"Enter Your City"}
          autoComplete={"country"}
        />
        <InputBox
          value={contact}
          setValue={setContact}
          placeholder={"Enter Your Contact"}
          autoComplete={"tel"}
        />
        <TouchableOpacity style={styles.btnUpdate} onPress={handleUpdate}>
          <Text style={styles.btnUpdateText}>Update Profile</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </View>
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
  },
  image: {
    height: 100,
    width: "100%",
    resizeMode: "contain",
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
