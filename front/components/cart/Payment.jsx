import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";

import { CardField, confirmPayment } from "@stripe/stripe-react-native";
import ButtonComp from "./ButtonComp";
import paypalApi from "./Paypalapis";
import { useNavigation } from "@react-navigation/native";

// create a component
const Payment = () => {
  const [cardInfo, setCardInfo] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const fetchCardDetail = (cardDetail) => {
    if (cardDetail.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(null);
    }
  };
  const navigation = useNavigation();

  const onDone = async () => {
    if (cardInfo) {
      Alert.alert("Payment Done Successfully");
      navigation.navigate("finalpay");
    } else {
      Alert.alert("Please enter the card details");
    }
  };

  const onPressPaypal = () => {
    Alert.alert("Payment Done Successfully");
    navigation.navigate("finalpay");
  };

  const paymentSucess = async (id) => {
    try {
      const res = paypalApi.capturePayment(id, accessToken);
      console.log("capturePayment res++++", res);
      alert("Payment sucessfull...!!!");
      clearPaypalState();
    } catch (error) {
      console.log("error raised in payment capture", error);
    }
  };

  const clearPaypalState = () => {
    setPaypalUrl(null);
    setAccessToken(null);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: "4242 4242 4242 4242",
            }}
            cardStyle={{
              backgroundColor: "#FFFFFF",
              textColor: "#000000",
            }}
            style={{
              width: "100%",
              height: 50,
              marginVertical: 30,
            }}
            onCardChange={(cardDetails) => {
              fetchCardDetail(cardDetails);
            }}
            onFocus={(focusedField) => {
              console.log("focusField", focusedField);
            }}
          />

          <ButtonComp onPress={onDone} />

          <ButtonComp
            onPress={onPressPaypal}
            // disabled={false}
            btnStyle={{ backgroundColor: "#0f4fa3", marginVertical: 16 }}
            text="PayPal"
            isLoading={isLoading}
          />

          <Modal visible={!!paypalUrl}>
            <TouchableOpacity
              // onPress={clearPaypalState}
              style={{ margin: 24 }}
            >
              <Text>Closed</Text>
            </TouchableOpacity>
          </Modal>
        </View>
      </SafeAreaView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default Payment;
