import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Modal,
  SectionList,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import { React, useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import Toast from "react-native-toast-message";
import Hr from "../components/Hr";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  deleteDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./WelcomeScreen";
import WelcomeScreenDataNasc from "./WelcomeScreenDataNasc";
import WelcomeScreenLastInfo from "./WelcomeScreenLastInfo";
import { DATA } from "../assets/DATA";

const auth = FIREBASE_AUTH;

DropDownPicker.addTranslation("BR", {
  PLACEHOLDER: "Selecione suas deficiências",
  SEARCH_PLACEHOLDER: "Digite algo",
  SELECTED_ITEMS_COUNT_TEXT: "{count} deficiência(s) selecionadas",
  NOTHING_TO_SHOW: "Nada a mostrar",
});
DropDownPicker.setLanguage("BR");

const windowWidth = Dimensions.get("window").width;

export default Treino = ({ navigation, route }) => {
  const [modalStatusVisible, setModalStatusVisible] = useState(false);
  const [pesoAdicionado, setPesoAdicionado] = useState(null);
  const [metaAdicionada, setMetaAdicionada] = useState(null);
  const [peso, setPeso] = useState(null);
  const [meta, setMeta] = useState(null);
  const [tachados, setTachados] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [executarAoVoltar, setExecutarAoVoltar] = useState(false);
  const isFocused = useIsFocused();
  const [hiddenWorkoutButton, setHiddenWorkoutButton] = useState(false);
  const [treinoData, setTreinoData] = useState([]);
  const [modalAddDefVisible, setModalAddDefVisible] = useState(false);
  const [defs, setDefs] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  // Deficiências disponíveis
  const [items, setItems] = useState([
    { label: "Amputação de Braço", value: "Amputação de Braço" },
    { label: "Amputação de Perna", value: "Amputação de Perna" },
    { label: "Ausência de Mãos ou Dedos", value: "Ausência de Mãos ou Dedos" },
    {
      label: "Ausência de Pés ou Dedos dos Pés",
      value: "Ausência de Pés ou Dedos dos Pés",
    },
    { label: "Paralisia Cerebral", value: "Paralisia Cerebral" },
    { label: "Lesão Medular", value: "Lesão Medular" },
    { label: "Distrofia Muscular", value: "Distrofia Muscular" },
    { label: "Esclerose Múltipla", value: "Esclerose Múltipla" },
    { label: "Doenças Reumáticas", value: "Doenças Reumáticas" },
  ]);

  // frequência da série.
  const frequencia_serie = "3x12";

  async function updateWorkout() {
    const docRef = doc(db, "workouts", auth.currentUser.email);

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const workoutData = docSnap.data();
        const treino = workoutData.exercicios.map((dia) => ({
          title: dia.dia,
          data: dia.exercicios.map((exercicio) => ({
            nome: exercicio.musculo,
            exercicios: exercicio.exercicio,
          })),
        }));
        setTreinoData(treino);
        console.log(JSON.stringify(treinoData, null, 2));
      } else {
        return [];
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1: e.message,
      });
      return [];
    }
  }

  async function setDeficiencia(value) {
    const actualDefs = await getDeficiencia();
    if (value == null)
      return Toast.show({
        type: "info",
        text1: "Selecione alguma deficiência!",
      });
    if (actualDefs.includes(value))
      return Toast.show({
        type: "info",
        text1: "Deficiência já adicionada!",
      });

    try {
      await updateDoc(doc(db, "users", auth.currentUser.email), {
        deficiencia: arrayUnion(value),
      });
      Toast.show({
        type: "success",
        text1: "Deficiência adicionada com sucesso!",
      });
      getDeficiencia();
    } catch (e) {
      if (e.code == "not-found") {
        await setDoc(doc(db), "users", auth.currentUser.email),
          {
            deficiencia: [value],
          };
      }
      Toast.show({
        type: "error",
        text1: e.message,
      });
    }
  }

  async function getDeficiencia() {
    try {
      const docRef = doc(db, "users", auth.currentUser.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const deficiencia = docSnap.data().deficiencia || [];
        setDefs(deficiencia);
        return deficiencia;
      }
    } catch (e) {
      Toast.show({
        type: "error",
        text1: e.message,
      });
    }
  }

  async function deletarDef(def) {
    let deficiencia = def.item;
    try {
      await updateDoc(doc(db, "users", auth.currentUser.email), {
        deficiencia: arrayRemove(deficiencia),
      });
      Toast.show({
        type: "success",
        text1: `${deficiencia} deletado(a) com sucesso`,
      });
      getDeficiencia();
    } catch (e) {
      Toast.show({
        type: "error",
        text1: e.message,
      });
    }
  }

  function toggleTachado(sectionIndex, exerciseGroupIndex, exerciseIndex) {
    setTachados((prevState) => {
      const newState = [...prevState];

      if (!newState[sectionIndex]) newState[sectionIndex] = [];
      if (!newState[sectionIndex][exerciseGroupIndex])
        newState[sectionIndex][exerciseGroupIndex] = [];

      const isTacheado =
        newState[sectionIndex][exerciseGroupIndex].includes(exerciseIndex);

      if (isTacheado) {
        newState[sectionIndex][exerciseGroupIndex] = newState[sectionIndex][
          exerciseGroupIndex
        ].filter((idx) => idx !== exerciseIndex);
      } else {
        newState[sectionIndex][exerciseGroupIndex].push(exerciseIndex);
      }

      return newState;
    });
  }

  function encontrarExercicio(nomeExercicio) {
    for (const categoria of DATA) {
      const exercicio = categoria.data.find((ex) => ex.nome === nomeExercicio);
      if (exercicio) {
        return exercicio;
      }
    }
    return null;
  }

  async function handleStatusAddButton() {
    if (peso > 300 || peso < 30 || meta > 300 || meta < 30)
      return Toast.show({
        type: "info",
        text1: "Escolha um peso ou meta válidos!",
      });

    setPesoAdicionado(peso);
    setMetaAdicionada(meta);

    try {
      await setDoc(doc(db, "progress", auth.currentUser.email), {
        peso: peso,
        meta: meta,
      });
    } catch (e) {
      throw Toast.show({
        type: "error",
        text1: "Erro ao atualizar peso.",
      });
    }

    setModalStatusVisible(!modalStatusVisible);
    Toast.show({
      type: "success",
      text1: "Peso atualizado com sucesso!",
    });

    setPeso(null);
    setMeta(null);
  }

  useEffect(() => {
    getDeficiencia();
  }, []);

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    if (executarAoVoltar) {
      updateWorkout();
      setExecutarAoVoltar(false);
    } else {
      if (updated) return;
      updateWorkout();
      setUpdated(true);
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.viewMeuTreino}>
        <Text style={styles.headerMeuTreino}>Meu treino</Text>
        <Hr />
      </View>
      <View style={styles.minhaDeficienciaView}>
        <View style={styles.minhaDeficienciaHeader}>
          <Text style={styles.minhaDeficienciaText}>Minhas deficiências:</Text>
          <TouchableOpacity
            onPress={() => setModalAddDefVisible(!modalAddDefVisible)}
          >
            <Text style={styles.btnAddDef}>Adic. Deficiência</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flatListDef}>
          <FlatList
            data={defs}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text style={styles.flatListTextDef}>{item}</Text>
                <FontAwesome
                  name="remove"
                  size={25}
                  color="red"
                  onPress={() => deletarDef({ item })}
                />
              </View>
            )}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <Text style={styles.flatListTextDef}>
                    Lista de deficiências vazia
                  </Text>
                </View>
              );
            }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.buttonAddNewWorkout}
            onPress={() => {
              if (defs.length == 0)
                return Toast.show({
                  type: "info",
                  text1: "Você não tem nenhuma deficiência selecionada.",
                });

              setExecutarAoVoltar(true);
              navigation.navigate("AdicionarNovoTreino", {
                deficiencia: defs,
              });
            }}
          >
            <Text style={styles.buttonAddNewWorkoutText}>
              Nova rotina de treino
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonStatus}
            onPress={() => {
              setModalStatusVisible(!modalStatusVisible);
            }}
          >
            <Text style={styles.buttonStatusText}>Mudar status</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalStatusVisible}
      >
        <View style={styles.viewModalStatusContainer}>
          <View style={styles.modalStatus}>
            <Text style={styles.label}>Peso atual (kg):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Digite seu peso"
              value={peso}
              onChangeText={(text) => {
                setPeso(text);
              }}
            />
            <Text style={styles.label}>Meta de peso (kg):</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Digite sua meta"
              value={meta}
              onChangeText={(text) => {
                setMeta(text);
              }}
            />

            <TouchableOpacity
              style={styles.BtnAdd}
              onPress={() => {
                handleStatusAddButton();
              }}
            >
              <Text style={styles.btnAddText}>Adicionar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.BtnAdd}
              onPress={() => {
                setModalStatusVisible(!modalStatusVisible);
              }}
            >
              <Text style={styles.btnAddText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalAddDefVisible}
      >
        <View style={styles.containerModalAddDeficiencia}>
          <View style={styles.modalAddDeficiencia}>
            <Text style={styles.deficienciaText}>
              Selecione suas deficiências!
            </Text>
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
                width: windowWidth - 30,
                marginLeft: 15,
                marginTop: 10,
              }}
              textStyle={{
                fontSize: 16,
              }}
              dropDownContainerStyle={{
                width: windowWidth - 30,
                marginTop: 12,
                marginLeft: 15,
              }}
            />
            <View style={{ flexDirection: "row", gap: 5 }}>
              <TouchableOpacity
                style={styles.BtnAdd}
                onPress={() => {
                  setDeficiencia(value);
                  if (value != undefined)
                    setModalAddDefVisible(!modalAddDefVisible);
                }}
              >
                <Text style={styles.btnAddText}>Adicionar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.BtnAdd}
                onPress={() => {
                  setModalAddDefVisible(!modalAddDefVisible);
                }}
              >
                <Text style={styles.btnAddText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Text style={styles.headerRotinaText}>Rotina de treino</Text>
      <Hr />
      {/* Rotina de treino */}
      <View style={styles.sectionListRootView}>
        <SectionList
          contentContainerStyle={styles.sectionList}
          sections={treinoData}
          keyExtractor={(item, index) => `${item.nome}-${index}`}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.diaText}>{title}</Text>
          )}
          renderItem={({ item, index: groupIndex, section }) => {
            const sectionIndex = treinoData.findIndex(
              (s) => s.title === section.title,
            );
            return (
              <>
                <Text style={styles.subHeaderMuscles}>{item.nome}</Text>

                {item.exercicios.map((exercicio, exerciseIndex) => (
                  <View
                    style={[
                      styles.exercicioContainer,
                      tachados[sectionIndex]?.[groupIndex]?.includes(
                        exerciseIndex,
                      ) && { backgroundColor: "green" },
                    ]}
                    key={`${item.nome}-${exerciseIndex}`}
                  >
                    <Text
                      style={[
                        styles.exercicioText,
                        tachados[sectionIndex]?.[groupIndex]?.includes(
                          exerciseIndex,
                        ) && { textDecorationLine: "line-through" },
                      ]}
                    >
                      {exercicio} {frequencia_serie}
                    </Text>
                    <View style={styles.buttonsContainer}>
                      <TouchableOpacity
                        style={styles.buttonConcluido}
                        onPress={() =>
                          toggleTachado(sectionIndex, groupIndex, exerciseIndex)
                        }
                      >
                        <AntDesign
                          name="checkcircleo"
                          size={24}
                          color="white"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.buttonInfo}
                        onPress={() => {
                          const exercicio_selecionado = exercicio;
                          const res = encontrarExercicio(exercicio_selecionado);

                          navigation.navigate({
                            name: "MyModal",
                            params: {
                              title: res.nome,
                              mainText: res.mainText,
                              videoRef: res.videoRef,
                            },
                          });
                        }}
                      >
                        <AntDesign name="infocirlce" size={24} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </>
            );
          }}
          ListEmptyComponent={() => (
            <Text
              style={{
                color: "white",
                fontSize: 20,
                marginTop: 15,
                fontFamily: "Urbanist",
              }}
            >
              Não há rotina de treino. Crie uma!
            </Text>
          )}
        />
      </View>
      <View style={styles.StatusView}>
        <Text style={styles.headerRotinaText}>Seu status</Text>
        <Hr />

        <View>
          {pesoAdicionado ? (
            <Text style={styles.statusStyle}>
              Peso:{" "}
              <Text style={styles.statusStyleText}>{pesoAdicionado} kgs</Text>
            </Text>
          ) : (
            <Text style={styles.statusStyle}>
              Peso: <Text style={styles.statusStyleText}>Adicione um peso</Text>
            </Text>
          )}
        </View>
        <View>
          {metaAdicionada ? (
            <Text style={styles.statusStyle}>
              Peso:{" "}
              <Text style={styles.statusStyleText}>{metaAdicionada} kgs</Text>
            </Text>
          ) : (
            <Text style={styles.statusStyle}>
              Peso:{" "}
              <Text style={styles.statusStyleText}>Adicione uma meta</Text>
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#292c41",
  },
  viewMeuTreino: {
    marginTop: 15,
  },
  headerMeuTreino: {
    fontSize: 40,
    paddingBottom: 5,
    color: "white",
    fontFamily: "Urbanist",
    textAlign: "center",
  },
  deficienciaText: {
    color: "white",
    marginTop: 5,
    fontSize: 25,
    fontFamily: "Urbanist",
  },
  containerModalAddDeficiencia: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalAddDeficiencia: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#282828",
    padding: 30,
    borderRadius: 40,
  },
  BtnAdd: {
    backgroundColor: "blue",
    borderRadius: 5,
    width: 150,
    height: 30,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  btnAddText: {
    color: "white",
    fontSize: 17,
    fontFamily: "Urbanist",
  },
  minhaDeficienciaView: {
    gap: 5,
    marginLeft: 15,
    marginTop: 15,
  },
  minhaDeficienciaText: {
    color: "white",
    fontSize: 20,
    fontSize: 25,
    fontFamily: "Urbanist",
  },
  minhaDeficienciaHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  btnAddDef: {
    backgroundColor: "white",
    color: "black",
    fontFamily: "Urbanist",
    fontSize: 18,
    borderRadius: 5,
    padding: 3,
  },
  flatListDef: {
    height: 130,
    width: windowWidth - 30,
    backgroundColor: "#151723",
    paddingLeft: 15,
    borderRadius: 5,
  },
  flatListTextDef: {
    color: "white",
    fontFamily: "Urbanist",
    fontSize: 20,
    padding: 3,
  },
  headerRotina: {
    flex: 1,
    marginTop: 10,
  },
  headerRotinaText: {
    paddingBottom: 10,
    color: "white",
    fontFamily: "Urbanist",
    fontSize: 40,
    textAlign: "center",
  },
  buttonAddNewWorkout: {
    marginTop: 10,
    marginLeft: 15,
    width: 200,
    height: 40,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonAddNewWorkoutText: {
    color: "black",
    fontSize: 20,
    fontFamily: "Urbanist",
    textAlign: "center",
  },
  diaText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    backgroundColor: "#151723",
    padding: 10,
    borderRadius: 10,
  },
  exercicioContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "#3c3c3c",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: windowWidth - 60,
  },
  exercicioText: {
    color: "white",
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  buttonEdit: {
    backgroundColor: "orange",
    padding: 5,
    borderRadius: 5,
  },
  buttonRemove: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  buttonConcluido: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
  },
  buttonInfo: {
    backgroundColor: "orange",
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  sectionList: {
    width: windowWidth - 30,
    alignItems: "center",
    backgroundColor: "#151723",
    borderRadius: 5,
    paddingBottom: 40,
  },
  sectionListRootView: {
    flex: 1,
    backgroundColor: "#292c41",
    justifyContent: "center",
    alignItems: "center",
  },
  subHeaderMuscles: {
    fontFamily: "Urbanist",
    color: "white",
    fontSize: 20,
  },
  statusStyle: {
    color: "white",
    fontFamily: "Urbanist",
    fontSize: 25,
    paddingLeft: 15,
  },
  statusStyleText: {
    color: "white",
    fontFamily: "Urbanist",
    fontSize: 20,
    paddingLeft: 15,
  },
  buttonStatus: {
    marginTop: 10,
    marginLeft: 15,
    width: 130,
    height: 40,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonStatusText: {
    fontFamily: "Urbanist",
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
  viewModalStatusContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalStatus: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#282828",
    padding: 30,
    borderRadius: 40,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "Urbanist",
    color: "white",
  },
  input: {
    width: 200,
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#fff",
  },
});
