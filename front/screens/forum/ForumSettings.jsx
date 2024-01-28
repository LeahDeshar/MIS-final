import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ForumSettings = () => {
    const navigation = useNavigation()
    const handleMyPost = () =>{
        navigation.navigate('My Post')
    }
    const handleCreatePost = () =>{
        navigation.navigate('Add Post')
    }
    const handleSavedPost = () =>{
        navigation.navigate('Saved')
    }
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.btnStyles} onPress={handleCreatePost}>
            <Text style={styles.btnText}>Create A Post</Text>
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.btnStyles} onPress={handleMyPost}>
            <Text style={styles.btnText}>My Post</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyles} onPress={handleSavedPost}>
            <Text style={styles.btnText}>Saved</Text>
        </TouchableOpacity>
      {/* <Text>ForumSettings</Text> */}
    </View>
  )
}

export default ForumSettings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 20
    },
    btnStyles:{
        backgroundColor: 'black',
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 10,
        width: '90%'
    },
    btnText:{
        color: 'white',
        textAlign: 'center'
    }
})