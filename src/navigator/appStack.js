import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "../screens/home";
import CreateQR from "../screens/createQR";
import History from "../screens/history";
import Settings from "../screens/settings";
import DetailQR from "../screens/createQRDetail";
import GenerateQR from "../screens/createQRGenerated";
import { Text, TouchableOpacity, View } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="MainApp"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="MainApp" component={MainApp} />
      <Stack.Screen name="CreateQR" component={CreateQR} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="DetailQR"
        component={DetailQR}
        options={({ navigation, route }) => ({
          headerShown: true,
          headerTitle: "Text",
          headerRight: () =>
            route.params.data.length > 0 ? (
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.push("GenerateQR", { data: route.params.data })
                  }
                  style={{ marginHorizontal: 20 }}
                >
                  <Text>Create</Text>
                </TouchableOpacity>
              </View>
            ) : null,
        })}
      />
      <Stack.Screen
        name="GenerateQR"
        component={GenerateQR}
        options={{ unmountOnBlur: true }}
      />
    </Stack.Navigator>
  );
}

const MainApp = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: true,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Scan") {
          iconName = focused ? "scan" : "scan-outline";
        } else if (route.name === "Settings") {
          iconName = focused ? "settings" : "settings-outline";
        } else if (route.name === "History") {
          iconName = focused ? "podium" : "podium-outline";
        } else if (route.name === "Create-QR") {
          iconName = focused ? "qr-code" : "qr-code-outline";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#85B6FF",
      tabBarInactiveTintColor: "#555555",
    })}
  >
    <Tab.Screen
      name="Scan"
      component={Home}
      options={{
        headerShown: true,
        headerTitleAlign: "center",
        headerTitle: "Scan",
        unmountOnBlur: true,
      }}
    />
    <Tab.Screen
      name="Create-QR"
      component={CreateQR}
      options={{
        headerShown: true,
        headerTitle: "Create",
        unmountOnBlur: true,
      }}
    />
    <Tab.Screen name="History" component={History} />
    <Tab.Screen name="Settings" component={Settings} />
  </Tab.Navigator>
);
