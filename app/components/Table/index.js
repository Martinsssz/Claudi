import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Appearance, Dimensions } from "react-native";

export default function TabelaTarefas({ data, visualizacao }) {
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
  const diaAtual = diasSemana[new Date().getDay()];

  const tarefasHoje = data[diaAtual]
    ? Object.entries(data[diaAtual]).map(([taskName, { start, end }]) => ({
        taskName,
        start,
        end,
      }))
    : [];

  const tarefasSemana = data
    ? diasSemana.map((dia) => ({
        dia,
        tarefas: data[dia]
          ? Object.entries(data[dia]).map(([taskName]) => taskName)
          : [],
      }))
    : [];

  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  useEffect(() => {
    const listener = Appearance.addChangeListener((scheme) => {
      setColorScheme(scheme.colorScheme);
    });
    return () => listener.remove();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "stretch",
      justifyContent: "flex-start",
      padding: 0,
      margin: 0,
    },
    table: {
      borderWidth: 1,
      borderColor: "#002B40",
      width: "100%", // Remover a definição de largura da tabela
      margin: 0,
      padding: 0,
    },
    rowHeader: {
      flexDirection: "row",
      backgroundColor: "#003554",
      height: 80
    },
    row: {
      flexDirection: "row",
      backgroundColor: "#346788",
      borderBottomWidth: 1,
      borderBottomColor: "#002B40",
      alignItems: "stretch",
      height: 80
    },
    cell: {
      padding: 10, // Ajuste o padding para melhor visualização
      textAlign: "center",
      color: "white",
      width: screenWidth / 3,
      borderRightWidth: 1,
      borderColor: "#002B40",
      fontSize: 16,
    },
    headerText: {
      fontWeight: "bold",
      backgroundColor: "#4F7A9A",
    },
    separator: {
      borderRightWidth: 1,
      borderRightColor: "#002B40",
    },
    horarioCell: {
      flex: 1,
      width: screenWidth * 0.4,
    },
    tarefaCell: {
      flex: 2,
      width: screenWidth * 0.6
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{ flexGrow: 1 }} 
      >
        <View style={styles.table}>
          {visualizacao === "diaria" ? (
            <View>
              <View style={styles.rowHeader}>
                <Text style={[styles.cell, styles.headerText, styles.horarioCell]}>
                  Horário
                </Text>
                <Text style={[styles.cell, styles.headerText, styles.tarefaCell]}>
                  Tarefas
                </Text>
              </View>

              {tarefasHoje.length > 0 ? (
                tarefasHoje.map((task, index) => (
                  <View key={index} style={styles.row}>
                    <Text style={[styles.cell, styles.horarioCell]}>
                      {task.start} - {task.end}
                    </Text>
                    <Text style={[styles.cell, styles.tarefaCell]}>
                      {task.taskName}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={[styles.cell, styles.horarioCell]}>Nenhuma tarefa para hoje.</Text>
              )}
            </View>
          ) : (
            <View>
              <View style={styles.rowHeader}>
                {diasSemana.map((dia) => (
                  <Text key={dia} style={[styles.cell, styles.headerText]}>
                    {dia.charAt(0).toUpperCase() + dia.slice(1)}
                  </Text>
                ))}
              </View>
              {Math.max(...tarefasSemana.map((day) => day.tarefas.length), 0) > 0 &&
                [...Array(Math.max(...tarefasSemana.map((day) => day.tarefas.length)))].map((_, rowIndex) => (
                  <View key={rowIndex} style={styles.row}>
                    {tarefasSemana.map((day) => (
                      <Text key={day.dia} style={styles.cell}>
                        {day.tarefas[rowIndex] || ""}
                      </Text>
                    ))}
                  </View>
                ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
