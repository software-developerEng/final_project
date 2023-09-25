import React, { useState } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import Logo from "../assets/YESI_LOGO_BLACK.svg";
import BackButton from "../assets/backbutton.svg";
import CloseButton from "../assets/close.svg";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/Components/CustomButton";
import profile_pic from "../assets/profile_pic_testing.jpg";
import { Link, useRouter } from "expo-router";
import axios from "axios";
import Maps from "./Maps";

// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../config/firebase";

const Register = () => {
  const navigation = useNavigation();
  const [confirmpassword, setConfirmPassword] = useState("");
  const [information, setInformation] = useState({
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    phone_number: "",
    password: "",
    address: "",
    gender: "",
    age: "",
  });

  const router = useRouter();

  const handleRegister = async () => {
    if (confirmpassword === information.password) {
      let data = {
        first_name: information.first_name,
        email: information.email,
        last_name: information.last_name,
        username: information.username,
        phone_number: information.phone_number,
        password: information.password,
      };
      let response = await axios.post(
        "http://192.168.1.3:8000/profile/register/",
        information
      );
      router.replace("/(tabs)/Home");
    } else {
      console.log("Passwords do not match");
    }
  };

  const firebaseRegister = () => {
    createUserWithEmailAndPassword(
      auth,
      information.email,
      information.password
    )
      .then(() => console.log("Signup success", "firebase authenticated"))
      .catch((err) => Alert.alert("Login error", err.message));
  };

  const openmaps = () => {
    navigation.navigate("Maps", { navigation });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={BackButton} style={styles.backbutton} />
        <Image source={Logo} style={styles.logo} />
        <Image source={CloseButton} style={styles.backbutton} />
      </View>

      <ScrollView>
        <View style={styles.formContainer}>
          <Text style={styles.loginText}>Register</Text>
          <View style={styles.firstlastname}>
            <TextInput
              style={styles.inputfirstlast}
              placeholder="First Name"
              onChangeText={(text) =>
                setInformation({ ...information, first_name: text })
              }
              value={information.first_name}
            />
            <TextInput
              style={styles.inputfirstlast}
              placeholder="Last Name"
              onChangeText={(text) =>
                setInformation({ ...information, last_name: text })
              }
              value={information.last_name}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter your new username"
            onChangeText={(text) =>
              setInformation({ ...information, username: text })
            }
            value={information.username}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter your email id"
            onChangeText={(text) =>
              setInformation({ ...information, email: text })
            }
            value={information.email}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            onChangeText={(text) =>
              setInformation({ ...information, phone_number: text })
            }
            value={information.phone_number}
            keyboardType="number-pad"
          />

          <TextInput
            style={styles.input}
            placeholder="Write your password"
            secureTextEntry
            onChangeText={(text) =>
              setInformation({ ...information, password: text })
            }
            value={information.password}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            secureTextEntry
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmpassword}
          />
        </View>
        <TouchableOpacity onPress={openmaps}>
          <Text>Your Address</Text>
        </TouchableOpacity>

        <View style={styles.buttonposition} />
        <KeyboardAvoidingView
          behavior={
            Platform.OS === "ios" || Platform.OS === "android"
              ? "padding"
              : "height"
          }
          style={{ flex: 1 }}
        >
          <CustomButton
            title="Submit"
            onPress={handleRegister}
            label={"Sign In"}
          />

          <View style={styles.registerview}>
            <Text>Already have an account?</Text>
            <Link href={"/Login"}>
              <Text style={styles.registerLink}> Login</Text>
            </Link>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  firstlastname: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    width: 100,
    height: 100,
    contentFit: "contain",
    alignSelf: "center",
    marginTop: "15%",
    marginBottom: "20%",
  },
  backbutton: {
    width: 30,
    height: 30,
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  loginText: {
    fontFamily: "DMMedium",
    fontSize: 32,
    fontWeight: "500",
    color: "#333",
    marginBottom: "3%",
    alignSelf: "center",
    marginBottom: "5%",
  },
  sigintext: {
    marginBottom: "28%",
    fontSize: 12,
    fontStyle: "italic",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontFamily: "DMRegular",
    fontSize: 16,
  },
  inputfirstlast: {
    height: 40,
    width: "45%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontFamily: "DMRegular",
    fontSize: 16,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerLink: {
    color: "#AD40AF",
    fontWeight: "700",
    marginLeft: 5,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  icons: {
    height: "100%",
    width: "10%",
    marginRight: "5%",
  },
  iconcontainer: {
    flexDirection: "row",
    marginBottom: "6%",
  },
  registerview: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonposition: {
    marginTop: "62%",
  },
});

export default Register;
