import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { useState } from "react"
import { useFonts } from "expo-font";
import { TextInput } from "react-native-gesture-handler";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Toast from "react-native-toast-message";
import { db, FIREBASE_AUTH } from "../../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import DropDownPicker from 'react-native-dropdown-picker';

const windowWidth = Dimensions.get("window").width;
const auth = FIREBASE_AUTH;

export default function WelcomeScreen( { route, navigation }) {
  const [peso, setPeso] = useState(Number);
  const [altura, setAltura] = useState(Number);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
      {label: 'Masculino', value: 'Masculino'},
      {label: 'Feminino', value: 'Feminino'},
  ]);
  const { name, date } = route.params;
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
  
  async function handleFinishSignUp() {
    if (!peso || !altura || !value)
      return Toast.show({
        type: "info",
        text1: "Preencha todos os campos!"
      });
    
    console.log(peso);
    console.log(altura);
    console.log(value);
    
    try {
      await setDoc(doc(db, "users", auth.currentUser.email), {
        name: name,
        data_nasc: date,
        peso: peso,
        sexo: value,
        altura: altura,
        data_cadastro: auth.currentUser.metadata.creationTime
      });
      
      Toast.show({
        type: "success",
        text1: "Cadastro completo! Enable Fit agradece."
      });
      navigation.navigate('TreinoScreen')
    } catch(e) {
      Toast.show({
        type: "error",
        text1: e.message
      });
    }
    
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.WelcomeView}>
        <Text style={styles.WelcomeText}>Quase lá.</Text>
        <Text style={styles.CompleteYourAccountText}>Por último, algumas ultimas informações</Text>
      </View>
      <View style={styles.InputView}>
          <Text style={styles.pesoText}>Peso</Text>
          <TextInput
            style={styles.input}
            placeholder={"Insira seu peso atual"}
            placeholderTextColor={"white"}
            onChangeText={text => setPeso(text)}
            keyboardType="numeric"
          />
          <Text style={styles.pesoText}>Altura</Text>
          <TextInput
            style={styles.input}
            placeholder={"Insira sua altura atual"}
            placeholderTextColor={"white"}
            onChangeText={text => setAltura(text)}
            keyboardType="numeric"
          />
          <View style={styles.dropdownView}>
            <Text style={styles.pesoText}>Sexo:</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              theme="DARK"
              style={{
                borderColor: "white",
                width: windowWidth - 120,
                marginTop: 10,
              }}
              textStyle={{
                fontSize: 16,
              }}
              dropDownContainerStyle={{
                width: windowWidth - 120,
                marginTop: 10, 
              }}
            />
        </View>
      </View>
        <TouchableOpacity onPress={handleFinishSignUp}>
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
    padding: 10,
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
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 15
  },
  buttonDate: {
    width: 250,
    backgroundColor: 'white',
    color: 'black',
    padding: 5,
    borderRadius: 10
  },
  buttonDateText: {
    fontFamily: "Urbanist",
    textAlign: 'center',
    fontSize: 20,
  },
  input: {
    width: windowWidth - 120,
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 10,
    color: 'white',
    fontSize: 16,
  },
  pesoText: {
    color: 'white',
    fontSize: 25,
    fontFamily: "Urbanist"
  },
  dropdownView: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
