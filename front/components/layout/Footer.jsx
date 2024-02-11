import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Footer = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // const user = 'seller'
  const user = "buyer";

  const handlePlusButton = () => {
    if (user === "buyer") {
      navigation.navigate("Forum");
    } else {
      navigation.navigate("CreateProduct");
    }
  };
  const theme = useSelector((state) => state.products.theme);
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#141414" : "#fff" },
      ]}
    >
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("home")}
      >
        <AntDesign
          name="home"
          style={[
            styles.icon,
            {
              color: theme === "dark" ? "#fff" : "#000",
            },
            route.name === "home" && styles.active,
          ]}
        />
        <Text
          style={[
            styles.iconText,
            {
              color: theme === "dark" ? "#fff" : "#000",
            },
            route.name === "home" && styles.active,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("Notification")}
      >
        <AntDesign
          name="bells"
          style={[
            styles.icon,
            {
              color: theme === "dark" ? "#fff" : "#000",
            },
            route.name === "Notification" && styles.active,
          ]}
        />
        <Text
          style={[
            styles.iconText,
            {
              color: theme === "dark" ? "#fff" : "#000",
            },
            route.name === "Notification" && styles.active,
          ]}
        >
          Notification
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.menuContainer, styles.plusContainer]}
        onPress={handlePlusButton}
      >
        <AntDesign name="plus" style={[styles.icon, styles.plusIcon]} />
        {/* <Text style={styles.iconText}>Post</Text> */}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("Account")}
      >
        <AntDesign
          name="user"
          style={[
            styles.icon,
            {
              color: theme === "dark" ? "#fff" : "#000",
            },
            route.name === "Account" && styles.active,
          ]}
        />
        <Text
          style={[
            styles.iconText,
            {
              color: theme === "dark" ? "#fff" : "#000",
            },
            route.name === "Account" && styles.active,
          ]}
        >
          Account
        </Text>
      </TouchableOpacity>

      {user === "buyer" ? (
        <TouchableOpacity
          style={styles.menuContainer}
          onPress={() => navigation.navigate("Cart")}
        >
          <AntDesign
            name="shoppingcart"
            style={[
              styles.icon,
              route.name === "Cart" && styles.active,
              {
                color: theme === "dark" ? "#fff" : "#000",
              },
            ]}
          />
          <Text
            style={[
              styles.iconText,
              route.name === "Cart" && styles.active,
              {
                color: theme === "dark" ? "#fff" : "#000",
              },
            ]}
          >
            Cart
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.menuContainer}
          onPress={() => navigation.navigate("InOrders")}
        >
          <MaterialCommunityIcons
            name="truck-outline"
            style={[
              styles.icon,
              route.name === "Cart" && styles.active,
              {
                color: theme === "dark" ? "#fff" : "#000",
              },
            ]}
          />
          <Text
            style={[
              styles.iconText,
              route.name === "Cart" && styles.active,
              {
                color: theme === "dark" ? "#fff" : "#000",
              },
            ]}
          >
            Orders
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Footer;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,

    // backgroundColor: "white",
    display: "flex",
    width: "90%",
    flex: 1,
    marginHorizontal: 25,
    zIndex: 200,
    elevation: 10,
    borderRadius: 35,
    position: "absolute",
    bottom: 110,
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  menuContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 25,
  },
  plusContainer: {
    width: 60,
    height: 60,
    borderRadius: 30, // Half of the width and height for a perfect circle
    backgroundColor: "#102c00", // Corrected color code (without the extra '7')
    position: "absolute", // Use position absolute for bottom positioning
    bottom: 16,
    right: "43%",
    justifyContent: "center", // Center the content vertically
    alignItems: "center",
  },

  plusIcon: {
    fontSize: 40,
    color: "white",
  },
  iconText: {
    color: "#000",
    fontSize: 10,
  },
  active: {
    color: "#2c7d00",
  },
});
