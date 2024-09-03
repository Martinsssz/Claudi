import {
  View,Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Appearance
} from 'react-native'

import coresEscuras from './coresPadroes/coresEscuras'
import React, { useState, useEffect, useRef } from 'react'
import Logo from './components/Logo'
import PasswordInput from './components/PasswordInput' 

export default function App(){
  //UseStates
  const[inputName,setInputNome] = useState("")
  const[inputEmail,setInputEmail] = useState("")
  const[inputPassword,setInputPassword] = useState("")
  const[inputConfirmPass,setInputConfirmPass] = useState("")
  const[colorScheme, setColorScheme] = useState(Appearance.getColorScheme())
  

  //Alteração automática de tema
  useEffect(() => {
    const listener = Appearance.addChangeListener(( scheme ) => {
      setColorScheme(scheme.colorScheme)
    })

    return () => listener.remove()
  }, [])

  //Estylos
  const styles = StyleSheet.create({ 
    keyboard:{
      flex: 1,
      backgroundColor: colorScheme === "dark" ? coresEscuras.azulEscuro : "#D7E6F4"
    },
    container:{
      flex:1,
      backgroundColor: colorScheme === "dark" ? coresEscuras.azulEscuro : "#D7E6F4",
      alignItems: "center",
      justifyContent:"space-around",
      flexDirection: "column",
      padding: (1, 20),
      flex: 1,
      height: "100%",
      
    },
    form:{
      height: "30%",
      gap: 20,
    },
    input:{
      height: "auto",
      padding: 10,
      backgroundColor: colorScheme === "dark" ? coresEscuras.azulBaixo : "#F5F5F5",
      color: "black",
      paddingLeft: 7,
      fontSize: 19,
      //borda
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "black",
      borderRadius: 7,
      //Fim da borda
    },
    button:{
      text:{
        color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
        textAlign: "center",
        fontSize: 19
      },
      backgroundColor: colorScheme === "dark" ? coresEscuras.azulMedio : "#99B8D5",
      padding: 13,
      borderRadius: 7
    },
    siginWith:{
      height: 200,
      width: "auto",
      backgroundColor: "black"
    }
  })

  //Componentes
  return(
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.keyboard}>
      <ScrollView>
        <View style={styles.container}>

          <Logo></Logo>

          <View style={styles.form}>
           <TextInput
             placeholder='Email'
             maxLength={256}
             style = {styles.input}>
           </TextInput>

           <TextInput
             placeholder='Nome'
             style = {styles.input}
             maxLength={256}>
           </TextInput>

            <PasswordInput
              placeHolder = {"Senha"}
              handleText = {setInputPassword}>
            </PasswordInput>

            <PasswordInput
              placeHolder = {"Confime a senha"}
              handleText = {setInputConfirmPass}>
            </PasswordInput>  

            <Pressable style={styles.button}>
              <Text style={styles.button.text}>Cadastrar-se</Text>
            </Pressable>
          </View>

          <View style={styles.siginWith}></View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}