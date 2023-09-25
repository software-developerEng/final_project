import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Animated,
} from "react-native";
import * as Location from "expo-location";
import { router, useNavigation, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Maps = ({ route, navigation }) => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markerLocation, setMarkerLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [animation] = useState(new Animated.Value(0));
  const router = useRouter();

  const userLocation = async () => {
    let status = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMessage("Permission to access location was denied");
    } else {
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      console.log(location.coords.latitude, location.coords.longitude);
    }
  };

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkerLocation(coordinate);
  };

  const saveLocation = () => {
    if (markerLocation) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => {
        closeMap();
      });
    } else {
      Alert.alert(
        "Location Not Set",
        "Please set a location by tapping on the map."
      );
    }
  };

  const closeMap = async () => {
    console.log("Location Saved:", markerLocation);
    const address = await AsyncStorage.setItem(
      "address",
      JSON.stringify(markerLocation)
    );
    console.log("address", address);
    router.replace("/Register");
  };

  const handleSearch = async () => {
    if (searchLocation) {
      try {
        const result = await Location.geocodeAsync(searchLocation);
        if (result.length > 0) {
          const searchResultLocation = result[0];
          setMarkerLocation(searchResultLocation);
          setLocation({
            latitude: searchResultLocation.latitude,
            longitude: searchResultLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        } else {
          Alert.alert(
            "Location Not Found",
            "No results found for the given location."
          );
        }
      } catch (error) {
        console.error("Error searching for location:", error);
        Alert.alert(
          "Error",
          "An error occurred while searching for the location."
        );
      }
    }
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a location..."
          onChangeText={(text) => setSearchLocation(text)}
          onSubmitEditing={handleSearch}
          value={searchLocation}
        />
        {location.latitude !== null ? (
          <MapView
            style={styles.map}
            region={location}
            onPress={handleMapPress}
          >
            {markerLocation && (
              <Marker coordinate={markerLocation} title="Your Location" />
            )}
          </MapView>
        ) : (
          <Text>Loading...</Text>
        )}
        <TouchableOpacity title="Get Location" onPress={saveLocation}>
          <Text style={styles.buttonText}>Save Location</Text>
        </TouchableOpacity>

        {animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }) && (
          <Animated.View
            style={[styles.successMessage, { opacity: animation }]}
          >
            <Text style={styles.successText}>Location Saved!</Text>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "80%",
  },
  buttonText: {
    alignSelf: "center",
    backgroundColor: "#4BC9FE",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 16,
    fontWeight: "bold",
  },
  searchInput: {
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: "white",
    margin: 10,
    borderRadius: 5,
    marginTop: 50,
  },
  successMessage: {
    position: "absolute",
    top: 110,
    left: 16,
    right: 16,
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  successText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Maps;
