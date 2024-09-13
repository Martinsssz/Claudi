
//Import de componentes
import { 
  View , 
  Text, 
  StyleSheet} from "react-native";


//********************************************Import de depêndencias e componentes**********************************************//
import React from "react";
import { useState, useEffect } from "react";
import cores from "../../Util/coresPadrao";
import { Appearance } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Hamburguer from "../Hamburguer";
  

export default function Header({handle}){
//**********************************************UseStates**********************************************************************//

//**********************************************Alteração automática de tema**************************************************//
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
    backgroundColor: colorScheme === "dark" ? cores.azulDark : cores.azulLight,
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal:20,
    zIndex:3,

    borderBottomColor:"black",
    borderBottomWidth: 1
  },

  userInfo:{
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  foto:{
    width: "34%",
    aspectRatio: 1,
    backgroundColor: colorScheme === "dark" ? "#000000" : "#FFFFFF",
    borderRadius: 500,

    justifyContent:"center",
    alignItems: "center"
  },
  nome:{
    fontSize: 25,
    color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
  },
  hamburguer:{
    
  },
})
//***********************************************Tela****************************************************************************//
return(
  <View style={styles.fundo}>

    <View style={styles.userInfo}>
      <View style={styles.foto}>
        <Ionicons name="person" color={colorScheme === "dark" ? "#FFFFFF" : "#000000"} size={45}></Ionicons>
      </View>
      <Text style={styles.nome}>Nome</Text>
    </View>

    <Hamburguer handleSidebar={handle}/>
    
  </View>
)
}