import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import Logo from '../assets/YESI_LOGO.svg'

const Navbar = () => {

  const [image,setImage] = useState(null)
  const navigation = useNavigation();
    const router = useRouter()
  const getimage = async()=> {
    AsyncStorage.getItem('profile_pic')
  .then((pic) => {
    setImage(pic); 
  })
  .catch((error) => {
    console.log('Error retrieving profile:', error);
  });
}

useEffect(()=> {
  getimage()
})

const handleProfilePress = () => {
  router.replace('/(tabs)/Settings')
};
return (
  <View style={styles.navbar}>
    <Image source={Logo} style={styles.logo}/>
    <TouchableOpacity style={styles.profileContainer} onPress={handleProfilePress}>
      <Image
        source={{ uri: `http://192.168.1.3:8000/uploads/${image}` }}
        style={styles.profilePicture}
      />
    </TouchableOpacity>
  </View>
);
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(127, 154, 197, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  logo: {
    width: 80, 
    height: 40, 
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    marginLeft: 16, 
  },
});

export default Navbar;
