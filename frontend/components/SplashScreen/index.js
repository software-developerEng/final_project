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
import profile_pic from '../../assets/profile_pic_testing.jpg';
import { TextInput } from 'react-native-gesture-handler';
import AddComment from '../HomeScreen/AddComment';

const HomeScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [dataexample, setDataExample] = useState([]);

  useEffect(() => {
    // Fetch your data here or load it from an API
    // For this example, I'll use a dummy data array
    const fetchData = () => {
      // Simulate an API request delay with setTimeout
      setTimeout(() => {
        const dummyData = [
          {
            username: 'joe',
            profile_pic: profile_pic,
            image: profile_pic,
            likes: 0,
            caption: 'Look at this',
            comment_count: 123,
            date: '6 days ago',
            comments: ['waw', 'nice', 'lovely'],
          },
          {
            username: 'joe1',
            profile_pic: profile_pic,
            image: profile_pic,
            likes: 0,
            caption: 'Look at this',
            comment_count: 123,
            date: '6 days ago',
            comments: ['waw', 'nice', 'lovely'],
          },
          {
            username: 'joe2',
            profile_pic: profile_pic,
            image: profile_pic,
            likes: 0,
            caption: 'Look at this',
            comment_count: 123,
            date: '6 days ago',
            comments: ['waw', 'nice', 'lovely'],
          },
          {
            username: 'joe3',
            profile_pic: profile_pic,
            image: profile_pic,
            likes: 0,
            caption: 'Look at this',
            comment_count: 123,
            date: '6 days ago',
            comments: ['waw', 'nice', 'lovely'],
          },
        ];
        setDataExample(dummyData);
        setRefreshing(false);
      }, 1000);
    };

    fetchData();
  }, [refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
  };

  const renderItem = ({ item }) => {
    const [likes, setLikes] = useState(item.likes);
    const [lastPress, setLastPress] = useState(0);
  
    const handleImagePress = () => {
      const currentTime = new Date().getTime();
      const doublePressDelay = 10; 
  
      if (currentTime - lastPress < doublePressDelay) {

        const newLikes = likes === item.likes ? likes + 1 : likes - 1;
        setLikes(newLikes);
        item.likes = newLikes;
      }
      setLastPress(currentTime);
    };
  
    return (
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <Image src={item.profile_pic} style={styles.profilePic} />
          <Text style={styles.username}>{item.username}</Text>
        </View>
        <TouchableOpacity onPress={handleImagePress} onLongPress={handleImagePress}>
          <Image src={item.image} style={styles.postImage} />
        </TouchableOpacity>
        <View style={styles.likesContainer}>
          <Text style={styles.likes}>{likes} Likes</Text>
        </View>
        <View>
          <Text style={styles.caption}>{item.caption}</Text>
        </View>
        <View>
          <Text style={styles.viewAllComments}>
            View all {item.comment_count} comments
          </Text>
        </View>
        <View style={styles.addcommentcontainer}>
          <Image src={profile_pic} style={styles.profilePic} />
          <AddComment comments={item.comments} />
        </View>
        <View>
          <Text>{item.date}</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <Navbar />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FlatList
          data={dataexample}
          renderItem={renderItem}
          keyExtractor={(item) => item.username}
        />
      </ScrollView>
      <Footer screenOptions={{ headerShown: false }} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7F9AC5', 
  },
  postContainer: {
    backgroundColor: '#fff',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 3,
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
    fontWeight: 'bold',
  },
  postImage: {
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
});

export default HomeScreen;
