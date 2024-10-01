//Import de componentes
import {
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Animated,
  Appearance,
  Dimensions,
  PixelRatio
} from 'react-native'

import React, { useState, useEffect, useRef} from 'react'

import { router } from 'expo-router'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//********************************************componentes*****************************************************************//
import cores from '../../Util/coresPadrao'
import Popup from '../../components/Popup'



export default function DaysAndHours(){
//**********************************************HOOKS*******************************************************************//
  const[colorScheme, setColorScheme] = useState(Appearance.getColorScheme())



  const { width, height } = Dimensions.get('window');

//**********************************************Alteração automática de tema************************************************//
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
