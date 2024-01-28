import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import SellerOrderPlacementScreen from '../../components/order/SellerOrderPlacementScreen '
import OrderListComponent from '../../components/order/OrderListComponent ';
import OrderDetails from '../../components/order/OrderDetails';
import { OrderData } from '../../data/OrderData';
import OrderChart from './OrderChart';
import Footer from '../../components/layout/Footer';
const OrderManagement = () => {
    const [orders, setOrders] = useState(OrderData);
    
      const [selectedOrder, setSelectedOrder] = useState(null);
    
      const handleOrderPress = (order) => {
        setSelectedOrder(order);
        // Navigate to the order details page or show a modal
        // You can use navigation libraries like React Navigation for navigation
      };
    
     
  return (
    <View style={styles.container}>
      {/* <SellerOrderPlacementScreen/> */}

      <View>
        <View style={styles.topHeaderStatus}>
          <View style={styles.orderCard}>
            <Text style={styles.title}>Total Order</Text>
            <Text style={styles.value}>50,000</Text>
          </View>
          <View style={styles.orderCard}>
            <Text style={styles.title}>Delivered Order</Text>
            <Text style={styles.value}>20,000</Text>
          </View>
        </View>
      <OrderChart/>

      <OrderListComponent orders={orders} onOrderPress={handleOrderPress} />
      {selectedOrder && (
        <OrderDetails order={selectedOrder} />
      )}
      
    </View>
    <Footer/>
    </View>
  )
}

export default OrderManagement

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:  'white'
  },
  topHeaderStatus:{
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'center',
    marginVertical: 20
  },
  orderCard:{
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: '#000000',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    height: 120
  },
  title:{
    fontSize: 18,
    color: '#aea7a7',
    paddingBottom: 5,
  },
  value:
  {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  }
})