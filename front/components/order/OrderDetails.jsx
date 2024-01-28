// import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import Entypo from 'react-native-vector-icons/Entypo'
// import Footer from '../layout/Footer'
// import { OrderData } from '../../data/OrderData'

// const OrderDetails = ({route}) => {
//   const [proDetails, setProdetails] = useState({})
//   useEffect(() => {
//     const getProduct = OrderData.find((p)=> {
//       return p?._id === params?._id
//     })
//     setProdetails(getProduct)
//   }, [params?._id])
//   const {params} =route;


//   return (
//     <View style={styles.outerContainer}>
//       <View>
//       <View>
//         <Image source={ proDetails?.image} style={styles.image}/>
//         <View style={styles.rateCategory}>
//           <Text style={styles.category}>{proDetails?.category }</Text>
//           <Text style={styles.star}><Entypo name="star" style={styles.starName}/>{proDetails?.rating} (0 reviews)</Text>
//         </View>
//       </View>
//       <View>
//         <ScrollView>
//             <View style={styles.productContainer}>
//             <Text style={styles.title}>{proDetails?.name}</Text>
//             <Text style={styles.priceTitle}>Rs. {proDetails?.price}/ per kg</Text>
//             <Text>{proDetails?.description}</Text>
//             <Text></Text>
//               <Text>Show if the order is possible or not</Text>
//               <Text>to confirm there should be available stock</Text>
//               <View style={styles.btnContainer}>

//               <TouchableOpacity style={styles.btnCart} 
//               disabled={proDetails?.quantity < 0 }
//               >
//                 <Text style={styles.btnCartText}>{proDetails?.quantity > 0 ? "CONFIRM" : "OUT OF STOCK"}</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.btnCart} 
//               disabled={proDetails?.quantity < 0 }
//               >
//                 <Text style={styles.btnCartText}>REMOVE</Text>
//               </TouchableOpacity>
//               </View>
              
//             </View>
            
//         </ScrollView>
//         </View>
//        </View>
//         <Footer/>
//     </View> 
//   )
// }

// export default OrderDetails

// const styles = StyleSheet.create({
  
//   outerContainer:{
//     backgroundColor:'white',
//     flex: 1,
//     // flexDirection: 'row'
//     // height: '100%'
//   },
//   cardImage: {
//     height: 120,
//     width: 120,
//     borderRadius: 20,

//     // width: "100%",
//     marginBottom: 10,
//     marginTop: 20,
//     marginHorizontal: 10

//   },
//   card:{
//     // flexDirection: 'row',
//     width: '100%',
//   },
//   overlay: {
//     position: 'absolute',
//     top: 20,
//     left: 10,
//     width: 120,
//     height: 120,
//     borderRadius: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.4)',
//   },

//   cardTitle: {
//     fontSize: 15,
//     marginBottom: 5,
//     alignContent: 'space-around',
//     position: 'absolute',
//     bottom: 10,
//     padding: 5,
//     color: 'white',
//     width: '90%',
//     paddingLeft:18
//   },
//   category:{
//     borderWidth: 1,
//     padding: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderRadius: 16,
//     borderColor: '#928f8f',
//     fontSize: 11
//   },
//   image: {
//     height: 200,
//     width: '100%',
//     // borderBottomEndRadius: 50,
//     // borderBottomStartRadius: 50
//   },
//   star:{
//     fontSize: 15
//   },
//   starName:{
//     fontSize: 23,
//     color: 'orange'
//   },
//   rateCategory:{
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginHorizontal: 20,
//     marginTop: 20
//   },
//   productContainer:{
//     marginHorizontal: 20,
//     marginTop: 15
//   },
//   farmerContainer:{
//     // marginHorizontal: 18,
//     flexDirection: "row",
//     marginTop: 10,
//   },
//   farmerDesc:{
//     paddingLeft: 18
//   },
//   farmeName:{
//     fontSize: 24,
//     fontWeight: 'bold'
//   },
//   locationPin:{
//     fontSize: 18
//   },
//   contactContainer:{
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingTop: 5,
//     marginLeft: 60
//   },
//   contact:{
//     fontSize: 28,
//     paddingHorizontal: 15,
//     // marginLeft: 70
//   },
//   farmImage:{
//     height: 60,
//     width: 60,
//     borderRadius: 15
//   },
//   title: {
//     fontSize: 33,
//     fontWeight: "bold",
//     textAlign: "left"
//   },
//   priceTitle:{
//     fontWeight: "bold",
//     fontSize: 25,
//     color: '#383838',
//     paddingVertical: 7
//   },
//   container: {
//     marginVertical: 15,
//     marginHorizontal: 10
//   },
 
//   btnContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginVertical: 10,
//     // marginHorizontal: 10
//   },
//   btnCart: {
//     width: 180,
//     backgroundColor: "#000",
//     marginVertical: 10,
//     borderRadius: 5,
//     height: 40,
//     justifyContent: "center"
//   },
//   btnCartText: {
//     color: "#fff",
//     textAlign: "center",
//     fontWeight: "bold",
//     fontSize: 16
//   },
//   btnQty:
//   {
//     backgroundColor: '#484848',
//     width: 30,
//     height :30,
//     borderRadius: 7,
//     alignItems: "center",
//     // marginHorizontal: 10
//   },
//   qty:{
//     fontSize: 18
//   },
//   btnQtyTxt: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "white",
//     paddingHorizontal: 2,
//     paddingVertical: 3
//   },
//   footer:{
//     // bottom: 80
//   }

// })


import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const OrderDetails = ({ route }) => {
  // Assuming the route.params.order contains the details of the selected order
  // const order = route.params;
  const order = {
    orderNumber: 'ORD123456',
    date: '2023-11-25',
    status: 'Shipped',
    items: [
      { id: '1', name: 'Product A', quantity: 2, price: 25.99 },
      { id: '2', name: 'Product B', quantity: 1, price: 19.99 },
      // Add more items as needed
    ],
    subtotal: 66.97, // Sum of the prices of all items
    shippingFee: 10.00,
    total: 76.97, // subtotal + shippingFee
  
    customerName: 'John Doe',
    customerEmail: 'john.doe@example.com',
    
    shippingAddress: {
      street: '123 Main Street',
      city: 'Cityville',
      state: 'State',
      zipCode: '12345',
      country: 'Country',
    },
    shippingMethod: 'Express Shipping',
    trackingNumber: 'TRK789012345',
    
    paymentMethod: 'Credit Card',
    transactionID: 'TXN987654321',
    paymentStatus: 'Paid',
    
    // Add more fields as needed
  };
  
  console.log(order)
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.heading}>Order Information</Text>
        <Text>Order Number: {order.orderNumber}</Text>
        <Text>Date: {order.date}</Text>
        <Text>Status: {order.status}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Items</Text>
        {order.items.map((item) => (
          <View key={item.id}>
            <Text>{item.name}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Price: ${item.price}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Shipping Information</Text>
        <Text>Address: {order.shippingAddress.street}</Text>
        <Text>Shipping Method: {order.shippingMethod}</Text>
        <Text>Tracking Number: {order.trackingNumber}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Payment Information</Text>
        <Text>Payment Method: {order.paymentMethod}</Text>
        <Text>Transaction ID: {order.transactionID}</Text>
        <Text>Payment Status: {order.paymentStatus}</Text>
      </View>

      {/* Add more sections for communication tools, refund/return processing, etc. based on your requirements */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default OrderDetails;
