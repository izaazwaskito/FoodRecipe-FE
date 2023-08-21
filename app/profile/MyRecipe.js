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
  Alert,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UpdateModal from "../../components/UpdateModal";
import { useDispatch } from "react-redux";
import { deleteRecipeActions } from "../config/redux/actions/recipeAction";

const Home = () => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const SIZE = width * 0.94;
  const [data, setData] = useState([]);
  const [userLogin, setUserLogin] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const dataUser = await AsyncStorage.getItem("users_id");
    await axios
      .get(`http://192.168.1.8:7474/recipes/users/${dataUser}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => console.log(error));
  };
  const handleDelete = (recipes_id) => {
    // axios.delete(`http://192.168.1.8:7474/recipes/${recipes_id}`).then(() => {
    //   alert("Recipe Delete");
    dispatch(deleteRecipeActions(recipes_id));
    getData();
  };
  return (
    <View>
      <Container maxWidth={SIZE}>
        <FlatList
          data={data}
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
                      <UpdateModal
                        recipes_title={item.recipes_title}
                        recipes_id={item.recipes_id}
                        recipes_video={item.recipes_video}
                        recipes_photo={item.recipes_photo}
                        recipes_ingredients={item.recipes_ingredients}
                        getData={getData}
                      />

                      <Button
                        style={{ width: 50, backgroundColor: "#D71313" }}
                        onPress={() => {
                          Alert.alert(
                            "Delete",
                            "Are you sure you want to delete ?",
                            [
                              {
                                text: "Cancel",
                                style: "cancel",
                              },
                              {
                                text: "Ok",
                                onPress: () => {
                                  handleDelete(item.recipes_id);
                                },
                                style: "cancel",
                              },
                            ],
                            {
                              cancelable: true,
                            }
                          );
                        }}
                        ml={3}
                      >
                        <FeatherIcon name="trash-2" size={20} color={"white"} />
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
