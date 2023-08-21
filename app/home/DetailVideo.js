import { LogBox, StyleSheet, View, useWindowDimensions } from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { NativeBaseProvider, Container, Text, Center } from "native-base";
import { Link } from "expo-router";
import axios from "axios";

import YoutubeIframe from "react-native-youtube-iframe";
import { useRoute } from "@react-navigation/native";

const DetailVideo = ({ route }) => {
  const { width } = useWindowDimensions();
  const [data, setData] = useState();
  const SIZE = width * 0.94;
  const { id } = route.params;
  const [link, setLink] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      .get(`http://192.168.1.8:7474/recipes/${id}`)
      .then((response) => {
        setData(response.data.data[0].recipes_title);
        const videoLink = response.data.data[0].recipes_video;
        const videoSlice = videoLink.slice(17);
        console.log(videoLink);
        console.log(videoSlice);
        setLink(videoSlice);
      })
      .catch((error) => console.log(error));
  };

  return (
    <NativeBaseProvider>
      {/* <Text>id:{id}</Text> */}
      <Center flex={1} px={3}>
        <View style={{ margin: 5 }}>
          <YoutubeIframe
            height={300}
            width={400}
            videoId={link}
            webViewStyle={{ opacity: 0.99 }}
          />
        </View>
        <Text style={{ paddingTop: 20, fontSize: 30 }}>{data}</Text>
      </Center>
    </NativeBaseProvider>
  );
};

export default DetailVideo;

const styles = StyleSheet.create({});
