import React from "react";
import { View, Text, StyleSheet, Pressable, Appearance } from "react-native";
import { Link } from "expo-router";
import coresEscuras from '../../Util/coresEscuras'

export default function Popup({message, cor, option, link, handle}){
  let colorScheme = Appearance.getColorScheme()


  console.log(cor)
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
      backgroundColor: colorScheme === "dark" ? coresEscuras.azulEscuro : "#D7E6F4",
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
      backgroundColor: colorScheme === "dark" ? coresEscuras.azulMedio : "#99B8D5",
    },
    optionText:{
      fontSize:16,
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
          <Pressable style={styles.optionsButton} onPress={() => { handle(false) }}>  
            <Text style={styles.optionText}>Voltar</Text>  
          </Pressable>
          {option && option != "" && (
            <Link href={link} asChild>
              <Pressable style={styles.optionsButton}>
                <Text style={styles.optionText}> {option} </Text>
              </Pressable>
            </Link>
          )}
        </View>
      </View>
    </View>
    
  )
}

