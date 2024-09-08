import {
  View,
  Text,
  SectionList,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Modal from "../components/Modal";
import { useFonts } from "expo-font";

const DATA = [
  {
    title: "Costas",
    data: [
      "Remada curvada",
      "Remada serrote",
      "Barra fixa",
      "Barra fixa",
      "Barra fixa",
      "Barra fixa",
      "Barra fixa",
      "Barra fixa",
      "Barra fixa",
      "Barra fixa",
      "Barra fixa",
    ],
  },
  {
    title: "Peito",
    data: [
      "Supino reto",
      "Peck-deck",
      "Supino inclinado com halteres",
      "Supino inclinado com halteres",
      "Supino inclinado com halteres",
      "Supino inclinado com halteres",
      "Supino inclinado com halteres",
      "Supino inclinado com halteres",
      "Supino inclinado com halteres",
      "Supino inclinado com halteres",
    ],
  },
  {
    title: "Pernas",
    data: [
      "Legpress",
      "Stiff",
      "Agachamento livre com barra",
      "Stiff",
      "Stiff",
      "Stiff",
      "Stiff",
      "Stiff",
      "Stiff",
      "Stiff",
      "Stiff",
      "Stiff",
    ],
  },
];

const Stack = createStackNavigator();

const ExerciciosNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={() => ({ headerShown: false })}>
        <Stack.Screen name="Exercicios" component={Exercicios} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerShown: false,
          presentation: "modal",
          cardStyle: { backgroundColor: "#292c41" },
        }}
      >
        <Stack.Screen name="MyModal" component={Modal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const Exercicios = ({ navigation }) => {
  const [loaded] = useFonts({
    "shadows-into-light": require("../../assets/fonts/ShadowsIntoLight-Regular.ttf"),
    Urbanist: require("../../assets/fonts/Urbanist-VariableFont_wght.ttf"),
  });

  if (!loaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#292c41",
        }}
      >
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <SectionList
      style={styles.SectionList}
      sections={DATA}
      renderItem={({ item }) => (
        <View style={styles.exerciseView}>
          <Button
            style={styles.buttonStyle}
            color="#282828"
            title={item}
            onPress={() => {
              navigation.navigate({ name: "MyModal", params: { title: item } });
            }}
          />
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={[styles.header]}>{title}</Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  SectionList: {
    backgroundColor: "#292c41",
  },
  header: {
    fontSize: 30,
    color: "white",
    paddingLeft: 15,
    paddingBottom: 5,
    marginTop: 10,
    fontFamily: "Urbanist",
  },
  exerciseView: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 4,
  },
});

export default ExerciciosNavigator;
