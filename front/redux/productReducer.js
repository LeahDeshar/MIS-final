// productReducer.js
import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createReducer } from "@reduxjs/toolkit";

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
    total: [],
    tax: 0.1,
    shipping: 0,
    netTotal: 0,
    location: "",
  },
  reducers: {
    loadCart: (state, action) => {
      state.cart = action.payload;
    },
    addProductToCart: (state, action) => {
      const { product } = action.payload;
      console.log("product", product._id);

      state.cart.push({
        ...product,
        totalPrice: product.price,
        orderQty: 1,
      });
      state.total.push({
        _id: product._id,
        totalPrice: product.price,
        orderQty: 1,
      });

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
    setQuantity: (state, action) => {
      const { _id, orderQty, price } = action.payload;
      // console.log("cart", state.cart.orderQty);
      state.cart.forEach((item) => {
        if (item._id == _id) {
          console.log("orderqty", item.orderQty);
          item.orderQty = orderQty;
          item.totalPrice = price * orderQty;
        }
      });
      console.log(_id, orderQty, price);
      console.log("total", state.cart);
      saveCartToStorage(state.cart);
      loadCartFromStorage();
    },
    setShipping: (state, action) => {
      const shippMethod = action.payload;

      if (shippMethod == "out") {
        return { ...state, shipping: 200 };
      } else if (shippMethod == "in") {
        return { ...state, shipping: 10 };
      }
      console.log(state.shipping, "shipping state");
      return state;
    },
    calculateTotal: (state, action) => {
      const total = state.cart.reduce(
        (acc, cur) => acc + Number(cur.totalPrice),
        0
      );
      return total;
    },
    calculateNetTotal: (state, action) => {
      const total = state.cart.reduce(
        (acc, cur) => acc + Number(cur.totalPrice),
        0
      );
      state.netTotal = total + total * state.tax + state.shipping;
      console.log(state.netTotal, "netTotal");
    },
    setGlobalLocation: (state, action) => {
      console.log(action.payload, "location payload");
      state.location = action.payload;
    },
  },
});

export const {
  loadCart,
  addProductToCart,
  removeProductFromCart,
  toggleBookmark,
  setQuantity,
  setShipping,
  calculateNetTotal,
  calculateTotal,
  setGlobalLocation,
} = productSlice.actions;
export default productSlice.reducer;

// export const totalPrice = state.products.cart.reduce(
//   (acc, cur) => acc + Number(cur.totalPrice),
//   0
// );

// const calculateNetTotal = () => {
//   let total =
//     totalPrice + totalPrice * state.products.tax + state.products.shipping;
//   return total;
// };

export const allProductReducer = createReducer(
  { allproduct: null, error: null },
  (builder) => {
    //  GET USER DATA
    builder.addCase("getAllProductRequest", (state, action) => {
      console.log("load AllProduct");
      state.loading = true;
    });
    builder.addCase("getAllProductSuccess", (state, action) => {
      state.loading = false;
      // state.isAuth = true;
      state.allproduct = action.payload;
    });
    builder.addCase("getAllProductFail", (state, action) => {
      console.log("picked AllProduct");
      // state.isAuth = false;
      state.error = action.payload;
    });
  }
);
