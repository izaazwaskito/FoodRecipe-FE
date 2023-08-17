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

const Home = () => {
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
      .get(`http://192.168.1.6:7474/likeds/users/${dataUser}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => console.log(error));
  };
  const handleDelete = (likeds_id) => {
    axios.delete(`http://192.168.1.6:7474/likeds/${likeds_id}`).then(() => {
      alert("Recipe Delete");
      getData();
    });
  };
  return (
    <View>
      <Container maxWidth={SIZE}>
        {/* <View>
          <HStack paddingBottom={7}>
            <Image
              source={require("../../assets/sandwich.jpg")}
              style={styles.image}
            />
            <VStack paddingTop={5}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>Sandwich</Text>
              <Text style={{ fontSize: 14 }}>In Veg Pizza</Text>
              <Text style={{ fontWeight: "bold" }}>Spicy</Text>
            </VStack>
          </HStack>
        </View> */}
        <FlatList
          data={data}
          style={{ marginTop: 60 }}
          renderItem={({ item }) => (
            <View mt={10}>
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
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    {item.recipes_title}
                  </Text>
                  <Text style={{ fontSize: 14 }}>Food</Text>
                  <Text style={{ fontWeight: "bold" }}></Text>
                  <HStack>
                    <Button
                      style={{ width: 50, backgroundColor: "red" }}
                      onPress={() => handleDelete(item.likeds_id)}
                    >
                      <FeatherIcon name="thumbs-up" size={20} color={"white"} />
                    </Button>
                  </HStack>
                </VStack>
              </HStack>
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
    borderRadius: 20,
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
      <View mt={6} flex={1} px="3">
        <Home />
      </View>
    </NativeBaseProvider>
  );
};
