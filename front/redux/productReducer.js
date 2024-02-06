// productReducer.js
import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const loadCartFromStorage = async () => {
  try {
    const cartData = await AsyncStorage.getItem("cart");
    console.log(JSON.parse(cartData));
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error loading cart from AsyncStorage:", error);
    return [];
  }
};

const saveCartToStorage = async (cart) => {
  try {
    await AsyncStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to AsyncStorage:", error);
  }
};

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    cart: [],
  },
  reducers: {
    loadCart: (state, action) => {
      state.cart = action.payload;
    },
    addProductToCart: (state, action) => {
      const { product } = action.payload;
      console.log("product", product);
      // state.cart.push(product);

      const existingProductIndex = state.cart.findIndex(
        (item) => item._id === product._id
      );
      if (existingProductIndex !== -1) {
        // If it exists, update the quantity
        state.cart[existingProductIndex].quantity += 1;
      } else {
        // If not, add the product to the cart with quantity 1
        state.cart.push({ ...product, quantity: 1 });
      }

      saveCartToStorage(state.cart);
      loadCartFromStorage();
    },
    removeProductFromCart: (state, action) => {
      console.log("payload", action.payload.product._id);
      const { _id } = action.payload.product;
      state.cart = state.cart.filter((product) => product._id !== _id);
      saveCartToStorage(state.cart);
      loadCartFromStorage();
    },
    toggleBookmark: (state, action) => {
      const { _id } = action.payload.product;
      const productIndex = state.products.findIndex(
        (product) => product._id === _id
      );
      if (productIndex !== -1) {
        state.products[productIndex].isBookmarked =
          !state.products[productIndex].isBookmarked;
      }
    },
  },
});

export const {
  loadCart,
  addProductToCart,
  removeProductFromCart,
  toggleBookmark,
} = productSlice.actions;
export default productSlice.reducer;
