import {View, StyleSheet, TextInput, TouchableOpacity, Appearance, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import cores from "../../Util/coresPadrao"

export default function PasswordInput( {placeHolder, handleText} ){
  const [show, setShow] = useState(true)

  let colorScheme = Appearance.getColorScheme()

  let eyeColor = colorScheme == "dark" ? "#153B59" : "#000000"

  //Esti
  const styles = StyleSheet.create({
    container:{
      height: "auto",
      backgroundColor: colorScheme === "dark" ? cores.azulClaroDark : cores.ghostWhite,
      flexDirection: "row",
      flex:4,
      justifyContent:"space-between",
  
  
      //borda
      borderWidth: 1,
      borderStyle: "solid",
      borderBlockColor: "black",
      borderRadius: 7,
      paddingRight: 7,
      //Fim da borda
    },
  
    passwordInput:{
      color: "black",
      backgroundColor: colorScheme === "dark" ? cores.azulClaroDark : cores.ghostWhite,
      fontSize: 19,
      padding: 10,
      borderRadius: 7,
      paddingLeft: 7,
    },
  
    showPassword:{
      alignItems: "center",
      justifyContent: "center",
    }
  })


  //Componentes
  return(
    <View style = {styles.container}>
      <TextInput
        placeholder = {placeHolder}
        style = {styles.passwordInput}
        secureTextEntry = {show}
        onChangeText={ (texto) => handleText(texto) }
      ></TextInput>

      <Pressable style={styles.showPassword} onPress={ () => setShow(!show) }>
        <Ionicons name={show ? 'eye-off' : 'eye'} color={eyeColor} size={25}/>
      </Pressable> 

      
    </View>
  )
}