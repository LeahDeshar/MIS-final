// import { View, Text, StyleSheet } from "react-native";
// import React, { useState } from "react";
// import { TextInput } from "react-native";
// import Entypo from "react-native-vector-icons/Entypo";
// const InputBox = ({
//   autoComplete,
//   placeholder,
//   secureTextEntry,
//   value,
//   setValue,
//   icon = null,
// }) => {
//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         autoComplete={autoComplete}
//         placeholder={placeholder}
//         autoCorrect={false}
//         secureTextEntry={secureTextEntry}
//         value={value}
//         onChangeText={(text) => setValue(text)}
//       />
//       {icon && (
//         <Entypo
//           name={icon}
//           size={20}
//           color="#6c6c6c"
//           style={{
//             position: "absolute",
//             right: 55,
//             top: 10,
//           }}
//         />
//       )}
//     </View>
//   );
// };

// export default InputBox;
// const styles = StyleSheet.create({
//   container: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   input: {
//     width: "80%",
//     backgroundColor: "#fff",
//     // backgroundColor: "#adadad",

//     height: 40,
//     paddingLeft: 10,
//     borderRadius: 10,
//     color: "#000",
//     borderWidth: 1,
//     borderColor: "lightgray",
//   },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

const InputBox = ({
  autoComplete,
  placeholder,
  secureTextEntry,
  value,
  setValue,
  icon = null,
}) => {
  const [secureEntry, setSecureEntry] = useState(secureTextEntry);

  const toggleSecureEntry = () => {
    setSecureEntry(!secureEntry);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoComplete={autoComplete}
        placeholder={placeholder}
        autoCorrect={false}
        secureTextEntry={secureEntry} // Toggle secure entry based on state
        value={value}
        onChangeText={(text) => setValue(text)}
      />

      {secureTextEntry && (
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={toggleSecureEntry}
        >
          <Entypo
            name={secureEntry ? "eye" : "eye-with-line"}
            size={20}
            color="#6c6c6c"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  input: {
    width: "80%",
    backgroundColor: "#fff",
    height: 40,
    paddingLeft: 10,
    borderRadius: 10,
    color: "#000",
    borderWidth: 1,
    borderColor: "lightgray",
  },
  toggleButton: {
    position: "absolute",
    right: 55,
    top: 10,
  },
});
