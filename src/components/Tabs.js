import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Exercicios from '../screens/Exercicios'
import Conta from '../screens/Conta'
import Filtros from '../screens/Filtros'


const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
      <Tab.Navigator
        screenOptions={() => ({
          headerShown: false,
          tabBarStyle: styles.tabColor,
          tabBarLabelStyle: styles.labelStyle,
          tabBarActiveTintColor: "pink",
          tabBarInactiveTintColor: "white",
        })}
      >
        <Tab.Screen
          name="Exercícios"
          component={Exercicios}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons
                name="weight-lifter"
                size={22}
                color="white"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Filtros"
          component={Filtros}
          options={{
            tabBarIcon: () => <Feather name="filter" size={22} color="white" />,
          }}
        />
        <Tab.Screen
          name="Conta"
          component={Conta}
          options={{
            tabBarIcon: () => (
              <MaterialIcons name="manage-accounts" size={22} color="white" />
            ),
          }}
        />
      </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabColor: {
    backgroundColor: "#282828",
    paddingTop: 5,
  },
  labelStyle: {
    fontSize: 14,
    paddingBottom: 3,
  },
});

export default Tabs;
