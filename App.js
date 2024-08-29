import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Tabs from "./src/components/Tabs";
import Exercicios from "./src/screens/Exercicios";
import Filtros from "./src/screens/Filtros";
import Conta from "./src/screens/Conta";
import Login from "./src/screens/login/Login";
import Cadastro from "./src/screens/login/Cadastro"
import Recuperar from "./src/screens/login/Recuperar"
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    })
  }, [])
  
  if (initializing) return <ActivityIndicator size="large" color="#0000ff" />;
  return (
    <>
    <RootSiblingParent>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,
          presentation: 'card'
        }}>
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
    </RootSiblingParent>    
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#292c41",
    justifyContent: "center",
  },
});
