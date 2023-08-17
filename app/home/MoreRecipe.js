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
  Pressable,
  VStack,
} from "native-base";
import { FlatList, StyleSheet, useWindowDimensions } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import axios from "axios";
import filter from "lodash.filter";
import { useNavigation } from "expo-router";
import { SelectList } from "react-native-dropdown-select-list";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipe } from "../config/redux/actions/recipeAction";

const Home = () => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const SIZE = width * 0.94;
  const [data, setData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  const [selected, setSelected] = useState("");
  const { recipe } = useSelector((state) => state.recipe);

  useEffect(() => {
    dispatch(getAllRecipe());
    setData(recipe);
    setFullData(recipe);
  }, []);

  const dataSort = [
    { key: "1", value: "Sort by Name" },
    { key: "2", value: "Sort by Users" },
  ];

  const handleSearch = (value) => {
    if (value) {
      const newData = data.filter((item) => {
        const itemData = item.recipes_title
          ? item.recipes_title.toLowerCase()
          : "".toLowerCase();
        const textData = value.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFullData(newData);
      setSearch(value);
    } else {
      setFullData(data);
      setSearch(value);
    }
  };
  return (
    <View style={{ marginTop: 60 }}>
      <Container maxWidth={SIZE}>
        <HStack space={3} marginTop={6}>
          <View>
            <Input
              width={244}
              borderColor={"#FFFFFF"}
              backgroundColor={"#FFFFFF"}
              placeholder="Search Pasta, Bread, etc"
              value={search}
              onChangeText={(value) => handleSearch(value)}
              InputLeftElement={
                <Icon
                  as={<FeatherIcon name="search" />}
                  size={6}
                  ml="2"
                  color="#C4C4C4"
                />
              }
            />
          </View>
          <SelectList
            setSelected={setSelected}
            data={dataSort}
            maxHeight={92}
            boxStyles={{
              backgroundColor: "white",
              borderColor: "white",
              borderRadius: 2,
            }}
            inputStyles={{ color: "#b2b2b2", fontSize: 12 }}
          />
        </HStack>
        <FlatList
          data={fullData.sort((a, b) => {
            return selected === "1"
              ? a.recipes_title > b.recipes_title
                ? 1
                : -1
              : a.recipes_title < b.recipes_title
              ? 1
              : -1;
          })}
          renderItem={({ item }) => (
            <HStack style={{ marginTop: 20 }}>
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
              <VStack paddingTop={5}>
                <Text
                  style={{ fontWeight: "bold", fontSize: 18 }}
                  onPress={() => {
                    navigation.navigate("DetailPage", {
                      id: item.recipes_id,
                    });
                  }}
                >
                  {item.recipes_title}
                </Text>
                <Text style={{ fontSize: 14 }}>Food</Text>
                <Text style={{ fontWeight: "bold" }}></Text>
              </VStack>
            </HStack>
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
