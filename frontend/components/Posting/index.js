import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Platform, TextInput, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export default function Posting() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [images, setImages] = useState([]);
  const [captions, setCaptions] = useState([]);
  const [step, setStep] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  // const navigation = useNavigation();

const router = useRouter()

  const handleNavigateHome = () => {
    router.push('/(tabs)/Home');
  };

  const handleNext = () => {
    if (step === 0) {
      
      if (imageIndex < images.length - 1) {
        setImageIndex(imageIndex + 1);
        setImage(images[imageIndex + 1]);
      } else {
        setStep(1);
      }
    } else if (step === 1) {
      
      if (imageIndex < images.length - 1) {
        const newCaptions = [...captions];
        newCaptions[imageIndex] = captions[imageIndex];
        setCaptions(newCaptions);
        setImageIndex(imageIndex + 1);
        setImage(images[imageIndex + 1]);
      } else {
        
        alert('Images posted! 🎉');
        setImages([]);
        setCaptions([]);
        setStep(0);
      }
    }
  };

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const imagePickerStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

      setHasCameraPermission(
        cameraStatus.status === 'granted' && imagePickerStatus.status === 'granted'
      );
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImages([...images, data.uri]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
    });

    if (!result.cancelled) {
      setImages([...images, ...result.uris]);
    }
  };

  if (hasCameraPermission === null) {
    return <Text>Requesting camera and media library permissions...</Text>;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera or media library</Text>;
  }

  return (
    <View style={styles.container}>
      {step === 0 && !image && (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
            }}
          >
            <Button
              title=""
              icon="retweet"
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            />
            <Button
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
              icon="flash"
              color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#fff'}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleNavigateHome}
            >
              <AntDesign name="close" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        </Camera>
      )}

      {step === 0 && image && (
        <Image source={{ uri: image }} style={styles.camera} />
      )}

      {step === 1 && (
        <TextInput
          style={styles.captionInput}
          placeholder="Enter caption..."
          onChangeText={(text) => {
            const newCaptions = [...captions];
            newCaptions[imageIndex] = text;
            setCaptions(newCaptions);
          }}
          value={captions[imageIndex]}
        />
      )}

      <View style={styles.controls}>
        {step === 0 && !image && (
          <View style={styles.imagePicker}>
            <Button
              title="Take a picture"
              onPress={takePicture}
              icon="camera"
            />
            {Platform.OS === 'ios' && (
              <Button
                title="Select Image"
                onPress={pickImage}
                icon="image"
              />
            )}
          </View>
        )}

        {step === 1 && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 50,
            }}
          >
            <Button
              title="Back"
              onPress={() => {
                if (imageIndex > 0) {
                  setImageIndex(imageIndex - 1);
                  setImage(images[imageIndex - 1]);
                  setStep(0);
                } else {
                  setImages([]);
                  setStep(0);
                }
              }}
              icon="arrow-left"
            />
            <Button title="Next" onPress={handleNext} icon="arrow-right" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#000',
    padding: 8,
  },
  controls: {
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E9730F',
    marginLeft: 10,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 7,
    left: "52.5%",
    zIndex: 1,
  },
  imagePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  captionInput: {
    fontSize: 16,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 8,
    color: 'white',
  },
});
