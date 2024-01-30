import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import InputBox from "./InputBox";
import { register } from "../../redux/userAction";
import { useDispatch } from "react-redux";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
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
      contact,
    };
    dispatch(register(formData));
    navigation.navigate("login");
  };
  return (
    <View style={styles.container}>
      {/* <Image source={require("../../assets/login.png")} style={styles.image} /> */}

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

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
          <Text style={styles.loginBtnText}>Register</Text>
        </TouchableOpacity>
        <Text>
          Already Have Account?{" "}
          <Text
            onPress={() => navigation.navigate("login")}
            style={styles.link}
          >
            Login
          </Text>
        </Text>
      </View>
    </View>
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
