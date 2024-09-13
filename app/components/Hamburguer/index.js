
///Import de componentes
import { 
  Pressable} from "react-native";


//********************************************Import de depêndencias e componentes**********************************************//
import React from "react";
import { useState, useEffect } from "react";
import { Appearance } from "react-native";
import { Ionicons } from "@expo/vector-icons";
  

export default function Hamburguer({handleSidebar}){
//**********************************************UseStates**********************************************************************//
const[tipoMenu, setTipoMenu] = useState("menu")

//**********************************************Alteração automática de tema*****************************************************//
const[colorScheme, setColorScheme] = useState(Appearance.getColorScheme())

useEffect(() => {
  const listener = Appearance.addChangeListener(( scheme ) => {
    setColorScheme(scheme.colorScheme)
  })
  return () => listener.remove()
}, [])


//************************************************Funções**********************************************************************//
function sidebar(){
  let newTipoMenu = tipoMenu == "menu" ? "close" : "menu"
  setTipoMenu(newTipoMenu)

  let sidebar = tipoMenu == "menu" 
  handleSidebar(sidebar)
}
//***********************************************Tela****************************************************************************//
return(
  <Pressable onPress={sidebar}>
    <Ionicons name={tipoMenu} color={colorScheme === "dark" ? "#FFFFFF" : "#000000"} size={40}></Ionicons>
  </Pressable>
)
}