import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'

const AddButton = () => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('ForumSet')}>

            <Entypo
              name='dots-three-vertical' 
              size={20}
              color='#000' 
              style={{ marginRight: 16 }}
            />
          </TouchableOpacity>
  )
}

export default AddButton