import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import {COLORS, SIZES} from '../../../constants';
import PopularJobCard from '../../common/cards/nearby/NearbyJobCard' 
import styles from './nearbyjobs.style'
import useFetch from '../../../hook/useFetch'
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Nearbyjobs = () => {

  const router = useRouter()


  const [isLoading , setIsLoading] = useState(false) //DELETE
  const [error , setError] = useState(false) //DELETE

  const [data, setData]=useState([])
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
  
      const response = await axios.get(
        "http://192.168.1.3:8000/users/getorgs",{
          'headers':{
            'Authorization' : `Bearer ${token}`
          }
        }
      );
  
      setData(response.data.organizations);
      console.log('response.data.organizations--------------------', response.data.organizations )
      setIsLoading(false); 
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(true);
    }
  };
  
  console.log('data before card:*****', data)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.headerTitle}>Nearby Orgs</Text>

      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' colors = {COLORS.primary} />
        ) :  error ? (
          <Text> Something went wrong</Text>
          ) : (
           data?.map((item)=> (
             <NearbyJobCard 
               item={item}
               key={`nearby-org-${item?._id}`}
               handleNavigate={()=> router.push(`/org-details/${item._id}`)}
             />
         ))
         )
        }
      </View>
    </View>
  )
}

export default Nearbyjobs