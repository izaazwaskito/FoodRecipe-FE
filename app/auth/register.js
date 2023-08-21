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
} from "native-base";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Link, useNavigation } from "expo-router";
import axios, { Axios } from "axios";
import { useDispatch } from "react-redux";
import { registerActions } from "../config/redux/actions/userActions";

const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const register = () => {
    dispatch(registerActions(name, email, phone, password, confirmpassword));
    navigation.navigate("LoginFirst");
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");

    // if (res.data[0].message === '"users_name" is not allowed to be empty') {
    //   alert("Name must be filled out!");
    // } else if (
    //   res.data[0].message === '"users_phone" is not allowed to be empty'
    // ) {
    //   alert("Phone must be filled out! / character must 8-12 ");
    // } else if (
    //   res.data[0].message === '"users_password" is not allowed to be empty'
    // ) {
    //   alert("Password must be filled out!");
    // } else if (
    //   res.data[0].message ===
    //   '"users_confirmpassword" must be [ref:users_password]'
    // ) {
    //   alert("Password must be confirmed");
    // }
  };

  return (
    <Center>
      <Container maxWidth={320}>
        <Text
          alignSelf="center"
          mt={3}
          fontSize="2xl"
          style={{ color: "#EFC81A" }}
        >
          Let’s Get Started !
        </Text>
        <Text alignSelf="center" fontSize="sm" style={{ color: "#C4C4C4" }}>
          Create new account to access all feautures
        </Text>
        <Input
          size="sm"
          mt={4}
          placeholder="Name"
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
          value={name}
          onChangeText={(value) => setName(value)}
        />

        <Input
          size="sm"
          mt={4}
          placeholder="E-Mail"
          backgroundColor={"#F5F5F5"}
          borderColor={"#F5F5F5"}
          InputLeftElement={
            <Icon
              as={<FeatherIcon name="mail" />}
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
          placeholder="Phone"
          backgroundColor={"#F5F5F5"}
          borderColor={"#F5F5F5"}
          InputLeftElement={
            <Icon
              as={<FeatherIcon name="phone" />}
              size={6}
              ml="2"
              color="#C4C4C4"
            />
          }
          value={phone}
          onChangeText={(value) => setPhone(value)}
        />
        <Input
          size="sm"
          mt={4}
          placeholder="Create New Password"
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
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
        <Input
          size="sm"
          mt={4}
          placeholder="New Password"
          backgroundColor={"#F5F5F5"}
          borderColor={"#F5F5F5"}
          InputLeftElement={
            <Icon
              as={<FeatherIcon name="unlock" />}
              size={6}
              ml="2"
              color="#C4C4C4"
            />
          }
          value={confirmpassword}
          onChangeText={(value) => setConfirmPassword(value)}
        />
        <Button
          width={320}
          mt={5}
          style={{ backgroundColor: "#EFC81A" }}
          borderRadius={7}
          onPress={register}
        >
          CREATE
        </Button>
        <Text
          alignSelf="center"
          mt={2}
          fontSize="md"
          style={{ color: "#999999" }}
        >
          Already have account?{" "}
          <Text
            onPress={() => navigation.navigate("Login")}
            style={{ color: "#EFC81A" }}
          >
            Log in Here
          </Text>
        </Text>
      </Container>
    </Center>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3" background={"#EFEFEF"}>
        <Register />
      </Center>
    </NativeBaseProvider>
  );
};
