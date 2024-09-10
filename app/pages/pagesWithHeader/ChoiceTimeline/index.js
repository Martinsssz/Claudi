
//Import de componentes
import {
  View, 
  Text, 
  StyleSheet,
  Pressable,
  } from "react-native"

//********************************************Import de depêndencias e componentes**********************************************//
import { Ionicons } from "@expo/vector-icons"
import React from "react"
import Header from "../../../components/Header"
import { useState, useEffect } from "react"
import { Appearance } from "react-native"
import coresEscuras from "../../../Util/coresEscuras"
import { Link } from "expo-router"



export default function ChoiceTimeline(){
//**********************************************UseStates**********************************************************************//

//**********************************************Alteração automática de tema***************************************************//
const[colorScheme, setColorScheme] = useState(Appearance.getColorScheme())

useEffect(() => {
  const listener = Appearance.addChangeListener(( scheme ) => {
    setColorScheme(scheme.colorScheme)
  })
  return () => listener.remove()
}, [])
//**********************************************Animações**********************************************************************//

//************************************************Funções**********************************************************************//

//***********************************************Estilos************************************************************************//
const styles = StyleSheet.create({
  corpo:{
    backgroundColor: colorScheme === "dark" ? coresEscuras.azulEscuro : "#D7E6F4",
    paddingHorizontal: 30,
    paddingVertical: 50,
    height: "100%",
  },
  h1:{
    color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
    fontSize:35,
    width:"100%"
  },
  options:{
    flexDirection: "column",
    gap: 50
  },
  option:{
    flexDirection: "row",
    alignItems: "center",
    gap: 20
  },

  optionText:{
    color: "#000000",
    fontSize:25,
    backgroundColor:  "#F5F5F5",
    flex: 1,
    padding: 20
  },
  youtube:{
    top: 200,
    left:280,

  }
  
})
//***********************************************Tela***************************************************************************//
  return(
    <>
      <Header/>

      <View style={styles.corpo}>
        <View style={styles.options}>
          <Text style={styles.h1}>O que deseja fazer?</Text>

          <Pressable style={styles.option}>
            <Ionicons name="person-outline" color={colorScheme === "dark" ? "#FFFFFF" : "#000000"} size={50}/>
            <Text style={styles.optionText}>Rotina de Estudo</Text>
          </Pressable> 

          <Pressable style={styles.option}>
            <Ionicons name="school" color={colorScheme === "dark" ? "#FFFFFF" : "#000000"} size={50}/>
            <Text style={styles.optionText}>Horário Escolar</Text>
          </Pressable> 

          <Pressable style={styles.option}>
            <Ionicons name="arrow-redo-outline" color={colorScheme === "dark" ? "#FFFFFF" : "#000000"} size={50}/>
            <Text style={styles.optionText}>Compartilhado</Text>
          </Pressable> 

        </View>

        <View style={styles.youtube}>
          <Ionicons name="information-circle-outline" color={colorScheme === "dark" ? "#FFFFFF" : "#000000"} size={50}/>
        </View> 

      </View>


    </>
    
  )
}