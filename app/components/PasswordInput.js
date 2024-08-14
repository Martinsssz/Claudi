import {View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'

export default function PasswordInput(){
  const [show, setShow] = useState(true)
  const [input, setInput] = useState("")

  return(
    <View style ={styles.container}>
      <TextInput
        placeholder='Senha'
        style = {styles.passwordInput}
        secureTextEntry = {show}
        value={input}
        onChangeText={ (texto) => setInput(texto) }
      ></TextInput>

      <TouchableOpacity style={styles.showPassword} onPress={ () => setShow(!show) }>
        <Ionicons name={show ? 'eye-off' : 'eye'} color={"black"} size={25}/>
      </TouchableOpacity> 

      
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "black",
    height: "25%",
    backgroundColor: "#F5F5F5",
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
    fontSize: 25,
    paddingLeft: 7
  },

  showPassword:{
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  }
})