import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Svg, { Image } from 'react-native-svg';
// import SvgUri from 'react-native-svg-uri';
import CustomButton from '../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import profile_pic from '../../assets/profile_pic_testing.jpg'
// import profile_pic from '../../assets/Vector.svg'

const Login = () => {
  const navigation = useNavigation();

  const [information, setInformation] = useState({
    emailorphone: '',
    password: '',
  });

  const handleLogin = () => {

    navigation.navigate('HomeScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={profile_pic} style={styles.logo} />
        {/* <Svg width={200} height={200}>
        <Image
          width="100%"
          height="100%"
          href={require('../../assets/Vector.svg')}
          style={styles.logo} 
        />
      </Svg> */}
        <Text style={styles.logoText}>YESI</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.loginText}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email or phone number"
          onChangeText={(text) =>
            setInformation({ ...information, emailorphone: text })
          }
          value={information.emailorphone}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={(text) =>
            setInformation({ ...information, password: text })
          }
          value={information.password}
        />

        <CustomButton title="Submit" onPress={handleLogin} label={"Submit"}/>

        <View style={styles.registerContainer}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7F9AC5',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  logoText: {
    fontFamily: 'DMMedium',
    fontSize: 32,
    fontWeight: '500',
    color: '#333',
    marginTop: 4,
    marginBottom: 20,
    paddingBottom: 30
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  loginText: {
    fontFamily: 'DMMedium',
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
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
  },
});

export default Login;
