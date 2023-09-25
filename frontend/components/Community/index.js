import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import Navbar from '../Navbar';
import CommunityBox from './CommunityBox';
import rightarrow from '../../assets/icons/right_arrow.svg'

const Community = () => {
  const navigation = useNavigation();
    const router = useRouter()
  const handleCommunityBoxPress = () => {
    router.push('/(tabs)/Community/chats');
  };


  const handlePeoplePress = () => {
    router.push('/(tabs)/Community/people');
  };

  return (
    <>
      <Navbar />
      <SafeAreaView>

      <View style={{ flexDirection: 'column' }}>
        <Text style={styles.welcomesocial}> Welcome to your</Text>
      <Text style={styles.socialText}> social area</Text>
      </View>
        <ScrollView style={styles.scroll}>


          <TouchableOpacity
            style={styles.profileContainer}
            onPress={handlePeoplePress}
          >
                       <Text>People</Text>

        <Image source={rightarrow} style={styles.arrow}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.profileContainer}
            onPress={handleCommunityBoxPress}
          >
            <Text>Chats</Text>
        <Image source={rightarrow} style={styles.arrow}/>

          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    marginTop: 20,
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  arrow: {
    height:"110%",
    width: '8%'
  },
  welcomesocial: {
    fontSize: 34,
    fontWeight: 'bold',
    marginLeft: '5%',
    marginTop: '14%',
    marginBottom: '-2%'
  },
  socialText: {
    fontSize: 34,
    fontWeight: 'bold',
    marginLeft: '5%',
    marginBottom: '15%'
  }
});

export default Community;
