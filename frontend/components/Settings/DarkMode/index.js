import React, { useState } from 'react';
import { View, Text, Switch, StatusBar } from 'react-native';

const DarkMode = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    handleSwitchChange(); 
  };

  const handleSwitchChange = () => {
    if (isEnabled) {
      console.log("Yes");
    } else {
      console.log("No");
    }
  };

  return (
<>
      <Switch
        trackColor={{ false: '#026efd', true: '#000' }}
        thumbColor={isEnabled ? '#f4f3f4' : '#f5dd4b'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], marginRight: "15%" }}
      />
      <StatusBar style="auto" />
      </>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default DarkMode;
