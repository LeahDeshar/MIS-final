import { View, Text, TouchableOpacity,StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FeaturedProducts } from '../../data/FeaturedData'
import newProducts from '../../data/NewProductsData'
import FeatureCard from '../features/FeatureCard'

const Recommend = () => {
    const navigation = useNavigation()
    const seeAllHandler = ()=>{
        navigation.navigate('Recommend Products')
    }
    // Function to get a random product from an array
    const getRandomProduct = (products) => {
        const randomIndex = Math.floor(Math.random() * products.length);
        return products[randomIndex];
    }

    // Function to get an array of random products
    const getRandomProducts = (products, count) => {
        const randomProducts = [];
        for (let i = 0; i < count; i++) {
            const randomProduct = getRandomProduct(products);
            randomProducts.push(randomProduct);
        }
        return randomProducts;
    }

    // Combine the FeaturedProducts and newProducts arrays
    const allProducts = [...FeaturedProducts, ...newProducts];

    // Get 10 random products for recommendations
    const recommendedProducts = getRandomProducts(allProducts, 10);
       
  return (
    <View style={styles.outerContainer}>
      <View style={styles.featureContainer}>
        <Text style={styles.featureTitle}>Recommend</Text>
        <TouchableOpacity style={styles.searchBtn} onPress=   {seeAllHandler}>
            <Text style={styles.seeall}>See All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
                {recommendedProducts?.map((item)=>(
                    <View key={item._id} >
                        <TouchableOpacity style={styles.categoryContainer}
                        onPress={()=>navigation.navigate(item.path)}>
                            <View style={styles.card}>
                                <Image source={item.image} style={styles.cardImage}/>
                                <View style={styles.cardDetail}>
                                    <Text style={styles.cardTitle}>{item.name}</Text>
                                    <Text>{item.description.split('.')[0]}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>)).slice(0,5)}
       </View>
    </View>
  )
}

export default Recommend

const styles = StyleSheet.create({
    outerContainer:{
        // marginBottom: 300
    },
    container: {
        padding: 5,
        paddingTop: 25
        // flexDirection: "row",
    },
    featureContainer:{
        marginHorizontal: 22,
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardImage: {
        height: 80,
        width: 80,
        // width: "100%",
        marginBottom: 10,
      },
      card:{
        flexDirection: 'row',
        width: '100%',
      },
      cardDetail:{
        paddingLeft: 10,
        width: '82%'
      },
      cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
      },
    featureTitle:{
        fontSize: 25,
        fontWeight: 'bold'
    },
    seeall:{
        fontSize: 14
    },
    categoryContainer: {
        // backgroundColor: "#fff",
        marginHorizontal: 24,
        justifyContent: "center",
        alignItems: "center"
    },
    
})