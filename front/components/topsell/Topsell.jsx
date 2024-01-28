import { View, Text ,StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import React from 'react'
import FeatureCard from '../features/FeatureCard'
import newProducts from '../../data/NewProductsData'
import { useNavigation } from '@react-navigation/native'
const NewProducts = () => {
    const navigation = useNavigation()
    const seeAllHandler = ()=>
    {
        navigation.navigate('Top Sell Products')
    }
  return (
    <View>
            <View style={styles.featureContainer}>
                <Text style={styles.featureTitle}>Top Sell Products</Text>
                <TouchableOpacity style={styles.searchBtn} onPress={seeAllHandler}>
               <Text style={styles.seeall}>See All</Text>
            </TouchableOpacity>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.container}>
                {newProducts?.map((item)=>(
                    <View key={item._id} >
                        <TouchableOpacity style={styles.categoryContainer}
                        onPress={()=>navigation.navigate('Product Details',{_id: item._id})}>
                            <FeatureCard product={item} cardWidth={200}/>
                        </TouchableOpacity>
                    </View>
                )).slice(0,5)}
                </View>
            </ScrollView>
        </View>
  )
}

export default NewProducts

const styles = StyleSheet.create({
    container: {
        padding: 5,
        flexDirection: "row",
    },
    featureContainer:{
        marginHorizontal: 22,
        flexDirection: 'row',
        marginTop: 30,
        justifyContent: 'space-between',
        alignItems: 'center'
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
        padding: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    categoryIcon: {
        fontSize: 25,
        verticalAlign: "top"
    },
    catTitle: {
        fontSize: 12
    }
})