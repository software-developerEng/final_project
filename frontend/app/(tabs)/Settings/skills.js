import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import {Picker} from '@react-native-picker/picker'
import { Stack, useRouter } from 'expo-router';
// import Footer from '../../Footer';

const Skills = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const skillsData = [
    'Skill 1',
    'Skill 2',
    'Skill 3',
    'Skill 4',
    'Skill 5',
    
  ];

  const handleSkillChange = (skill) => {
    
    if (selectedSkills.includes(skill)) {
    
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <Text>Skills</Text>
          <View>
            <Text>Select your skills:</Text>
            <Picker
              selectedValue={selectedSkills}
              onValueChange={(itemValue) => handleSkillChange(itemValue)}
              mode="multiple"
            >
              {skillsData.map((skill, index) => (
                <Picker.Item key={index} label={skill} value={skill} />
              ))}
            </Picker>
          </View>
          <Text>Selected Skills:</Text>
          {selectedSkills.map((skill, index) => (
            <Text key={index}>{skill}</Text>
          ))}
        </ScrollView>
      </SafeAreaView>
      {/* <Footer /> */}
    </>
  );
};

export default Skills;
