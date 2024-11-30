
//Import de componentes
import { 
  View , 
  Text, 
  StyleSheet,
  Animated,
  PixelRatio} from "react-native";


//********************************************Import de depêndencias e componentes**********************************************//
import React from "react";
import { useState, useEffect, useRef } from "react";
import cores from "../../Util/coresPadrao";
import { Appearance } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Hamburguer from "../Hamburguer";
import Logo from "../Logo";
import BackArrow from "../BackArrow";
  

export default function Header({handle, showMenu, showArrowForward}){
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
const opacityAni = useRef(new Animated.Value(1)).current;  

function clique(){
  Animated.sequence([
    Animated.timing(opacityAni, {
      toValue:0.3,
      duration: 50,
      useNativeDriver: false
    }),
    Animated.timing(opacityAni, {
      toValue:1,
      duration: 50,
      useNativeDriver: false
    }),
  ]).start()

  setTimeout(() => {
    if(data){
      router.push({
        pathname: link,
        params: {data:  JSON.stringify(data)}
      })
    }else{
      router.replace(link)
    }
  }, 100);
}

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

  nome:{
    fontSize: 40,
    color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
  },
  arrow: {
    opacity: opacityAni,
    transform: [{rotate: '180deg'}],

  }
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
    {showArrowForward && (
      <BackArrow style={styles.arrow} link={"../../pagesWithHeader/HomePage"}/>
    )}
   
    
  </View>
)
}