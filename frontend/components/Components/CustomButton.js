import {Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

export default function CustomButton({label, onPress}) {
  return (
    <>
    <TouchableOpacity
      onPress={onPress}
      style={
        {
        backgroundColor: '#259CD5',
        padding: 10,
        borderRadius: 10,
        marginBottom: 30,
        width: '35%',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 40
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>


  </>
  );
}


const styles = StyleSheet.create({ 

  submitbtn: {
    position: 'absolute',
    bottom: 50, 
    left: 0, 
    right: 0, 
    backgroundColor: '#0D374A',
    paddingVertical: 12, 
    borderRadius: 10,
    alignItems: 'center',
  }
})
