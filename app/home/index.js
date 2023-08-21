import React from "react";
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
import { StyleSheet, useWindowDimensions } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useNavigation } from "expo-router";

const Home = () => {
  const { width } = useWindowDimensions();
  const SIZE = width * 0.94;
  const navigation = useNavigation();

  return (
    <View>
      <Container maxWidth={320}>
        <View mt={4}>
          <Input
            width={SIZE}
            borderColor={"#FFFFFF"}
            backgroundColor={"#FFFFFF"}
            placeholder="Search Pasta, Bread, etc"
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
        <View mt={6}>
          <View>
            <Text bold>Popular Recipes</Text>
            <Text fontSize="xs" mb={4}>
              Populer check
            </Text>
          </View>
          <ScrollView
            horizontal
            style={{ width: SIZE, maxHeight: 180 }}
            showsHorizontalScrollIndicator={false}
          >
            <Image
              source={require("../../assets/salad.jpg")}
              style={styles.image}
              alt="preview"
            />
            <Image
              source={require("../../assets/pancake.jpg")}
              style={styles.image}
              alt="preview"
            />
            <Image
              source={require("../../assets/sandwich.jpg")}
              style={styles.image}
              alt="preview"
            />
          </ScrollView>
        </View>
        <View mt={4} width={SIZE}>
          <HStack justifyContent={"space-between"}>
            <Text bold>New Recipes</Text>
            <Text onPress={() => navigation.navigate("MoreRecipe")}>
              More info
            </Text>
          </HStack>
          <HStack mt={4} justifyContent="space-between">
            <VStack>
              <Image
                source={require("../../assets/category.png")}
                size="md"
                alt="image"
              />
              <Text pl={6} fontWeight={"bold"}>
                Soup
              </Text>
            </VStack>
            <VStack>
              <Image
                source={require("../../assets/category_2.png")}
                size="md"
                alt="image"
              />
              <Text pl={4} fontWeight={"bold"}>
                Chicken
              </Text>
            </VStack>
            <VStack>
              <Image
                source={require("../../assets/category_3.png")}
                size="md"
                alt="image"
              />
              <Text pl={3} fontWeight={"bold"}>
                Seafood
              </Text>
            </VStack>
            <VStack>
              <Image
                source={require("../../assets/category_2.png")}
                size="md"
                alt="image"
              />
              <Text pl={4} fontWeight={"bold"}>
                Dessert
              </Text>
            </VStack>
          </HStack>
        </View>
        <View mt={4} width={SIZE}>
          <Text bold>Popular For you</Text>
          <ScrollView
            mt={4}
            maxHeight={145}
            horizontal
            width={SIZE}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.card} mr={5}>
              <Image
                style={styles.cardImage}
                source={require("../../assets/steak.jpg")}
                alt="image"
              />
              <View style={styles.textContainer}>
                <Text style={{ paddingLeft: 15, paddingTop: 5 }}>
                  Beef Steak
                </Text>
                <Text style={{ paddingLeft: 15 }} fontSize={9}>
                  Beef steak with nopales, tartare ....
                </Text>
              </View>
            </View>
            <View style={styles.card} mr={5}>
              <Image
                style={styles.cardImage}
                source={require("../../assets/spaghetti.jpg")}
                alt="image"
              />
              <View style={styles.textContainer}>
                <Text style={{ paddingLeft: 15, paddingTop: 5 }}>
                  Spaghetti
                </Text>
                <Text style={{ paddingLeft: 15 }} fontSize={9}>
                  Crbonara sauce with grilled ...
                </Text>
              </View>
            </View>
            <View style={styles.card} mr={10}>
              <Image
                style={styles.cardImage}
                source={require("../../assets/sandwich.jpg")}
                alt="image"
              />
              <View style={styles.textContainer}>
                <Text style={{ paddingLeft: 15, paddingTop: 5 }}>Sandwich</Text>
                <Text style={{ paddingLeft: 15 }} fontSize={9}>
                  Beef steak with nopales, tartare ....
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    aspectRatio: 1.5,
    borderRadius: 20,
    width: 260,
    height: 158,
    resizeMode: "cover",
    marginRight: 20,
  },
  card: {
    width: 200,
    height: 140,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
  },
  cardImage: {
    width: "100%",
    resizeMode: "cover",
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
