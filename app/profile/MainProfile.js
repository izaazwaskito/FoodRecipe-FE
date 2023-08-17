import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
import ProfileScreen from "./index";
import EditProfileScreen from "./EditProfile";
import MyRecipeScreen from "./MyRecipe";
import LikedRecipesScreen from "./LikedRecipe";
import SavedRecipeScreen from "./SavedRecipe";
import AuthScreen from "../auth/MainAuth";

export default function MainProfile() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerTransparent: true,
          title: "Edit Profile",
          headerTitleAlign: "center",
          headerTitleStyle: { color: "#EEC302" },
        }}
      />
      <Stack.Screen
        name="LikedRecipe"
        component={LikedRecipesScreen}
        options={{
          headerTransparent: true,
          title: "Liked Recipe",
          headerTitleAlign: "center",
          headerTitleStyle: { color: "#EEC302" },
        }}
      />
      <Stack.Screen
        name="SavedRecipe"
        component={SavedRecipeScreen}
        options={{
          headerTransparent: true,
          title: "Saved Recipe",
          headerTitleAlign: "center",
          headerTitleStyle: { color: "#EEC302" },
        }}
      />
      <Stack.Screen
        name="MyRecipe"
        component={MyRecipeScreen}
        options={{
          headerTransparent: true,
          title: "My Recipe",
          headerTitleAlign: "center",
          headerTitleStyle: { color: "#EEC302" },
        }}
      />
      <Stack.Screen
        name="Login"
        component={AuthScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
