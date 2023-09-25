import React, { useState } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useFetchPost from '../../hook/useFetchPost';
import CustomButton from '../Components/CustomButton';
import profile_pic from '../../assets/profile_pic_testing.jpg'

const Register = () => {
  const navigation = useNavigation();
  const [confirmpassword, setConfirmPassword] = useState('');
  const [information, setInformation] = useState({
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    phone_number: '',
    password: '',
  });

  const { data, isLoading, error, refetch } = useFetchPost('profile/register', {
    data: information,
  }, 'data');

  const handleRegister = async () => {
    if (confirmpassword === information.password) {
      useFetchPost();

      if (data === 'success') {
        navigation.navigate('HomeScreen');
      } else {
        refetch();
      }
    } else {
      console.log('Passwords do not match');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
          <View style={styles.logoContainer}>

        <Image source={profile_pic} style={styles.logo} />
        </View>

      <ScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.registerText}>Register</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your First Name"
            onChangeText={(text) => setInformation({ ...information, first_name: text })}
            value={information.first_name}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your Last Name"
            onChangeText={(text) => setInformation({ ...information, last_name: text })}
            value={information.last_name}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your new username"
            onChangeText={(text) => setInformation({ ...information, username: text })}
            value={information.username}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your email id"
            onChangeText={(text) => setInformation({ ...information, email: text })}
            value={information.email}
            keyboardType='email-address'
          />
          <TextInput
            style={styles.input}
            placeholder="Write your password"
            secureTextEntry
            onChangeText={(text) => setInformation({ ...information, password: text })}
            value={information.password}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmpassword}
          />
        <CustomButton title="Submit" onPress={() => handleRegister()} label={"Submit"}/>

          <View style={styles.loginContainer}>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    marginBottom: 0,
  },
  registerText: {
    fontFamily: 'DMMedium',
    fontSize: 28,
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
  submitButton: {
    backgroundColor: '#AD40AF',
    padding: 15,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginLink: {
    color: '#AD40AF',
    fontWeight: '700',
    marginLeft: 5,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginTop: 30

  },
  logoContainer: {
    alignItems: 'center',
  },
});

export default Register;
