import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeatherIcon from "react-native-vector-icons/Feather";

import HomeScreen from "./home/MainHome";
import CreateScreen from "./create/index";
import ProfileScreen from "./profile/MainProfile";

const Tab = createBottomTabNavigator();
export default function MainContainer() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <FeatherIcon name="home" size={25} color={color} />
          ),
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: "#EEC302",
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ color }) => (
            <FeatherIcon name="plus-square" size={25} color={color} />
          ),
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: "#EEC302",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <FeatherIcon name="user" size={25} color={color} />
          ),
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: "#EEC302",
        }}
      />
    </Tab.Navigator>
  );
}
