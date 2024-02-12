import React, { useEffect } from "react";
import { Alert, Button, StatusBar, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import Language from "./screens/Language";
import Banner from "./components/banner/Banner";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Home from "./screens/Home";
import AllFeatures from "./screens/AllFeatures";
import AllCategory from "./screens/AllCategory";
import FilterSearch from "./screens/FilterSearch";
import AllNewProducts from "./components/new/AllNewProducts";
import AllTopsell from "./components/topsell/AllTopsell";
import AllRecommend from "./components/recommend/AllRecommend";
import Notifications from "./screens/Account/Notifications";
import AccountUser from "./screens/Account/AccountUser";
import MyOrders from "./screens/Account/MyOrders";
import ProductDetails from "./screens/ProductDetails";
import FeatureDetails from "./screens/FeatureDetails";
import CategoryDetail from "./components/categories/CategoryDetail";
import Profile from "./screens/Account/Profile";
import Cart from "./screens/Cart";
import Forum from "./screens/Forum";
import AddForum from "./screens/forum/AddForum";
import AddButton from "./screens/forum/AddButton";
import SeeMyForum from "./screens/forum/SeeMyForum";
import ForumSettings from "./screens/forum/ForumSettings";
import Saved from "./screens/forum/Saved";
import UpdateForum from "./screens/forum/UpdateForum";
import ProductListing from "./screens/seller/ProductListing";
import OrderManagement from "./screens/orders/OrderManagement";
import MyProducts from "./screens/seller/MyProducts";
import OrderDetails from "./components/order/OrderDetails";
import UpdateMyProduct from "./screens/seller/UpdateMyProduct";
import MyProductDetail from "./components/seller/MyProductDetail";
import Checkout from "./components/order/Checkout";
import Location from "./components/order/Location";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import Payment from "./components/cart/Payment";
import Finalpay from "./components/cart/Finalpay";
import { registerRootComponent } from "expo";
import { AppRegistry } from "react-native";

import { LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreens from "./screens/SplashScreens";
LogBox.ignoreLogs([
  "Sending `onAnimatedValueUpdate` with no listeners registered.",
]);

const Stack = createStackNavigator();
const App = () => {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="splash"
              component={SplashScreens}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="register"
              options={{
                headerShown: false,
              }}
              component={Register}
            />

            <Stack.Screen
              name="Featured"
              component={AllFeatures}
              options={{
                headerStyle: {
                  backgroundColor: "#ADBC9F",
                },
              }}
            />
            <Stack.Screen
              name="All Category"
              component={AllCategory}
              options={{
                headerStyle: {
                  backgroundColor: "#ADBC9F",
                },
              }}
            />
            <Stack.Screen
              name="Search Filter"
              component={FilterSearch}
              options={{
                headerStyle: {
                  backgroundColor: "#ADBC9F",
                },
              }}
            />
            <Stack.Screen
              name="New Products"
              component={AllNewProducts}
              options={{
                headerStyle: {
                  backgroundColor: "#ADBC9F",
                },
              }}
            />
            <Stack.Screen
              name="Top Sell Products"
              component={AllTopsell}
              options={{
                headerStyle: {
                  backgroundColor: "#ADBC9F",
                },
              }}
            />
            <Stack.Screen
              name="Recommend Products"
              component={AllRecommend}
              options={{
                headerStyle: {
                  backgroundColor: "#ADBC9F",
                },
              }}
            />
            <Stack.Screen
              name="Product Details"
              component={ProductDetails}
              options={{
                headerStyle: {
                  backgroundColor: "#ADBC9F",
                },
              }}
            />
            <Stack.Screen
              name="Details"
              component={FeatureDetails}
              options={{
                headerStyle: {
                  backgroundColor: "#ADBC9F",
                },
              }}
            />
            <Stack.Screen
              name="Confirmation"
              component={Checkout}
              options={{
                headerStyle: {
                  backgroundColor: "#ADBC9F",
                },
              }}
            />
            <Stack.Screen
              name="Location"
              component={Location}
              options={{
                headerStyle: {
                  backgroundColor: "#ADBC9F",
                },
              }}
            />

            <Stack.Screen
              name="Category"
              component={CategoryDetail}
              options={{
                headerStyle: {
                  backgroundColor: "#ADBC9F",
                },
              }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                title: "Welcome",
                headerStyle: {
                  backgroundColor: "#ADBC9F",
                },
              }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{
                headerStyle: {
                  backgroundColor: "#ADBC9F",
                },
              }}
            />
            <Stack.Screen
              name="Notification"
              component={Notifications}
              options={{
                headerStyle: {
                  backgroundColor: "#ADBC9F",
                },
              }}
            />
            <Stack.Screen
              name="Account"
              component={AccountUser}
              options={{
                title: "Welcome",
                headerStyle: {
                  backgroundColor: "#ADBC9F",
                },
                headerLeft: null,
              }}
            />
            <Stack.Screen
              name="Payment"
              component={Payment}
              options={{
                headerStyle: {
                  backgroundColor: "#ADBC9F",
                },
              }}
            />
            <Stack.Screen
              name="finalpay"
              component={Finalpay}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="ForumSet"
              component={ForumSettings}
              options={{
                title: "Forum Settings",
                headerStyle: {
                  backgroundColor: "#ADBC9F",
                },
              }}
            />

            <Stack.Screen
              name="Add Post"
              component={AddForum}
              options={{
                title: "Create A Post",
                headerStyle: {
                  backgroundColor: "#ADBC9F",
                },
              }}
            />
            <Stack.Screen
              name="My Post"
              component={SeeMyForum}
              options={{
                headerStyle: {
                  backgroundColor: "#ADBC9F",
                },
              }}
            />
            <Stack.Screen
              name="Saved"
              component={Saved}
              options={{
                headerStyle: {
                  backgroundColor: "#ADBC9F",
                },
              }}
            />
            <Stack.Screen
              name="UpdateForum"
              component={UpdateForum}
              options={{
                title: "Update Post",
              }}
            />

            <Stack.Screen
              name="Forum"
              component={Forum}
              options={{
                title: "Forum",
                headerRight: () => <AddButton />,
                headerStyle: {
                  backgroundColor: "#ADBC9F",
                },
              }}
            />
            <Stack.Screen
              name="CreateProduct"
              component={ProductListing}
              options={{
                title: "Add New",
              }}
            />

            <Stack.Screen
              name="InOrders"
              component={OrderManagement}
              options={{
                title: "Order Management",
              }}
            />
            <Stack.Screen
              name="myorders"
              component={MyOrders}
              options={{
                title: "My Order",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MyProducts"
              component={MyProducts}
              options={{
                title: "My Product List",
              }}
            />

            <Stack.Screen name="orderDetails" component={OrderDetails} />

            <Stack.Screen
              name="updateMyProduct"
              component={UpdateMyProduct}
              options={{
                title: "Update Product",
                // headerLeft: () => <Text style={{color: 'blue', fontSize: 20, marginLeft: 10}}>Cancel</Text>,
              }}
            />
            <Stack.Screen name="MyProDet" component={MyProductDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
AppRegistry.registerComponent("App", () => App);
registerRootComponent(App);
