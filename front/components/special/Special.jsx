import { View, Text } from 'react-native'
import React from 'react'
import SpecialCards from './SpecialCards'
import { SpecialOffers } from '../../data/SpecialOffers'
const Special = () => {
  return (
    <View>
      <SpecialCards specialOffers={SpecialOffers}/>
    </View>
  )
}

export default Special