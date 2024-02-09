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
const { width } = Dimensions.get("window");

const Banner = () => {
  const renderItem = (data) => (
    <View key={data.coverImageUri} style={styles.cardContainer}>
      <Pressable onPress={() => alert(data._id)}>
        <View style={styles.cardWrapper}>
          {/* <AppImage */}

          {/* <Image style={styles.card} source={{ uri: data.coverImageUri }} /> */}

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
    <View style={styles.container}>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    borderRadius: 25,
    borderWidth: 0.7,
    borderColor: "#0000004d",
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
