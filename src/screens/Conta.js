import { View, Text, Button } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../../firebaseConfig'

const Conta = () => {
  const auth = FIREBASE_AUTH
  return (
    <View>
    <Button title={'Deslogar'} onPress={() => {auth.signOut()}} />
    </View>
  )
}

export default Conta