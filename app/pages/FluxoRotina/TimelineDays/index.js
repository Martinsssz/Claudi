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


export default function Login(){
//**********************************************UseStates**********************************************************************//
  
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
    
  })
//***********************************************Tela****************************************************************************//
  return(
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <BackArrow></BackArrow>
      <ScrollView style={styles.principal} contentContainerStyle={styles.scrollContent}>

      </ScrollView>
    </KeyboardAvoidingView>

  )
}