import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView
  } from 'react-native';

import {useState} from 'react'
import { useNavigation, useRouter } from 'expo-router';
import Navbar from '../../Navbar'

const CommunityBox = ()=> {
    return (
        <>
        <SafeAreaView>
        <ScrollView>
            <TouchableOpacity>
                <Text>Community</Text>
            </TouchableOpacity>
        </ScrollView>
        </SafeAreaView>
        </>
    )
}

export default CommunityBox