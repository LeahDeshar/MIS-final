import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";

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
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("home")}
      >
        <AntDesign
          name="home"
          style={[styles.icon, route.name === "home" && styles.active]}
        />
        <Text style={[styles.iconText, route.name === "home" && styles.active]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("Notification")}
      >
        <AntDesign
          name="bells"
          style={[styles.icon, route.name === "Notification" && styles.active]}
        />
        <Text
          style={[
            styles.iconText,
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
          style={[styles.icon, route.name === "Account" && styles.active]}
        />
        <Text
          style={[styles.iconText, route.name === "Account" && styles.active]}
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
            style={[styles.icon, route.name === "Cart" && styles.active]}
          />
          <Text
            style={[styles.iconText, route.name === "Cart" && styles.active]}
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
            style={[styles.icon, route.name === "Cart" && styles.active]}
          />
          <Text
            style={[styles.iconText, route.name === "Cart" && styles.active]}
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

    backgroundColor: "white",
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
    color: "#000",
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
