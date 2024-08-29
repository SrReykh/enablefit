import { View, Text, SectionList, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Modal from "../components/Modal";

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
        <Text style={styles.header}>{title}</Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  SectionList: {
    backgroundColor: "#292c41",
  },
  header: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    paddingLeft: 15,
    marginTop: 10,
    borderBottomWidth: 5,
    borderBottomColor: "white",
  },
  exerciseView: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 4,
  },
});

export default ExerciciosNavigator;
