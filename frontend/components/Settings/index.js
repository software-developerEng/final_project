import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../Navbar';
// import Footer from '../Footer';
import DarkMode from './DarkMode';
import Support from './Support';
import Version from './Version';
import TermsOfService from './TermsOfService';
import SignOut from './SignOut';
import PrivacyPolicy from './PrivacyPolicy';
import profile_pic from '../../assets/profile_pic_testing.jpg';
import { useRouter } from 'expo-router';


const Settings = () => {
  const navigation = useNavigation();

  const activateDarkMode = () => {
    // TODO: Activate dark mode for the application
  };

  const sendEmail = () => {
    // TODO: Open the email application and send an email
  };

  const router = useRouter()

  const goToProfile = () => {
    router.push("/Settings/profile")
    // navigation.navigate('profile');
  };

  const goToSkills = () => {
    router.push("/Settings/skills")
    // navigation.navigate('skills');
  };

  return (
    <>
      <Navbar />
      <SafeAreaView>
        <TouchableOpacity onPress={goToProfile}>
          <View style={styles.flexprofile}>
            <Text style={styles.profileText}>Profile</Text>
            <Image source={profile_pic} style={styles.profileImage} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToSkills}>
          <View style={styles.flexprofile}>
            <Text style={styles.profileText}>Skills</Text>
            <Image source={profile_pic} style={styles.profileImage} />
          </View>
        </TouchableOpacity>

        
          <View style={styles.flexprofile}>
            <Text style={styles.profileText}>Dark Mode</Text>
            <TouchableOpacity onPress={activateDarkMode}>
            <DarkMode/>
            </TouchableOpacity>
          </View>


          <TouchableOpacity onPress={sendEmail}>
          <View style={styles.flexprofile}>
            <Text style={styles.profileText}>
                <Support/>
            </Text>
          </View>
            </TouchableOpacity>

        <View>
          <Text style={styles.information}>Information</Text>
          

          <View style={styles.flexprofile}>
            <TouchableOpacity style={styles.profileText}>
            <Version/>
            </TouchableOpacity>
            <Text >Version</Text>
          </View>



          <View style={styles.flexprofile}>
            <TouchableOpacity style={styles.profileText}>
            <TermsOfService/>
            </TouchableOpacity>
            <Text >Version</Text>
          </View>


          <View style={styles.flexprofile}>
            <TouchableOpacity style={styles.profileText}>
            <PrivacyPolicy/>
            </TouchableOpacity>
            <Text >Version</Text>
          </View>

        </View>

        <View style={styles.bottomView}>
          <SignOut />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flexprofile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '2%',
    marginTop: "3%"
  },
  profileText: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center', 
    marginLeft: '3%',
    fontSize: 18, 
    fontWeight:"300"
  },
  profileImage: {
    height: 50,
    width: 50, 
    borderRadius: 30, 
    marginRight: "3%",
  },
  bottomView: {
    height: '20%', 
  },
  information: {
    marginTop: 50,
    marginLeft: "3%",
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: "6%"
  },
  versionDisplay: {
    display: 'flex',
    padding: '1.25rem 0rem',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '34.90625rem',
  },
});

export default Settings;
