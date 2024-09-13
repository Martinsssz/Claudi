//Import de componentes
import {
  View,Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Animated,
  Appearance,
  ActivityIndicator
} from 'react-native'
//********************************************Import de depêndencias e componentes***********************************************//
import cores from '../../Util/coresPadrao'
import React, { useState, useEffect, useRef } from 'react'
import Logo from '../../components/Logo'
import PasswordInput from '../../components/PasswordInput' 
import Loginwith from '../../components/Loginwith'

import { Link, router } from 'expo-router'
import { checkDataCadastro } from '../../Util/checkData'
import Popup from '../../components/Popup'


export default function Signup(){
//**********************************************UseStates**********************************************************************//
  const[inputName,setInputNome] = useState("")
  const[inputEmail,setInputEmail] = useState("")
  const[inputPassword,setInputPassword] = useState("")
  const[inputConfirmPass,setInputConfirmPass] = useState("")
  const[colorScheme, setColorScheme] = useState(Appearance.getColorScheme())

  const[popupVisibility, setPopupVisibility] = useState(false)
  const[popupText, setPopupText] = useState("")
  const[popupOption, setPopupOption] = useState([])
  const[popupColor, setPopupColor] = useState("")

//**********************************************Alteração automática de tema*****************************************************//
  useEffect(() => {
    const listener = Appearance.addChangeListener(( scheme ) => {
      setColorScheme(scheme.colorScheme)
    })
    return () => listener.remove()
  }, [])

  
  
//************************************************Funções**********************************************************************//
async function sendData(){
 
  clique()
  
 
  let dadosFiltrados = checkDataCadastro(inputName, inputEmail, inputPassword, inputConfirmPass)
  if(dadosFiltrados.validate
    
  ){
    try {
      const response = await fetch('http://192.168.1.113:8080/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: inputName, 
          email: inputEmail, 
          password: inputPassword, 
        }),
      });

  
      const data = await response.json()
      if (response.status === 201) {
        popup("Usuario cadastrado com sucesso", ["Ir para tela de login", "/pages/Login"], "green")
      } else if(response.status === 500){
        popup("Email já cadastrado", ["Fazer login", "/pages/Login"], "yellow")
      }else {
        alert("Erro ao criar usuário.")
        popup("Erro ao criar usuário. Tente novamente mais tarde", null, "orange")
      }
    } catch (error) {
      console.error('Erro na requisição:', error)
      alert("Erro de rede ou no servidor.")
    }
  }else{
    popup(dadosFiltrados.message, null, "red")
  }
}

function popup(text, options=null, color=null){
  setPopupVisibility(true)
  setPopupText(text)

  if(options){
    setPopupOption([... options])
  }
  
  if(color){
    setPopupColor(color)
  }
}

//**********************************************Animações**********************************************************************//

//Inicio
const opacityForm = useRef(new Animated.Value(0)).current
Animated.timing(opacityForm, {
  toValue:1,
  duration: 150,
  useNativeDriver: true
}).start()

//Clique no pressable
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const opacityAni = useRef(new Animated.Value(1)).current;  
function clique(){
  Animated.sequence([
    Animated.timing(opacityAni, {
      toValue:0.3,
      duration: 100,
      useNativeDriver: false
    }),
    Animated.timing(opacityAni, {
      toValue:1,
      duration: 100,
      useNativeDriver: false
    }),
  ]).start()
}

//Transicionar para tela de login
function transition(){
  Animated.timing(opacityForm, {
    toValue:0,
    duration: 150,
    useNativeDriver: true
  }).start()

  setTimeout(() =>{
    router.replace("/pages/Login")
  }, 150)
}

//***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({ 
    scroll:{
      backgroundColor: colorScheme === "dark" ? cores.azulEscuroDark : cores.azulClaro1Light,
      padding: 20,
      height: "100%",
    },
    contentContainer:{
      flexDirection:"column",
      justifyContent: "space-between",
      gap:5,
      alignItems:"center", 
      paddingVertical:50,
      left:0
    },
  
    form:{
      height: "50%",
      gap: 15,
      opacity: opacityForm
    },
    input:{
      height: "auto",
      padding: 10,
      backgroundColor: colorScheme === "dark" ? cores.azulClaroDark : cores.ghostWhite,
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
      backgroundColor: colorScheme === "dark" ? cores.azulDark : cores.azulLight,
      padding: 13,
      borderRadius: 7,
      opacity: opacityAni
    },

    opcoesAlternativas:{
      width: "100%",
      paddingHorizontal:10,
      flexDirection:"row",
      justifyContent:"center",
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
      gap:50,
      opacity: opacityForm
    },
  })

//***********************************************Tela****************************************************************************//
  return(
    <>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
        <Logo/>
        <Animated.View style={styles.form}>
          <TextInput
            placeholder='Nome'
            style = {styles.input}
            maxLength={256}
            onChangeText={ (texto) => setInputNome(texto)}>
          </TextInput>

          <TextInput
            placeholder='Email'
            maxLength={256}
            style = {styles.input}
            onChangeText={ (texto) => setInputEmail(texto) }>
          </TextInput>


          <PasswordInput
            placeHolder = {"Senha"}
            handleText = {setInputPassword}>
          </PasswordInput> 

          <PasswordInput
            placeHolder = {"Confirmar senha"}
            handleText = {setInputConfirmPass}>
          </PasswordInput> 

          <AnimatedPressable style={styles.button} onPress={sendData}>
            <Text style={styles.button.text}>Cadastrar-se</Text>
          </AnimatedPressable>
        </Animated.View>

        
        <Pressable style={styles.opcoesAlternativas} onPress={transition}>
          <Text style={styles.opcoesAlternativasText}>Já tenho uma conta</Text>
        </Pressable>
        

        
        <Animated.View style={styles.siginWith}>
          <Loginwith tipo = "0"></Loginwith>
          <Loginwith tipo = "1"></Loginwith>
          <Loginwith tipo = "2"></Loginwith>
        </Animated.View>
        
      </ScrollView>
      {popupVisibility && (
        <Popup 
          message={popupText} 
          cor={popupColor} 
          option= {popupOption.length !== 0 ? popupOption[0] : ""} 
          link= {popupOption.length !== 0 ? popupOption[1] : ""} 
          handle={setPopupVisibility}
        />
      )}
      
    </>
  )
}