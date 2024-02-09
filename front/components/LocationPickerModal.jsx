import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Modal,
  RefreshControl,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListItemSeparator from "./ListItemSeparator";
import newProducts from "../data/NewProductsData";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../redux/productAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
newProducts;
const places = [
  {
    id: 1,
    title: "St. Xavier's College",
    city: "Maitighar, Kathmandu",
    latitude: 27.6933113,
    longitude: 85.3211291,
  },
  {
    id: 2,
    title: "Boudhanath Stupa",
    city: "Boudha, Kathmandu",
    latitude: 27.721816,
    longitude: 85.361514,
  },
  {
    id: 3,
    title: "Swayambhunath Temple",
    city: "Swayambhu, Kathmandu",
    latitude: 27.714035,
    longitude: 85.290685,
  },
  {
    id: 4,
    title: "Durbar Square",
    city: "Hanuman Dhoka, Kathmandu",
    latitude: 27.7045,
    longitude: 85.3076,
  },
  {
    id: 5,
    title: "Pashupatinath Temple",
    city: "Pashupati, Kathmandu",
    latitude: 27.7109,
    longitude: 85.3483,
  },
  {
    id: 6,
    title: "Thamel Market",
    city: "Thamel, Kathmandu",
    latitude: 27.7162,
    longitude: 85.3132,
  },
  {
    id: 7,
    title: "Garden of Dreams",
    city: "Keshar Mahal, Kathmandu",
    latitude: 27.7127,
    longitude: 85.3205,
  },
  {
    id: 8,
    title: "Nagarkot Viewpoint",
    city: "Nagarkot, Kathmandu",
    latitude: 27.7154,
    longitude: 85.5241,
  },
  {
    id: 9,
    title: "Patan Durbar Square",
    city: "Patan, Kathmandu",
    latitude: 27.6644,
    longitude: 85.3188,
  },
  {
    id: 10,
    title: "Kopan Monastery",
    city: "Kopan, Kathmandu",
    latitude: 27.7654,
    longitude: 85.3666,
  },
  {
    id: 11,
    title: "Leapfrog Technology Inc.",
    city: "Charkhal Rd, Kathmandu",
    latitude: 27.7074128,
    longitude: 85.3273696,
  },
];
export default function LocationPickerModal({
  modalVisible,
  setModalVisible,
  textInput,
  setTextInput,
  selectedData,
  setSelectedData,
  isLocationPicker = false,
}) {
  const dispatch = useDispatch();
  const [allproducts, setAllProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getAllProducts());
      const storedProductsString = await AsyncStorage.getItem("@allproducts");
      const storedProducts = JSON.parse(storedProductsString);
      setAllProducts(storedProducts);
    };
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return isLocationPicker
      ? places.filter((item) =>
          item?.title?.toLowerCase().includes(textInput?.toLowerCase())
        )
      : allproducts.filter((item) =>
          item?.name?.toLowerCase().includes(textInput?.toLowerCase())
        );
  }, [textInput, isLocationPicker]);

  useEffect(() => {
    if (modalVisible && selectedData) {
      setTextInput(isLocationPicker ? selectedData.title : selectedData.name);
    }
  }, [modalVisible, selectedData, isLocationPicker]);
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={{ flex: 1, paddingTop: 60 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 20,
            paddingRight: 10,
          }}
        >
          <TextInput
            clearButtonMode="always"
            autoFocus
            label=""
            value={textInput}
            onChangeText={(text) => {
              setTextInput(text);
            }}
            style={{
              flex: 1,
              marginRight: 5,
              borderWidth: 1,
              borderColor: "grey",
              borderRadius: 7,
              paddingVertical: 8,
              paddingHorizontal: 10,
            }}
            placeholder={
              isLocationPicker ? "Pickup Location" : "Search Products"
            }
            icon={isLocationPicker ? "my-location" : "search"}
            materialIcons
          />
          <Button
            color={"black"}
            title="Cancel"
            onPress={() => {
              setModalVisible(false);
            }}
          />
        </View>
        <KeyboardAwareScrollView
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={() => {}} />
          }
          contentContainerStyle={{
            paddingBottom: 40,
          }}
          enableResetScrollToCoords={false}
          keyboardShouldPersistTaps="handled"
          keyboardOpeningTime={0}
        >
          {filteredData.length === 0 ? (
            <View style={{ paddingHorizontal: 23, paddingVertical: 20 }}>
              <Text style={{ color: "grey" }}>
                No results found for "{textInput}"
              </Text>
            </View>
          ) : (
            <>
              {filteredData.map((data, index) => (
                <View key={data.id}>
                  {index !== 0 && <ListItemSeparator />}
                  <TouchableHighlight
                    onPress={() => {
                      setSelectedData(data);
                      setModalVisible(false);
                    }}
                    underlayColor={"grey"}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginHorizontal: 20,
                        paddingVertical: 20,
                      }}
                      className="px-5 py-3 flex-row items-center"
                    >
                      <MaterialCommunityIcons
                        name={isLocationPicker ? "map-marker" : "tree"}
                        size={32}
                      />
                      <View>
                        <Text className="ml-2 text-base">
                          {isLocationPicker ? data.title : data.name}
                        </Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                </View>
              ))}
            </>
          )}
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
}
