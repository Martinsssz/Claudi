//COMPONENTES

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Appearance, Dimensions } from "react-native";

export default function TabelaTarefas() {
  //*************************************************HOOKS********************************************************************//

  const data = [
    { horario: "XX:XX", tarefa: "Tarefa 1" },
    { horario: "XX:XX", tarefa: "Tarefa 2" },
    { horario: "XX:XX", tarefa: "Tarefa 3" },
    { horario: "XX:XX", tarefa: "Tarefa 4" },
    { horario: "XX:XX", tarefa: "Tarefa 5" },
    { horario: "XX:XX", tarefa: "Tarefa 6" },
  ];

  const screenWidth = Dimensions.get("window").width;

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
    container: {
      flex: 1,
      alignItems: "center", 
      justifyContent: "center",
      padding: 0, 
      margin: 0, 
    },
    table: {
      borderWidth: 1,
      borderColor: "#002B40",
      width: "100%",
      margin: 0,
      padding: 0,
      marginBottom: 30
    },
    rowHeader: {
      flexDirection: "row",
      backgroundColor: "#003554",
    },
    row: {
      flexDirection: "row",
      backgroundColor: "#346788", 
      borderBottomWidth: 1,
      borderBottomColor: "#002B40",
    },
    cell: {
      padding: 30,
      textAlign: "center",
      color: "white",
    },
    headerText: {
      fontWeight: "bold",
      backgroundColor: "#4F7A9A", 
    },
    separator: {
      borderRightWidth: 1, 
      borderRightColor: "#002B40", 
    },
    horarioCol: {
      flex: 1, 
    },
    tarefaCol: {
      flex: 3, 
    },
  });

  //***********************************************Tela****************************************************************************//

  return (
    <View style={styles.container}>
      <View style={[styles.table, { width: screenWidth }]}>
        <View style={styles.rowHeader}>
          <Text
            style={[
              styles.cell,
              styles.headerText,
              styles.horarioCol,
              styles.separator,
            ]}
          >
            Horário
          </Text>
          <Text style={[styles.cell, styles.headerText, styles.tarefaCol]}>
            Tarefas
          </Text>
        </View>

        {data.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={[styles.cell, styles.horarioCol, styles.separator]}>
              {item.horario}
            </Text>
            <Text style={[styles.cell, styles.tarefaCol]}>{item.tarefa}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
