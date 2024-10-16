import { ActivityIndicator } from "react-native";
import BottomBar from "./src/components/BottomBar";
import Login from "./src/screens/login/Login";
import Cadastro from "./src/screens/login/Cadastro";
import Recuperar from "./src/screens/login/Recuperar";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import WelcomeScreenDataNasc from "./src/screens/WelcomeScreenDataNasc";
import WelcomeScreenLastInfo from "./src/screens/WelcomeScreenLastInfo";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig";
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
} from "react-native-toast-message";

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";

const Stack = createNativeStackNavigator();
const auth = FIREBASE_AUTH

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green" }}
      contentContainerStyle={{
        backgroundColor: "#151723",
        paddingHorizontal: 15,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
        color: "white",
      }}
    />
  ),
  info: (props) => (
    <InfoToast
      {...props}
      style={{ borderLeftColor: "blue" }}
      contentContainerStyle={{
        backgroundColor: "#151723",
        paddingHorizontal: 15,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
        color: "white",
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "red" }}
      contentContainerStyle={{
        backgroundColor: "#151723",
        paddingHorizontal: 15,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
        color: "white",
      }}
    />
  ),
};

export default function App({ navigation }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [isNewAccount, setIsNewAccount] = useState(false); // Estado para controlar se é uma nova conta

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (usr) => {
      if (usr) {
        const accountCreatedAt = Date.parse(usr.metadata.creationTime);
        const currentTime = Date.now();
        const uid = auth.currentUser.uid

        setUser(usr);
      } else {
        setUser(null);
      }
      setInitializing(false);
    });

    return () => unsubscribe(); 
  }, []);

  if (initializing) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            presentation: 'transparentModal',
          }}
        >
          {user ? (
              <>
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                <Stack.Screen name="WelcomeScreenDataNasc" component={WelcomeScreenDataNasc} />
                <Stack.Screen name="WelcomeScreenLastInfo" component={WelcomeScreenLastInfo} />
                <Stack.Screen name="BottomBar" component={BottomBar} />
              </>
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Cadastro" component={Cadastro} />
              <Stack.Screen name="Recuperar" component={Recuperar} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast position="bottom" bottomOffset={55} keyboardOffset={10} config={toastConfig} />
     </GestureHandlerRootView>
  );
}
