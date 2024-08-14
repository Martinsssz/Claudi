import {View, Text, StyleSheet,TextInput} from 'react-native'
import React from 'react'
import PasswordInput from './components/PasswordInput'

export default function App(){
  return(
    <View style={styles.container}>
      <View style={styles.teste}/>
      <View style={styles.form}>
        <PasswordInput></PasswordInput>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#D7E6F4",
    alignItems: "center",
    justifyContent: "center",
  },
  form:{
    height: 200,
    width: 350,
  },
})