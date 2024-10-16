import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useFonts } from "expo-font";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import Toast from "react-native-toast-message";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const windowWidth = Dimensions.get("window").width;
const auth = FIREBASE_AUTH;

export default function WelcomeScreen({ route, navigation }) {
  const [age, setAge] = useState(Number);
  const [date, setDate] = useState("");
  const [timePicker, setTimePicker] = useState(false);
  const [nameText, setNameText] = useState("");
  const [loaded] = useFonts({
    "shadows-into-light": require("../../assets/fonts/ShadowsIntoLight-Regular.ttf"),
    Urbanist: require("../../assets/fonts/Urbanist-VariableFont_wght.ttf"),
  });

  const { name } = route.params;

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

  function handleTimePickerChange(event, date) {
    if (event.type == "dismissed") return setTimePicker(false);

    if (event.type == "set" && date) {
      setTimePicker(false);
      const personDate = new Date(date);
      setDate(personDate.toLocaleDateString());

      const today = new Date();
      let age = today.getFullYear() - personDate.getFullYear();
      const monthDifference = today.getMonth() - personDate.getMonth();
      const dayDifference = today.getDate() - personDate.getDate();
      if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
      }
      setAge(age);
    }
  }

  function handleNextScreen() {
    if (!date)
      return Toast.show({
        type: "info",
        text1: "Insira a data!",
      });

    if (age < 12) {
      return Toast.show({
        type: "info",
        text1: "É necessário ter mais de 13 anos para criar uma conta.",
      });
    }

    navigation.navigate("WelcomeScreenLastInfo", {
      name: name,
      date: date,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.WelcomeView}>
        <Text style={styles.WelcomeText}>Certo {name},</Text>
        <Text style={styles.CompleteYourAccountText}>
          Agora por favor, me fale sua idade.
        </Text>
      </View>
      <View style={styles.InputView}>
        <View style={styles.InputText}>
          <Text style={styles.YourNameText}>Quando você nasceu?</Text>
          <Fontisto name="date" size={30} color="white" />
        </View>
        <TouchableOpacity
          style={styles.buttonDate}
          onPress={() => setTimePicker(true)}
        >
          <Text style={styles.buttonDateText}>Selecionar data</Text>
        </TouchableOpacity>
        {timePicker ? (
          <RNDateTimePicker
            mode="date"
            display="spinner"
            value={new Date()}
            minimumDate={new Date(1950, 0, 1)}
            onChange={handleTimePickerChange}
          />
        ) : null}
        <Text style={styles.selectedDate}>{date}</Text>
      </View>
      <TouchableOpacity onPress={handleNextScreen}>
        <FontAwesome5 name="arrow-circle-right" size={50} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292c41",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    padding: 10,
  },
  WelcomeText: {
    fontFamily: "Urbanist",
    color: "white",
    fontSize: 40,
  },
  CompleteYourAccountText: {
    fontFamily: "Urbanist",
    color: "white",
    fontSize: 22,
  },
  InputView: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  InputText: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  YourNameText: {
    fontFamily: "Urbanist",
    color: "white",
    fontSize: 25,
  },
  buttonDate: {
    width: 250,
    backgroundColor: "white",
    color: "black",
    padding: 5,
    borderRadius: 10,
  },
  buttonDateText: {
    fontFamily: "Urbanist",
    textAlign: "center",
    fontSize: 20,
  },
  selectedDate: {
    color: "white",
    fontSize: 30,
    fontFamily: "Urbanist",
  },
});
