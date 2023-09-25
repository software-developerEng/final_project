import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import styles from './popularjobs.style';
import useFetch from '../../../hook/useFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Popularjobs = () => {
  const router = useRouter();


  const [selectedOrg, setSelectedOrg] = useState();




  const [isLoading , setIsLoading] = useState(false) //DELETE
  const [error , setError] = useState(false) //DELETE

  const [data, setData]=useState([])
  const [token, setToken] = useState(null);


const gettoken = async ()=>{
  const token = await AsyncStorage.getItem('access_token')
  setToken(token)
}


useEffect(() => {
  
  gettoken() 

}, []);

useEffect (()=> { 
  if(token){

    fetchorgs()
  }
}, [token])


  const fetchorgs = async () => {
    try {
      setIsLoading(true); 
      console.log(token , 'token in fetch')
      const response = await axios.get(
        "http://192.168.1.3:8000/users/getorgs",{
          'headers':{
            'Authorization' : `Bearer ${token}`
          }
        }
      );
  
      setData(response.data.organizations);
      setIsLoading(false); 
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(true);
    }
  };


  const handleCardPress = (item) => {
    router.push(`/org/${item._id}`); 
    setSelectedOrg(item._id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recommended Orgs</Text>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedOrg={selectedOrg}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ marginLeft: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
