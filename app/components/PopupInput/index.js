import React from "react";
import { View, Text, StyleSheet, TextInput, Appearance, PixelRatio, ScrollView, Pressable } from "react-native";
import cores from '../../Util/coresPadrao'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function PopupInput({ title, message, inputText, handleText, selfDesability, send }) {

  let colorScheme = Appearance.getColorScheme()

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject, // Preenche toda a área disponível
      zIndex: 999,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',

    },

    contentContainer: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },

    popup: {
      maxHeight: 250,
      height: "auto",
      backgroundColor: colorScheme === "dark" ? cores.azulEscuro2Light : cores.azulClaro1Light,
      borderStyle: "solid",
      width: "100%",
      borderRadius: 10
    },
    popupContent: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
      elevation: 1000,
      gap: PixelRatio.get() * 5,
    },

    titulo: {
      fontWeight: "800",
      fontSize: 25,
      color: colorScheme === "dark" ? "#FFF" : cores.black,
    },
    mensagem: {
      fontSize: 18,
      color: colorScheme === "dark" ? "white" : "black",
      textAlign: "justify",
      marginBottom: 10

    },
    options: {
      width: "100%",
      flexDirection: 1,
      flexDirection: "row",
      gap: 20,
    },

    input: {
      flex: 1,
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

    optionsButton:{
      flex: 1,
      flexDirection:"row",
      justifyContent: "center",
      padding: 10,
      backgroundColor: colorScheme === "dark" ? cores.azulEscuroDark : `${cores.azulEscuro2Light}CC`,
      borderRadius: 15,
    },
    optionText:{
      fontSize: 18 * PixelRatio.getFontScale(),
      color: colorScheme === "dark" ? "white" : "white",
      alignSelf: "center"
    }

  })

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ScrollView style={styles.popup} contentContainerStyle={styles.popupContent}>
        <Text style={styles.titulo}>
          {title}
        </Text>
        <Text style={styles.mensagem}>
          {message}
        </Text>

        <View style={styles.options}>
          <TextInput
            placeholder={"Código"}
            style={styles.input}
            value={inputText}
            onChangeText={(text) => handleText(text)}
          />
        </View>

        <View style={styles.options}>
          <Pressable style={styles.optionsButton} onPress={() => selfDesability(false)}>
            <Text style={styles.optionText}>Voltar</Text>
          </Pressable>

          <Pressable style={styles.optionsButton} onPress={send}>
            <Text style={styles.optionText}>Enviar</Text>
          </Pressable>
        </View>

      </ScrollView>
    </ScrollView>

  )
}

