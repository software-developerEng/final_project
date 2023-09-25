import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  RefreshControl,
} from 'react-native';

import { useNavigation } from 'expo-router';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { TextInput } from 'react-native-gesture-handler';
import AddComment from './AddComment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import Carousel, { Pagination } from 'react-native-snap-carousel';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  
  const [isLoading, setIsLoading]=useState([])
  const [error, setError]=useState([])
  const [image,setImage] = useState(null)
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
  getimage()
}, []);

useEffect (()=> { 
  if(token){

    fetchposts()
  }
}, [token])

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



  const fetchposts = async () => {
    try {
      setIsLoading(true); 
  
      const response = await axios.get(
        "http://192.168.1.3:8000/users/getposts",{
          'headers':{
            'Authorization' : `Bearer ${token}`
          }
        }
      );
      console.log('respons.data', response.data)
      setData(response.data);
      setIsLoading(false); 
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(true);
    }
  };
  


  const onRefresh = () => {
    setRefreshing(true);
  };

  // const renderItem = ({ item }) => (
  //   <View style={styles.postContainer}>
  //     <View style={styles.postHeader}>
  //       <Image 
  //       source= {{ uri: `http://192.168.1.3:8000/uploads/${item.user_id.profile_pic}` }}
  //       style={styles.profilePic} />
  //       <Text style={styles.username}>{item.user_id.username}</Text>
  //     </View>
  //     {console.log(item.user_id.profile_pic)}
  //     {item.pictures.length > 0 && (
  //       <>
  //         {/* <Image
  //           source={{ uri: `http://192.168.1.3:8000/${item.pictures[activeSlide]}` }}
  //           style={styles.postImage}
  //         /> */}
  //         <Carousel
  //           data={item.pictures}
  //           renderItem={({ item: pic }) => (
  //             <Image
  //               source={{ uri: `http://192.168.1.3:8000/${pic}` }}
  //               style={styles.carouselImage}
  //             />
  //           )}
  //           sliderWidth={300}
  //           itemWidth={300}
  //           onSnapToItem={(index) => setActiveSlide(index)} 
  //         />
  //         <Pagination
  //           dotsLength={item.pictures.length}
  //           activeDotIndex={activeSlide}
  //           containerStyle={styles.pagination}
  //           dotStyle={styles.paginationDot}
  //           inactiveDotOpacity={0.4}
  //           inactiveDotScale={0.6}
  //         />
  //       </>
  //     )}
  //     <View style={styles.likesContainer}>
  //       <Text style={styles.likes}>{item.likes} Likes</Text>
  //     </View>
  //     <View >
  //       <Text style={styles.caption}>{item.caption}</Text>
  //     </View>
  //     <View >
  //       <Text style={styles.viewAllComments}>View all comments</Text>
  //     </View>
  //     <View style={styles.addcommentcontainer}>
  //       <Image 
  //       source={{ uri: `http://192.168.1.3:8000/uploads/${image}` }}
  //       style={styles.profilePic}/>
        
  //     <View style={styles.commentss}>
  //       <AddComment comments={item.comments} />
  //     </View>
      
  //     </View>
  //     <View>
  //       <Text>{item.date}</Text>
  //     </View>
  //   </View>
  // );

  return (
    <>
      <Navbar />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {/* <FlatList
          refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
          }
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        /> */}
        <View style={styles.margintesting}></View>
      </ScrollView>
    </>
  );
};


const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
    elevation: 1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  username: {
    fontSize: 16,
    // fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
    objectFit: 'cover',
  },
  carouselImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  likesContainer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 8,
  },
  likes: {
    fontSize: 16,
  },
  caption: {
    marginTop: '3%',
    fontSize: 16,
  },
  viewAllComments: {
    fontStyle: 'italic',
    fontSize: 10,
    marginTop: '2%',
    marginBottom: '6%',
  },
  addcommentcontainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: '2%',
  },
  margintesting: {
    marginBottom: 52,
  },
  commentss: {
    alignSelf: 'center',
  },
  pagination: {
    // marginTop: 1,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
});
export default HomeScreen;
