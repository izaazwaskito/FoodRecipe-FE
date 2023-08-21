import {
  LogBox,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
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
  VStack,
  TextArea,
  ScrollView,
} from "native-base";
import { Link } from "expo-router";
import axios from "axios";
import { ImageBackground } from "react-native";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { createSavedActions } from "../config/redux/actions/savedActions";
import { createLikeActions } from "../config/redux/actions/likeActions";
import {
  createCommentActions,
  getUserCommentActions,
} from "../config/redux/actions/commentActions";

const DetailPage = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const route = useRoute();
  const SIZE = width * 0.94;
  const dispatch = useDispatch();
  const { id } = route.params;
  const [commentText, setCommentText] = useState("");
  const [data, setData] = useState([]);
  const isFocuesd = useIsFocused();
  const [dataComments, setDataComments] = useState([]);
  const [activeTab, setActiveTab] = useState("Ingredients");
  const { comment } = useSelector((state) => state.comment);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    getData();
    getComment();
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const getData = async () => {
    await axios
      .get(`http://192.168.1.8:7474/recipes/${id}`)
      .then((response) => {
        setData(response.data.data[0]);
      })
      .catch((error) => console.log(error));
  };

  const getComment = async () => {
    dispatch(getUserCommentActions(id));
  };

  const handleLike = async () => {
    const dataUser = await AsyncStorage.getItem("users_id");
    dispatch(createLikeActions(id, dataUser));
  };

  const handleBookmarks = async () => {
    const dataUser = await AsyncStorage.getItem("users_id");
    dispatch(createSavedActions(id, dataUser));
  };

  const handleComments = async () => {
    const dataUser = await AsyncStorage.getItem("users_id");
    dispatch(createCommentActions(id, dataUser, commentText));
    setCommentText("");
    getComment();
  };
  return (
    <NativeBaseProvider>
      {/* <Text>id:{id}</Text> */}
      <View style={{ flex: 0.9 }}>
        <ImageBackground
          style={styles.image}
          source={
            data.recipes_photo === "null" ||
            data.recipes_photo === null ||
            data.recipes_photo === ""
              ? require("../../assets/noimage.png")
              : { uri: data.recipes_photo }
          }
          blurRadius={10}
        >
          <HStack>
            <View>
              <Text
                style={{
                  zIndex: 1,
                  fontSize: 35,
                  fontWeight: "bold",
                  color: "white",
                  paddingTop: 170,
                  paddingLeft: 20,
                  maxWidth: 290,
                  width: 250,
                }}
              >
                {data.recipes_title}
              </Text>
              <Text style={{ fontSize: 14, paddingLeft: 20, color: "#FFFFFF" }}>
                by {data.users_name}
              </Text>
            </View>
            <View style={{ paddingTop: 270, paddingLeft: 42 }}>
              <HStack>
                <Button
                  onPress={handleBookmarks}
                  style={{
                    backgroundColor: "#EFC81A",
                    borderRadius: 13,
                  }}
                >
                  <FeatherIcon name="bookmark" size={20} color={"white"} />
                </Button>
                <Button
                  style={{
                    backgroundColor: "white",
                    borderRadius: 13,
                  }}
                  onPress={handleLike}
                  ml={3}
                >
                  <FeatherIcon name="thumbs-up" size={20} color={"#EFC81A"} />
                </Button>
              </HStack>
            </View>
          </HStack>
        </ImageBackground>
      </View>
      <View
        style={{
          flex: 1.3,
          backgroundColor: "#FFFFFF",
          paddingLeft: 20,
          paddingTop: 20,
          borderRadius: 20,
          paddingRight: 20,
        }}
      >
        <HStack space={5}>
          <TouchableOpacity onPress={() => handleTabChange("Ingredients")}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Ingredients
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabChange("StepVideo")}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Video Step</Text>
          </TouchableOpacity>
        </HStack>
        {activeTab === "Ingredients" && (
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                backgroundColor: "#FAF7ED",
                marginTop: 20,
                borderRadius: 15,
              }}
            >
              <Text style={{ padding: 20 }}>{data.recipes_ingredients}</Text>
            </View>
          </ScrollView>
        )}
        {activeTab === "StepVideo" && (
          <ScrollView
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ marginTop: 20 }}>
              <View
                style={{
                  backgroundColor: "#FAF7ED",
                  height: 70,
                }}
              >
                <HStack>
                  <View
                    style={{
                      backgroundColor: "#EFC81A",
                      width: 50,
                      height: 50,
                      margin: 10,
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FeatherIcon
                      name="play"
                      size={26}
                      color={"white"}
                      onPress={() => {
                        navigation.navigate("DetailVideo", {
                          id: data.recipes_id,
                        });
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 17,
                      marginTop: 20,
                      fontWeight: 500,
                      color: "#666666",
                    }}
                    onPress={() => {
                      navigation.navigate("DetailVideo", {
                        id: id,
                      });
                    }}
                  >
                    Step 1
                  </Text>
                </HStack>
              </View>
              <View
                style={{
                  backgroundColor: "#FAF7ED",
                  height: 70,
                  marginTop: 20,
                }}
              >
                <HStack>
                  <View
                    style={{
                      backgroundColor: "#EFC81A",
                      width: 50,
                      height: 50,
                      margin: 10,
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FeatherIcon name="play" size={26} color={"white"} />
                  </View>
                  <Text
                    style={{
                      fontSize: 17,
                      marginTop: 20,
                      fontWeight: 500,
                      color: "#666666",
                    }}
                  >
                    Step 2
                  </Text>
                </HStack>
              </View>
              <View
                style={{
                  backgroundColor: "#FAF7ED",
                  height: 70,
                  marginTop: 20,
                }}
              >
                <HStack>
                  <View
                    style={{
                      backgroundColor: "#EFC81A",
                      width: 50,
                      height: 50,
                      margin: 10,
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FeatherIcon name="play" size={26} color={"white"} />
                  </View>
                  <Text
                    style={{
                      fontSize: 17,
                      marginTop: 20,
                      fontWeight: 500,
                      color: "#666666",
                    }}
                  >
                    Step 3
                  </Text>
                </HStack>
              </View>
            </View>
            <View>
              <TextArea
                h={20}
                mt={5}
                placeholder="Comments:"
                backgroundColor={"#FAF7ED"}
                borderColor={"#FAF7ED"}
                value={commentText}
                onChangeText={(value) => setCommentText(value)}
              />
            </View>
            <Button
              mt={4}
              onPress={handleComments}
              borderRadius={10}
              backgroundColor={"#EFC81A"}
            >
              Post
            </Button>

            <View style={{ marginTop: 15 }}>
              <Text>Comment:</Text>
              <FlatList
                data={comment}
                renderItem={({ item }) => (
                  <View>
                    <HStack>
                      <Image
                        source={require("../../assets/user.png")}
                        width={10}
                        height={10}
                        alt="user"
                        mt={3}
                      />
                      <VStack>
                        <Text style={{ paddingTop: 12, paddingLeft: 20 }}>
                          {item.users_name}
                        </Text>
                        <Text style={{ paddingLeft: 20 }}>
                          {item.comment_text}
                        </Text>
                      </VStack>
                    </HStack>
                  </View>
                )}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </NativeBaseProvider>
  );
};

export default DetailPage;

const styles = StyleSheet.create({
  image: {
    width: "103%",
    aspectRatio: 1.1,
    borderRadius: 20,
    resizeMode: "contain",
    marginRight: 20,
  },
});
