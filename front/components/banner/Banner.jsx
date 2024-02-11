import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import Carousel, { PaginationLight } from "react-native-x-carousel";
import { BannerData } from "../../data/BannerData";
import AppImage from "../AppImage";
import { useSelector } from "react-redux";
const { width } = Dimensions.get("window");

const Banner = () => {
  const theme = useSelector((state) => state.products.theme);
  const renderItem = (data) => (
    <View key={data.coverImageUri} style={styles.cardContainer}>
      <Pressable onPress={() => alert(data._id)}>
        <View style={styles.cardWrapper}>
          <AppImage
            source={{ uri: data.coverImageUri }}
            alt="Example Image"
            style={styles.card}
            // contain={true}
            noCache={false}
          />
          <View
            style={[
              styles.cornerLabel,
              { backgroundColor: data.cornerLabelColor },
            ]}
          >
            <Text style={styles.cornerLabelText}>{data.cornerLabelText}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { borderColor: theme === "dark" ? "#ADBC9F" : "#102c00" },
      ]}
    >
      <Carousel
        pagination={PaginationLight}
        renderItem={renderItem}
        data={BannerData}
        loop
        autoplay
        autoplayInterval={4000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,

    paddingHorizontal: 10,
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 190,
  },
  cardWrapper: {
    overflow: "hidden",
    // width: 390
  },
  card: {
    width: width * 0.89,
    height: width * 0.43,
    borderRadius: 25,
    backgroundColor: "#fff",
    marginHorizontal: 10,
  },
  cornerLabel: {
    position: "absolute",
    bottom: 15,
    right: 15,
    borderTopLeftRadius: 8,
  },
  cornerLabelText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 5,
  },
});

export default Banner;
