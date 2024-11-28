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
import { router } from "expo-router";
import ip from "../../Util/localhost";

export default function Toolbar({ visualizacao, setVisualizacao, table }) {
  //*************************************************HOOKS********************************************************************//

  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  const ScreenHeight = Dimensions.get("window").height;
  const [dataAnswer, setDataAnswer] = useState({});


  //**********************************************Alteração automática de tema*****************************************************//

  useEffect(() => {
    const listener = Appearance.addChangeListener((scheme) => {
      setColorScheme(scheme.colorScheme);
    });
    return () => listener.remove();
  }, []);

  //************************************************Funções**********************************************************************//
  async function getDataAnswer(){
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
      if(response.status == 200){
        setDataAnswer(data)
      }
    
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }   
  }

  useEffect(() => {
    getDataAnswer()
  }, [])


  
  function editTable(){
    console.log(JSON.stringify(dataAnswer['json']))
    router.push({
      pathname: "../../FluxoRotina/TimelineDays",
      params: {data: JSON.stringify(dataAnswer['json']), id: dataAnswer['id']}
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
