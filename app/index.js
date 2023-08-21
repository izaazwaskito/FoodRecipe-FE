import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
import LoginScreen from "./auth/MainAuth";
import HomeScreen from "./MainContainer";
export default function Page() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginFirst"
          component={LoginScreen}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeScreenReal"
          component={HomeScreen}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
