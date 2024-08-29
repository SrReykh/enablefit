import { View, Text, Button, StyleSheet, Pressable, Dimensions } from "react-native";
import { Video, ResizeMode } from "expo-av";
import * as React from "react";
import { useState } from "react";

const windowWidth = (Dimensions.get('window').width)
const windowHeight = (Dimensions.get('window').height)

const Modal = ({ navigation, route }) => {
  const video = React.useRef(null);
  return (
    <View style={styles.ViewStyle}>
      <Text style={styles.TitleStyle}>{route.params.title}</Text>
        <Video
          style={styles.video}
          ref={video}
          source={
            require("../../assets/videos/pullup.mp4")
          }
          isLooping
          isMuted={false}
          shouldPlay
          volume={0.3}
          
        />
        <Text style={styles.mainTextStyle}>
          {/* Colocar o mainText aqui.*/}"Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum."
        </Text>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.GoBackButton}>Voltar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  TitleStyle: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginTop: 5,
  },
  GoBackButton: {
    backgroundColor: "#282828",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    width: 400,
    fontSize: 20,
    borderRadius: 3,
    paddingVertical: 8,
  },
  mainTextStyle: {
    color: "white",
    fontSize: 20,
    paddingHorizontal: 10,
    textAlign: "justify",
  },
  ViewStyle: {
    flex: 1,
    alignItems: 'center'
  },
  videoView: {
    justifyContent: 'center',
  },
  video: {
    width: windowWidth,
    height: windowHeight * 0.3,
  },
});

export default Modal;
