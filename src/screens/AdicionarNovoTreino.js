import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Button,
} from "react-native";
import { useState } from "react";
import CheckBox from "react-native-check-box";
import { useFonts } from "expo-font";
import Hr from "../components/Hr";
import Toast from "react-native-toast-message";
import { FlatList } from "react-native";
import { FIREBASE_AUTH, db } from "../../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

const auth = FIREBASE_AUTH;

export default function AdicionarNovoTreino({ navigation, route }) {
  const [loaded] = useFonts({
    "shadows-into-light": require("../../assets/fonts/ShadowsIntoLight-Regular.ttf"),
    Urbanist: require("../../assets/fonts/Urbanist-VariableFont_wght.ttf"),
  });
  const [autoCreate, setAutoCreate] = useState(false);
  const [frequency, setFrequency] = useState("");

  const deficiencias = route.params.deficiencia;

  function gerarTreinoAutomatico(deficiencia, frequenciaSemanal) {
    const exerciciosPorDeficiencia = {
      "Amputação de Braço": [
        { id: "1", nome: "Remada curvada" },
        { id: "2", nome: "Remada serrote" },
        { id: "3", nome: "Barra fixa" },
        { id: "4", nome: "Puxada com faixa elástica" },
        { id: "5", nome: "Remada unilateral com halteres" },
        { id: "6", nome: "Remada com faixa elástica" },
        { id: "7", nome: "Puxada na barra assistida" },
        { id: "8", nome: "Supino reto com halteres" },
        { id: "9", nome: "Peck-deck" },
        { id: "10", nome: "Flexão de braços adaptada" },
        { id: "11", nome: "Supino inclinado com faixa elástica" },
        { id: "12", nome: "Crossover com faixa elástica" },
        { id: "13", nome: "Fly com halteres" },
        { id: "14", nome: "Supino declinado com halteres" },
        { id: "15", nome: "Flexão de braços de joelhos" },
        { id: "16", nome: "Push-up com apoio" },
        { id: "17", nome: "Desenvolvimento com halteres" },
        { id: "18", nome: "Elevação lateral" },
        { id: "19", nome: "Elevação frontal" },
        { id: "20", nome: "Remada alta com faixa elástica" },
        { id: "21", nome: "Fly invertido" },
        { id: "22", nome: "Encolhimento de ombros" },
        { id: "23", nome: "Desenvolvimento com faixa elástica" },
        { id: "24", nome: "Rotação externa com faixa elástica" },
        { id: "25", nome: "Rotação interna com faixa elástica" },
        { id: "26", nome: "Elevação lateral em pé" },
      ],
      "Amputação de Perna": [
        { id: "27", nome: "Remada curvada" },
        { id: "28", nome: "Push-up na parede" },
        { id: "29", nome: "Agachamento adaptado" },
        { id: "30", nome: "Leg press adaptado" },
        { id: "31", nome: "Levantamento terra romeno" },
        { id: "32", nome: "Extensão de pernas" },
        { id: "33", nome: "Flexão de pernas" },
        { id: "34", nome: "Abdução de quadril com faixa elástica" },
        { id: "35", nome: "Addução de quadril com faixa elástica" },
        { id: "36", nome: "Lunge assistido" },
        { id: "37", nome: "Elevação de panturrilha" },
        { id: "38", nome: "Agachamento com bola" },
      ],
      "Paralisia Cerebral": [
        { id: "39", nome: "Remada curvada" },
        { id: "40", nome: "Barra fixa" },
        { id: "41", nome: "Remada unilateral com halteres" },
        { id: "42", nome: "Puxada na barra assistida" },
        { id: "43", nome: "Peck-deck" },
        { id: "44", nome: "Fly com halteres" },
        { id: "45", nome: "Agachamento adaptado" },
        { id: "46", nome: "Agachamento com bola" },
        { id: "47", nome: "Fly invertido" },
        { id: "48", nome: "Elevação lateral em pé" },
      ],
      "Lesão Medular": [
        { id: "49", nome: "Remada curvada" },
        { id: "50", nome: "Superman" },
        { id: "51", nome: "Extensão de costas" },
        { id: "52", nome: "Remada unilateral com halteres" },
        { id: "53", nome: "Levantamento terra com halteres" },
        { id: "54", nome: "Supino reto com halteres" },
        { id: "55", nome: "Flexão de braços adaptada" },
        { id: "56", nome: "Supino declinado com halteres" },
        { id: "57", nome: "Leg press adaptado" },
        { id: "58", nome: "Extensão de pernas" },
        { id: "59", nome: "Abdução de quadril com faixa elástica" },
        { id: "60", nome: "Lunge assistido" },
        { id: "61", nome: "Desenvolvimento com halteres" },
        { id: "62", nome: "Remada alta com faixa elástica" },
        { id: "63", nome: "Desenvolvimento com faixa elástica" },
      ],
      "Dificuldades na Coordenação Motora": [
        { id: "64", nome: "Superman" },
        { id: "65", nome: "Extensão de costas" },
        { id: "66", nome: "Remada com faixa elástica" },
        { id: "67", nome: "Push-up na parede" },
        { id: "68", nome: "Flexão de braços de joelhos" },
        { id: "69", nome: "Encolhimento de ombros" },
        { id: "70", nome: "Flexão de pernas" },
        { id: "71", nome: "Addução de quadril com faixa elástica" },
        { id: "72", nome: "Rotação interna com faixa elástica" },
      ],
      "Distrofia Muscular": [
        { id: "73", nome: "Remada serrote" },
        { id: "74", nome: "Elevação lateral" },
      ],
      Artrite: [
        { id: "75", nome: "Remada serrote" },
        { id: "76", nome: "Remada com faixa elástica" },
        { id: "77", nome: "Levantamento terra com halteres" },
        { id: "78", nome: "Supino inclinado com faixa elástica" },
        { id: "79", nome: "Push-up com apoio" },
        { id: "80", nome: "Levantamento terra romeno" },
        { id: "81", nome: "Elevação frontal" },
        { id: "82", nome: "Elevação de panturrilha" },
      ],
      Cegueira: [
        { id: "83", nome: "Puxada com faixa elástica" },
        { id: "84", nome: "Crossover com faixa elástica" },
        { id: "85", nome: "Rotação externa com faixa elástica" },
      ],
      "Ausência de Mãos ou Dedos": [
        { id: "87", nome: "Agachamento com apoio" },
        { id: "88", nome: "Leg press adaptado" },
        { id: "89", nome: "Abdução de quadril com faixa elástica" },
        { id: "90", nome: "Extensão de pernas" },
        { id: "91", nome: "Elevação de panturrilha" },
      ],
      "Ausência de Pés ou Dedos dos Pés": [
        { id: "92", nome: "Remada curvada" },
        { id: "93", nome: "Puxada na barra assistida" },
        { id: "94", nome: "Supino reto com halteres" },
        { id: "95", nome: "Desenvolvimento com halteres" },
        { id: "96", nome: "Fly com halteres" },
      ],
      "Esclerose Múltipla": [
        { id: "97", nome: "Remada com faixa elástica" },
        { id: "98", nome: "Flexão de braços adaptada" },
        { id: "99", nome: "Desenvolvimento com faixa elástica" },
        { id: "100", nome: "Agachamento com bola" },
        { id: "101", nome: "Leg press adaptado" },
      ],
      "Baixa Visão": [
        { id: "102", nome: "Puxada com faixa elástica" },
        { id: "103", nome: "Fly com halteres" },
        { id: "104", nome: "Rotação externa com faixa elástica" },
        { id: "105", nome: "Push-up com apoio" },
        { id: "106", nome: "Desenvolvimento com halteres" },
      ],
      "Perda Auditiva Parcial": [
        { id: "107", nome: "Remada serrote" },
        { id: "108", nome: "Supino declinado com halteres" },
        { id: "109", nome: "Elevação lateral" },
        { id: "110", nome: "Fly invertido" },
        { id: "111", nome: "Crossover com faixa elástica" },
      ],
      "Transtorno do Espectro Autista (TEA)": [
        { id: "112", nome: "Remada curvada" },
        { id: "113", nome: "Agachamento com apoio" },
        { id: "114", nome: "Push-up na parede" },
        { id: "115", nome: "Desenvolvimento com faixa elástica" },
        { id: "116", nome: "Rotação interna com faixa elástica" },
      ],
      "Síndrome de Down": [
        { id: "117", nome: "Remada unilateral com halteres" },
        { id: "118", nome: "Flexão de braços de joelhos" },
        { id: "119", nome: "Leg press adaptado" },
        { id: "120", nome: "Elevação de panturrilha" },
        { id: "121", nome: "Agachamento com bola" },
      ],
      "Transtorno do Déficit de Atenção e Hiperatividade (TDAH)": [
        { id: "122", nome: "Push-up com apoio" },
        { id: "123", nome: "Supino reto com halteres" },
        { id: "124", nome: "Desenvolvimento com halteres" },
        { id: "125", nome: "Remada com faixa elástica" },
        { id: "126", nome: "Agachamento adaptado" },
      ],
      "Doenças Reumáticas": [
        { id: "127", nome: "Levantamento terra romeno" },
        { id: "128", nome: "Crossover com faixa elástica" },
        { id: "129", nome: "Rotação interna com faixa elástica" },
        { id: "130", nome: "Flexão de braços adaptada" },
        { id: "131", nome: "Abdução de quadril com faixa elástica" },
      ],
    };

    const todosExercicios = deficiencia.reduce((acc, deficiencia) => {
      if (exerciciosPorDeficiencia[deficiencia]) {
        acc.push(...exerciciosPorDeficiencia[deficiencia]);
      }
      return acc;
    }, []);

    if (todosExercicios.length === 0) {
      console.error(
        "Nenhum exercício encontrado para as deficiências fornecidas.",
      );
      return null;
    }

    // Gera o treino
    const treino = [];
    const diasDaSemana = [
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
      "Domingo",
    ];

    for (let i = 0; i < frequenciaSemanal; i++) {
      const dia = diasDaSemana[i];
      const exerciciosParaODia = [];

      // Seleciona 3 exercícios aleatórios para cada dia
      for (let j = 0; j < 3; j++) {
        const exercicioAleatorio =
          todosExercicios[Math.floor(Math.random() * todosExercicios.length)];
        exerciciosParaODia.push(exercicioAleatorio);
      }
      treino.push({ dia, exercicios: exerciciosParaODia });
    }
    return {
      workout_id: "1",
      user_id: "123",
      data_inicio: Date.now(),
      frequencia_semanal: frequenciaSemanal.toString(),
      exercicios: treino,
    };
  }

  async function handleAddWorkoutToDataBase() {
    const exercicios = gerarTreinoAutomatico(deficiencias, frequency);

    try {
      await setDoc(doc(db, "workouts", auth.currentUser.email), {
        workout_id: "1",
        user_id: "123",
        data_inicio: exercicios.data_inicio,
        frequencia_semanal: exercicios.frequencia_semanal,
        exercicios: exercicios.exercicios,
      });

      Toast.show({
        type: "success",
        text1: "Rotina criada com sucesso!",
      });
      navigation.goBack();
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
        {deficiencias.map((deficiencia, index) => (
          <Text key={index} style={styles.deficienciaText}>
            {deficiencia}
          </Text>
        ))}
      </View>

      <View style={styles.checkboxWrapper}>
        <CheckBox
          isChecked={true}
          onClick={() => setAutoCreate(!autoCreate)}
          checkBoxColor="white"
        />
        <Text style={styles.checkboxText}>Criação automática</Text>
      </View>

      <Text style={styles.frequencyLabel}>Frequência semanal do treino:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 1-7 vezes por semana"
        placeholderTextColor="#a0a3bd"
        value={frequency}
        onChangeText={setFrequency}
        keyboardType="numeric"
      />
      <Button
        title="Gerar"
        onPress={() => {
          if (!frequency)
            return Toast.show({
              type: "info",
              text1: "Selecione a frequência!",
            });

          if (frequency < 1 || frequency > 7)
            return Toast.show({
              type: "info",
              text1: "Frequência fora do limite permitido",
            });

          handleAddWorkoutToDataBase();
        }}
      />
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
});
