import { ActivityIndicator } from "react-native";
import Tabs from "./src/components/Tabs";
import Login from "./src/screens/login/Login";
import Cadastro from "./src/screens/login/Cadastro";
import Recuperar from "./src/screens/login/Recuperar";
import Treino from "./src/screens/Treino";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_APP, FIREBASE_AUTH } from "./firebaseConfig";
import Toast, { BaseToast, ErrorToast, InfoToast } from 'react-native-toast-message';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import { Linking, Platform } from "react-native";
import * as React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ 
        backgroundColor: "#151723",
        paddingHorizontal: 15, 
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
        color: "white"
      }}
    />
  ),
  info: (props) => (
    <InfoToast
    {...props}
    style={{ borderLeftColor: 'blue' }}
    contentContainerStyle={{ 
      backgroundColor: "#151723",
      paddingHorizontal: 15, 
      borderBottomRightRadius: 5,
      borderTopRightRadius: 5,
    }}
    text1Style={{
      fontSize: 15,
      fontWeight: '400',
      color: "white"
    }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: 'red' }}
      contentContainerStyle={{ 
        backgroundColor: "#151723",
        paddingHorizontal: 15, 
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
        color: "white"
      }}
    />
  ),
};

export default function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Verifica quando o usuário logou ou deslogou.
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (usr) => {
      // console.log(usr)
      // Muda o state pra direcionar o usuário pra página pra login ou se ele logou.
      if (usr) {
        setUser(usr);
      } else {
        setUser(null);
      }
      setInitializing(false);
    });
  }, [initializing]);

  if (initializing) return <ActivityIndicator size="large" color="#0000ff" />;
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            presentation: "transparentModal",
          }}
        >
          {user ? (
            <Stack.Screen name={"Tabs"} component={Tabs} />
          ) : (
            <>
              <Stack.Screen name={"Login"} component={Login} />
              <Stack.Screen name={"Cadastro"} component={Cadastro} />
              <Stack.Screen name={"Recuperar"} component={Recuperar} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast
        position="bottom"
        bottomOffset={60}
        keyboardOffset={10}
        config={toastConfig}
      />
    </>
  );
}

