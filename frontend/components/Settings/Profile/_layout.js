
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
    <Stack.Screen name='about' options={{headerShown:false}} />
    <Stack.Screen name='points' options={{headerShown:false}} />
    </Stack>
  )
}

export default _layout