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
} from "native-base";
import {
  FlatList,
  Modal,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLikeActions,
  getUserLikeActions,
} from "../config/redux/actions/likeActions";

const Home = () => {
  const { width } = useWindowDimensions();
  const SIZE = width * 0.94;
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [userLogin, setUserLogin] = useState();
  const { like } = useSelector((state) => state.like);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const dataUser = await AsyncStorage.getItem("users_id");
    dispatch(getUserLikeActions(dataUser));
  };
  const handleDelete = (likeds_id) => {
    dispatch(deleteLikeActions(likeds_id));
    getData();
  };
  return (
    <View>
      <Container maxWidth={SIZE}>
        <FlatList
          data={like}
          style={{ marginTop: 60 }}
          renderItem={({ item }) => (
            <View
              mt={7}
              backgroundColor={"white"}
              width={SIZE}
              borderRadius={10}
            >
              <View padding={3}>
                <HStack>
                  <Image
                    // source={{ uri: item.recipes_photo }}
                    source={
                      item.recipes_photo === "null" ||
                      item.recipes_photo === null ||
                      item.recipes_photo === ""
                        ? require("../../assets/noimage.png")
                        : { uri: item.recipes_photo }
                    }
                    style={styles.image}
                    alt="image"
                  />
                  <VStack paddingTop={1}>
                    <Text
                      style={{
                        fontWeight: 500,
                        fontSize: 18,
                      }}
                    >
                      {item.recipes_title}
                    </Text>
                    <Text style={{ fontSize: 14 }}>Food</Text>
                    <Text style={{ fontWeight: 500 }}></Text>
                    <HStack>
                      <Button
                        style={{ width: 50, backgroundColor: "red" }}
                        onPress={() => handleDelete(item.likeds_id)}
                      >
                        <FeatherIcon
                          name="thumbs-up"
                          size={20}
                          color={"white"}
                        />
                      </Button>
                    </HStack>
                  </VStack>
                </HStack>
              </View>
            </View>
          )}
        />
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 10,
    width: 110,
    height: 110,
    resizeMode: "contain",
    marginRight: 20,
  },
  card: {
    width: 180,
    height: 140,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
  },
  cardImage: {
    width: "100%",
    height: "70%",
  },
});

export default () => {
  return (
    <NativeBaseProvider>
      <View mt={6} flex={1} px="3" backgroundColor={"white"}>
        <Home />
      </View>
    </NativeBaseProvider>
  );
};
