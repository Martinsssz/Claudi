import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import coresEscuras from "../../Util/coresEscuras";
import { Appearance } from "react-native"
import { useState, useEffect } from "react";
import React from "react";
import { Link } from 'expo-router'
import { useContext } from 'react';



export default function changePassword(){
//**********************************************Alteração automática de tema***************************************************//
const[colorScheme, setColorScheme] = useState(Appearance.getColorScheme())

useEffect(() => {
  const listener = Appearance.addChangeListener(( scheme ) => {
    setColorScheme(scheme.colorScheme)
  })
  return () => listener.remove()
}, [])

//**********************************************Animações**********************************************************************//

//************************************************Funções**********************************************************************/
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(null);

  async function handleResetPassword (){
    try {
      const response = await fetch('http://192.168.3.14:8080/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.message) {
        setSuccess(data.message);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  
    
//***********************************************Estilos************************************************************************//
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? coresEscuras.azulEscuro : "#99B8D5",
  
    },
    header: {
      backgroundColor: colorScheme === "dark" ? coresEscuras.azulMedio : "#99B8D5",
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal:20,
    },
    content: {
      padding: 20,
    },
    title: {
      marginTop: 70,
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#FFFF'
    },
    input: {
        height: "auto",
        padding: 10,
        backgroundColor: colorScheme === "dark" ? coresEscuras.azulBaixo : "#F5F5F5",
        color: "black",
        paddingLeft: 7,
        fontSize: 19,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        borderRadius: 7,
        marginTop: 25
    },
    button:{
        text:{
          color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
          textAlign: "center",
          fontSize: 19
        },
        backgroundColor: colorScheme === "dark" ? coresEscuras.azulMedio : "#99B8D5",
        padding: 13,
        borderRadius: 7,
        marginTop: 40
      },
  });

  //***********************************************Tela***************************************************************************//
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable>
          <Link replace href={"/pages/Login"}>
          <Icon name="arrow-back" size={24} color="#FFF" />
          </Link>
        </Pressable>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Informe seu e-mail para alterar a sua senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Pressable style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.button.text}>Redefinir senha</Text>
        </Pressable>
      </View>
    </View>
  );
}
