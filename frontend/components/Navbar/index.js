import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
const logoSource = require('../../assets/profile_pic_testing.jpg');
const profilePictureSource = require('../../assets/profile_pic_testing.jpg');
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import Logo from '../../assets/YESI_LOGO.svg'
import { LinearGradient } from 'expo-linear-gradient';

const Navbar = () => {

  const [image,setImage] = useState(null)
  const navigation = useNavigation();

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
  navigation.navigate('/(tabs)/settings');
};
return (

  <SafeAreaView>

  <View style={styles.navbar}>
    <Image source={Logo} style={styles.logo} />
    <TouchableOpacity style={styles.profileContainer} onPress={handleProfilePress}>
      <Image
        source={{ uri: `http://192.168.1.3:8000/uploads/${image}` }}
        style={styles.profilePicture}
      />
    </TouchableOpacity>
  </View>

  </SafeAreaView>
);
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#259CD5',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
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
