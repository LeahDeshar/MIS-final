import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import InputBox from "./InputBox";
import { useNavigation } from "@react-navigation/native";
import Screen from "../Screen";
import { login } from "../../redux/userAction";
import { useDispatch } from "react-redux";
import { useReduxStateHook } from "../../redux/customHook";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loading = useReduxStateHook(navigation, "home");
  const handleLogin = () => {
    if (!email || !password) {
      return alert("Please enter your information");
    }
    dispatch(login(email, password));
  };
  return (
    <Screen style={styles.container}>
      <View>
        {loading && <Text>loading ...</Text>}

        <InputBox
          placeholder={"Enter Your Email"}
          autoComplete={"email"}
          value={email}
          setValue={setEmail}
        />

        <InputBox
          placeholder={"Enter Your Password"}
          secureTextEntry={true}
          value={password}
          setValue={setPassword}
        />

        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>
          <Text>
            Don't Have Account?{" "}
            <Text
              onPress={() => navigation.navigate("register")}
              style={styles.link}
            >
              Register
            </Text>
          </Text>
        </View>
      </View>
    </Screen>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  image: {
    height: 200,
    width: "100%",
    resizeMode: "contain",
  },
  loginBtn: {
    backgroundColor: "#000",
    width: "80%",
    justifyContent: "center",
    height: 40,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtnText: {
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "500",
    fontSize: 18,
  },
  link: {
    color: "red",
  },
});
