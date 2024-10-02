//Import de componentes
import {
  View,Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Appearance,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  PixelRatio
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useGlobalSearchParams  } from 'expo-router'

//********************************************Import de depêndencias e componentes***********************************************//
import BackArrow from "../../../components/BackArrow"
import cores from '../../../Util/coresPadrao'

import Task from '../../../components/Task'


export default function TaskList(){
//**********************************************HOOKS**********************************************************************//
  const [dataWeek, setDataWeek] = useState({})
  const {width, height} = Dimensions.get('window')

  let {data} = useGlobalSearchParams()
  data = JSON.parse(data)

//**********************************************Alteração automática de tema*****************************************************//
  const[colorScheme, setColorScheme] = useState(Appearance.getColorScheme())
  useEffect(() => {
    const listener = Appearance.addChangeListener(( scheme ) => {
      setColorScheme(scheme.colorScheme)
    })
    return () => listener.remove()
  }, [])
  
//************************************************Funções**********************************************************************//  
  let numeroComponents = []
  for(i=1;i<=7;i++){
    numeroComponents.push(`${i}`)
  }
//**********************************************Animações**********************************************************************//

//***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({ 
    principal:{
      backgroundColor: colorScheme === "dark" ? cores.azulEscuroDark : cores.azulClaro1Light,
      height: "100%",
      width:"100%",
      paddingVertical:20,
      paddingHorizontal:15,
    },
    
    styleContent:{
      justifyContent:"flex-start",
      gap: PixelRatio.get() * 10
    },

   
  })
//***********************************************Tela****************************************************************************//
  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={{ flex: 1 }} 
    >
      <ScrollView style={styles.principal} contentContainerStyle={styles.styleContent}>
        <BackArrow link={"../../pagesWithHeader/ChoiceTimeline"}></BackArrow>

        <ScrollView>
          <Task/>
        </ScrollView>

      </ScrollView>

    </KeyboardAvoidingView>
  )
}