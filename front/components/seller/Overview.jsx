import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Picker from 'react-native-picker-select';
import  {salesData}  from '../../data/SalesData';
import Feather from 'react-native-vector-icons/Feather';
const Overview = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [salesDataForYear, setSalesDataForYear] = useState([]);
  const [todayOrders, setTodayOrders] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [todayRefund, setTodayRefund] = useState(0);

  useEffect(() => {
    fetchTodayData();
   
    const result = salesData.find((data)=> data.year == selectedYear)
    setSalesDataForYear(result.data);
  }, [selectedYear]);

  const fetchTodayData = () => {
    // Fetch today's order, revenue, and refund data
    // In a real application, you would make an API call to get this data
    // For demonstration purposes, we'll use random data
    setTodayOrders(Math.floor(Math.random() * 50) + 1); // Random number between 1 and 50
    setTodayRevenue(Math.floor(Math.random() * 10000) + 1); // Random number between 1 and 10000
    setTodayRefund(Math.floor(Math.random() * 500) + 1); // Random number between 1 and 500
  };

  return (
    <View style={styles.container}>
        <View style={styles.salesHeader}>
            <Text style={styles.title}>Sales Overview</Text>

            <Picker
            onValueChange={(value) => setSelectedYear(value)}
            items={[
                { label: '2021', value: '2021' },
                { label: '2022', value: '2022' },
                { label: '2023', value: '2023' },
                { label: '2024', value: '2024' },
            ]}
            value={selectedYear}
            // style={pickerSelectStyles.inputIOS}
            style={{
                chevronContainer:{
                    display: 'none'
                },
                done:{
                color: '#ff7b00',
                paddingLeft: Dimensions.get('window').width - 80
                },
                inputIOSContainer:{
                borderRadius: 8,
                marginBottom: 10,
                paddingHorizontal: 10,
                paddingTop: 10
                },
                viewContainer:{
                borderRadius: 8,
                backgroundColor: '#000000',
                marginBottom: 10,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: '#ddd',
                width: 80,
                },
                inputIOS:
                {
                color: 'white'
                },
                modalViewMiddle:{
                backgroundColor: '#fff'
                },
                modalViewBottom:{
                backgroundColor: '#fff'
                }
            }}
            />
        </View>
      

      <LineChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              data: salesDataForYear,
            },
          ],
        }}
        width={Dimensions.get('window').width - 31}
        height={280}
        yAxisLabel="₹"
        chartConfig={{
          backgroundColor: '#020202',
          backgroundGradientFrom: '#965404',
          backgroundGradientTo: '#20201f',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '5',
            strokeWidth: '2',
            stroke: '#ffa726',
            fill: 'black',
          },
        }}
        bezier
        style={styles.chart}
      />

      <View style={styles.todayOverview}>
        {/* <Text style={styles.todayTitle}>Today's Overview</Text> */}
        <View style={styles.todayContainer}>
            <View style={styles.todayCard}>
                <View style={styles.todayInnerContainer}>
                    <Text style={styles.todayMain}>{todayOrders}</Text>
                <Feather name='arrow-up' style={styles.arrowUP}/>
                    
                    <Text>12%</Text>
                </View>
                <Text>Today's Orders</Text>

            </View>
            <View style={styles.todayCard}>
            <View style={styles.todayInnerContainer}>
                <Text style={styles.todayMain}>₹{todayRevenue}</Text>
                {/* icon */}
                {/* percentage */}
                <Feather name='arrow-up' style={styles.arrowUP}/>
                <Text>12%</Text>
                </View>
                <Text>Today's Revenue</Text>
            </View>
            <View style={styles.todayCard}>
            <View style={styles.todayInnerContainer}>
                <Text style={styles.todayMain}>₹{todayRefund}</Text>
                <Feather name='arrow-down' style={styles.arrowUP}/>
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    marginBottom: 8,
  },
  todayContainer:{
    flexDirection: 'row',
    justifyContent: 'center'
  },
  todayInnerContainer:{
       flexDirection: 'row',
  },
  todayCard:{
    borderWidth: 0.8,
    marginHorizontal: 8,
    borderRadius: 10,
    padding: 8,
    paddingHorizontal: 10,
    borderColor: '#b2b2b2'
  },
  todayMain:{
    fontSize: 22,
    fontWeight: 'bold',
    // textAlign: 'center'
  },
  arrowUP:{
    color: 'green',
    fontSize: 20,
  },
  salesHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default Overview;
