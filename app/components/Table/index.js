//COMPONENTES

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Appearance, Dimensions } from "react-native";

export default function TabelaTarefas({ data, visualizacao }) {
  //*************************************************HOOKS********************************************************************//

  const screenWidth = Dimensions.get("window").width;

  const diasSemana = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const diaAtual = diasSemana[new Date().getDay()]; // Nome do dia atual em inglês

  const tarefasHoje = data[diaAtual]
    ? Object.entries(data[diaAtual]).map(([taskName, { start, end }]) => ({
        taskName,
        start,
        end,
      }))
    : [];

  // Tarefas da semana
  // Verifique se 'data' está definido e tem a estrutura correta
  const tarefasSemana = data
    ? diasSemana.map((dia) => {
        return {
          dia,
          tarefas: data[dia]
            ? Object.entries(data[dia]).map(([taskName]) => taskName) // Retorna só os nomes das tarefas
            : [], // Se não houver tarefas para o dia, retorna um array vazio
        };
      })
    : [];

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
      justifyContent: "flex-start",
      padding: 0,
      margin: 0,
    },
    table: {
      borderWidth: 1,
      borderColor: "#002B40",
      width: "100%",
      margin: 0,
      padding: 0,
      marginBottom: 25,
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
      alignItems: "stretch",
    },
    cell: {
      padding: 29,
      textAlign: "center",
      color: "white",
      width: "34%",
      borderRightWidth: 1,
      borderColor: "#002B40",
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
      flex: 2,
    },
  });

  //***********************************************Tela****************************************************************************//

  return (
    <View style={styles.container}>
      <ScrollView style={[styles.table, { width: screenWidth }]}>
        {visualizacao === "diaria" ? (
          <View>
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

            {tarefasHoje.length > 0 ? (
              tarefasHoje.map((task, index) => (
                <View key={index} style={styles.row}>
                  <Text
                    style={[styles.cell, styles.horarioCol, styles.separator]}
                  >
                    {task.start} - {task.end}
                  </Text>
                  <Text style={[styles.cell, styles.tarefaCol]}>
                    {task.taskName}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.cell}>Nenhuma tarefa para hoje.</Text>
            )}
          </View>
        ) : (
          <View>
            <View style={styles.rowHeader}>
              {diasSemana.map((dia) => (
                <Text key={dia} style={[styles.cell, styles.headerText]}>
                  {dia.charAt(0).toUpperCase() + dia.slice(1)} {/* Capitaliza o primeiro caractere */}
                </Text>
              ))}
            </View>
            {Math.max(...tarefasSemana.map((day) => day.tarefas.length), 0) > 0 &&
              [...Array(Math.max(...tarefasSemana.map((day) => day.tarefas.length)))].map((_, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {tarefasSemana.map((day) => (
                    <Text key={day.dia} style={styles.cell}>
                      {day.tarefas[rowIndex] || ""} {/* Mostra a tarefa se existir */}
                    </Text>
                  ))}
                </View>
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
