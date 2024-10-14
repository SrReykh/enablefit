import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useState } from "react"
import { useFonts } from "expo-font";
import { TextInput } from "react-native-gesture-handler";
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Toast from "react-native-toast-message";
import { db, FIREBASE_AUTH } from "../../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

const windowWidth = Dimensions.get("window").width;
const auth = FIREBASE_AUTH;

export default function WelcomeScreen( { navigation }) {
  const [nameText, setNameText] = useState("")
  const [loaded] = useFonts({
    "shadows-into-light": require("../../assets/fonts/ShadowsIntoLight-Regular.ttf"),
    Urbanist: require("../../assets/fonts/Urbanist-VariableFont_wght.ttf"),
  });
  
  async function addNameAtDatabase() {
    if (nameText == "")
      return Toast.show({
        type: "info",
        text1: "Preencha os campos!"
      });
    navigation.navigate("WelcomeScreenDataNasc", {
      name: nameText
    })
  }
  
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
    <View style={styles.container}>
      <View style={styles.WelcomeView}>
        <Text style={styles.WelcomeText}>Olá, Bem-vindo ao <Text style={styles.logo}>Enable Fit!</Text></Text>
        <Text style={styles.CompleteYourAccountText}>Por favor, complete seu cadastro.</Text>
      </View>
      <View style={styles.InputView}>
        <View style={styles.InputText}>
          <Text style={styles.YourNameText}>Qual seu primeiro nome?</Text>
          <SimpleLineIcons name="people" size={24} color="white" />
        </View>
        <TextInput 
          style={styles.input} 
          placeholder={"Insira seu nome"}
          placeholderTextColor={"white"}
          onChangeText={(text) => setNameText(text)}
          />
      </View>
        <TouchableOpacity
          onPress={() => addNameAtDatabase()}
        >
          <FontAwesome5 name="arrow-circle-right" size={50} color="white" />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292c41",
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  WelcomeText: {
    fontFamily: 'Urbanist',
    color: 'white',
    fontSize: 40
  },
  CompleteYourAccountText: {
    fontFamily: 'Urbanist',
    color: 'white',
    fontSize: 22
  },
  InputView: {
    alignItems: 'flex-start',
    gap: 10
  },
  InputText: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center'
  },
  YourNameText: {
    fontFamily: 'Urbanist',
    color: 'white',
    fontSize: 25,
  },
  input: {
    width: windowWidth - 60,
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 15,
    color: 'white',
    fontSize: 17,
  },
  logo: {
    fontFamily: "shadows-into-light",
    fontSize: 45,
    color: "cyan",
  },
  buttonNext: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
