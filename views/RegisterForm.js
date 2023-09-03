// Use LoginForm.js as an example and add four fields username, password, email and full_name and a submit button. All fields except full_name are required.
// Add RegisterForm component to Login.js

import React, { useState } from "react";
import {
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { MainContext } from "../contexts/MainContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { register } from "../api/auth";

const RegisterForm = async () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [full_name, setFullName] = useState("");
  const navigation = useNavigation();
  const { setIsLoggedIn, setUser } = useContext(MainContext);

  const handleRegister = async () => {
    console.log("registerform, handleRegister");
    const user = await register(username, password, email, full_name);
    setUser(user);
    setIsLoggedIn(true);
    navigation.navigate("Profile");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Register view</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setUsername(text)}
        value={username}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setFullName(text)}
        value={full_name}
        placeholder="Full name"
      />
      <Button title="Register!" onPress={handleRegister} />
    </SafeAreaView>
  );
};

export default RegisterForm;
