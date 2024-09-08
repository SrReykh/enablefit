import { View, StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const Hr = () => {
  return (
    <View
      style={{
        borderBottomColor: "white",
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    />
  );
};

export default Hr;
