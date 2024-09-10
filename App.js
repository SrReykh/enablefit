import { ActivityIndicator } from "react-native";
import Tabs from "./src/components/Tabs";
import Login from "./src/screens/login/Login";
import Cadastro from "./src/screens/login/Cadastro";
import Recuperar from "./src/screens/login/Recuperar";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_APP, FIREBASE_AUTH } from "./firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (usr) => {
      if (usr) {
        setUser(usr);
        console.log(usr)
      }
      setInitializing(false);
    });
  }, [initializing]);

  if (initializing) return <ActivityIndicator size="large" color="#0000ff" />;
  return (
    <>
      <RootSiblingParent>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              presentation: "card",
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
      </RootSiblingParent>
    </>
  );
}
