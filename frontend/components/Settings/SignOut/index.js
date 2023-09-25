import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignOut = () => {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      navigation.navigate('Login');
      console.log('token removed')
    } catch (error) {
      console.log('Error removing token:', error);
    }
  };

  return (
    <TouchableOpacity onPress={handleSignOut}>
      <View style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  signOutButton: {
    padding: 10,
    borderRadius: 5,
  },
  signOutText: {
    color: 'rgba(7, 108, 157, 1)',
    fontSize: 16,
    marginLeft: 10,
    marginTop: 50,
  },
});

export default SignOut;
