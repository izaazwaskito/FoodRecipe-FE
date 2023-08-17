import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
import LoginScreen from "./login";
import RegisterScreen from "./register";
import HomeScreen from "../MainContainer";

export default function MainAuth() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerTransparent: true,
          title: "",
          headerTintColor: "black",
        }}
      />
    </Stack.Navigator>
  );
}
