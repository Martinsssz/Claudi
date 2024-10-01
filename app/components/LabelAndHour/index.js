//Import de componentes
import {
  View,Text,
  StyleSheet,
  Pressable,
  Animated,
  Appearance,
  TextInput,
  Dimensions
} from 'react-native'

import React, { useState, useEffect } from 'react'
//********************************************COMPONENTES******************************************************************//
import cores from '../../Util/coresPadrao'



export default function LabelAndHour({label1, label2, handleData, isActived, id, data}){
//**********************************************Hooks**********************************************************************//
const {width,  height} = Dimensions.get('window')

const [valueAcordar, setValueAcordar] = useState("")
const [valueDormir, setValueDormir] = useState("")


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
  function formatar(text, handleInput, value){
    const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    if(value.length > text.length &&  text.length == 2 && value.includes(":")){
      formatedText = text.slice(0, -1)
      handleInput(formatedText)
      
    }else if(text.length == 2 && !text.includes(":")){
      formatedText = text + ":"
      handleInput(formatedText)

    }else if( text.length == 5 && !regex.test(text) ){
      handleInput("")
      
    }else{
      handleInput(text)
    }
  }
//**********************************************Animações**********************************************************************//

//***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({ 
    main:{
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: "purple"

    },
    inputArea:{
      width: "auto",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "blue"
    },
    input:{
      borderColor: cores.black,
      borderWidth: 1,
      padding: 5,
      fontSize: 17,
      backgroundColor: isActived ? cores.ghostWhite : "gray" ,
      color: cores.black,
      placeholderTextColor: cores.black
    },
    text:{
      color: colorScheme == "dark" ? "white" : "black",
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
          placeholder='hh:mm'
          style={styles.input}
          keyboardType='number-pad'
          maxLength={5}
          editable={isActived}
          value={valueAcordar}
          onChangeText={ (text) => formatar(text, setValueAcordar, valueAcordar) }
        />
      </View>

      <View style={styles.inputArea}>
        <Text style={styles.text}>{label2}</Text>
        <TextInput
          placeholder='hh:mm'
          style={styles.input}
          keyboardType='numeric'
          maxLength={5}
          editable={isActived}
          value={valueDormir}
          onChangeText={ (text) => formatar(text, setValueDormir, valueDormir) }
        />
      </View>

    </View>
  )
}