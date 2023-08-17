import React, { useEffect, useState } from "react";
import {
  Center,
  NativeBaseProvider,
  Container,
  Text,
  Input,
  Button,
  Icon,
  TextArea,
  Hidden,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FeatherIcon from "react-native-vector-icons/Feather";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createRecipeActions } from "../config/redux/actions/recipeAction";
import * as ImagePicker from "expo-image-picker";

const Register = () => {
  const dispatch = useDispatch();
  const [userLogin, setUserLogin] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [picture, setPicture] = useState("");
  const [userid, setUserId] = useState("");
  const [image, setImage] = useState(null);
  useEffect(() => {
    handleGetToken();
  });
  const handleGetToken = async () => {
    const dataToken = await AsyncStorage.getItem("token");
    if (!dataToken) {
      navigation.navigate("MainAuth");
    }
    const dataUser = await AsyncStorage.getItem("users_id");
    setUserLogin(dataUser);
  };
  const createRecipe = () => {
    dispatch(createRecipeActions(title, description, video, image, userLogin));
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
    <Center>
      <Container maxWidth={320}>
        <Text
          alignSelf="center"
          mt={3}
          fontSize="2xl"
          style={{ color: "#EFC81A" }}
        >
          Add Your Recipe
        </Text>
        <Input
          size="sm"
          mt={4}
          placeholder="Title"
          backgroundColor={"#F5F5F5"}
          borderColor={"#F5F5F5"}
          InputLeftElement={
            <Icon
              as={<FeatherIcon name="book-open" />}
              size={6}
              ml="2"
              color="#C4C4C4"
            />
          }
          value={title}
          onChangeText={(value) => setTitle(value)}
        />
        <TextArea
          h={40}
          mt={5}
          placeholder="Description"
          backgroundColor={"#F5F5F5"}
          borderColor={"#F5F5F5"}
          value={description}
          onChangeText={(value) => setDescription(value)}
        />

        <Input
          size="sm"
          mt={5}
          placeholder="Url Video"
          backgroundColor={"#F5F5F5"}
          borderColor={"#F5F5F5"}
          InputLeftElement={
            <Icon
              as={<FeatherIcon name="video" />}
              size={6}
              ml="2"
              color="#C4C4C4"
            />
          }
          value={video}
          onChangeText={(value) => setVideo(value)}
        />
        <Button
          onPress={pickImage}
          width={320}
          mt={5}
          backgroundColor={"#F5F5F5"}
          borderColor={"#F5F5F5"}
          h={12}
        >
          <FeatherIcon name="camera" size={25} color={"#C4C4C4"} />
        </Button>
        {/* <Input
          size="sm"
          mt={5}
          placeholder="Url Picture"
          backgroundColor={"#F5F5F5"}
          borderColor={"#F5F5F5"}
          InputLeftElement={
            <Icon
              as={<FeatherIcon name="camera" />}
              size={6}
              ml="2"
              color="#C4C4C4"
            />
          }
          value={picture}
          onChangeText={(value) => setPicture(value)}
        /> */}

        <Button
          width={320}
          mt={5}
          style={{ backgroundColor: "#EFC81A" }}
          borderRadius={7}
          onPress={createRecipe}
        >
          CREATE
        </Button>
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
