
//Import de componentes
import {
  View, 
  Text, 
  ScrollView,
  StyleSheet,
  Pressable} from "react-native"

//********************************************Import de depêndencias e componentes**********************************************//
import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { useState, useEffect } from "react"
import { Appearance } from "react-native"
import cores from "../../../Util/coresPadrao"
import { Link } from "expo-router"
import InputLabel from "../../../components/InputLabel"



export default function HomePage(){
//**********************************************UseStates**********************************************************************//
  const [inputNome, setInputNome] = useState("")
  const [inputEmail, setInputEmail] = useState("")
  const [inputPassword, setInputPassword] = useState("")
//**********************************************Alteração automática de tema***************************************************//
const[colorScheme, setColorScheme] = useState(Appearance.getColorScheme())

useEffect(() => {
  const listener = Appearance.addChangeListener(( scheme ) => {
    setColorScheme(scheme.colorScheme)
  })
  return () => listener.remove()
}, [])

//************************************************Funções**********************************************************************//


//**********************************************Animações**********************************************************************//


//***********************************************Estilos************************************************************************//
const styles = StyleSheet.create({
  navbar:{
    backgroundColor: colorScheme === "dark" ? cores.azulDark : cores.azulLight,
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    gap:10,
    paddingHorizontal:20,
    zIndex:3,
    borderBottomColor:"black",
    borderBottomWidth: 1,

  },
  
  fundo:{
    backgroundColor: colorScheme === "dark" ? cores.azulEscuroDark : cores.azulClaro1Light,
    height: "80%",
    paddingHorizontal: 25,
    paddingVertical:50
  },

  contentContainer:{
    flexDirection:"column",
    height:"100%",
    gap:20,
    alignItems: "center", 
  },

  form:{
    backgroundColor: colorScheme === "dark" ? cores.azulDark : cores.ciano,
    height:"60%",
    width:"100%",
    borderRadius: 10,
    padding:20,
    
  },
  formContent:{
    flexDirection:"column",
    justifyContent:"space-around",
    gap: 50,
    zIndex: 1000
  },

  text:{
    fontSize: 25,
    color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
  },
  
  deleteAccount:{
    padding: 15,
    backgroundColor: cores.red,
    borderRadius: 10,
    zIndex:2,
    position:"relative",
    alignSelf:"flex-start",
    bottom:0
  }
})
//***********************************************Tela***************************************************************************//
  return(
    <>
      <View style={styles.navbar}>
        <Ionicons name="arrow-back-circle-outline" color={colorScheme === "dark" ? "#FFFFFF" : "#000000"} size={50}/>
        <Text style={styles.text}>Configurações</Text>
      </View>
      
      <ScrollView style={styles.fundo} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.text}> Edição de Perfil </Text>

        <ScrollView style={styles.form} contentContainerStyle={styles.formContent}>
          <InputLabel
            label = "Nome"
            handleText={setInputNome}
            typeInput="text"
          />

          <InputLabel
            label = "Nome"
            handleText={setInputNome}
            typeInput="text"
          />

          <InputLabel
            label = "Senha"
            handleText={setInputNome}
            typeInput="password"
          />

        </ScrollView>

        <Pressable style={styles.deleteAccount}>
          <Text style={styles.text}>Excluir conta</Text>
        </Pressable>
        
      </ScrollView>
    </>
    
  )
}