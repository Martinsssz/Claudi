//COMPONENTES

import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { Appearance } from "react-native";

export default function Toolbar({ visualizacao, setVisualizacao }) {
  //*************************************************HOOKS********************************************************************//

  //**********************************************Alteração automática de tema*****************************************************//

  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

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
    },
    iconContainer: {
      padding: 5,
    },
    diarioButton: {
      backgroundColor: visualizacao === "diaria" ? "#1E2F3C" : "#C4CACE", 
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginHorizontal: 5,
    },
    semanalButton: {
      backgroundColor: visualizacao === "semanal" ? "#1E2F3C" : "#C4CACE", 
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginHorizontal: 5,
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
        <Ionicons name="pencil" color="white" size={20} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="add" color="white" size={25} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="remove" color="white" size={25} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer}>
        <Ionicons name="color-palette" color="white" size={20} />
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
          Diário
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
          Semanal
        </Text>
      </TouchableOpacity>
    </View>
  );
}
