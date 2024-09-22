import {View, StyleSheet, TextInput, TouchableOpacity, Appearance, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import cores from "../../Util/coresPadrao"

export default function PasswordInput( {placeHolder, handleText, style, value=undefined} ){
  const [show, setShow] = useState(true)

  let colorScheme = Appearance.getColorScheme()

  let eyeColor = colorScheme == "dark" ? "#153B59" : "#000000"

  //Esti
  const styles = StyleSheet.create({
    container:{
      flexDirection: "row",
      justifyContent:"space-between",  
    },
  
    passwordInput:{
      color: "black",
      fontSize: 19,
      zIndex: 1,
      flex: 9
    },
  
    showPassword:{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2
    }
  })


  //Componentes
  return(
    <View style ={[style, styles.container]}>
      <TextInput
        placeholder = {placeHolder}
        style = {styles.passwordInput}
        secureTextEntry = {show}
        onChangeText={ (texto) => handleText(texto) }
        value={value}
      ></TextInput>

      <Pressable style={styles.showPassword} onPress={ () => setShow(!show) }>
        <Ionicons name={show ? 'eye-off' : 'eye'} color={eyeColor} size={25}/>
      </Pressable> 
    </View>
  )
}