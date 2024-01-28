import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tail = () => {
  return (
    <View style={styles.container}>
        
      <View>
            <Ionicons name="document-text" style={styles.icons}/>
            <Text style="desc">Lorem ipsum dolor </Text>
      </View>
      <View>
            <Ionicons name="shield-checkmark" style={styles.icons}/>
            <Text>Lorem ipsum dolor </Text>
      </View>
      <View>
            <Ionicons name="document-text" style={styles.icons}/>
            <Text>Lorem ipsum dolor </Text>
      </View>
    </View>
  )
}

export default Tail
const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 300,
        marginTop: 20,
        paddingHorizontal: 20,
        paddingTop: 30,
        // marginHorizontal: 20,
        backgroundColor: '#e9e9e95a'
    },
    icons:{
        fontSize: 40,
        textAlign: 'center'
    },
    desc:
    {
        textAlign: 'center'
    }
})