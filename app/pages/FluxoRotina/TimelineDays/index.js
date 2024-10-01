//Import de componentes
import {
  View,Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Animated,
  Appearance,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState, useEffect, useRef } from 'react'

//********************************************Import de depêndencias e componentes***********************************************//
import BackArrow from "../../../components/BackArrow"
import cores from '../../../Util/coresPadrao'
import WeekDays from '../../../components/WeekDays'
import LabelAndHour from '../../../components/LabelAndHour'


export default function TimelineDays(){
//**********************************************UseStates**********************************************************************//
  const [dataWeek, setDataWeek] = useState({})
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
      justifyContent:"flex-start"
    },

    scroll:{
      width:"100%",
      height: "100%",
    },
    scrollContent:{
      flexDirection:"row",
      justifyContent: "flex-start",
      gap:10,
      paddingVertical:50,
      left:0
    },

    labels:{
      width: "100%",
      alignItems: "center",
      justifyContent:  "space-around",

    }
  })
//***********************************************Tela****************************************************************************//
  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={{ flex: 1 }} 
    >
      <ScrollView style={styles.principal} contentContainerStyle={styles.stylecontent}>
        <BackArrow link={"../../pagesWithHeader/ChoiceTimeline"}></BackArrow>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <WeekDays handleWeek={setDataWeek} orientation={"column"}/>
          {console.log(dataWeek)}

          <View style={styles.labels}>
            {numeroComponents.map((component) => (
              <LabelAndHour 
                label1={"Acordar"} 
                label2={"Dormir"} 
                handleData={setDataWeek} 
                data={dataWeek}
                isActived={component in dataWeek}
                id={component}
              />
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}