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

//**********************************************Animações**********************************************************************//


//************************************************Funções**********************************************************************//
async function  sendData(){
  let dadosFiltrados = checkDataCadastro(inputName, inputEmail, inputPassword, inputConfirmPass)
  if(dadosFiltrados.validate

  ){
    try {
      const response = await fetch('http://localhost:8080/cadastrar', {
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

  console.log(popupOption)
}



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
      height: "50%",
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
      gap:50
    },
  })

//***********************************************Tela****************************************************************************//
  return(
    <>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
        <Logo/>
        <View style={styles.form}>
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

          <Pressable style={styles.button} onPress={sendData}>
            <Text style={styles.button.text}>Cadastrar-se</Text>
          </Pressable>
        </View>

        <Link replace href={"/pages/Login"} asChild>
          <Pressable style={styles.opcoesAlternativas}>
            <Text style={styles.opcoesAlternativasText}>Já tenho uma conta</Text>
          </Pressable>
        </Link>

        
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
