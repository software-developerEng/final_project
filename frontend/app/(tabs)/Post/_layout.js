
import { Stack } from 'expo-router'
import React from 'react'
import HomeScreen from '../../../components/HomeScreen'
const _layout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
<Stack.Screen name='index' options={{headerShown:false}} />
    </Stack>
  )
}

export default _layout