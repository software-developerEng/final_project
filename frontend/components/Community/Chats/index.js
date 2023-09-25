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
import Navbar from '../../Navbar';


const ChatComponent = () => {
    return (
        <>
        <Navbar/>
        <SafeAreaView>

        <Text> Chats</Text>
        </SafeAreaView>
        </>
    )
}


export default ChatComponent