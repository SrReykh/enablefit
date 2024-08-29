import { View, Text, StyleSheet, Dimensions, Pressable, TextInput, Button, Alert, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { FIREBASE_AUTH } from '../../../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import Toast from 'react-native-root-toast';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Recuperar = ({navigation}) => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('');
  const [loaded] = useFonts({
     'shadows-into-light': require('../../../assets/fonts/ShadowsIntoLight-Regular.ttf'),
     'Urbanist': require('../../../assets/fonts/Urbanist-VariableFont_wght.ttf'),
   });
  
  const auth = FIREBASE_AUTH;
 
   if (!loaded) {
     return (
       <View style ={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#292c41'}}>
        <ActivityIndicator size={'large'} />
       </View>
     )
   }
   
   async function sendRecoverEmail() {
     setLoading(true);
     if (email.length == '') return Toast.show("Preencha os campos!")
    
     try {  
       const response = await sendPasswordResetEmail(auth, email)
       Toast.show("Se o email existir, foi enviado uma redefinição de senha via email")
     } catch (e) {
       if (e.code == 'auth/invalid-email') return Toast.show('Email inválido')
       if (e.code == 'auth/user-not-found') return Toast.show('Email não cadastrado')
       if (e.code == 'auth/invalid-credential') return Toast.show('Credenciais inválidas')
       Toast.show('Deu algo errado!' + e)
     } finally {
       setLoading(false)
     }
   }
   
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#000000'></StatusBar>  
        <LinearGradient
          colors={['#292c41', '#505bda']}
          style={styles.titleWrapper}
          start={{  x: 0.5, y: 1 }}
          end={{x: 0.5, y: 0 }} 
        >   
          <View style={styles.logo}>
              <MaterialCommunityIcons name="weight-lifter" size={48} color="white" />
              <Text style={styles.title}>ENABLE FIT</Text>
          </View>
        </LinearGradient>
        <View style={styles.loginAreaWrapper}>
          <Text style={styles.titleLogin}>Recuperar senha</Text>
          <TextInput 
            style={styles.textInputLogin} 
            placeholder="E-mail"
            placeholderTextColor={'white'}
            selectionColor={'white'}
            autoComplete='email'
            onChangeText={email => setEmail(email)}
          />
          <Pressable 
            style={({ pressed }) => [
              styles.loginBtn, { opacity: pressed ? 0.5 : 1.0,}
            ]} 
            onPress={() => {sendRecoverEmail()}}>
              <Text style={styles.loginBtnText}>Mandar e-mail de recuperação</Text>
          </Pressable>
          <View style={styles.cadastrarView}>  
            <Text style={styles.cadastrarText}>Voltar</Text>
            <Button 
              title="Logar" 
              onPress={() => {
                navigation.navigate("Login")
              }} 
              color="blue"
            />
          </View>
        </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>by WhiteHat Boys</Text>
          </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292c41'
  },
  titleWrapper: {
    height: 150,
    justifyContent: 'flex-start',
    paddingTop: 30,
    alignItems: 'center',
    opacity: 0.9 
  },
  title: {
    fontSize: 40,
    color: 'white',
    fontFamily: 'shadows-into-light'
  },
  mainDesc: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    paddingTop: 15,
    fontFamily: 'Urbanist'
  },
  titleLogin: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    fontSize: 25,
    color: 'white',
    fontFamily: 'Urbanist'
  },
  loginAreaWrapper: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  loginBtn: {
    width: windowWidth - 40,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#0000cd',
  },
  loginBtnText: {
    fontSize: 20,   
    color: 'white',
    fontFamily: 'Urbanist'
  },
  googleBtn: {
    width: windowWidth - 40,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 15,
    padding: 10,
    backgroundColor: 'white'
  },
  googleBtnText: {
    fontSize: 18,   
    color: 'black',
    fontFamily: 'Urbanist'
  },
  textInputLogin: {
    width: windowWidth - 40,
    height: 60,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
    paddingLeft: 15,
    fontSize: 15,
    color: 'white'
  },
  logo: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center'
  },
  cadastrarView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 5
  },
  cadastrarText: {
    color: 'gray',
    fontFamily: 'Urbanist',
    fontSize: 18,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 5
  },
  footerText: {
    fontSize: 13,
    color: 'gray'
  }
})

export default Recuperar