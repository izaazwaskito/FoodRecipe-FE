import {
  LogBox,
  StyleSheet,
  Text,
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

const DetailPage = ({ route }) => {
  const { width } = useWindowDimensions();
  const SIZE = width * 0.94;
  const { id } = route.params;
  const [comment, setComment] = useState([]);
  const [data, setData] = useState([]);
  const [dataComments, setDataComments] = useState([]);
  useEffect(() => {
    getData();
    getComment();
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const getData = async () => {
    await axios
      .get(`http://192.168.1.6:7474/recipes/${id}`)
      .then((response) => {
        setData(response.data.data[0]);
      })
      .catch((error) => console.log(error));
  };

  const getComment = async () => {
    await axios
      .get(`http://192.168.1.6:7474/comments/${id}`)
      .then((response) => {
        setDataComments(response.data.data);
      });
  };

  const handleLike = async () => {
    const dataUser = await AsyncStorage.getItem("users_id");
    const data = {
      recipes_id: id,
      users_id: dataUser,
    };
    console.log(data);
    axios.post("http://192.168.1.6:7474/likeds", data).then((res) => {
      if (res.data.statusCode === 201) {
        alert("Like Recipe Success");
      } else if (res.data.message === "Like Already") {
        alert("Liked Already");
      }
    });
  };

  const handleBookmarks = async () => {
    const dataUser = await AsyncStorage.getItem("users_id");
    const data = {
      recipes_id: id,
      users_id: dataUser,
    };

    axios.post("http://192.168.1.6:7474/bookmarks", data).then((res) => {
      if (res.data.statusCode === 201) {
        alert("Bookmark Recipe Success");
      } else if (res.data.message === "Bookmarks Already") {
        alert("Bookmark Already");
      }
    });
  };

  const handleComments = async () => {
    const dataUser = await AsyncStorage.getItem("users_id");
    const data = {
      recipes_id: id,
      comment_text: comment,
      users_id: dataUser,
    };
    console.log(data);

    axios.post("http://192.168.1.6:7474/comments", data).then((res) => {
      if (res.data.statusCode === 201) {
        alert("Comment Recipe Success");
        getComment();
      }
    });
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
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Ingredients</Text>
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
          <View>
            <TextArea
              h={20}
              mt={5}
              placeholder="Comments:"
              backgroundColor={"#FAF7ED"}
              borderColor={"#FAF7ED"}
              value={comment}
              onChangeText={(value) => setComment(value)}
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
              data={dataComments}
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
