import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Navbar from '../../../components/Navbar';

const CommunityBox = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
      <Navbar />
        <ScrollView>
          <TouchableOpacity>
            <Text>testCommunity</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1, 
  },
});

export default CommunityBox;
