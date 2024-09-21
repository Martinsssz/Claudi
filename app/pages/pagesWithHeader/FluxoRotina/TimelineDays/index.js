//Import de componentes
import {
  View,Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Animated,
  Appearance
} from 'react-native'
//********************************************Import de depêndencias e componentes***********************************************//
import React, { useState, useEffect, useRef } from 'react'


export default function Login(){
//**********************************************UseStates**********************************************************************//
  
//**********************************************Alteração automática de tema*****************************************************//
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
    <>
      
    </>

  )
}
