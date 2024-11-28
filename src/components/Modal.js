import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import * as React from "react";
import { useState } from "react";
import { videoMap } from "../assets/DATA";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Modal = ({ navigation, route }) => {
  const video = React.useRef(null);
  return (
    <View style={styles.ViewStyle}>
      <Text style={styles.TitleStyle}>{route.params.title}</Text>
      <Video
        style={styles.video}
        ref={video}
        source={videoMap[route.params.videoRef]}
        isLooping
        isMuted={false}
        shouldPlay
        volume={0.3}
      />
      <Text style={styles.mainTextStyle}>{route.params.mainText}</Text>
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
    padding: 10,
  },
  ViewStyle: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#292c41",
  },
  videoView: {
    justifyContent: "center",
  },
  video: {
    width: windowWidth,
    height: windowHeight * 0.3,
  },
});

export default Modal;
