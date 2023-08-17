import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FeatherIcon from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import {
  Image,
  Center,
  NativeBaseProvider,
  Container,
  Input,
  Button,
  Icon,
  StatusBar,
  HStack,
} from "native-base";
import axios from "axios";

const EditProfile = ({ navigation }) => {
  const [userLogin, setUserLogin] = useState();
  const [data, setData] = useState([]);

  //   useEffect(() => {

  //   }, []);

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={"#FFFFFF"}
        ></StatusBar>
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            paddingLeft: 20,
            paddingTop: 100,
            maxWidth: 395,
          }}
        >
          <Text style={{ marginTop: 10 }}>New Password</Text>
          <Input
            size="sm"
            placeholder="New Password"
            backgroundColor={"#F5F5F5"}
            borderColor={"#F5F5F5"}
          />
          <Text style={{ marginTop: 10 }}>Confirm New Password</Text>
          <Input
            size="sm"
            placeholder="New Password"
            backgroundColor={"#F5F5F5"}
            borderColor={"#F5F5F5"}
          />
          <Button backgroundColor={"#EEC302"}>Change Password</Button>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
