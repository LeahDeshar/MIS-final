import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { server } from "./store";

export const getAllCategory = () => async (dispatch) => {
  try {
    console.log("get category");

    dispatch({
      type: "getCategoryDataRequest",
    });
    console.log("get category");

    const { data } = await axios.get(`${server}/category/getAll`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: "getCategoryDataSuccess",
      payload: data?.category,
    });
    await AsyncStorage.setItem("@category", JSON.stringify(data?.category));
  } catch (error) {
    console.error("Error fetching user data:", error);

    dispatch({
      type: "getCategoryDataFail",
      payload: error.message,
    });
  }
};
