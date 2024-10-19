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
      {
        nome: "Remada curvada",
        deficiencias: [
          "Amputação de Braço",
          "Amputação de Perna",
          "Paralisia Cerebral",
          "Lesão Medular",
        ],
      },
      {
        nome: "Remada serrote",
        deficiencias: ["Amputação de Braço", "Distrofia Muscular", "Artrite"],
      },
      {
        nome: "Barra fixa",
        deficiencias: ["Amputação de Braço", "Paralisia Cerebral"],
      },
      {
        nome: "Puxada com faixa elástica",
        deficiencias: ["Amputação de Braço", "Cegueira", "Surdez"],
      },
      {
        nome: "Superman",
        deficiencias: ["Lesão Medular", "Dificuldades na Coordenação Motora"],
      },
      {
        nome: "Extensão de costas",
        deficiencias: ["Lesão Medular", "Dificuldades na Coordenação Motora"],
      },
      {
        nome: "Remada unilateral com halteres",
        deficiencias: [
          "Amputação de Braço",
          "Paralisia Cerebral",
          "Lesão Medular",
        ],
      },
      {
        nome: "Remada com faixa elástica",
        deficiencias: [
          "Amputação de Braço",
          "Artrite",
          "Dificuldades na Coordenação Motora",
        ],
      },
      {
        nome: "Puxada na barra assistida",
        deficiencias: ["Amputação de Braço", "Paralisia Cerebral"],
      },
      {
        nome: "Levantamento terra com halteres",
        deficiencias: ["Lesão Medular", "Artrite"],
      },
    ],
  },
  {
    title: "Peito",
    data: [
      {
        nome: "Supino reto com halteres",
        deficiencias: ["Amputação de Braço", "Lesão Medular"],
      },
      {
        nome: "Peck-deck",
        deficiencias: ["Amputação de Braço", "Paralisia Cerebral"],
      },
      {
        nome: "Flexão de braços adaptada",
        deficiencias: ["Amputação de Braço", "Lesão Medular"],
      },
      {
        nome: "Supino inclinado com faixa elástica",
        deficiencias: ["Amputação de Braço", "Artrite"],
      },
      {
        nome: "Push-up na parede",
        deficiencias: [
          "Amputação de Perna",
          "Dificuldades na Coordenação Motora",
        ],
      },
      {
        nome: "Crossover com faixa elástica",
        deficiencias: ["Amputação de Braço", "Cegueira"],
      },
      {
        nome: "Fly com halteres",
        deficiencias: ["Amputação de Braço", "Paralisia Cerebral"],
      },
      {
        nome: "Supino declinado com halteres",
        deficiencias: ["Amputação de Braço", "Lesão Medular"],
      },
      {
        nome: "Flexão de braços de joelhos",
        deficiencias: [
          "Amputação de Braço",
          "Dificuldades na Coordenação Motora",
        ],
      },
      {
        nome: "Push-up com apoio",
        deficiencias: ["Amputação de Braço", "Artrite"],
      },
    ],
  },
  {
    title: "Pernas",
    data: [
      {
        nome: "Agachamento adaptado",
        deficiencias: ["Amputação de Perna", "Paralisia Cerebral"],
      },
      {
        nome: "Leg press adaptado",
        deficiencias: ["Amputação de Perna", "Lesão Medular"],
      },
      {
        nome: "Levantamento terra romeno",
        deficiencias: ["Amputação de Perna", "Artrite"],
      },
      {
        nome: "Extensão de pernas",
        deficiencias: ["Amputação de Perna", "Lesão Medular"],
      },
      {
        nome: "Flexão de pernas",
        deficiencias: [
          "Amputação de Perna",
          "Dificuldades na Coordenação Motora",
        ],
      },
      {
        nome: "Abdução de quadril com faixa elástica",
        deficiencias: ["Amputação de Perna", "Lesão Medular"],
      },
      {
        nome: "Addução de quadril com faixa elástica",
        deficiencias: [
          "Amputação de Perna",
          "Dificuldades na Coordenação Motora",
        ],
      },
      {
        nome: "Lunge assistido",
        deficiencias: ["Amputação de Perna", "Lesão Medular"],
      },
      {
        nome: "Elevação de panturrilha",
        deficiencias: ["Amputação de Perna", "Artrite"],
      },
      {
        nome: "Agachamento com bola",
        deficiencias: ["Amputação de Perna", "Paralisia Cerebral"],
      },
    ],
  },
  {
    title: "Ombros",
    data: [
      {
        nome: "Desenvolvimento com halteres",
        deficiencias: ["Amputação de Braço", "Lesão Medular"],
      },
      {
        nome: "Elevação lateral",
        deficiencias: ["Amputação de Braço", "Distrofia Muscular"],
      },
      {
        nome: "Elevação frontal",
        deficiencias: ["Amputação de Braço", "Artrite"],
      },
      {
        nome: "Remada alta com faixa elástica",
        deficiencias: ["Amputação de Braço", "Lesão Medular"],
      },
      {
        nome: "Fly invertido",
        deficiencias: ["Amputação de Braço", "Paralisia Cerebral"],
      },
      {
        nome: "Encolhimento de ombros",
        deficiencias: [
          "Amputação de Braço",
          "Dificuldades na Coordenação Motora",
        ],
      },
      {
        nome: "Desenvolvimento com faixa elástica",
        deficiencias: ["Amputação de Braço", "Lesão Medular"],
      },
      {
        nome: "Rotação externa com faixa elástica",
        deficiencias: ["Amputação de Braço", "Cegueira"],
      },
      {
        nome: "Rotação interna com faixa elástica",
        deficiencias: [
          "Amputação de Braço",
          "Dificuldades na Coordenação Motora",
        ],
      },
      {
        nome: "Elevação lateral em pé",
        deficiencias: ["Amputação de Braço", "Paralisia Cerebral"],
      },
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
            title={item.nome}
            onPress={() => {
              navigation.navigate({
                name: "MyModal",
                params: { title: item.nome },
              });
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
