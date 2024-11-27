//COMPONENTES

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Appearance,
    Dimensions
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { Ionicons } from "@expo/vector-icons";
  import cores from "../../Util/coresPadrao";
  
  export default function SchoolToolbar({ visualizacao, setVisualizacao }) {
    //*************************************************HOOKS********************************************************************//
  
    const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  
    const ScreenHeight = Dimensions.get("window").height;
  
  
    //**********************************************Alteração automática de tema*****************************************************//
  
    useEffect(() => {
      const listener = Appearance.addChangeListener((scheme) => {
        setColorScheme(scheme.colorScheme);
      });
      return () => listener.remove();
    }, []);
  
    //************************************************Funções**********************************************************************//
  
    //**********************************************Animações**********************************************************************//
  
    //***********************************************Estilos************************************************************************//
  
    const styles = StyleSheet.create({
      toolbar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: ScreenHeight * 0.08,
        marginTop: ScreenHeight * -0.02
      },
      iconContainer: {
        padding: 10,
      },
      diarioButton: {
        backgroundColor: visualizacao === "diaria" ? "#1E2F3C" : "#C4CACE",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginLeft: 10,
      },
      semanalButton: {
        backgroundColor: visualizacao === "semanal" ? "#1E2F3C" : "#C4CACE",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginHorizontal: 10,
      },
      buttonText: {
        color: "black",
        fontWeight: "bold",
      },
      activeButtonText: {
        color: "white",
      },
    });
  
    //***********************************************Tela****************************************************************************//
  
    return (
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="pencil" color={colorScheme === "dark" ? cores.ghostWhite : cores.black} size={20} />
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons
            name="add"
            color={colorScheme === "dark" ? cores.ghostWhite : cores.black}
            size={25}
          />
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="remove" color={colorScheme === "dark" ? cores.ghostWhite : cores.black} size={25} />
        </TouchableOpacity>
  
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="color-palette" color={colorScheme === "dark" ? cores.ghostWhite : cores.black} size={20} />
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.diarioButton}
          onPress={() => setVisualizacao("diaria")}
        >
          <Text
            style={[
              styles.buttonText,
              visualizacao === "diaria" && styles.activeButtonText,
            ]}
          >
            Turma
          </Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.semanalButton}
          onPress={() => setVisualizacao("semanal")}
        >
          <Text
            style={[
              styles.buttonText,
              visualizacao === "semanal" && styles.activeButtonText,
            ]}
          >
            Professor
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  