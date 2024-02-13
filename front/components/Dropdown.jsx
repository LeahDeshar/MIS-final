import React, { useState } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";

const Dropdown = ({ getRole }) => {
  const [selectedValue, setSelectedValue] = useState("Customer");

  return (
    <View
      style={{
        borderWidth: 0.2,
        borderColor: "#adadad",
        marginHorizontal: 40,
        backgroundColor: "white",
        borderRadius: 10,
      }}
    >
      <Text style={{ marginLeft: 13, color: "#344029", marginTop: 10 }}>
        You're a: {selectedValue}
      </Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedValue(itemValue);
          getRole(itemValue.toLowerCase());
        }}
      >
        <Picker.Item label="Customer" value="Customer" />
        <Picker.Item label="Farmer" value="Farmer" />
      </Picker>
    </View>
  );
};

export default Dropdown;
