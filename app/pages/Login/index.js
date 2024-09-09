//Import de componentes
import {
  View,Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Animated,
  Appearance
} from 'react-native'
//********************************************Import de depêndencias e componentes***********************************************//
import coresEscuras from '../../Util/coresEscuras'
import React, { useState, useEffect, useRef } from 'react'
import Logo from '../../components/Logo'
import PasswordInput from '../../components/PasswordInput' 
import Loginwith from '../../components/Loginwith'
import { Link } from 'expo-router'


export default function Login(){
//**********************************************UseStates**********************************************************************//
  const[inputName,setInputNome] = useState("")
  const[inputEmail,setInputEmail] = useState("")
  const[inputPassword,setInputPassword] = useState("")
  const[inputConfirmPass,setInputConfirmPass] = useState("")
  const[colorScheme, setColorScheme] = useState(Appearance.getColorScheme())

//**********************************************Alteração automática de tema*****************************************************//
  useEffect(() => {
    const listener = Appearance.addChangeListener(( scheme ) => {
      setColorScheme(scheme.colorScheme)
    })
    return () => listener.remove()
  }, [])

  function teste(){
    alert("hello")
  }

//**********************************************Animações**********************************************************************//

//***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({ 
    scroll:{
      backgroundColor: colorScheme === "dark" ? coresEscuras.azulEscuro : "#D7E6F4",
      padding: 20,
      height: "100%",
    },
    contentContainer:{
      flexDirection:"column",
      justifyContent: "space-between",
      gap:5,
      alignItems:"center", 
      paddingVertical:50
    },
  
    form:{
      height: "45%",
      gap: 15,
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

    opcoesAlternativas:{
      width: "100%",
      paddingHorizontal:10,
      flexDirection:"row",
      justifyContent:"space-between",
      marginBottom:20,
    },
    opcoesAlternativasText:{
      fontSize:20,
      color: colorScheme == "dark" ? "white" : "black",
      textDecorationLine: "underline"
    },

    siginWith:{
      height: 60,
      width: "100%",
      flexDirection:"row",
      justifyContent:"center",
      gap:50
    },
  })

//***********************************************Tela****************************************************************************//
  return(
    <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
      <Logo/>
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

        <Pressable style={styles.button}>
          <Text style={styles.button.text}>Cadastrar-se</Text>
        </Pressable>
      </View>

      <View style={styles.opcoesAlternativas}>
        <Pressable onPress={teste}>
          <Text style={styles.opcoesAlternativasText}>Mudar senha</Text>
        </Pressable>
        <Pressable onPress={teste}>
          <Link replace href={"/pages/Signup"}>
            <Text style={styles.opcoesAlternativasText}>Criar conta</Text>
          </Link>
        </Pressable>
      </View>
      

      <Animated.View style={styles.siginWith}>
        <Loginwith tipo = "0"></Loginwith>
        <Loginwith tipo = "1"></Loginwith>
        <Loginwith tipo = "2"></Loginwith>
      </Animated.View>
    </ScrollView>

  )
}
