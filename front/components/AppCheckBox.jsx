import { Pressable, Text, View } from "react-native";
import CheckBox from "expo-checkbox";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function AppCheckBox({
  my0,
  label,
  value,
  onValueChange,
  ...otherProps
}) {
  const [checked, setChecked] = useState(value);

  const handlePress = () => {
    if (!checked) {
      setChecked(true);
      onValueChange(true);
    }
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        flexDirection: "row",
        marginHorizontal: 10,
        marginBottom: 20,
        alignItems: "center",
      }}
    >
      <CheckBox
        style={{ height: 23, width: 23 }}
        color={"black"}
        value={checked}
        // onValueChange={handlePress}
        {...otherProps}
      />
      <Text style={{ marginLeft: 20 }}>{label}</Text>
    </TouchableOpacity>
  );
}
