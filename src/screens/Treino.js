import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
} from "react-native";
import { React, useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Toast from "react-native-root-toast";
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

const auth = FIREBASE_AUTH;

DropDownPicker.addTranslation("BR", {
  PLACEHOLDER: "Selecione suas deficiências",
  SEARCH_PLACEHOLDER: "Digite algo",
  SELECTED_ITEMS_COUNT_TEXT: "{count} deficiência(s) selecionadas",
  NOTHING_TO_SHOW: "Nada a mostrar",
});
DropDownPicker.setLanguage("BR");

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Treino = () => {
  const [modalAddDefVisible, setModalAddDefVisible] = useState(false);
  const [defs, setDefs] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
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
    { label: "Cegueira", value: "Cegueira" },
    { label: "Baixa Visão", value: "Baixa Visão" },
    { label: "Surdez", value: "Surdez" },
    { label: "Perda Auditiva Parcial", value: "Perda Auditiva Parcial" },
    {
      label: "Transtorno do Espectro Autista (TEA)",
      value: "Transtorno do Espectro Autista (TEA)",
    },
    { label: "Síndrome de Down", value: "Síndrome de Down" },
    {
      label: "Transtorno do Déficit de Atenção e Hiperatividade (TDAH)",
      value: "Transtorno do Déficit de Atenção e Hiperatividade (TDAH)",
    },
    {
      label: "Dificuldades na Coordenação Motora",
      value: "Dificuldades na Coordenação Motora",
    },
    { label: "Artrite", value: "Artrite" },
    { label: "Doenças Reumáticas", value: "Doenças Reumáticas" },
  ]);

  const userEmail = auth.currentUser.email;

  async function setDeficiencia(value) {
    const actualDefs = await getDeficiencia();
    if (value == null) return Toast.show("Selecione alguma deficiência!");
    if (actualDefs.includes(value))
      return Toast.show("Deficiência já adicionada!");

    try {
      await updateDoc(doc(db, "users", userEmail), {
        deficiencia: arrayUnion(value),
      });
      Toast.show("Deficiência adicionada com sucesso!");
      getDeficiencia();
    } catch (e) {
      if (e.code == "not-found") {
        await setDoc(doc(db), "users", userEmail),
          {
            deficiencia: [value],
          };
      }
      Toast.show(e.message);
    }
  }

  async function getDeficiencia() {
    try {
      const docRef = doc(db, "users", userEmail);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const deficiencia = docSnap.data().deficiencia;
        setDefs(deficiencia);
        return deficiencia;
      }
    } catch (e) {
      Toast.show(e.message);
    }
  }

  async function deletarDef(def) {
    let deficiencia = def.item;
    try {
      await updateDoc(doc(db, "users", userEmail), {
        deficiencia: arrayRemove(deficiencia),
      });
      Toast.show(`${deficiencia} deletado(a) com sucesso`);
      getDeficiencia();
    } catch (e) {
      Toast.show(e.message);
    }
  }

  useEffect(() => {
    getDeficiencia();
  }, []);

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
          />
        </View>
      </View>
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
    color: "black",
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
    backgroundColor: "white",
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
    backgroundColor: "#151722",
    paddingLeft: 15,
    borderRadius: 5,
  },
  flatListTextDef: {
    color: "white",
    fontFamily: "Urbanist",
    fontSize: 20,
    padding: 3,
  },
});

export default Treino;
