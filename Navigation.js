import { Box, theme } from "native-base";
import React from "react";

import { Ionicons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//importing screens
import Container from "./src/screens/Container";
import Todo from "./src/screens/Todo";
import DetailTodo from "./src/screens/DetailTodo";
import AddTodo from "./src/screens/AddTodo";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function allTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Calculator"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Calculator") {
            iconName = focused
              ? "ios-calculator-sharp"
              : "ios-calculator-outline";
          } else if (route.name === "Todo") {
            iconName = focused
              ? "ios-add-circle-sharp"
              : "ios-add-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary["900"],
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Calculator" component={Container} />
      <Tab.Screen name="Todo" component={Todo} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={allTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="DetailTodo" component={DetailTodo} />
        <Stack.Screen name="AddTodo" component={AddTodo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
