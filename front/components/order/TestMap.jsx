import { Keyboard, TextInput, View, Text } from "react-native";
import { useEffect, useState } from "react";
import MapView, { MapMarker, Polyline } from "react-native-maps";
import React, { useCallback, useMemo, useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import useDebounce from "../useDebounce";
import LocationPickerModal from "../LocationPickerModal";
import ActivityIndicator from "../ActivityIndicator";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import { setGlobalLocation } from "../../redux/productReducer";

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

export default function TestMap() {
  const [currLocation, setcurrLocation] = useState(null);
  const mapRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const [dragValue, setDragValue] = useState(0);

  const [mapTouched, setMapTouched] = useState(false);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [pickupLocationInput, setPickupLocationInput] = useState({});
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [artificalLoading, setArtificalLoading] = useState(false);

  useDebounce(
    () => {
      setMapTouched(false);
    },
    [dragValue],
    200
  );

  useEffect(() => {
    if (mapTouched) {
      Keyboard.dismiss();
      bottomSheetRef.current?.snapToPosition(0);
    } else {
      let timeout = setTimeout(() => {
        bottomSheetRef.current?.snapToIndex(0);
      }, 0);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [mapTouched]);

  useEffect(() => {
    if (pickupLocation) {
      console.log("pick");
      mapRef.current?.fitToCoordinates(
        [
          {
            latitude: pickupLocation.latitude,
            longitude: pickupLocation.longitude,
          },
        ],
        {
          edgePadding: {
            top: 100,
            right: 100,
            bottom: 100,
            left: 100,
          },
        }
      );
    } else if (currLocation) {
      mapRef.current?.animateCamera({
        center: {
          latitude: currLocation?.coords.latitude,
          longitude: currLocation?.coords.longitude,
        },
        zoom: 5,
      });
    }
  }, [pickupLocation, currLocation]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setcurrLocation(location);

      setPickupLocation({
        id: pickupLocation?.id || 1,
        latitude: location.coords.latitude || pickupLocation.latitude,
        longitude: location.coords.longitude || pickupLocation.longitude,
      });
    })();
  }, []);

  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [location, setLocation] = useState(null);

  const handleLocationSelect = (selectedLocation) => {
    setLocation(selectedLocation);
    setModalVisible(false);
    let searchLoc = `${selectedLocation.title}, ${selectedLocation.city}`;

    const selectedPlace = places?.find(
      (place) =>
        place.title.toLowerCase() === selectedLocation.title.toLowerCase()
    );

    if (selectedPlace) {
      const { latitude, longitude } = selectedPlace;
      setPickupLocation({
        id: selectedPlace,
        latitude: latitude,
        longitude: longitude,
      });
    }

    setSearch(searchLoc);
    console.log("searchLoc", searchLoc);
    dispatch(setGlobalLocation(selectedLocation.title));
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      let address = await Location.reverseGeocodeAsync(
        { latitude, longitude },
        { accuracy: Location.Accuracy.High }
      );
      if (address && address.length > 0) {
        return address[0];
      }
      return null;
    } catch (error) {
      console.error("Error fetching address:", error);
      return null;
    }
  };

  const fetchAddress = async (latitude, longitude) => {
    try {
      const address = await getAddressFromCoordinates(latitude, longitude);
      if (address) {
        setPickupLocation(address);
        setPickupLocationInput(address);
      } else {
        console.log("Address not found");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      if (error.message === "Rate limit exceeded - too many requests") {
        return;
      }
    }
  };
  fetchAddress(currLocation?.coords.latitude, currLocation?.coords.longitude);

  return (
    <View className="flex-1">
      <MapView
        initialCamera={{
          center: {
            latitude: currLocation?.coords.latitude,
            longitude: currLocation?.coords.longitude,
          },
          zoom: 15,
          heading: 0,
          pitch: 0,
        }}
        onPanDrag={() => {
          setMapTouched(true);
          setDragValue(Math.random());
        }}
        ref={mapRef}
        mapPadding={{ top: 0, right: 0, bottom: 340, left: 0 }}
        style={{
          width: "100%",
          height: "100%",
        }}
        provider="google"
        showsCompass
        showsMyLocationButton
      >
        <MapMarker
          key={pickupLocation?.id}
          coordinate={{
            latitude: pickupLocation?.latitude || 0,
            longitude: pickupLocation?.longitude || 0,
          }}
          pinColor={"red"}
          draggable
        />
      </MapView>
      <BottomSheet
        keyboardBlurBehavior="restore"
        keyboardBehavior="interactive"
        enableHandlePanningGesture
        ref={bottomSheetRef}
        index={0}
        animateOnMount={true}
        snapPoints={[250]}
      >
        <ActivityIndicator visible={artificalLoading} />
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text
            style={{
              marginHorizontal: 20,
              marginVertical: 10,
              paddingTop: 10,
            }}
          >
            Pick your location:{" "}
          </Text>
          <TextInput
            pointerEvents="none"
            value={search}
            onChangeText={(text) => setSearch(text)}
            style={{
              paddingHorizontal: 10,
              borderWidth: 1,
              marginHorizontal: 20,
              paddingVertical: 5,
              borderColor: "grey",
              borderRadius: 5,
            }}
          />
        </TouchableOpacity>
      </BottomSheet>
      <LocationPickerModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        textInput={searchProduct}
        setTextInput={setSearchProduct}
        selectedData={location}
        setSelectedData={handleLocationSelect}
        isLocationPicker
      />
    </View>
  );
}
