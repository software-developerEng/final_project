import React from 'react'
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import {checkImageURL} from '../../../../utils'
import profile_pic from '../../../../assets/profile_pic_testing.jpg'
import styles from './nearbyjobcard.style'
import { Link } from 'expo-router'

const NearbyJobCard = ({item, onPress}) => {
  console.log('this is the org neabyjobcard',{item} ); 
  return (

  <Pressable 
    style={styles.container}
      onPress={onPress}
      // href={href}
  >
      <View style = {styles.logoContainer}>
          <Image 
            source={{  uri: checkImageURL(item?.image)
              ? profile_pic
              : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg",
          }}
            resizeMode='contain'
            style={styles.logoImage}
          />
      </View>

          <View style={styles.textContainer}>
            <Text style={styles.jobName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.jobType}>
              {item._id}
            </Text>
          </View>
  </Pressable>
  )
}

export default NearbyJobCard