import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import { CategoriesData } from "../../data/CategoriesData";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Categories = () => {
  const navigation = useNavigation();
  const theme = useSelector((state) => state.products.theme);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {CategoriesData?.map((item) => (
          <View key={item._id}>
            <TouchableOpacity
              style={styles.categoryContainer}
              onPress={() => navigation.navigate(item.path)}
            >
              <Text
                style={[
                  styles.catTitle,
                  { color: theme === "dark" ? "#ADBC9F" : "#102c00" },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          </View>
        )).slice(0, 6)}
      </View>
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  categoryContainer: {
    paddingVertical: 14,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#b5b2b288",
    margin: 3,
    borderRadius: 29,
  },
  categoryIcon: {
    fontSize: 25,
    verticalAlign: "top",
  },
  catTitle: {
    fontSize: 12,
  },
});
