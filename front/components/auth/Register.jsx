import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import InputBox from "./InputBox";
import { register } from "../../redux/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useReduxStateHook } from "../../redux/customHook";
import Dropdown from "../Dropdown";
import Screen from "../Screen";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState("user");

  const dispatch = useDispatch();
  const handleRegister = () => {
    if (!email || !password || !name || !address || !contact) {
      return alert("Please enter your information");
    }
    const formData = {
      email,
      password,
      name,
      address,
      phone: contact,
      role,
    };
    dispatch(register(formData));
  };
  const getRole = (role) => {
    setRole(role);
  };
  const loading = useReduxStateHook(navigation, "login");
  const theme = useSelector((state) => state.products.theme);

  return (
    <Screen
      style={[
        styles.container,
        {
          backgroundColor: theme === "dark" ? "#141414" : "#fff",
        },
      ]}
    >
      <Text
        style={{
          color: theme === "dark" ? "#ADBC9F" : "#000",
          fontSize: 25,
          marginLeft: 45,
          marginVertical: 10,
          // textAlign: "center",
        }}
      >
        CREATE ACCOUNT
      </Text>
      <InputBox
        placeholder={"Enter Your Name"}
        autoComplete={"name"}
        value={name}
        setValue={setName}
      />

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
        icon={"eye"}
      />

      <InputBox
        placeholder={"Enter Your Address"}
        value={address}
        setValue={setAddress}
        autoComplete={"address-line1"}
      />

      <InputBox
        placeholder={"Enter Your Contact"}
        value={contact}
        setValue={setContact}
        autoComplete={"tel"}
      />
      <View>
        <Dropdown getRole={getRole} />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[
            styles.loginBtn,
            {
              backgroundColor: theme === "dark" ? "#ADBC9F" : "#000",
            },
          ]}
          onPress={handleRegister}
        >
          <Text
            style={[
              styles.loginBtnText,
              {
                color: theme === "dark" ? "#000000" : "#fff",
              },
            ]}
          >
            Register
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: theme === "dark" ? "white" : "#000",
          }}
        >
          Already Have Account?{" "}
          <Text
            onPress={() => navigation.navigate("login")}
            style={styles.link}
          >
            Login
          </Text>
        </Text>
      </View>
    </Screen>
  );
};

export default Register;

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
    // backgroundColor: "#344029",
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
    color: "#ADBC9F",
  },
});
