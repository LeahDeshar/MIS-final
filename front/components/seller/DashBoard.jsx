import { View, Text } from 'react-native'
import React from 'react'
import Overview from './Overview'
import Activity from './Activity'
import RecentOrder from './RecentOrder'
import StockStatus from './StockStatus'
import PopularProduct from './PopularProduct'
import TopCategory from './TopCategory'

const DashBoard = () => {
  return (
    <View>
     <Overview/>
     <Activity/>
     <RecentOrder/>
     <StockStatus/>
     <PopularProduct/>
     <TopCategory/>
    </View>
  )
}

export default DashBoard