import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const activeButton = route.name;

  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={[
          styles.footerItem,
          activeButton === 'HomeScreen' && styles.activeButton,
        ]}
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Text style={[styles.footerText, activeButton === 'HomeScreen' && styles.activeText]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.footerItem,
          activeButton === 'SearchScreen' && styles.activeButton,
        ]}
        onPress={() => navigation.navigate('SearchScreen')}
      >
        <Text style={[styles.footerText, activeButton === 'SearchScreen' && styles.activeText]}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.footerItem,
          activeButton === 'Post' && styles.activeButton,
        ]}
        onPress={() => navigation.navigate('Post')}
      >
        <Text style={[styles.footerText, activeButton === 'Post' && styles.activeText]}>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.footerItem,
          activeButton === 'Community' && styles.activeButton,
        ]}
        onPress={() => navigation.navigate('Community')}
      >
        <Text style={[styles.footerText, activeButton === 'Community' && styles.activeText]}>Community</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.footerItem,
          activeButton === 'Settings' && styles.activeButton,
        ]}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={[styles.footerText, activeButton === 'Settings' && styles.activeText]}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(127, 154, 197, 0.3)',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    height: 60,
    elevation: 5, 
  },
  footerItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
  },
  activeButton: {
    backgroundColor: '#1E90FF',
    height: '70%',
    borderRadius: 20,
  },
  activeText: {
    color: 'white',
  },
});

export default Footer;
