import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchDataFromStorage = async () => {
  try {
    const token = await AsyncStorage.getItem("@auth");
    const storedUserString = await AsyncStorage.getItem("@user");
    const storedUser = JSON.parse(storedUserString);
    console.log("Token from AsyncStorage:", token);
    console.log("Current User from AsyncStorage:", storedUser);
  } catch (error) {
    console.error("Error reading data from AsyncStorage:", error);
  }
};
