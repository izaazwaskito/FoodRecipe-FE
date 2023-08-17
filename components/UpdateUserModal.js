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

const UpdateUser = ({ users_name, users_photo, users_id, getData }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(users_name);
  const [image, setImage] = useState(users_photo);

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
      `http://192.168.1.6:7474/users/profile/${users_id}`,
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
          <Text fontSize={20}>Update</Text>
          <Text mt={3}>Name</Text>
          <Input value={name} onChangeText={(value) => setName(value)} />
          <Button mt={3} onPress={pickImage} backgroundColor={"transparent"}>
            <FeatherIcon name="camera" size={20} color={"black"} />
          </Button>
          <HStack mt={3}>
            <Button
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
              mr={3}
            >
              Cancel
            </Button>
            <Button onPress={updateUser}>Update</Button>
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
    backgroundColor: "#EFEFEF",
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
