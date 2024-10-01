import React from "react";
import { View, Text, StyleSheet, Pressable, Appearance, PixelRatio } from "react-native";
import { Link } from "expo-router";
import cores from '../../Util/coresPadrao'

export default function Popup({message, cor, option, link, handle, specialHandle}){

  let colorScheme = Appearance.getColorScheme()

  const styles = StyleSheet.create({
    container:{
      ...StyleSheet.absoluteFillObject, // Preenche toda a área disponível
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999, 
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      padding: 20
    },
    popup:{
      borderColor: cor ? cor : "yellow",
      backgroundColor: colorScheme === "dark" ? cores.azulEscuroDark : cores.azulClaro1Light,
      borderStyle: "solid",
      borderWidth: 2,
      width: "100%",
      height: "20%",
      paddingHorizontal: 20,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
    },
    mensagem:{
      fontSize:25,
      color: colorScheme === "dark" ? "white" : "blakc"

    },
    options:{
      width: "100%",
      flexDirection: "row",
      gap: 6,   

    },
    optionsButton:{
      flex: 1,
      flexDirection:"row",
      justifyContent: "center",
      padding: 10,
      backgroundColor: colorScheme === "dark" ? cores.azulDark : cores.azulLight,
    },
    optionText:{
      fontSize: 16 * PixelRatio.getFontScale(),
      color: colorScheme === "dark" ? "white" : "blakc"
    }

  })

  return(
    <View style={styles.container}>
      <View style={styles.popup}>
        <Text style={styles.mensagem}>
          {message}
        </Text>

        <View style={styles.options} >
          <Pressable style={styles.optionsButton} onPress={() =>  handle(false) }>  
            <Text style={styles.optionText}>Voltar</Text>  
          </Pressable>
          {option && option != "" && (
            <Link replace href={link} asChild>
              <Pressable style={styles.optionsButton} onPress={specialHandle}>
                <Text style={styles.optionText}> {option} </Text>
              </Pressable>
            </Link>
          )}
        </View>
      </View>
    </View>
    
  )
}

