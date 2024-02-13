import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { UserData } from "../../data/UserData";
import Footer from "../../components/layout/Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserData } from "../../redux/userAction";
import { fetchDataFromStorage } from "../../components/auth/localstorage";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/productReducer";
import AppImage from "../../components/AppImage";

const AccountUser = ({ navigation }) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const theme = useSelector((state) => state.products.theme);

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    console.log(newTheme, "newTheme");
    dispatch(setTheme(newTheme));
  };
  useEffect(() => {
    dispatch(getUserData());
    fetchDataFromStorage();
    const fetchData = async () => {
      const storedProfileString = await AsyncStorage.getItem("@profile");
      setProfile(JSON.parse(storedProfileString));
    };

    fetchData();
  }, [dispatch]);
  let auth = useSelector((state) => state.products.auth);
  const logout = async () => {
    auth = null;
    await AsyncStorage.removeItem("@user");
    await AsyncStorage.removeItem("@auth");
    await AsyncStorage.removeItem("@profile");
    await AsyncStorage.removeItem("@cart");

    console.log("Logged out", auth);
    navigation.navigate("login");
  };
  return (
    <View style={styles.outerContainer}>
      <View style={styles.imageContainer}>
        {/* <AppImage
          source={{ uri: profile?.profilePic?.url }}
          style={styles.image}
          alt="Your Alt Text"
          noCache={false}
        /> */}
        <ImageBackground
          source={{ uri: profile?.profilePic?.url }}
          style={styles.image}
        />
        <View style={styles.overlay}></View>
      </View>
      <View style={styles.container}>
        <View style={styles.detail}>
          <Text style={styles.name}>@{profile?.name}</Text>
          <Text style={{ color: "#c1c1c1" }}> {profile?.email} </Text>
          <Text style={{ color: "#c1c1c1" }}>+977 {profile?.phone} </Text>
        </View>
        <View style={styles.couponContainer}>
          <View>
            <Text style={{ color: "#dadada" }}>0</Text>
            <Text style={{ color: "#dadada" }}>Coupons</Text>
          </View>
          <View style={{ paddingTop: 10 }}>
            <Text style={{ color: "#dadada" }}>0.0</Text>
            <Text style={{ color: "#dadada" }}>Wallet</Text>
          </View>
        </View>
      </View>
      <ScrollView
        style={theme === "dark" ? styles.DarkbtnContainer : styles.btnContainer}
      >
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Profile")}
        >
          <AntDesign
            name="edit"
            style={theme === "dark" ? styles.darkbtnText : styles.btnText}
          />
          <Text style={theme === "dark" ? styles.darkbtnText : styles.btnText}>
            Edit Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("myorders", { id: UserData._id })}
        >
          <AntDesign
            name="bars"
            style={theme === "dark" ? styles.darkbtnText : styles.btnText}
          />
          <Text style={theme === "dark" ? styles.darkbtnText : styles.btnText}>
            My Orders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("notification")}
        >
          <AntDesign
            name="bells"
            style={theme === "dark" ? styles.darkbtnText : styles.btnText}
          />
          <Text style={theme === "dark" ? styles.darkbtnText : styles.btnText}>
            Notification Setting
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("notification")}
        >
          <Entypo
            name="language"
            style={theme === "dark" ? styles.darkbtnText : styles.btnText}
          />
          <Text style={theme === "dark" ? styles.darkbtnText : styles.btnText}>
            Change Language
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("notification")}
        >
          <AntDesign
            name="key"
            style={theme === "dark" ? styles.darkbtnText : styles.btnText}
          />
          <Text style={theme === "dark" ? styles.darkbtnText : styles.btnText}>
            Change Password
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleThemeChange}>
          <Entypo
            name="light-up"
            style={theme === "dark" ? styles.darkbtnText : styles.btnText}
          />
          <Text style={theme === "dark" ? styles.darkbtnText : styles.btnText}>
            Change Theme
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate("adminPanel", { id: UserData._id })
          }
        >
          <AntDesign
            name="windows"
            style={theme === "dark" ? styles.darkbtnText : styles.btnText}
          />
          <Text style={theme === "dark" ? styles.darkbtnText : styles.btnText}>
            Admin Panel
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate("adminPanel", { id: UserData._id })
          }
        >
          <MaterialIcons
            name="policy"
            style={theme === "dark" ? styles.darkbtnText : styles.btnText}
          />
          <Text style={theme === "dark" ? styles.darkbtnText : styles.btnText}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("notification")}
        >
          <AntDesign
            name="info"
            style={theme === "dark" ? styles.darkbtnText : styles.btnText}
          />
          <Text style={theme === "dark" ? styles.darkbtnText : styles.btnText}>
            About App{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("notification")}
        >
          <MaterialIcons
            name="contact-support"
            style={theme === "dark" ? styles.darkbtnText : styles.btnText}
          />
          <Text style={theme === "dark" ? styles.darkbtnText : styles.btnText}>
            Technical Support{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={logout}>
          <AntDesign
            name="logout"
            style={theme === "dark" ? styles.darkbtnText : styles.btnText}
          />
          <Text style={theme === "dark" ? styles.darkbtnText : styles.btnText}>
            Logout{" "}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AccountUser;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: 40,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    height: 190,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: 190,
    resizeMode: "cover",
  },

  couponContainer: {
    marginLeft: 150,
  },
  outerContainer: {
    backgroundColor: "#fff",
    // backgroundColor: "#000000",

    flex: 1,
  },
  name: {
    fontSize: 33,
    marginBottom: 5,
    color: "#f7f7f7",
    fontStyle: "italic",
  },
  detail: {
    marginLeft: 20,
  },
  btnContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 80,
    paddingLeft: 10,
  },
  DarkbtnContainer: {
    backgroundColor: "#000000",
    borderRadius: 10,
    marginTop: 80,
    paddingLeft: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: "lightgray",
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 5,
  },
  btnText: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 10,
  },
  darkbtnText: {
    color: "#f7f7f7",
    fontSize: 15,
    marginTop: 10,
    marginLeft: 10,
  },
});
