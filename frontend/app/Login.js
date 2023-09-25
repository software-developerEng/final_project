import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Image } from 'expo-image';
import Logo from '../assets/YESI_LOGO_BLACK.svg'
import user from '../assets/icons/user.svg'
import passwordicon from '../assets/icons/password.svg'
import CustomButton from '../components/Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import profile_pic from '../assets/profile_pic_testing.jpg'
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = () => {
  const navigation = useNavigation();

  const [information, setInformation] = useState({
    emailOrPhone: '',
    password: '',
  });
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.3:8000/profile/login",
        information
        );
        console.log(response)
      if (response.data) { 
        await AsyncStorage.setItem('access_token', response.data.token);
        await AsyncStorage.setItem('profile_pic', response.data.user.profile_pic)
        await AsyncStorage.setItem("user",JSON.stringify(response.data.user) )
        console.log('login profile', response.data.user.profile_pic)
        router.push('/(tabs)/Home');
      } else {
        console.log('Login failed');
      }
    } catch (error) { 
      console.log(error);
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
      <Text> back</Text>
        <Image source={Logo} style={styles.logo} contentFit='contain'/>
      <Text> x</Text>

      </View>

      <View style={styles.formContainer}>
        <Text style={styles.loginText}>Welcome </Text>
        <Text style={styles.sigintext}>Sigin to your account </Text>

        <View style={styles.iconcontainer}>
          <Image source={user} style={styles.icons} />
          <TextInput
            placeholder="Enter your email or phone number"
            onChangeText={(text) =>
              setInformation({ ...information, emailOrPhone: text })
            }
            value={information.emailOrPhone}
          />
        </View>

        <View style={styles.iconcontainer}>
        <Image source={passwordicon} style={styles.icons} />
          <TextInput
          
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={(text) =>
              setInformation({ ...information, password: text })
            }
            value={information.password}
          />
        </View>



      </View>

      <KeyboardAvoidingView
  behavior={Platform.OS === 'ios' || Platform.OS === 'android'   ? 'padding' : 'height'} 
  style={{ flex: 1 }}
>
  <CustomButton title="Submit" onPress={handleLogin} label={"Sign In"} />



<View style={styles.registerview}>
<Text>New to the app?</Text>
          <Link href={"/Register"}>
            <Text style={styles.registerLink}> Register</Text>
          </Link>
</View>
</KeyboardAvoidingView>

    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20
  },
  logoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: "15%",
    marginBottom: '20%'
  },
  // logoText: {
  //   fontFamily: 'DMMedium',
  //   fontSize: 32,
  //   fontWeight: '500',
  //   color: '#333',
  //   marginTop: 4,
  //   marginBottom: 20,
  //   paddingBottom: 30
  // },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  loginText: {
    fontFamily: 'DMMedium',
    fontSize: 32,
    fontWeight: '500',
    color: '#333',
    marginBottom :"3%"
  },
  sigintext:{
    marginBottom: '28%',
    fontSize: 12,
    fontStyle: "italic"
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontFamily: 'DMRegular',
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerLink: {
    color: '#AD40AF',
    fontWeight: '700',
    marginLeft: 5,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center'
  },
  icons: {
    height: '100%',
    width: '10%',
    marginRight: '5%'
  },
  iconcontainer :{
    flexDirection: 'row',
    marginBottom: '6%'
  },
  registerview: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    flexDirection: 'row'
  }

});

export default Login;
