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
  deleteSavedActions,
  getUserSavedActions,
} from "../config/redux/actions/savedActions";

const Home = () => {
  const { width } = useWindowDimensions();
  const SIZE = width * 0.94;
  const [data, setData] = useState([]);
  const [userLogin, setUserLogin] = useState();
  const dispatch = useDispatch();
  const { saved } = useSelector((state) => state.saved);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const dataUser = await AsyncStorage.getItem("users_id");
    dispatch(getUserSavedActions(dataUser));
  };
  const handleDelete = (bookmarks_id) => {
    dispatch(deleteSavedActions(bookmarks_id));
    getData();
  };
  return (
    <View>
      <Container maxWidth={SIZE}>
        <FlatList
          data={saved}
          style={{ marginTop: 60 }}
          renderItem={({ item }) => (
            <View mt={7}>
              <View padding={3}>
                <HStack>
                  <Image
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
                  <VStack>
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
                        style={{ width: 50, backgroundColor: "#D71313" }}
                        onPress={() => handleDelete(item.bookmarks_id)}
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
