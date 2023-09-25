import React, { useEffect, useState } from 'react';
import { View, ScrollView, SafeAreaView, Text, RefreshControl } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { COLORS, icons, images, SIZES } from '../../../constants';
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from '../..';
import Navbar from '../../Navbar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [image,setImage] = useState(null)
  const [token, setToken] = useState(null);



  const gettoken = async()=> {
    AsyncStorage.getItem('access_token')
  .then((token) => {
    console.log('Access Token:', token);
    setToken(token); 
  })
  .catch((error) => {
    console.log('Error retrieving token:', error);
  });
}
  const getimage = async()=> {
  AsyncStorage.getItem('profile_pic')
  .then((pic) => {
  console.log(pic)
  setImage(pic); 
})
.catch((error) => {
  console.log('Error retrieving profile:', error);
});
}


useEffect(() => {
  
  gettoken() 
  getimage()
}, []);



  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  console.log({ searchTerm });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Navbar />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={`/uploads/${image}`} dimension="100%" />
          ),
          headerTitle: '',
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
