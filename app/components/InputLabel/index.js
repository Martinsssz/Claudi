import {View, StyleSheet, TextInput, Appearance, Text, PixelRatio } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import cores from "../../Util/coresPadrao"
import PasswordInput from '../PasswordInput'

export default function InputLabel( {label, typeInput, handleText} ){

  let colorScheme = Appearance.getColorScheme()
  //Esti
  const styles = StyleSheet.create({
    container:{
      flexDirection: "row",
      gap: 10,
      alignItems:"center",
      justifyContent:"center",
    },
    input:{
      flex:3,
      color: "black",
      backgroundColor: colorScheme === "dark" ? cores.azulClaroDark : cores.ghostWhite,
      fontSize: 19,
      padding: 10,
      borderRadius: 7,
      paddingLeft: 7,
      //borda
      borderWidth: 1,
      borderStyle: "solid",
      borderBlockColor: "black",
      borderRadius: 7,
      paddingRight: 7
      //Fim da borda
    },
    text:{
      flex:1,
      fontSize: PixelRatio.get()*8,
      color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
    },
      
  })


  //Componentes
  return(
    <View style ={styles.container}>
      <Text style={styles.text}>{label}:</Text>

      {typeInput === "password" ? (
        <PasswordInput
          handleText={handleText}
          placeHolder={label}
          style={styles.input}
        />

      ):(
        <TextInput 
          placeholder={label}
          onChangeText={handleText}
          style={styles.input}
        />
      )}

    </View>
  )
}