import { View, Text, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useUser } from "../hooks/ApiHooks";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Card } from "@rneui/themed";

const RegisterForm = () => {
  const { postUser } = useUser();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const register = async (RegisterData) => {
    try {
      const registerResponse = await postUser(RegisterData);
      console.log("register response", registerResponse);
      Alert.alert("Success", "Your account has been created successfully.");
      // TODO: fix dofetch() to display errors from API (e.g. when bad user/pw)
      // use loginResponse.user for storing token & userdata
      await AsyncStorage.setItem("userToken", registerResponse.token);
    } catch (error) {
      console.error(error);
      // TODO: notify user about failed login?
    }
  };

  return (
    <Card>
      <Card.Title>Register Form</Card.Title>

      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Username"
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
            />
          )}
          name="username"
        />
        {errors.username && <Text>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="password"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />
        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="email"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="fullname"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="full_name"
        />
        <Button title="Submit" onPress={handleSubmit(register)} />
      </View>
    </Card>
  );
};

export default RegisterForm;
