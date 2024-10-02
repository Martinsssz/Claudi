//Import de componentes
import {
  StyleSheet,
  ScrollView,
  View,
  Appearance,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  PixelRatio,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useGlobalSearchParams } from 'expo-router'

//********************************************Import de depêndencias e componentes***********************************************//
import cores from '../../Util/coresPadrao'
import WeekDays from '../../components/WeekDays'
import LabelAndHour from '../../components/LabelAndHour'
import InputLabel from '../InputLabel'


export default function Task(){
//**********************************************HOOKS**********************************************************************//
  const [dataWeek, setDataWeek] = useState({})
  const {width, height} = Dimensions.get('window')

  let {data} = useGlobalSearchParams()
  data = JSON.parse(data)

  console.log(data)
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
      backgroundColor: colorScheme === "dark" ? cores.azulDark : cores.ghostWhite,
      height: "auto",
      paddingVertical:20,
      paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(15),
    },
    
    styleContent:{
      justifyContent:"flex-start",
      gap: 10
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
      alignItems: "flex-start",
      justifyContent:  "space-around",
    },
  })
//***********************************************Tela****************************************************************************//
  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={{ flex: 1 }} 
    >
      <ScrollView style={styles.principal} contentContainerStyle={styles.styleContent}>
        <InputLabel label="Nome" typeInput="text"/>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <WeekDays orientation={"column"}/>

          <View style={styles.labels}>
            {numeroComponents.map((component) => (
              <LabelAndHour 
                label1={"Início"} 
                label2={"Fim"} 
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