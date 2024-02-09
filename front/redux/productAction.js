import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { server } from "./store";

export const getAllProducts = () => async (dispatch) => {
  try {
    console.log("get Products");

    dispatch({
      type: "getAllProductRequest",
    });
    console.log("get category");

    const { data } = await axios.get(`${server}/products/getAll`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: "getAllProductSuccess",
      payload: data?.products,
    });
    // console.log(data?.products);
    await AsyncStorage.setItem("@allproducts", JSON.stringify(data?.products));
  } catch (error) {
    console.error("Error fetching user data:", error);

    dispatch({
      type: "getAllProductFail",
      payload: error.message,
    });
  }
};
