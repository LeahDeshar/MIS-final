import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
const OrderListComponent = ({ orders }) => {
  const theme = useSelector((state) => state.products.theme);
  const navigation = useNavigation();
  const handleConfirmOrder = () => {
    Alert.alert("Order Confirmed");
  };
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("orderDetails", { _id: item._id })}
          style={styles.orderItem}
        >
          <View>
            <Image source={item.image} style={styles.imgStyle} />
          </View>
          <View>
            <Text
              style={[
                styles.productName,
                {
                  color: theme === "dark" ? "white" : "black",
                },
              ]}
            >
              {item.name}
            </Text>
            <Text
              style={[
                {
                  color: theme === "dark" ? "white" : "black",
                },
              ]}
            >
              Quantity: {item.quantity}
            </Text>
            <Text
              style={[
                {
                  color: theme === "dark" ? "white" : "black",
                },
              ]}
            >
              Total Amount: ${item.price}
            </Text>
            <TouchableOpacity onPress={handleConfirmOrder}>
              <Text>Confirm Order</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  orderItem: {
    // backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  productName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  imgStyle: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginVertical: 10,
    marginRight: 10,
  },
});

export default OrderListComponent;
