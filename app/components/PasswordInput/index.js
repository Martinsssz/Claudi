import {View, StyleSheet, TextInput, TouchableOpacity, Appearance } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import coresEscuras from "../../Util/coresEscuras"

export default function PasswordInput( {placeHolder, handleText} ){
  const [show, setShow] = useState(true)

  let colorScheme = Appearance.getColorScheme()

  let eyeColor = colorScheme == "dark" ? "#153B59" : "#000000"

  //Esti
  const styles = StyleSheet.create({
    container:{
      height: "auto",
      backgroundColor: colorScheme === "dark" ? coresEscuras.azulBaixo : "#F5F5F5",
      flexDirection: "row",
  
      //borda
      borderWidth: 1,
      borderStyle: "solid",
      borderBlockColor: "black",
      borderRadius: 7,
      //Fim da borda
    },
  
    passwordInput:{
      width: "85%",
      color: "black",
      backgroundColor: colorScheme === "dark" ? coresEscuras.azulBaixo : "#F5F5F5",
      fontSize: 19,
      padding: 10,
      borderRadius: 7,
      paddingLeft: 7,
    },
  
    showPassword:{
      width: "15%",
      alignItems: "center",
      justifyContent: "center",
    }
  })


  //Componentes
  return(
    <View style ={styles.container}>
      <TextInput
        placeholder = {placeHolder}
        style = {styles.passwordInput}
        secureTextEntry = {show}
        onChangeText={ (texto) => handleText(texto) }
      ></TextInput>

      <TouchableOpacity style={styles.showPassword} onPress={ () => setShow(!show) }>
        <Ionicons name={show ? 'eye-off' : 'eye'} color={eyeColor} size={25}/>
      </TouchableOpacity> 

      
    </View>
  )
}