
import React from 'react'
import { Stack } from 'expo-router'
import { createStackNavigator } from 'expo-router';
import { ScreenStack } from 'react-native-screens';

const _layout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
    <Stack.Screen name='index' options={{headerShown:false}} />

    <Stack.Screen name='communitybox' options={{headerShown:false}} />
    <Stack.Screen name='followers' options={{headerShown:false}} />
    <Stack.Screen name='followings' options={{headerShown:false}} />
    <Stack.Screen name='chats' options={{headerShown:false}} />
    </Stack>
  )
}

export default _layout