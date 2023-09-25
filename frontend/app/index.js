import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';

const index = () => {
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            
            router.replace('/Splashscreen'); 
        }, 500);
    }, [])
    
  return (
    <Text>no</Text>
  )
}


export default index