import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  FlatList,
  StyleSheet,
  Image
} from 'react-native';

const Followers = ({ followers }) => {
console.log('followers tab')
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <FlatList
          data={followers}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.userContainer}>
              {item.follower_id.map((user) => (
                <View key={user._id} style={styles.userprofile}>
                <View style={styles.nameicon}>
                <Image  
                source={{ uri: `http://192.168.1.3:8000/uploads/${user.profile_pic}` }} 
                    style={styles.profile_icon}
                />
                <Text style={styles.username}>{user.username}</Text>
                </View>
                <Text style={{alignSelf: 'center'}}> x</Text>

                </View>
              ))}
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    padding: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  userprofile: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: '4%'

}, 
profile_icon: {
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    marginLeft: '3%',
    marginRight: 15 
},
nameicon:{
    flex:1,
    flexDirection:"row",
},
username:{
    alignSelf: 'center',
    // fontSize: "28px"
}
});

export default Followers;
