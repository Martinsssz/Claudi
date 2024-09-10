
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
import coresEscuras from "../../../Util/coresEscuras"
import { Link } from "expo-router"



export default function HomePage(){
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
  fundo:{
    backgroundColor: colorScheme === "dark" ? coresEscuras.azulEscuro : "#D7E6F4",
    padding: 20,
    height: "100%",
  },
  contentContainer:{
    flexDirection:"column",
    gap:20,
    alignItems:"flex-start", 
    paddingVertical:30
  },

  h1:{
    color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
    fontSize:40,
    fontWeight:"bold"
  },
  texto:{
    color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
    fontSize:25,
  },
  dashboard:{
    height: 50,
    backgroundColor: colorScheme === "dark" ? coresEscuras.azulMedio : "#99B8D5",
    alignItems:"center",
    
  },
  circulo:{
    width: "15%",         
    aspectRatio:1,        
    backgroundColor: colorScheme === "dark" ? coresEscuras.azulMedio : "#99B8D5",
    borderRadius: 50,
    alignItems:"center",
    justifyContent:"center",   
    transform: [{translateY: -30}],
  },
})
//***********************************************Tela***************************************************************************//
  return(
    <>

      <ScrollView style={styles.fundo} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.h1}>Bem-Vindo</Text>
        <Text style={styles.texto}>Aperte o botão abaixo para criar um horário</Text>
      </ScrollView>

      <View style={styles.dashboard}>
        <Link href={"%"} asChild>
        
          <Pressable style={styles.circulo}>
            <Ionicons 
              name="add" 
              color={colorScheme === "dark" ? "#FFFFFF" : "#000000"} 
              style={styles.botao}
              size={25}>  
            </Ionicons>
          </Pressable>

        </Link>
      </View>
    </>
    
  )
}