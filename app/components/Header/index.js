
//Import de componentes
import { 
  View , 
  Text, 
  StyleSheet,
  PixelRatio} from "react-native";


//********************************************Import de depêndencias e componentes**********************************************//
import React from "react";
import { useState, useEffect } from "react";
import cores from "../../Util/coresPadrao";
import { Appearance } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Hamburguer from "../Hamburguer";
import Logo from "../Logo";
  

export default function Header({handle, showMenu}){
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
    paddingHorizontal:PixelRatio.get()*5,
    zIndex:3,
    borderBottomColor:"black",
    borderBottomWidth: 1
  },

  userInfo:{
    flexDirection: "row",
    alignItems: "center",
  },
  foto:{
    width: "40%",
    height: "100%",
    aspectRatio: 1,
    justifyContent:"center",
    alignItems: "center",
    backgroundColor: "black"
  },
  nome:{
    fontSize: 40,
    color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
  },
})
//***********************************************Tela****************************************************************************//
return(
  <View style={styles.fundo}>
    

    <View style={styles.userInfo}>
      <Logo header={true}/>
      <Text style={styles.nome}>Claudi</Text>
    </View>
    {showMenu && (
      <Hamburguer handleSidebar={handle}/>
    )}
    
  </View>
)
}