import React, { useState } from "react";
import {
  Image,
  Center,
  NativeBaseProvider,
  Container,
  Text,
  Input,
  Button,
  Icon,
  View,
  Alert,
} from "native-base";
import { Link, useNavigation } from "expo-router";
import FeatherIcon from "react-native-vector-icons/Feather";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const Login = () => {
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const dataUser = await AsyncStorage.getItem("token");
    if (!dataUser) {
      navigation.navigate("Login");
    } else {
      navigation.navigate("HomeScreenReal");
      getToken();
    }
  };

  const login = async () => {
    const data = {
      users_email: email,
      users_confirmpassword: confirmpassword,
    };

    axios.post("http://192.168.1.6:7474/users/login", data).then((res) => {
      if (res.status === 201) {
        navigation.navigate("HomeScreenReal");
        AsyncStorage.setItem("token", res.data.data.token_user);
        AsyncStorage.setItem("users_id", res.data.data.users_id);
      } else if (res.data.message === "Email Wrong") {
        alert("Email Wrong");
      } else if (res.data.message === "Password Wrong") {
        alert("Password Wrong");
      }

      setEmail("");
      setConfirmPassword("");
    });
    // navigation.navigate("Home");
  };

  return (
    <Center>
      <Container maxWidth={320}>
        <Image
          alignSelf="center"
          style={{ width: 200, height: 200 }}
          source={require("../../assets/user.png")}
          alt="user"
        />
        <Text
          alignSelf="center"
          mt={3}
          fontSize="2xl"
          style={{ color: "#EFC81A" }}
        >
          Welcome!
        </Text>
        <Text alignSelf="center" fontSize="md" style={{ color: "#C4C4C4" }}>
          Log in to your exiting account.
        </Text>
        <Input
          size="sm"
          mt={4}
          placeholder="examplexxx@gmail.com"
          backgroundColor={"#F5F5F5"}
          borderColor={"#F5F5F5"}
          InputLeftElement={
            <Icon
              as={<FeatherIcon name="user" />}
              size={6}
              ml="2"
              color="#C4C4C4"
            />
          }
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <Input
          size="sm"
          mt={4}
          placeholder="Password"
          backgroundColor={"#F5F5F5"}
          borderColor={"#F5F5F5"}
          InputLeftElement={
            <Icon
              as={<FeatherIcon name="lock" />}
              size={6}
              ml="2"
              color="#C4C4C4"
            />
          }
          value={confirmpassword}
          onChangeText={(value) => setConfirmPassword(value)}
          secureTextEntry={true}
        />
        <Text
          fontSize="sm"
          mt={2}
          mb={2}
          style={{ color: "#999999", alignSelf: "flex-end" }}
        >
          Forgot Password ?
        </Text>

        <Button
          width={320}
          mt={2}
          style={{ backgroundColor: "#EFC81A" }}
          borderRadius={7}
          onPress={login}
        >
          {/* <Link href="/MainContainer">LOG IN</Link> */}
          LOG IN
        </Button>

        <Text
          alignSelf="center"
          mt={2}
          fontSize="md"
          style={{ color: "#999999" }}
        >
          Don’t have an account?{" "}
          <Text
            onPress={() => navigation.navigate("Register")}
            style={{ color: "#EFC81A" }}
          >
            Sign Up
          </Text>
        </Text>
      </Container>
    </Center>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Login />
      </Center>
    </NativeBaseProvider>
  );
};
