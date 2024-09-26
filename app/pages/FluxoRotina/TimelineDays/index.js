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
//********************************************Import de depêndencias e componentes***********************************************//
import React, { useState, useEffect, useRef } from 'react'
import BackArrow from "../../../components/BackArrow"
import cores from '../../../Util/coresPadrao'
import WeekDays from '../../../components/WeekDays'
import LabelAndHour from '../../../components/LabelAndHour'


export default function TimelineDays(){
//**********************************************UseStates**********************************************************************//
  const [week, setWeek] = useState([])
//**********************************************Alteração automática de tema*****************************************************//
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
    principal:{
      backgroundColor: colorScheme === "dark" ? cores.azulEscuroDark : cores.azulClaro1Light,
      height: "100%",
      width:"100%",
      paddingVertical:20,
      paddingHorizontal:15,
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
    }
  })
//***********************************************Tela****************************************************************************//
  return(
    <View style={styles.principal}>
      <BackArrow link={"../../pagesWithHeader/ChoiceTimeline"}></BackArrow>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <WeekDays handleWeek={setWeek} orientation={"column"}/>
        {console.log(week)}

        <View style={styles.labels}>
          <LabelAndHour label1={"Acordar"} label2={"Domir"}/>
        </View>
      </ScrollView>
    </View>
  )
}