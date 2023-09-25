import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Points = ({ info }) => {
  return (
    <View style={styles.profileContainer}>
      <Text style={styles.bio}>Your Points:</Text>
      <View style={styles.information}>
        <Text style={styles.points}>
        {info}
        </Text>
        <Text style={styles.date}>Since September 23, 2023</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: '#fff',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    marginTop: 20,
    width: '95%',
    alignSelf: 'center',
  },
  bio: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  information: {
    paddingTop: '3%',
  },
  points: {
    marginTop: 10,
    fontWeight:'500'
  },
  date: {
    marginTop: 20
  }
});

export default Points;
