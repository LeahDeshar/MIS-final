import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Banner from "../banner/Banner";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import CategoryCard from "../categories/CategoryCard";
import LocationPickerModal from "../LocationPickerModal";
// import Categories from '../category/Categories';

const Header = () => {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  // const user = "seller"
  const user = "buyer";

  const searchHandler = () => {
    console.log(search);
    setSearch("");
  };
  const micHandler = () => {
    console.log("speech to text");
  };
  const slideHandler = () => {
    navigation.navigate("Search Filter");
  };
  const productListingHandler = () => {
    navigation.navigate("MyProducts");
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [location, setLocation] = useState(null);

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setModalVisible(false);
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.topContainer}>
        <View>
          <TouchableOpacity style={styles.menuBtn} onPress={searchHandler}>
            <Ionicons name="menu-outline" style={styles.menuBtn} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.cultivista}>CultiVista</Text>
        </View>
        <View>
          {user === "buyer" ? (
            <TouchableOpacity style={styles.slideBtn} onPress={slideHandler}>
              <FontAwesome name="sliders" style={styles.slideBtn} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.slideBtn}
              onPress={productListingHandler}
            >
              <MaterialCommunityIcons
                name="food-apple"
                style={styles.slideBtn}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <TextInput
            pointerEvents="none"
            style={styles.input}
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          <TouchableOpacity style={styles.searchBtn} onPress={searchHandler}>
            <FontAwesome name="search" style={styles.searchIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.micBtn} onPress={micHandler}>
            <Feather name="mic" style={styles.micIcon} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <LocationPickerModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        textInput={searchProduct}
        setTextInput={setSearchProduct}
        location={location}
        setLocation={handleLocationSelect}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "white",
    height: 160,
    marginTop: 15,
    paddingTop: 20,
    // borderWidth: 1
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 30,
    // position: 'relative',
    // bottom: 10,
    // marginTop: 40,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    justifyContent: "space-between",
    // borderWidth: 1,
    paddingVertical: 18,
  },
  cultivista: {
    fontSize: 25,
    fontWeight: "bold",
    // paddingTop: 40,
    // marginVertical: 10
  },
  input: {
    borderWidth: 0.3,
    borderColor: "transparent",
    width: "95%",
    position: "absolute",
    left: 12,
    height: 40,
    color: "#000",
    backgroundColor: "#fff",
    paddingLeft: 50,
    fontSize: 16,
    borderRadius: 20,
    marginHorizontal: 15,

    // Shadow properties for iOS
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 3 }, // Shadow offset (width, height)
    shadowOpacity: 0.2, // Shadow opacity (0 to 1)
    shadowRadius: 3, // Shadow blur radius
  },
  searchBtn: {
    position: "absolute",
    left: "12%",
  },
  searchIcon: {
    fontSize: 15,
  },
  slideBtn: {
    fontSize: 22,
    // marginRight: 3,
    // marginTop: 18
  },
  menuBtn: {
    position: "absolute",
    left: "10%",
    fontSize: 30,
    top: -7,
  },
  menuIcon: {
    fontSize: 30,
    // marginTop: 7
  },
  micBtn: {
    position: "absolute",
    right: "12%",
  },
  micIcon: {
    fontSize: 18,
  },
});
