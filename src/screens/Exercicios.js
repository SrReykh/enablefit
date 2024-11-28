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
import { DATA } from "../assets/DATA";

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
    <>
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
                  params: {
                    title: item.nome,
                    mainText: item.mainText,
                    videoRef: item.videoRef,
                  },
                });
              }}
            />
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={[styles.header]}>{title}</Text>
        )}
      />
      <Text style={styles.textCopyright}>
        Todos exercícios extraídos do physitrack.com
      </Text>
    </>
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
  textCopyright: {
    color: "gray",
    fontSize: 10,
    paddingLeft: 15,
    backgroundColor: "#292c41",
  },
});

export default Exercicios;
