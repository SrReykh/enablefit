import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { React, useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import {
  updateEmail,
  sendEmailVerification,
  onAuthStateChanged,
  updatePassword,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthCredential,
  EmailAuthProvider,
  updateProfile,
} from "firebase/auth";
import { handleFirebaseAuthError } from "../assets/handleFirebaseAuthError";
import {
  ref,
  getStorage,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
  listAll,
} from "firebase/storage";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Hr from "../components/Hr";

const Conta = () => {
  const [imageFile, setImageFile] = useState(null);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [modalLogOffVisible, setModalLogOffVisible] = useState(false);
  const [verified, setVerified] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [timerDelete, setTimerDelete] = useState(false);
  const [passwordInput, setPasswordInput] = useState(false);
  const [passwordText, setPasswordText] = useState("");
  const [confirmPasswordText, setConfirmPasswordText] = useState("");
  const [emailInput, setEmailInput] = useState(false);
  const [emailPasswordRequest, setEmailPasswordRequest] = useState("");
  const [isToggleVerificar, setIsToggleVerificar] = useState(true);
  const [loaded] = useFonts({
    ShadowsIntoLight: require("../../assets/fonts/ShadowsIntoLight-Regular.ttf"),
    Urbanist: require("../../assets/fonts/Urbanist-VariableFont_wght.ttf"),
  });
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        checkEmail();
        const interval = setInterval(() => {
          checkEmail();
        }, 15000);
      }
      return () => clearInterval(interval);
    });
  }, []);

  useEffect(() => {
    const timerBtn = setTimeout(() => {
      setTimerDelete(true);
    }, 5000);
    return () => clearTimeout(timerBtn);
  }, [timerDelete]);

  useEffect(() => {
    const time_out = setTimeout(() => {
      setIsToggleVerificar(!isToggleVerificar);
    }, 15000);

    return () => clearTimeout(time_out);
  }, [isToggleVerificar]);

  async function checkEmail() {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      setVerified(auth.currentUser.emailVerified);
    }
  }

  async function mudarEmail() {
    if (emailText == "" || emailPasswordRequest == "")
      return Toast.show({
        type: "info",
        text1: "Preencha os campos!",
      });
    if (auth.currentUser.emailVerified == false) return verificarEmail();
    if (emailText == auth.currentUser.email)
      return Toast.show({
        type: "error",
        text1: "Você já está usando esse e-mail!",
      });

    try {
      const authSucess = await reAuth();
      if (!authSucess) return;

      await auth.currentUser.reload();
      await updateEmail(auth.currentUser, emailText);
      Toast.show({
        type: "success",
        text1:
          "E-mail trocado, confira sua caixa de e-mail para verificar seu novo e-mail",
      });
      setEmailInput(false);
      setEmailPasswordRequest("");
      setEmailText("");
    } catch (e) {
      Toast.show({
        type: "error",
        text1: handleFirebaseAuthError(e),
      });
    }
  }

  async function verificarEmail() {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Verifique sua caixa de e-mail",
        });
      })
      .catch((e) => {
        Toast.show({
          type: "error",
          text1: handleFirebaseAuthError(e),
        });
      });
  }

  async function mudarSenha() {
    if (passwordText == "" || confirmPasswordText == "")
      return Toast.show({
        type: "info",
        text1: "Preencha os campos!",
      });
    if (passwordText != confirmPasswordText)
      return Toast.show({
        type: "info",
        text1: "Senhas não se coincidem!",
      });

    try {
      const authSucess = await reAuth();
      if (!authSucess) return;

      // Atualiza a senha do usuário
      await updatePassword(auth.currentUser, passwordText);
      Toast.show({
        type: "success",
        text1: "Senha trocada com sucesso!",
      });
      setPasswordInput(false);
      setPasswordText("");
      setConfirmPasswordText("");
    } catch (e) {
      Toast.show({
        type: "error",
        text1: handleFirebaseAuthError(e),
      });
    }
  }

  async function deletarUser() {
    if (emailPasswordRequest == "")
      return Toast.show({
        type: "info",
        text1: "Preencha os campos!",
      });

    try {
      const authSucess = await reAuth();
      if (!authSucess) return;

      // Verifica se há alguma foto no Storage e quando o usuário for deletado, a foto é apagada
      const storage = getStorage();
      const imageRef = ref(storage, `profile_picture/${auth.currentUser.uid}`);
      if (auth.currentUser.photoURL) await deleteObject(imageRef);

      // Deleta o usuário
      await deleteUser(auth.currentUser);
      setModalDeleteVisible(!modalDeleteVisible);
      Toast.show({
        type: "success",
        text1: "Conta deletada com sucesso.",
      });
    } catch (e) {
      Toast.show({
        type: "error",
        text1: handleFirebaseAuthError(e),
      });
      console.log(e.message);
    }
  }

  async function reAuth() {
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        emailPasswordRequest,
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: handleFirebaseAuthError(e),
      });
      return false;
    }
    return true;
  }

  async function askForPicture() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled) return result;
    } catch (e) {
      Toast.show({
        type: "error",
        text1: e,
      });
      console.error(e);
    }
  }

  async function changeProfilePicture() {
    try {
      const result = await askForPicture();
      const storage = getStorage();
      if (!result) return;
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      const storageRef = ref(
        storage,
        `profile_picture/${auth.currentUser.uid}`,
      );
      const metadata = {
        customMetadata: {
          userId: auth.currentUser.uid,
        },
      };

      const uploadTask = await uploadBytesResumable(storageRef, blob, metadata);
      const downloadUrl = await getDownloadURL(storageRef);
      await updateProfile(auth.currentUser, {
        photoURL: downloadUrl,
      });

      Toast.show({
        type: "success",
        text1: "Foto de perfil adicionada com sucesso!",
      });
    } catch (e) {
      Toast.show({
        type: "error",
        text1: e.message,
      });
    }
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
    <ScrollView style={styles.containerView}>
      <View style={styles.viewMyProfile}>
        <View style={styles.headerStyle}>
          <Text style={styles.headerProfileText}>Meu perfil</Text>
        </View>
        <TouchableOpacity onPress={() => changeProfilePicture()}>
          <Image
            style={styles.userImage}
            source={
              auth.currentUser.photoURL
                ? { uri: auth.currentUser.photoURL }
                : require("../../assets/user.png")
            }
          />
        </TouchableOpacity>
        <Text style={styles.tipText}>* clique na foto acima pra mudar de foto de perfil</Text>
        <Hr />
        <View style={styles.updateEmail}>
          <Text style={styles.emailHeader}>E-mail</Text>
          <Hr />
          <View style={{ flexDirection: "column-reverse", gap: 5 }}>
            <Text style={styles.currentUserText}>{auth.currentUser.email}</Text>
          </View>
          {verified ? (
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              <TouchableOpacity
                style={styles.buttonChange}
                onPress={() => {
                  if (!emailInput) return setEmailInput(auth.currentUser);
                  setEmailInput(false);
                }}
              >
                <Text style={styles.buttonChangeText}>Mudar e-mail</Text>
              </TouchableOpacity>
              <MaterialIcons name="verified" size={24} color="white" />
            </View>
          ) : (
            <View style={styles.viewVerificar}>
              <Text style={styles.verificarText}>Email não verificado</Text>
              <Button
                title={"Verificar e-mail"}
                onPress={() => {
                  verificarEmail();
                  setIsToggleVerificar(!isToggleVerificar);
                }}
                color="blue"
                disabled={!isToggleVerificar}
              />
            </View>
          )}
        </View>
        {emailInput ? (
          <View style={styles.viewSalvar}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setEmailPasswordRequest(text)}
              placeholder="Senha atual"
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => setEmailText(text)}
              placeholder="Novo e-mail"
            />
            <Button
              title={"Salvar"}
              onPress={() => mudarEmail()}
              color="blue"
            />
          </View>
        ) : null}

        <View style={styles.updatePassword}>
          <Text style={styles.passwordHeader}>Senha</Text>
          <Hr />
          <TouchableOpacity
            style={styles.buttonChange}
            onPress={() => {
              if (!passwordInput) return setPasswordInput(true);
              setPasswordInput(false);
            }}
          >
            <Text style={styles.buttonChangeText}>Mudar senha</Text>
          </TouchableOpacity>
          {passwordInput ? (
            <View style={styles.viewSalvarPassword}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  setEmailPasswordRequest(text);
                }}
                secureTextEntry={true}
                placeholder="Senha atual"
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  setPasswordText(text);
                }}
                secureTextEntry={true}
                placeholder="Nova senha"
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  setConfirmPasswordText(text);
                }}
                secureTextEntry={true}
                placeholder="Confirmar nova senha"
              />
              <Button
                title={"Salvar"}
                onPress={() => {
                  mudarSenha();
                }}
                color="blue"
              />
            </View>
          ) : null}
        </View>
        <View style={styles.accountView}>
          <Text style={styles.aboutAccountHeader}>Sobre a conta</Text>
          <Hr />
          <View style={styles.accountButtons}>
            <TouchableOpacity
              style={styles.buttonDeslogar}
              onPress={() => {
                setModalLogOffVisible(true);
              }}
            >
              <Text style={styles.buttonDeslogarText}>Deslogar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonDeletar}
              onPress={() => {
                setModalDeleteVisible(!modalDeleteVisible);
                setTimerDelete(false);
              }}
            >
              <Text style={styles.buttonDeletarText}>Deletar a conta</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalLogOffVisible}
              onRequestClose={() => setModalLogOffVisible(!modalLogOffVisible)}
            >
              <View style={styles.modalLogOffView}>
                <View style={styles.modalLogOffContainer}>
                  <Text style={styles.modalLogOffText}>
                    Tem certeza que deseja sair?
                  </Text>
                  <Button
                    title={"Sair"}
                    onPress={async () => {
                      setModalLogOffVisible(!modalLogOffVisible);
                      auth
                        .signOut()
                        .then(() => {
                          Toast.show({
                            type: "success",
                            text1: "Deslogado com sucesso",
                          });
                        })
                        .catch((e) => {
                          Toast.show({
                            type: "error",
                            text1: "Ocorreu um erro!",
                          });
                        });
                    }}
                    color="blue"
                  />
                  <Button
                    title={"Não"}
                    onPress={() => {
                      setModalLogOffVisible(!modalLogOffVisible);
                    }}
                    color="blue"
                  />
                </View>
              </View>
            </Modal>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalDeleteVisible}
              onRequestClose={() => setModalDeleteVisible(!modalDeleteVisible)}
            >
              <View style={styles.modalLogOffView}>
                <View style={styles.modalLogOffContainer}>
                  <Text style={styles.modalLogOffText}>
                    VOCÊ QUER APAGAR SUA CONTA?
                    <Text style={{ fontWeight: "bold", color: "red" }}>
                      ESSA AÇÃO É IRREVERSÍVEL!
                    </Text>
                  </Text>
                  <TextInput
                    style={styles.confirmDeleteBtn}
                    onChangeText={(text) => {
                      setEmailPasswordRequest(text);
                    }}
                    secureTextEntry={true}
                    placeholder="Senha atual"
                  />
                  <Button
                    title={timerDelete ? "DELETAR" : "DELETAR (aguarde 5 seg.)"}
                    onPress={() => {
                      deletarUser();
                    }}
                    color="red"
                    disabled={!timerDelete}
                  />
                  <Button
                    title={"Não"}
                    onPress={() => {
                      setModalDeleteVisible(!modalDeleteVisible);
                      setTimerDelete(false);
                    }}
                    color="blue"
                  />
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#292c41",
  },
  btnLogOff: {
    width: 40,
    height: 20,
  },
  viewMyProfile: {
    margin: 15,
    gap: 15,
  },
  headerProfileText: {
    fontSize: 40,
    color: "white",
    fontFamily: "Urbanist",
  },
  emailHeader: {
    fontSize: 25,
    color: "white",
    fontFamily: "Urbanist",
  },
  currentUserText: {
    color: "white",
    fontSize: 18,
  },
  updateEmail: {
    marginTop: 10,
    flexDirection: "column",
    gap: 8,
    justifyContent: "flex-start",
    alignItems: "start",
  },
  input: {
    width: 250,
    height: 35,
    backgroundColor: "white",
    borderRadius: 5,
    color: "black",
    paddingLeft: 5,
  },
  confirmDeleteBtn: {
    width: 280,
    height: 35,
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    color: "black",
    paddingLeft: 5,
  },
  viewSalvar: {
    gap: 5,
  },
  viewSalvarPassword: {
    marginTop: 5,
    gap: 5,
  },
  viewVerificar: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  verificarText: {
    color: "red",
    fontFamily: "Urbanist",
    fontSize: 20,
  },
  buttonChange: {
    backgroundColor: "blue",
    paddingVertical: 5,
    marginTop: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 150,
    alignItems: "center",
  },
  buttonChangeText: {
    color: "white",
    fontSize: 16,
  },
  updatePassword: {
    marginTop: 10,
    flexDirection: "column",
    gap: 8,
    justifyContent: "flex-start",
    alignItems: "start",
  },
  passwordHeader: {
    fontSize: 25,
    color: "white",
    fontFamily: "Urbanist",
  },
  buttonDeslogar: {
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 150,
    alignItems: "center",
  },
  buttonDeslogarText: {
    color: "black",
    fontWeight: "500",
    fontSize: 16,
  },
  buttonDeletar: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 150,
    alignItems: "center",
  },
  buttonDeletarText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
  updateView: {
    marginTop: 10,
    flexDirection: "column",
    gap: 8,
    justifyContent: "flex-start",
    alignItems: "start",
  },
  accountView: {
    marginTop: 15,
  },
  aboutAccountHeader: {
    fontSize: 25,
    color: "white",
    fontFamily: "Urbanist",
  },
  accountButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },
  modalLogOffView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalLogOffText: {
    fontSize: 22,
    fontFamily: "Urbanist",
    color: "white",
  },
  modalLogOffContainer: {
    backgroundColor: "#282828",
    padding: 40,
    borderRadius: 15,
    gap: 10,
  },
  userImage: {
    width: 160,
    height: 160,
    borderRadius: 100,
  },
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tipText: {
    fontFamily: 'Urbanist',
    fontSize: 13,
    color: 'gray', 
  }
});

export default Conta;
