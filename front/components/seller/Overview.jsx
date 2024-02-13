import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Picker from "react-native-picker-select";
import { salesData } from "../../data/SalesData";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
const Overview = () => {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [salesDataForYear, setSalesDataForYear] = useState([]);
  const [todayOrders, setTodayOrders] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [todayRefund, setTodayRefund] = useState(0);

  useEffect(() => {
    fetchTodayData();

    const result = salesData.find((data) => data.year == selectedYear);
    setSalesDataForYear(result.data);
  }, [selectedYear]);

  const fetchTodayData = () => {
    setTodayOrders(Math.floor(Math.random() * 50) + 1);
    setTodayRevenue(Math.floor(Math.random() * 10000) + 1);
    setTodayRefund(Math.floor(Math.random() * 500) + 1);
  };
  const theme = useSelector((state) => state.products.theme);
  return (
    <View style={styles.container}>
      <View style={styles.salesHeader}>
        <Text
          style={[
            styles.title,
            { color: theme === "dark" ? "#ADBC9F" : "#102c00" },
          ]}
        >
          Sales Overview
        </Text>

        <Picker
          onValueChange={(value) => setSelectedYear(value)}
          items={[
            { label: "2021", value: "2021" },
            { label: "2022", value: "2022" },
            { label: "2023", value: "2023" },
            { label: "2024", value: "2024" },
          ]}
          value={selectedYear}
          style={{
            chevronContainer: {
              display: "none",
            },
            done: {
              color: "#102c00",
              paddingLeft: Dimensions.get("window").width - 80,
            },
            inputIOSContainer: {
              borderRadius: 8,
              marginBottom: 10,
              paddingHorizontal: 10,
              paddingTop: 10,
            },
            viewContainer: {
              borderRadius: 8,
              backgroundColor: "#000000",
              marginBottom: 10,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: "#ddd",
              width: 80,
            },
            inputIOS: {
              color: "white",
            },
            modalViewMiddle: {
              backgroundColor: "#fff",
            },
            modalViewBottom: {
              backgroundColor: "#fff",
            },
          }}
        />
      </View>

      <LineChart
        data={{
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              data: salesDataForYear,
            },
          ],
        }}
        width={Dimensions.get("window").width - 20}
        height={280}
        yAxisLabel="₹"
        chartConfig={{
          backgroundColor: "#020202",
          backgroundGradientFrom: "#ADBC9F",
          backgroundGradientTo: "#20201f",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: "#438506",
            fill: "#ADBC9F",
          },
        }}
        bezier
        style={styles.chart}
      />

      <View style={styles.todayOverview}>
        <View style={styles.todayContainer}>
          <View
            style={[
              styles.todayCard,
              { backgroundColor: theme === "dark" ? "#e2f2d395" : "#102c00" },
            ]}
          >
            <View style={[styles.todayInnerContainer]}>
              <Text style={styles.todayMain}>{todayOrders}</Text>
              <Feather name="arrow-up" style={styles.arrowUP} />

              <Text>12%</Text>
            </View>
            <Text>Today's Orders</Text>
          </View>
          <View
            style={[
              styles.todayCard,
              { backgroundColor: theme === "dark" ? "#e2f2d395" : "#102c00" },
            ]}
          >
            <View style={styles.todayInnerContainer}>
              <Text style={styles.todayMain}>₹{todayRevenue}</Text>
              <Feather name="arrow-up" style={styles.arrowUP} />
              <Text>12%</Text>
            </View>
            <Text>Today's Revenue</Text>
          </View>
          <View
            style={[
              styles.todayCard,
              { backgroundColor: theme === "dark" ? "#e2f2d395" : "#102c00" },
            ]}
          >
            <View style={styles.todayInnerContainer}>
              <Text style={styles.todayMain}>₹{todayRefund}</Text>
              <Feather name="arrow-down" style={styles.arrowUP} />
              <Text>12%</Text>
            </View>
            <Text>Today's Refund </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  todayOverview: {
    marginTop: 16,
  },
  todayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  todayContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  todayInnerContainer: {
    flexDirection: "row",
  },
  todayCard: {
    borderWidth: 0.8,
    marginHorizontal: 8,
    borderRadius: 10,
    padding: 8,
    paddingHorizontal: 10,
    borderColor: "#b2b2b2",
  },
  todayMain: {
    fontSize: 22,
    fontWeight: "bold",
    // textAlign: 'center'
  },
  arrowUP: {
    color: "green",
    fontSize: 20,
  },
  salesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Overview;
