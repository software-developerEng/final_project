import React from 'react'
import { View, Text , StyleSheet} from 'react-native'

import styles from './about.style'

const About = ({data}) => {
  console.log('info', data)
  return (
    <View style={styles.aboutcontainer}>
    
      <View style={styless.containerinfomation} >
      <Text style={styless.headerText}>Phone Number</Text>
      <Text style={styles.contextText}>{data.phone_number}</Text>
      </View>

      <View style={styless.containerinfomation}>
      <Text style={styless.headerText}>Email</Text>
      <Text style={styles.contextText}>{data.email}</Text>
      </View>

      <View style={styless.containerinfomation}>
      <Text style={styless.headerText}>Address</Text>
      <Text style={styles.contextText}>{data.address}</Text>
      </View>

      <View style={styless.genderage}>
        <View style={styless.containerinfomation}>
        <Text style={styless.headerText}>Gender</Text>
        <Text style={styles.contextText}>{data.gender}</Text>
        </View>
        <View style={[styles.containerinfomation, styles.agecontainer]}>
        <Text style={styless.headerText}>Age</Text>
        <Text style={styles.contextText}>{data.age}</Text>
        </View>
      </View>
    </View>
  )
}
const styless = StyleSheet.create({
  headerText: {
    marginBottom: '-1%'
  },
  containerinfomation :{
    paddingBottom: '4%'
  },
  genderage:{
    flex: 1,
    flexDirection: 'row',
    justifyContent:"space-between"
  },
  agecontainer :{
    marginRight: '6%'
  }
});


export default About