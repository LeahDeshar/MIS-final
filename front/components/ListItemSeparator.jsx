import { View } from "react-native";

export default function ListItemSeparator({ height, color }) {
  return (
    <View
      style={{
        height: height || 0.5,
        width: "100%",
        backgroundColor: "black" || color,
      }}
    />
  );
}
