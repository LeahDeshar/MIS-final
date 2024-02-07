import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { server } from "./store";

// action login
export const login = (email, password) => async (dispatch) => {
  try {
    console.log("action", email, password);
    dispatch({
      type: "loginRequest",
    });
    // hitting node login api request
    const { data } = await axios.post(
      `${server}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    dispatch({
      type: "loginSuccess",
      payload: data,
    });
    await AsyncStorage.setItem("@auth", data?.token);
    const stringifiedCurUser = JSON.stringify(data?.user);
    await AsyncStorage.setItem("@user", stringifiedCurUser);
  } catch (error) {
    dispatch({
      type: "loginFail",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};
// register action
export const register = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    dispatch({
      type: "registerRequest",
    });
    // hitapi register
    const { data } = await axios.post(`${server}/user/register`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: "registerSucess",
      payload: data.msg,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "registerFail",
      payload: error.response.data.msg,
    });
  }
};

// GET USER DATTA ACTION\
// export const getUserData = () => async (dispatch) => {
//   try {
//     console.log("get profile");

//     dispatch({
//       type: "getUserDataRequest",
//     });
//     console.log("get profile");

//     // hitting node login api request
//     const { data } = await axios.get(`${server}/user/profile`);
//     console.log("get profile");
//     dispatch({
//       type: "getUserDataSucess",
//       payload: data?.user,
//     });
//   } catch (error) {
//     dispatch({
//       type: "getUserDataFail",
//       payload: error?.response?.data?.message || "An error occured",
//     });
//   }
// };

export const getUserData = () => async (dispatch) => {
  try {
    console.log("get profile");

    dispatch({
      type: "getUserDataRequest",
    });
    console.log("get profile");

    // Get the token from wherever you have stored it
    const token = await AsyncStorage.getItem("@auth");

    // hitting node login api request
    const { data } = await axios.get(`${server}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("get profile");
    dispatch({
      type: "getUserDataSucess",
      payload: data?.user,
    });
    await AsyncStorage.setItem("@profile", JSON.stringify(data?.user));
  } catch (error) {
    console.error("Error fetching user data:", error);

    dispatch({
      type: "getUserDataFail",
      payload: error.message,
    });
  }
};
// LOGOUT ACTION
export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });
    // hitting node login api request
    const { data } = await axios.get(`${server}/user/logout`);
    dispatch({
      type: "logoutSucess",
      payload: data?.message,
    });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response.data.message,
    });
  }
};
