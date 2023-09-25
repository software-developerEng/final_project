import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import Followers from '../../../components/Community/Followers';
import Followings from './followings';
import Navbar from '../../../components/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const tabs = ['Followers', 'Followings'];

const People = () => {
  const [activeProfileTab, setActiveProfileTab] = useState('Followers');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [followersData, setFollowersData] = useState([]);
  const [followingsData, setFollowingsData] = useState([]);
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
        'http://192.168.1.3:8000/users/getfollow',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('PEOPLE *** response.data', response.data);

      if (response.data.followers) {
        setFollowersData(response.data.followers);
      }

      if (response.data.followings) {
        setFollowingsData(response.data.followings);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <Navbar />

      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeProfileTab === tab && styles.activeTab,
            ]}
            onPress={() => setActiveProfileTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeProfileTab === tab ? styles.activeTabText : null,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeProfileTab === 'Followers' && (
        <Followers followers={followersData} />
      )}

      {activeProfileTab === 'Followings' && (
        <Followings followings={followingsData} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    borderRadius: 3.5 * 8,
    backgroundColor: '#FFF',
    width: '60%',
    alignSelf: 'center',
    marginBottom: '10%',
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
});

export default People;
