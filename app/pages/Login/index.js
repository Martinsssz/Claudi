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
import cores from '../../Util/coresPadrao'
import React, { useState, useEffect, useRef } from 'react'
import Logo from '../../components/Logo'
import PasswordInput from '../../components/PasswordInput' 
import Loginwith from '../../components/Loginwith'
import { Link, router } from 'expo-router'

import { checkDataLogin } from '../../Util/checkData'
import Popup from '../../components/Popup'
import { criarUsuario, deletarUsuario, mostrarUsuario } from '../../sqlite/dbService'

import ip from '../../Util/localhost'



export default function Login(){
//**********************************************UseStates**********************************************************************//
  const[inputEmail,setInputEmail] = useState("")
  const[inputPassword,setInputPassword] = useState("")

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
  async function  sendData(){

  let dadosFiltrados = checkDataLogin(inputEmail, inputPassword)
  if(dadosFiltrados.validate){
    try {
      const response = await fetch(`${ip}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: inputEmail, 
          password: inputPassword, 
        }),
      });

      const data = await response.json()

      if (response.status === 200) {
        popup("Efetivado", null, "green")
        router.replace("/pages/pagesWithHeader/HomePage")
        criarUsuario(data.user)
        mostrarUsuario()

      } else if(response.status === 401){
        popup("Email ou senha incorretos", null, "red")
      }else if(response.status === 404){
        popup("Usuário não encontrado", null, "red")
      }else{
        popup("O login falhou. Tente novamente mais tarde", null, "orange")
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

//inicio
const opacityForm = useRef(new Animated.Value(0)).current
Animated.timing(opacityForm, {
  toValue:1,
  duration: 350,
  useNativeDriver: true
}).start()

//Transicionar para tela de cadastro
function transition(){
  Animated.timing(opacityForm, {
    toValue:0,
    duration: 150,
    useNativeDriver: true
  }).start()

  setTimeout(() =>{
    router.navigate("/pages/Signup")
  }, 150)
}

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
      paddingVertical:50
    },
  
    form:{
      height: "45%",
      gap: 20,
      justifyContent:"center",
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
            placeholder='Email'
            maxLength={256}
            style = {styles.input}
            onChangeText = {setInputEmail} >
          </TextInput>

          <PasswordInput
            placeHolder = {"Senha"}
            handleText = {setInputPassword}
            style={styles.input}
          /> 

          <AnimatedPressable style={styles.button} onPress={sendData}>
            <Text style={styles.button.text}>Entrar</Text>
          </AnimatedPressable>
        </Animated.View>

        <View style={styles.opcoesAlternativas}>

          <Pressable>
            <Link replace href={"/pages/changePassword"}>
              <Text style={styles.opcoesAlternativasText}>Mudar senha</Text>
            </Link>
          </Pressable>

          <Pressable onPress={transition} >
              <Text style={styles.opcoesAlternativasText}>Criar conta</Text>
          </Pressable>
          
        </View>
        

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
