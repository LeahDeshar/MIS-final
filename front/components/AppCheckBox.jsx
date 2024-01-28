import { Pressable, Text, View } from "react-native";
import CheckBox from "expo-checkbox";

export default function AppCheckBox({
  my0,
  label,
  value,
  onValueChange,
  ...otherProps
}) {
  return (
    <View
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
        value={value}
        onValueChange={onValueChange}
        {...otherProps}
      />
      <Text style={{ marginLeft: 20 }}>{label}</Text>
    </View>
  );
}
