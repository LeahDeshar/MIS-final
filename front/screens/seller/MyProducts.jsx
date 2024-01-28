import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import newProducts from '../../data/NewProductsData'
import { useNavigation } from '@react-navigation/native'

const MyProducts = () => {
  const navigation = useNavigation()
  const cardUpdateHandler = (product)=>{
    navigation.navigate('updateMyProduct',{_id: product._id})
  }
  const cardPressHandler = (product)=>{
    navigation.navigate('MyProDet',{_id: product._id})
  }
  return (
    <View style={styles.container}>
      <Text>Filtering and sorting setting</Text>
      <ScrollView>
        <View>
          { newProducts.map((product)=>
              (
                <View style={styles.outerCardContainer}>
                  <TouchableOpacity style={styles.cardContainer} onPress={()=>cardPressHandler(product)}>
                    <Image source={product.image} style={styles.imageStyle}/>
                    <View style={styles.desc}>
                      <Text style={styles.title}>{product.name}</Text> 
                      <Text>Rs.{product.price}</Text>
                      <Text>{product.quantity}. kg</Text>
                    </View>
                  </TouchableOpacity>
                  <View>
                    <TouchableOpacity style={styles.deleteBtn} >
                        <MaterialCommunityIcons name='delete' size={20}/>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.updateBtn} onPress={()=>cardUpdateHandler(product)}>
                        <MaterialIcons name='edit' size={20}/>
                    </TouchableOpacity>
                  </View>
                </View>
              
              ))}
        </View>
      </ScrollView>
     
    </View>
  )
}

export default MyProducts

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white'
  },
  imageStyle:{
    width: 85,
    height: 85,
    resizeMode: 'cover',
    borderRadius: 5
  },
  outerCardContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginVertical: 10
  },
  cardContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  deleteBtn:{
    borderWidth: 1,
    marginVertical: 5,
    padding: 8,
    borderRadius: 5,
    borderColor: '#9c9c9cba'
   },
  updateBtn:{
    borderWidth: 1,
    marginVertical: 5,
    padding: 8,
    borderRadius: 5,
    borderColor: '#9c9c9cba'
  },
  desc:{
    marginLeft: 10,
    width: '60%',

  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 6,
  }
})