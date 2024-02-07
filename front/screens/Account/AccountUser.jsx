import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
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
import { useDispatch } from "react-redux";

const AccountUser = ({ navigation }) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    dispatch(getUserData());
    fetchDataFromStorage();
    const fetchData = async () => {
      const storedProfileString = await AsyncStorage.getItem("@profile");
      // storedProfile = JSON.parse(storedProfileString);
      setProfile(JSON.parse(storedProfileString));
    };

    fetchData();
  }, [dispatch]);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <View>
          <Image source={UserData.profilePic} style={styles.image} />
        </View>

        <View style={styles.detail}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text>{profile.email} </Text>
          <Text>{profile.phone} </Text>
        </View>
        <View style={styles.couponContainer}>
          <View>
            <Text style={{ textAlign: "center" }}>0</Text>
            <Text>Coupons</Text>
          </View>
          <View>
            <Text style={{ textAlign: "center" }}>0.0</Text>
            <Text>Wallet</Text>
          </View>
        </View>
      </View>
      <View style={styles.btnContainer}>
        {/* <Text style={styles.heading}>Account Setting</Text> */}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Profile")}
        >
          <AntDesign name="edit" style={styles.btnText} />
          <Text style={styles.btnText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("myorders", { id: UserData._id })}
        >
          <AntDesign name="bars" style={styles.btnText} />
          <Text style={styles.btnText}>My Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("notification")}
        >
          <AntDesign name="bells" style={styles.btnText} />
          <Text style={styles.btnText}>Notification Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("notification")}
        >
          <Entypo name="language" style={styles.btnText} />
          <Text style={styles.btnText}>Change Language</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("notification")}
        >
          <AntDesign name="key" style={styles.btnText} />
          <Text style={styles.btnText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("notification")}
        >
          <Entypo name="light-up" style={styles.btnText} />
          <Text style={styles.btnText}>Change Theme</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate("adminPanel", { id: UserData._id })
          }
        >
          <AntDesign name="windows" style={styles.btnText} />
          <Text style={styles.btnText}>Admin Panel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate("adminPanel", { id: UserData._id })
          }
        >
          <MaterialIcons name="policy" style={styles.btnText} />
          <Text style={styles.btnText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("notification")}
        >
          <AntDesign name="info" style={styles.btnText} />
          <Text style={styles.btnText}>About App </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("notification")}
        >
          <MaterialIcons name="contact-support" style={styles.btnText} />
          <Text style={styles.btnText}>Technical Support </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("notification")}
        >
          <AntDesign name="logout" style={styles.btnText} />
          <Text style={styles.btnText}>Logout </Text>
        </TouchableOpacity>
      </View>
      {/* <View> 
                <Footer/>
            </View> */}
    </View>
  );
};

export default AccountUser;
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    // marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 12,
    resizeMode: "cover",
  },

  couponContainer: {
    // flexDirection: 'row',
    justifyContent: "space-between",
  },
  outerContainer: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 33,
  },
  detail: {
    marginLeft: 20,
  },
  btnContainer: {
    // padding: 10,
    backgroundColor: "#fff",
    // margin: 10,
    // marginVertical: 20,
    // elevation: 5,
    borderRadius: 10,
    // marginTop: 150
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
});
