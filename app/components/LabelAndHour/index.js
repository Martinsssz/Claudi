//Import de componentes
import {
  View,Text,
  StyleSheet,
  Pressable,
  Animated,
  Appearance,
  TextInput,
} from 'react-native'
//********************************************Import de depêndencias e componentes******************************************//
import React, { useState, useEffect } from 'react'
import cores from '../../Util/coresPadrao'


export default function LabelAndHour({label1, label2, handleData, isActived}){
//**********************************************Hooks**********************************************************************//


//********************************************Variáveis******************************************************************//



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
    main:{
      flexDirection: "row",
      width: "100%",
    },
    inputArea:{
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 5,
    },
    input:{
      borderColor: cores.black,
      borderWidth: 1,
      flexGrow: .2,
      padding: 5,
      paddingHorizontal: 20,
      fontSize: 20,
      backgroundColor: cores.ghostWhite,
      color: cores.black,
      placeholderTextColor: cores.black
    },
    text:{
      color:"white",
      marginRight: 10,
      fontSize: 15
    }
  })
//***********************************************Tela****************************************************************************//
  return(
    <View style={styles.main}>
      <View style={styles.inputArea}>
        <Text style={styles.text}>{label1}</Text>
        <TextInput
          placeholder='xx:xx'
          style={styles.input}
          keyboardType='numeric'
        />
      </View>

      <View style={styles.inputArea}>
        <Text style={styles.text}>{label2}</Text>
        <TextInput
          placeholder='xx:xx'
          style={styles.input}
        />
      </View>
     
    </View>
  )
}