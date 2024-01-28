// import { View, Text } from "react-native";
// import React, { useEffect, useRef, useState } from "react";
// import MapView, { MapMarker, Polyline } from "react-native-maps";
// const Location = () => {
//   const mapRef = useRef(null);
//   const [dragValue, setDragValue] = useState(0);

//   const [pickupLocation, setPickupLocation] = useState(null);

//   useEffect(() => {
//     if (pickupLocation) {
//       mapRef.current?.fitToCoordinates(
//         [
//           {
//             latitude: pickupLocation.latitude,
//             longitude: pickupLocation.longitude,
//           },
//         ],
//         {
//           edgePadding: {
//             top: 100,
//             right: 100,
//             bottom: 100,
//             left: 100,
//           },
//         }
//       );
//     } else if (pickupLocation) {
//       mapRef.current?.animateCamera({
//         center: {
//           latitude: pickupLocation.latitude,
//           longitude: pickupLocation.longitude,
//         },
//         zoom: 15,
//       });
//     }
//   }, [pickupLocation]);

//   return (
//     <View>
//       <MapView
//         initialCamera={{
//           center: {
//             latitude: 27.6933113,
//             longitude: 85.3211291,
//           },
//           zoom: 15,
//           heading: 0,
//           pitch: 0,
//         }}
//         onPanDrag={() => {
//           setDragValue(Math.random());
//         }}
//         ref={mapRef}
//         mapPadding={{ top: 0, right: 0, bottom: 340, left: 0 }}
//         style={{
//           width: "100%",
//           height: "100%",
//         }}
//         provider="google"
//         showsCompass
//         showsUserLocation
//         showsMyLocationButton
//       ></MapView>
//     </View>
//   );
// };

// export default Location;
// import React, { useEffect, useRef, useState } from "react";
// import { TextInput, View } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import { BottomSheetModal } from "@gorhom/bottom-sheet/src";
// import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
// import LocationPickerModal from "../LocationPickerModal";
// import { TouchableOpacity } from "react-native-gesture-handler";

// const Location = () => {
//   const mapRef = useRef(null);
//   const [pickupLocation, setPickupLocation] = useState({
//     latitude: 27.6933113,
//     longitude: 85.3211291,
//   });

//   const BottomRef = useRef(null);
//   // const handlePresentModalPress = () => {
//   //   BottomRef.current.present();
//   // };

//   useEffect(() => {
//     BottomRef.current.present();
//   }, []);

//   // const handleCloseModalPress = () => {
//   //   BottomRef.current.close();
//   // };
//   const handleMarkerDragEnd = (e) => {
//     const { latitude, longitude } = e.nativeEvent.coordinate;
//     console.log(e.nativeEvent);
//     setPickupLocation({ latitude, longitude });
//   };

//   useEffect(() => {
//     if (pickupLocation) {
//       mapRef.current?.animateCamera({
//         center: pickupLocation,
//         zoom: 15,
//       });
//     }
//   }, [pickupLocation]);

//   console.log(pickupLocation);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [searchProduct, setSearchProduct] = useState("");
//   const [location, setLocation] = useState(null);

//   const handleLocationSelect = (selectedLocation) => {
//     setLocation(selectedLocation);
//     setModalVisible(false);
//   };
//   return (
//     <View style={{ flex: 1 }}>
//       <BottomSheetModalProvider>
//         <MapView
//           ref={mapRef}
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: pickupLocation.latitude,
//             longitude: pickupLocation.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//           provider="google"
//           showsCompass
//           showsUserLocation
//           showsMyLocationButton
//         >
//           <Marker
//             coordinate={pickupLocation}
//             title="Pickup Location"
//             draggable
//             onDragEnd={handleMarkerDragEnd}
//             pinColor="red"
//           />
//         </MapView>
//         <BottomSheetModal ref={BottomRef} index={0} snapPoints={[170]}>
//           <TouchableOpacity
//             onPress={() => {
//               setModalVisible(true);
//             }}
//           >
//             <TextInput
//               pointerEvents="none"
//               placeholder="Enter text here..."
//               onChangeText={(text) => console.log("Input text:", text)}
//               style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
//             />
//           </TouchableOpacity>
//         </BottomSheetModal>
//         <LocationPickerModal
//           modalVisible={modalVisible}
//           setModalVisible={setModalVisible}
//           textInput={searchProduct}
//           setTextInput={setSearchProduct}
//           location={location}
//           setLocation={handleLocationSelect}
//           isLocationPicker={true}
//         />
//       </BottomSheetModalProvider>
//     </View>
//   );
// };

// export default Location;
// import React, { useEffect, useRef, useState } from "react";
// import { TextInput, View } from "react-native";
// import MapView, { MapMarker, Marker } from "react-native-maps";
// import { BottomSheetModal } from "@gorhom/bottom-sheet/src";
// import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
// import LocationPickerModal from "../LocationPickerModal";
// import { TouchableOpacity } from "react-native-gesture-handler";

// const Location = () => {
//   const mapRef = useRef(null);
//   const [pickupLocation, setPickupLocation] = useState({
//     latitude: 27.6933113,
//     longitude: 85.3211291,
//   });
//   const [destinationLocation, setDestinationLocation] = useState(null);

//   const BottomRef = useRef(null);

//   useEffect(() => {
//     BottomRef.current.present();
//   }, []);

//   const handleMarkerDragEnd = (e) => {
//     const { latitude, longitude } = e.nativeEvent.coordinate;
//     setPickupLocation({ latitude, longitude });
//   };

//   useEffect(() => {
//     if (pickupLocation && destinationLocation) {
//       mapRef.current?.fitToCoordinates(
//         [
//           {
//             latitude: pickupLocation.latitude,
//             longitude: pickupLocation.longitude,
//           },
//           {
//             latitude: destinationLocation.latitude,
//             longitude: destinationLocation.longitude,
//           },
//         ],
//         {
//           edgePadding: {
//             top: 100,
//             right: 100,
//             bottom: 100,
//             left: 100,
//           },
//         }
//       );
//     } else if (pickupLocation) {
//       mapRef.current?.animateCamera({
//         center: {
//           latitude: pickupLocation.latitude,
//           longitude: pickupLocation.longitude,
//         },
//         zoom: 15,
//       });
//     } else if (destinationLocation) {
//       mapRef.current?.animateCamera({
//         center: {
//           latitude: destinationLocation.latitude,
//           longitude: destinationLocation.longitude,
//         },
//         zoom: 15,
//       });
//     }
//   }, [pickupLocation, destinationLocation]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [searchProduct, setSearchProduct] = useState("");
//   const [location, setLocation] = useState(null);

//   const handleLocationSelect = (selectedLocation) => {
//     setLocation(selectedLocation);

//     console.log("selected", selectedLocation);
//     setPickupLocation({
//       latitude: selectedLocation.latitude,
//       longitude: selectedLocation.longitude,
//     });
//     console.log("location", pickupLocation, location);
//     setModalVisible(false);
//   };
//   console.log(pickupLocation);
//   return (
//     <View style={{ flex: 1 }}>
//       <BottomSheetModalProvider>
//         {/* <MapView
//           ref={mapRef}
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//           provider="google"
//           showsCompass
//           showsUserLocation
//           showsMyLocationButton
//         >

//           {pickupLocation && (
//             <MapMarker
//               key={pickupLocation.id}
//               coordinate={{
//                 latitude: pickupLocation.latitude,
//                 longitude: pickupLocation.longitude,
//               }}
//               pinColor={"red"}
//             />
//           )}
//         </MapView> */}
//         <MapView
//           initialCamera={{
//             center: {
//               latitude: 27.6933113,
//               longitude: 85.3211291,
//             },
//             zoom: 15,
//             heading: 0,
//             pitch: 0,
//           }}
//           ref={mapRef}
//           mapPadding={{ top: 0, right: 0, bottom: 340, left: 0 }}
//           style={{
//             width: "100%",
//             height: "100%",
//           }}
//           provider="google"
//           showsCompass
//           showsUserLocation
//           showsMyLocationButton
//         >
//           {pickupLocation && (
//             <MapMarker
//               key={pickupLocation.id}
//               coordinate={{
//                 latitude: pickupLocation.latitude,
//                 longitude: pickupLocation.longitude,
//               }}
//               pinColor={"red"}
//             />
//           )}
//           {destinationLocation && (
//             <MapMarker
//               key={destinationLocation.id}
//               coordinate={{
//                 latitude: destinationLocation.latitude,
//                 longitude: destinationLocation.longitude,
//               }}
//             />
//           )}
//           {pickupLocation?.id === 11 && destinationLocation?.id === 1 && (
//             <Polyline
//               coordinates={
//                 leapfrogToSxcRoute.map((coordinate) => ({
//                   latitude: coordinate[1],
//                   longitude: coordinate[0],
//                 })) || []
//               }
//               strokeWidth={12}
//               strokeColor="#4595ff"
//             />
//           )}
//         </MapView>
//         <BottomSheetModal ref={BottomRef} index={0} snapPoints={[170]}>
//           <TouchableOpacity
//             onPress={() => {
//               setModalVisible(true);
//             }}
//           >
//             <TextInput
//               pointerEvents="none"
//               placeholder="Enter text here..."
//               value={location ? location.title : ""}
//               style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
//             />
//           </TouchableOpacity>
//         </BottomSheetModal>
//         <LocationPickerModal
//           modalVisible={modalVisible}
//           setLocation={setDestinationLocation}
//           setModalVisible={setModalVisible}
//           textInput={searchProduct}
//           setTextInput={setSearchProduct}
//           selectedData={location}
//           setSelectedData={handleLocationSelect}
//           isLocationPicker={true}
//         />
//       </BottomSheetModalProvider>
//     </View>
//   );
// };

// export default Location;
// import React, { useEffect, useRef, useState } from "react";
// import { TextInput, View } from "react-native";
// import MapView, { MapMarker } from "react-native-maps";
// import { BottomSheetModal } from "@gorhom/bottom-sheet/src";
// import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
// import LocationPickerModal from "../LocationPickerModal";
// import { TouchableOpacity } from "react-native-gesture-handler";

// const Location = () => {
//   const mapRef = useRef(null);
//   const [pickupLocation, setPickupLocation] = useState({
//     latitude: 27.6933113,
//     longitude: 85.3211291,
//   });

//   const BottomRef = useRef(null);

//   useEffect(() => {
//     BottomRef.current.present();
//   }, []);

//   const handleMarkerDragEnd = (e) => {
//     const { latitude, longitude } = e.nativeEvent.coordinate;
//     setPickupLocation({ latitude, longitude });
//   };

//   const handleLocationSelect = (selectedLocation) => {
//     setLocation(selectedLocation);
//     setPickupLocation({
//       latitude: selectedLocation.latitude,
//       longitude: selectedLocation.longitude,
//     });
//     setModalVisible(false);
//   };

//   const [modalVisible, setModalVisible] = useState(false);
//   const [searchProduct, setSearchProduct] = useState("");
//   const [location, setLocation] = useState(null);

//   const handleTextInputPress = () => {
//     setModalVisible(true);
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <BottomSheetModalProvider>
//         <MapView
//           initialCamera={{
//             center: {
//               latitude: 27.6933113,
//               longitude: 85.3211291,
//             },
//             zoom: 15,
//             heading: 0,
//             pitch: 0,
//           }}
//           ref={mapRef}
//           mapPadding={{ top: 0, right: 0, bottom: 340, left: 0 }}
//           style={{
//             width: "100%",
//             height: "100%",
//           }}
//           provider="google"
//           showsCompass
//           showsUserLocation
//           showsMyLocationButton
//         >
//           {pickupLocation && (
//             <MapMarker
//               key={pickupLocation.id}
//               coordinate={{
//                 latitude: pickupLocation.latitude,
//                 longitude: pickupLocation.longitude,
//               }}
//               pinColor={"red"}
//               draggable // Make the pin draggable
//               onDragEnd={handleMarkerDragEnd} // Handle drag end event
//             />
//           )}
//         </MapView>
//         <BottomSheetModal ref={BottomRef} index={0} snapPoints={[170]}>
//           <TouchableOpacity onPress={handleTextInputPress}>
//             <TextInput
//               pointerEvents="none"
//               placeholder="Enter text here..."
//               value={location ? location.title : ""}
//               style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
//             />
//           </TouchableOpacity>
//         </BottomSheetModal>
//         <LocationPickerModal
//           modalVisible={modalVisible}
//           setLocation={setDestinationLocation}
//           setModalVisible={setModalVisible}
//           textInput={searchProduct}
//           setTextInput={setSearchProduct}
//           selectedData={location}
//           setSelectedData={handleLocationSelect}
//           isLocationPicker={true}
//         />
//       </BottomSheetModalProvider>
//     </View>
//   );
// };

// export default Location;
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import TestMap from "./TestMap";

const Location = () => {
  const [initialRegion, setInitialRegion] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [locationName, setLocationName] = useState("");

  // useEffect(() => {
  //   // Get current location
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       const { latitude, longitude } = position.coords;
  //       setInitialRegion({
  //         latitude,
  //         longitude,
  //         latitudeDelta: 0.0922,
  //         longitudeDelta: 0.0421,
  //       });
  //       setMarkerPosition({ latitude, longitude });
  //       // You may want to use a reverse geocoding service to get the location name based on latitude and longitude.
  //       // For simplicity, let's use a placeholder.
  //       setLocationName("Current Location");
  //     },
  //     (error) => console.log("Error getting location:", error),
  //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  //   );
  // }, []);

  // const onMarkerDragStart = () => {
  //   setDragging(true);
  // };

  // const onMarkerDragEnd = (e) => {
  //   setDragging(false);
  //   setMarkerPosition(e.nativeEvent.coordinate);
  //   // You may want to use a reverse geocoding service to get the location name based on the new latitude and longitude.
  //   // For simplicity, let's use a placeholder.
  //   setLocationName("New Location");
  // };

  return (
    <View style={{ flex: 1 }}>
      {/* {initialRegion && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={initialRegion}
          showsUserLocation
        >
          {markerPosition && (
            <Marker
              coordinate={markerPosition}
              title={dragging ? "Dragging..." : locationName}
              description="Drag to select a location"
              draggable
              onDragStart={onMarkerDragStart}
              onDragEnd={onMarkerDragEnd}
            />
          )}
        </MapView>
      )} */}
      <TestMap />
    </View>
  );
};

export default Location;
