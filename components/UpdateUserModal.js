import React, { useEffect, useState } from "react";
import {
  Image,
  NativeBaseProvider,
  Container,
  Text,
  Input,
  Icon,
  View,
  ScrollView,
  HStack,
  Box,
  Center,
  VStack,
  Button,
  TextArea,
} from "native-base";
import {
  FlatList,
  Modal,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { useIsFocused } from "@react-navigation/native";

const UpdateUser = ({ users_name, users_photo, users_id, getData }) => {
  const [name, setName] = useState(users_name);
  const [image, setImage] = useState(users_photo);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocus = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);

  const updateUser = async () => {
    const formData = new FormData();
    formData.append("users_name", name);
    if (image) {
      formData.append("users_photo", {
        uri: image,
        name: "photo.jpg",
        type: "image/jpeg",
      });
    }
    await axios.put(
      `http://192.168.1.8:7474/users/profile/${users_id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setModalVisible(false);
    getData();
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text fontSize={16} textAlign={"center"}>
            Update Profile Data
          </Text>
          <Image
            alignSelf="center"
            mt={4}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
            }}
            source={
              users_photo === "null" ||
              users_photo === null ||
              users_photo === ""
                ? require("../assets/user.png")
                : { uri: users_photo }
            }
            alt="user"
          />
          <Button onPress={pickImage} backgroundColor={"white"}>
            {/* <FeatherIcon name="camera" size={20} color={"black"} /> */}
            <Text fontSize={15}>Upload Photo</Text>
          </Button>
          <Input
            mt={3}
            mb={3}
            value={name}
            style={{ backgroundColor: "white", borderColor: "white" }}
            onChangeText={(value) => setName(value)}
          />

          <HStack mt={3}>
            <Button
              style={{ backgroundColor: "#337CCF", width: 90 }}
              onPress={() => setModalVisible(!modalVisible)}
              mr={3}
            >
              Cancel
            </Button>
            <Button
              onPress={updateUser}
              style={{ backgroundColor: "#EEC302", width: 140 }}
            >
              Update
            </Button>
          </HStack>
        </View>
      </Modal>
      <TouchableOpacity
        style={{ marginTop: 5 }}
        onPress={() => setModalVisible(true)}
      >
        <FeatherIcon name="edit-2" size={20} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

export default UpdateUser;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
