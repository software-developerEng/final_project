import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import About from '../../../components/jobdetails/about/About';
import Points from '../../../components/Settings/Profile/Points/points';
import Navbar from '../../../components/Navbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const Profile = () => {
  const [activeProfileTab, setActiveProfileTab] = useState('About');
  const [editModeProfile, setEditModeProfile] = useState(false);
  const [editModeBio, setEditModeBio] = useState(false);
  const [editedBio, setEditedBio] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [data, setData] = useState([]);
  const [token, setToken] = useState(null);

  const gettoken = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      console.log('Access Token:', token);
      setToken(token);
    } catch (error) {
      console.log('Error retrieving token:', error);
    }
  };

  useEffect(() => {
    gettoken();
  }, []);

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        'http://192.168.1.3:8000/users/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('response.data [profile]*************', response.data);
      setData([response.data]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(true);
    }
  };

  const handleTabClick = (tab) => {
    setActiveProfileTab(tab);
  };

  const handleEditProfileClick = () => {
    setEditModeProfile(true);
    setEditModeBio(false);
  };

  const handleEditBioClick = () => {
    setEditModeBio(true);
    setEditModeProfile(false);
    setEditedBio(data[0].bio);
  };

  const handleSaveClick = () => {
    setEditModeProfile(false);
    setEditModeBio(false);
  };

  const renderItem = ({ item }) => (
    <>
    <View style={styles.profileContainer}>
      <Image
        source={{ uri: `http://192.168.1.3:8000/uploads/${item.profile_pic}` }}
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>
        {item.first_name} {item.last_name}
      </Text>
      </View>
      <View style={styles.information}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeProfileTab === 'About' && styles.activeTab,
          ]}
          onPress={() => handleTabClick('About')}
        >
          <Text
            style={[
              styles.tabText,
              activeProfileTab === 'About' ? styles.activeTabText : null,
            ]}
          >
            About
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeProfileTab === 'Bio' && styles.activeTab,
          ]}
          onPress={() => handleTabClick('Bio')}
        >
          <Text
            style={[
              styles.tabText,
              activeProfileTab === 'Bio' ? styles.activeTabText : null,
            ]}
          >
            Bio
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeProfileTab === 'Points' && styles.activeTab,
          ]}
          onPress={() => handleTabClick('Points')}
        >
          <Text
            style={[
              styles.tabText,
              activeProfileTab === 'Points' ? styles.activeTabText : null,
            ]}
          >
            Points
          </Text>
        </TouchableOpacity>
      </View>

      {editModeProfile && editModeBio && (
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveClick}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}

      {activeProfileTab === 'About' && (
        <About
          title="About"
          data={item}
        />
      )}

      {activeProfileTab === 'Bio' && (
        <View style={styles.bioContainer}>
          {editModeBio ? (
            <TextInput
              style={styles.bioInput}
              placeholder="Add your bio..."
              multiline
              value={editedBio}
              onChangeText={setEditedBio}
            />
          ) : (
            <Text style={styles.bioText}>{item.bio || 'N/A'}</Text>
          )}
        </View>
      )}

      {activeProfileTab === 'Points' && (
        <Points info={item.points || 'No points yet :('} date={item.createdAt} />
      )}
    </View>
    </>
  );

  return (
    <>
      <Navbar />
      <ScrollView>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.email}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    // backgroundColor: '#fff',
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    width: '95%',
    alignSelf: 'center',
  },
  profileImage: {
    width: 115,
    height: 110,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '400',
    marginTop: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 3.5 * 8,
    backgroundColor: '#FFF',
    width: '60%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    columnGap: 10,
  },
  activeTab: {
    backgroundColor: '#4BC9FE',
    borderBottomColor: '#FFF',
    borderRadius: 40,
  },
  tabText: {
    fontSize: 2.40625 * 8,
    fontWeight: '700',
    color: 'rgba(68, 196, 254, 1)',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#FFF',
  },
  saveButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4BC9FE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  bioContainer: {
    marginBottom: 8,
  },
  bioInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  bioText: {
    fontSize: 16,
  },
  aboutcontainer:{
 
  },
  information :{
    marginLeft: '4%'
  },
  headerText: {
    paddingBottom: '10%'
  }
});

export default Profile;
