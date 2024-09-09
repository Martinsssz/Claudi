import React from "react"
import { StyleSheet, Appearance, Pressable} from "react-native"
import { useState } from "react"
import { Ionicons } from '@expo/vector-icons'

export default function Loginwith({tipo}){
  const[colorScheme, setColorScheme] = useState(Appearance.getColorScheme())

  let styles = StyleSheet.create({
    icone:{
      fontSize:40,
      color: colorScheme == "dark" ? "white" : "black"
    }
  })

  function teste(){
    alert(`Testando ${icones[parseInt(tipo)]}`)
  }


  let  icones = ["logo-google", "logo-facebook", "logo-microsoft"]

  return(
    <Pressable onPress={teste}>
        <Ionicons name={icones[parseInt(tipo)]} style={styles.icone}></Ionicons>
    </Pressable>
  )
}