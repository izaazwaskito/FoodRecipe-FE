import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
import HomeScreen from "./index";
import RecipeScreen from "./MoreRecipe";
import DetailScreen from "./DetailPage";
import DetailVideoScreen from "./DetailVideo";
// import HomeScreen from "../MainContainer";

export default function MainHome() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={HomeScreen}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailPage"
          component={DetailScreen}
          options={{
            headerTransparent: true,
            title: "",
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="MoreRecipe"
          component={RecipeScreen}
          options={{
            headerTransparent: true,
            title: "Popular Menu",
            headerTitleAlign: "center",
            headerTitleStyle: { color: "#EEC302" },
          }}
        />
        <Stack.Screen
          name="DetailVideo"
          component={DetailVideoScreen}
          options={{
            headerTransparent: true,
            title: "Video Step",
            headerTitleAlign: "center",
            headerTitleStyle: { color: "#EEC302" },
          }}
        />
        {/* <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
