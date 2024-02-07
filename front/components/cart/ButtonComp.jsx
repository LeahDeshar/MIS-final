//import liraries
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const ButtonComp = ({
  text = "DONE",
  onPress = () => {},
  btnStyle = {},
  isLoading = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.container,
        backgroundColor: "#D7654D",
        ...btnStyle,
      }}
    >
      {isLoading ? (
        <ActivityIndicator size={"small"} />
      ) : (
        <Text style={styles.textStyle}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 42,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  textStyle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
});

export default ButtonComp;
