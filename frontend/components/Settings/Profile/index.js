import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';

import { imagetesting } from '../../../assets/profile_pic_testing.jpg';
import Footer from '../../Footer';
// import About from './About';
// import Points from './Points';

const Profile = () => {
  const [activeProfileTab, setActiveProfileTab] = useState('About');
  const [editModeProfile, setEditModeProfile] = useState(false);
  const [editModeBio, setEditModeBio] = useState(false);
  const [editedBio, setEditedBio] = useState('');

  const dataexample = [
    {
      profile_pic: imagetesting,
      first_name: 'Joe',
      last_name: 'Haddad',
      phone_number: '71 905 942',
      age: 23,
      address: 'Beirut, Lebanon',
      gender: 'male',
      email: 'google@gmail.com',
      bio: 'hello i like helping people a lot',
      points: '90',
    },
  ];

  const handleTabClick = (tab) => {
    setActiveProfileTab(tab);
  };

  const handleEditProfileClick = () => {
    setEditModeProfile(true);
    setEditModeBio(false); 
  };

  const handleEditBioClick = () => {
    setEditModeBio(true);
    setEditModeProfile(false); 
    setEditedBio(dataexample[0].bio);
  };

  const handleSaveClick = () => {
    
    setEditModeProfile(false);
    setEditModeBio(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.profileContainer}>
      <TouchableOpacity
        style={styles.editButton}
        onPress={handleEditProfileClick}
        disabled={editModeBio}
      >
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
      <View style={styles.profileImageContainer}>
        <Image source={item.profile_pic} style={styles.profileImage} />
      </View>
      <View style={styles.profileDetailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Name:</Text>
          <Text>{item.first_name} {item.last_name}</Text>
        </View>

        <View style={styles.bioContainer}>

        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Phone Number:</Text>
          <Text>{item.phone_number}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text>{item.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Age:</Text>
          <Text>{item.age}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Address:</Text>
          <Text>{item.address}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Gender:</Text>
          <Text>{item.gender}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <ScrollView>
        <FlatList
          data={dataexample}
          renderItem={renderItem}
          keyExtractor={(item) => item.email}
        />

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeProfileTab === 'About' && styles.activeTab,
            ]}
            onPress={() => handleTabClick('About')}
          >
            <Text style={[styles.tabText, activeProfileTab === 'About' ? styles.activeTabText : null]}>About</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeProfileTab === 'Points' && styles.activeTab,
            ]}
            onPress={() => handleTabClick('Points')}
          >
            <Text style={[styles.tabText, activeProfileTab === 'Points' ? styles.activeTabText : null]}>Points</Text>
          </TouchableOpacity>
        </View>

        {editModeProfile && editModeBio && (
          <View style={styles.saveButtonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveClick}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeProfileTab === 'About' && (
          <About
            title="About"
            info={editModeBio ? editedBio : dataexample[0].bio || 'N/A'}
          />
        )}

        {activeProfileTab === 'Points' && (
          <Points info={dataexample[0].points || 'No points yet'} />
        )}

      </ScrollView>
      <Footer />
    </>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
    elevation: 3,
    marginTop: 20,
    width: '95%',
    alignSelf: 'center',
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  editButtonBio: {
    position: 'absolute',
    top: 10,
    right: 120,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  editButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  profileImageContainer: {
    flex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileDetailsContainer: {
    flex: 2,
    paddingLeft: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  bioContainer: {
    marginBottom: 8,
  },
  bioInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  bioText: {
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    borderRadius: 3.5 * 8,
    backgroundColor: '#FFF',
    width: '60%',
    alignSelf: 'center',
    marginBottom: '10%',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    columnGap: 10,
  },
  activeTab: {
    backgroundColor: '#4BC9FE',
    borderBottomColor: '#FFF',
    borderRadius: 40,
  },
  tabText: {
    fontSize: 2.40625 * 8,
    fontWeight: '700',
    color: 'rgba(68, 196, 254, 1)',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#FFF',
  },
  saveButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4BC9FE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default Profile;
