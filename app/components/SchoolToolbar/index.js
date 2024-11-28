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
import ip from "../../Util/localhost";
import { router } from "expo-router";

export default function SchoolToolbar({ visualizacao, setVisualizacao, table }) {
  //*************************************************HOOKS********************************************************************//
  const [dataAnswer, setDataAnswer] = useState({})
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
  async function getDataAnswer() {
    try {
      const response = await fetch(`${ip}/getDataAnswer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_timeline: table,
        }),
      });

      const data = await response.json();
      if (response.status == 200) {
        setDataAnswer(data)
        console.log(data)
      }

    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  useEffect(() => {
    getDataAnswer()
  }, [])

  function editTable() {
    console.log(JSON.stringify(dataAnswer['json']))
    router.push({
      pathname: "../../FluxoEscola/SchoolDays",
      params: { data: JSON.stringify(dataAnswer['json']), id: dataAnswer['id'] }
    })
  }
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
      backgroundColor: visualizacao === "turma" ? "#1E2F3C" : "#C4CACE",
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      marginLeft: 10,
    },
    semanalButton: {
      backgroundColor: visualizacao === "professor" ? "#1E2F3C" : "#C4CACE",
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
      <TouchableOpacity style={styles.iconContainer} onPress={editTable}>
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
        onPress={() => setVisualizacao("turma")}
      >
        <Text
          style={[
            styles.buttonText,
            visualizacao === "turma" && styles.activeButtonText,
          ]}
        >
          Turma
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.semanalButton}
        onPress={() => setVisualizacao("professor")}
      >
        <Text
          style={[
            styles.buttonText,
            visualizacao === "professor" && styles.activeButtonText,
          ]}
        >
          Professor
        </Text>
      </TouchableOpacity>
    </View>
  );
}
