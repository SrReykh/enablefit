import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import CheckBox from "react-native-check-box";
import { useFonts } from "expo-font";
import Hr from "../components/Hr";
import Toast from "react-native-toast-message";
import { FlatList } from "react-native";
import { FIREBASE_AUTH, db } from "../../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { exerciciosPorDeficiencia } from "../assets/exerciciosAdaptados";

const auth = FIREBASE_AUTH;

export default function AdicionarNovoTreino({ navigation, route }) {
  const [loaded] = useFonts({
    "shadows-into-light": require("../../assets/fonts/ShadowsIntoLight-Regular.ttf"),
    Urbanist: require("../../assets/fonts/Urbanist-VariableFont_wght.ttf"),
  });
  const [frequency, setFrequency] = useState("");

  const deficienciasTelaAnterior = route.params.deficiencia;

  function gerarTreinoAutomatico(deficiencia, frequenciaSemanal) {
    const exerciciosSelecionadosProUsuario = deficiencia
      .filter((def) => def in exerciciosPorDeficiencia)
      .map((def) => exerciciosPorDeficiencia[def]);

    // console.log(exerciciosSelecionadosProUsuario)

    if (frequenciaSemanal == 3) {
      const rotinaDeTreino = [
        {
          dia: "Segunda",
          exercicios: [
            {
              musculo: "Costas",
              exercicio: exerciciosSelecionadosProUsuario[0].Costas,
            },
            {
              musculo: "Biceps",
              exercicio: exerciciosSelecionadosProUsuario[0].Biceps,
            },
          ],
        },
        {
          dia: "Quarta",
          exercicios: [
            {
              musculo: "Peito",
              exercicio: exerciciosSelecionadosProUsuario[0].Peito,
            },
            {
              musculo: "Triceps",
              exercicio: exerciciosSelecionadosProUsuario[0].Triceps,
            },
          ],
        },
        {
          dia: "Sexta",
          exercicios: [
            {
              musculo: "Perna",
              exercicio: exerciciosSelecionadosProUsuario[0].Pernas,
            },
          ],
        },
      ];

      // console.log(rotinaDeTreino)
      return rotinaDeTreino;
    }

    if (frequenciaSemanal == 4) {
    }

    if (frequenciaSemanal == 5) {
    }
  }

  async function handleAddWorkoutToDataBase() {
    const rotinaDeTreino = gerarTreinoAutomatico(
      deficienciasTelaAnterior,
      frequency,
    );
    // return console.log(JSON.stringify(exercicios, null, 2));

    try {
      await setDoc(doc(db, "workouts", auth.currentUser.email), {
        workout_id: auth.currentUser.uid / 100,
        user_id: auth.currentUser.uid,
        data_inicio: Date.now(),
        frequencia_semanal: frequency.toString(),
        exercicios: rotinaDeTreino,
      });

      Toast.show({
        type: "success",
        text1: "Rotina criada com sucesso!",
      });
      navigation.navigate("BottomBar", {
        hiddenButton: true,
      });
    } catch (e) {
      console.log(e.message);
      return Toast.show({
        type: "error",
        text1: e.message,
      });
    }
  }

  if (!loaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adicione uma rotina nova.</Text>
      <Hr />
      <Text style={styles.textBelowHeader}>
        Certo, suas deficiências são essas que aparecem abaixo, se quiser criar
        uma rotina personalizada, deixe desmarcada a caixa de criação automática
        recomendada.
      </Text>
      <View>
        {deficienciasTelaAnterior.map((deficiencia, index) => (
          <Text key={index} style={styles.deficienciaText}>
            {deficiencia}
          </Text>
        ))}
      </View>

      <Text style={styles.frequencyLabel}>Frequência semanal do treino:</Text>
      <TextInput
        style={styles.input}
        placeholder="3-5 vezes por semana"
        placeholderTextColor="#a0a3bd"
        value={frequency}
        onChangeText={setFrequency}
        keyboardType="numeric"
      />
      <View style={{ gap: 10 }}>
        <TouchableOpacity
          style={styles.buttonGoBack}
          onPress={() => {
            if (!frequency)
              return Toast.show({
                type: "info",
                text1: "Selecione a frequência!",
              });

            if (frequency < 3 || frequency > 5)
              return Toast.show({
                type: "info",
                text1: "Frequência: 3-5 Por semana",
              });

            handleAddWorkoutToDataBase();
          }}
        >
          <Text style={styles.buttonGoBackText}>Gerar treino</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonGoBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.buttonGoBackText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#292c41",
  },
  loadingText: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#292c41",
  },
  header: {
    fontSize: 40,
    fontFamily: "Urbanist",
    textAlign: "center",
    color: "white",
    marginTop: 30,
    paddingBottom: 15,
  },
  textBelowHeader: {
    color: "white",
    fontSize: 23,
    textAlign: "center",
    marginTop: 10,
    fontFamily: "Urbanist",
    padding: 15,
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 15,
  },
  checkboxText: {
    color: "white",
    fontFamily: "Urbanist",
    fontSize: 20,
    marginLeft: 10,
  },
  frequencyLabel: {
    color: "white",
    fontSize: 20,
    fontFamily: "Urbanist",
    marginTop: 20,
    marginLeft: 15,
  },
  input: {
    backgroundColor: "#3e4157",
    borderRadius: 8,
    color: "white",
    fontFamily: "Urbanist",
    fontSize: 18,
    margin: 15,
    padding: 10,
  },
  deficienciaText: {
    color: "pink",
    marginLeft: 15,
    fontSize: 19,
    fontWeight: "bold",
  },
  buttonGoBack: {
    width: 200,
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    marginLeft: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonGoBackText: {
    fontFamily: "Urbanist",
    fontSize: 20,
  },
});
