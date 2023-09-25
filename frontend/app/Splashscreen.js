import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Image } from 'expo-image';
import Logo from '../assets/YESI_LOGO.svg'
import { useRouter } from 'expo-router';

const Splashscreen = () => {
  const router = useRouter(); 

  useEffect(() => {

    const timer = setTimeout(() => {
      router.replace('/loginregister'); 
    }, 3000); 

    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <Image source={Logo} style={styles.image}/>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#259CD5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 24,
    marginBottom: 20,
  },
  image :{
    height: 500,
    width: 500
  }
});

export default Splashscreen;
