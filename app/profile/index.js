import { StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FeatherIcon from "react-native-vector-icons/Feather";
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
  FlatList,
} from "native-base";
import { Link } from "expo-router";
import axios from "axios";
import EditProfileScreen from "./EditProfile";
import UpdateUser from "../../components/UpdateUserModal";
import { useIsFocused } from "@react-navigation/native";

const Index = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      getData();
    }
  }, []);

  const getData = async () => {
    const dataUser = await AsyncStorage.getItem("users_id");
    await axios
      .get(`http://192.168.1.8:7474/users/profile/${dataUser}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <NativeBaseProvider>
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={"#FFFFFF"}
        ></StatusBar>

        <View style={{ flex: 0.7, backgroundColor: "#EEC302" }}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <View>
                <Image
                  alignSelf="center"
                  mt={100}
                  mb={4}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                  }}
                  source={
                    item.users_photo === "null" ||
                    item.users_photo === null ||
                    item.users_photo === ""
                      ? require("../../assets/user.png")
                      : { uri: item.users_photo }
                  }
                  alt="user"
                />
                <HStack alignSelf="center">
                  <UpdateUser
                    users_name={item.users_name}
                    users_photo={item.users_photo}
                    users_id={item.users_id}
                    getData={getData}
                  />
                  <Text mt={1} style={{ color: "#FFFFFF", fontSize: 22 }}>
                    {" "}
                    {item.users_name}
                  </Text>
                </HStack>
              </View>
            )}
          />
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              height: 600,
              marginLeft: 11,
              width: 390,
              marginTop: -40,
              shadowColor: "black",
              elevation: 3,
              padding: 20,
            }}
          >
            <HStack style={{ paddingTop: 10 }}>
              <FeatherIcon name="user" size={30} color={"#EEC302"} />
              <Text
                onPress={() => navigation.navigate("EditProfile")}
                style={{
                  color: "#000000",
                  fontSize: 16,
                  fontWeight: 500,
                  paddingTop: 3,
                  paddingLeft: 15,
                }}
              >
                Edit Profile
              </Text>
            </HStack>
            <HStack style={{ paddingTop: 30 }}>
              <FeatherIcon name="award" size={30} color={"#EEC302"} />
              <Text
                onPress={() => navigation.navigate("MyRecipe")}
                style={{
                  color: "#000000",
                  fontSize: 16,
                  fontWeight: 500,
                  paddingTop: 3,
                  paddingLeft: 15,
                }}
              >
                My Recipe
              </Text>
            </HStack>
            <HStack style={{ paddingTop: 30 }}>
              <FeatherIcon name="bookmark" size={30} color={"#EEC302"} />
              <Text
                onPress={() => navigation.navigate("SavedRecipe")}
                style={{
                  color: "#000000",
                  fontSize: 16,
                  fontWeight: 500,
                  paddingTop: 3,
                  paddingLeft: 15,
                }}
              >
                Saved Recipe
              </Text>
            </HStack>
            <HStack style={{ paddingTop: 30 }}>
              <FeatherIcon name="thumbs-up" size={30} color={"#EEC302"} />
              <Text
                onPress={() => navigation.navigate("LikedRecipe")}
                style={{
                  color: "#000000",
                  fontSize: 16,
                  fontWeight: 500,
                  paddingTop: 3,
                  paddingLeft: 15,
                }}
              >
                Liked Recipe
              </Text>
            </HStack>
            <HStack style={{ paddingTop: 30 }}>
              <FeatherIcon name="log-out" size={30} color={"#D71313"} />
              <Text
                onPress={() => {
                  Alert.alert(
                    "Logout",
                    "Are you sure you want to log out ?",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      {
                        text: "Ok",
                        onPress: () => {
                          AsyncStorage.clear();
                          navigation.navigate("LoginFirst");
                        },
                        style: "cancel",
                      },
                    ],
                    {
                      cancelable: true,
                    }
                  );
                }}
                style={{
                  color: "#000000",
                  fontSize: 16,
                  fontWeight: 500,
                  paddingTop: 3,
                  paddingLeft: 15,
                }}
              >
                Logout
              </Text>
            </HStack>
          </View>
        </View>
      </View>
    </NativeBaseProvider>
  );
};

export default Index;

const styles = StyleSheet.create({});
