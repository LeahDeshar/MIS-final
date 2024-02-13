import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchDataFromStorage = async () => {
  try {
    const token = await AsyncStorage.getItem("@auth");
    const storedUserString = await AsyncStorage.getItem("@user");
    const storedUser = JSON.parse(storedUserString);
    const storedProfileString = await AsyncStorage.getItem("@profile");
    const storedProfile = JSON.parse(storedProfileString);

    const storedCategoryString = await AsyncStorage.getItem("@category");
    const storedCategory = JSON.parse(storedCategoryString);

    const storedRoleString = await AsyncStorage.getItem("@role");
    const storedRole = JSON.parse(storedRoleString);

    console.log("Role from AsyncStorage:", storedRole);

    console.log("Token from AsyncStorage:", token);
    console.log("Current User from AsyncStorage:", storedUser);
    console.log("Current UserProfile from AsyncStorage:", storedProfile);

    console.log("All category from AsyncStorage:", storedCategory);
  } catch (error) {
    console.error("Error reading data from AsyncStorage:", error);
  }
};
