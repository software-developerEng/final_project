
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name='index' options={{headerShown:false}} />
      <Stack.Screen name='profile' options={{headerShown:false}} />
      <Stack.Screen name='skills' options={{headerShown:false}} />
      <Stack.Screen name='points' options={{headerShown:false}} />
    </Stack>
  )
}

export default _layout