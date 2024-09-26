
//Import de componentes
import {
  View, 
  Text, 
  StyleSheet,
  Pressable,
  Animated,
  } from "react-native"


//********************************************Import de depêndencias e componentes**********************************************//
import { Ionicons } from "@expo/vector-icons"
import React, { useRef } from "react"
import { useState, useEffect } from "react"
import { Appearance } from "react-native"
import cores from "../../../Util/coresPadrao"
import { useRouter } from "expo-router"



export default function ChoiceTimeline(){
//**********************************************Hooks**********************************************************************//
  const router = useRouter()
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
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const opacityAni = useRef(new Animated.Value(1)).current; 
const [activeId, setActiveId] = useState(null);

function clique(id){

  setActiveId(id);
  Animated.sequence([
    Animated.timing(opacityAni, {
      toValue:0.3,
      duration: 200,
      useNativeDriver: false
    }),
    Animated.timing(opacityAni, {
      toValue:1,
      duration: 200,
      useNativeDriver: false
    }),
  ]).start(() => {
    setActiveId(null);
    router.navigate("../../FluxoRotina/TimelineDays")
  });
}
//***********************************************Estilos************************************************************************//
const styles = StyleSheet.create({
  corpo:{
    backgroundColor: colorScheme === "dark" ? cores.azulEscuroDark : cores.azulClaro1Light,
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
    gap: 20,
    opacity: opacityAni
  },

  optionText:{
    color: "#000000",
    fontSize:25,
    backgroundColor:  cores.ghostWhite,
    flex: 1,
    padding: 20,
    borderWidth:2,
    borderColor: "black",
    borderRadius: 5,
  },
  youtube:{
    top: 200,
    left:280,
  }
  
})
//***********************************************Tela***************************************************************************//
  return(
    <>
      <View style={styles.corpo}>
        <View style={styles.options}>
          <Text style={styles.h1}>O que deseja fazer?</Text>

          <AnimatedPressable 
            style= {[ styles.option, { opacity: activeId === "a" ? opacityAni : 1} ]}
            onPress={() => clique("a")} 
          >
            <Ionicons name="person-outline" color={colorScheme === "dark" ? "#FFFFFF" : "#000000"} size={50}/>
            <Text style={styles.optionText}>Rotina de Estudo</Text>
          </AnimatedPressable> 

          <AnimatedPressable 
            style= {[ styles.option, { opacity: activeId === "b" ? opacityAni : 1} ]}
            onPress={() => clique("b")} 
          >
            <Ionicons name="school" color={colorScheme === "dark" ? "#FFFFFF" : "#000000"} size={50}/>
            <Text style={styles.optionText}>Horário Escolar</Text>
          </AnimatedPressable> 

          <AnimatedPressable 
            style= {[ styles.option, { opacity: activeId === "c" ? opacityAni : 1} ]}
            onPress={() => clique("c")} 
          >
            <Ionicons name="arrow-redo-outline" color={colorScheme === "dark" ? "#FFFFFF" : "#000000"} size={50}/>
            <Text style={styles.optionText}>Compartilhado</Text>
          </AnimatedPressable> 
        </View>

        <View style={styles.youtube}>
          <Ionicons name="information-circle-outline" color={colorScheme === "dark" ? "#FFFFFF" : "#000000"} size={50}/>
        </View> 

      </View>
    </>
    
  )
}