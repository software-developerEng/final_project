import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
    StyleSheet,
  RefreshControl
} from 'react-native';
import { Image } from 'expo-image';
import Logo from '../assets/YESI_LOGO.svg'
import { useRouter } from 'expo-router';
const loginregister = () => {

    const router = useRouter()

    const handlenavigation = (path) => {
        router.replace(path); 

    }

    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logo}/>
            <TouchableOpacity onPress={()=> handlenavigation('/Login')} style={styles.signinbtn} >
                <Text style={styles.signinText}> Sign In</Text>
            </TouchableOpacity>
        

            <TouchableOpacity onPress={()=> handlenavigation('/Register')} style={styles.signupbtn}> 
                <Text style={styles.signupText}> Sign up</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
      height: 500,
      width: 500,
      marginBottom: '25%',
      alignSelf: 'center',
    },
    container: {
      backgroundColor: '#259CD5',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    signin: {
      color: 'white',
    },
    signup: {
      color: 'black',
    },
    signinbtn: {
      borderRadius: 62.925,
      backgroundColor: '#0D374A', 
      width: 330.355,
      height: 58.73,
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '4%'
    },
    signinText: {
      color: 'white',
      fontSize: 18, 
    },
    signupText: {
      color: 'black', 
      fontSize: 18, 
    },
    signupbtn: {
        borderRadius: 62.925,
        backgroundColor: 'white', 
        width: 330.355,
        height: 58.73,
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '5%'
      },
  });

export default loginregister