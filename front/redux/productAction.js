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

export const getTop6Products = () => async (dispatch) => {
  try {
    console.log("get Top 6 Products");

    dispatch({
      type: "getTopProductRequest",
    });
    console.log("get category");

    const { data } = await axios.get(`${server}/products/getTop`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: "getTopProductSuccess",
      payload: data?.products,
    });
    // console.log(data?.products);
    await AsyncStorage.setItem("@topproducts", JSON.stringify(data?.products));
  } catch (error) {
    console.error("Error fetching user data:", error);

    dispatch({
      type: "getTopProductFail",
      payload: error.message,
    });
  }
};

export const getOneProducts =
  ({ id }) =>
  async (dispatch) => {
    try {
      console.log("get One Products");

      dispatch({
        type: "getOneProductRequest",
      });
      console.log("get one category");

      const { data } = await axios.get(
        `${server}/products/getOne/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "getOneProductSuccess",
        payload: data?.product,
      });
      console.log(data?.product);
      await AsyncStorage.setItem("@oneproduct", JSON.stringify(data?.product));
    } catch (error) {
      console.error("Error fetching user data:", error);

      dispatch({
        type: "getOneProductFail",
        payload: error.message,
      });
    }
  };
