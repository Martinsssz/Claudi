//COMPONENTES

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Appearance,
  Dimensions,
} from "react-native";
import cores from "../../Util/coresPadrao";

//*************************************************HOOKS********************************************************************//

export default function TabelaTarefas({ data, visualizacao }) {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  useEffect(() => {
    return;
  }, [data]);

  const diasSemana = {
    sunday: "Domingo",
    monday: "Segunda",
    tuesday: "Terça",
    wednesday: "Quarta",
    thursday: "Quinta",
    friday: "Sexta",
    saturday: "Sábado",
  };
  const diaAtual = Object.keys(diasSemana)[new Date().getDay()];

  const tarefasHoje =
    data[diaAtual] && data != {}
      ? Object.entries(data[diaAtual]).map(([taskName, { start, end }]) => ({
          taskName,
          start,
          end,
        }))
      : [];

  const tarefasSemana =
    data && data != {}
      ? Object.keys(data).map((dia) => [
          data[dia] ? Object.keys(data[dia]) : [],
          data[dia]
            ? Object.values(data[dia]).map((task) => task["duration"])
            : [],
        ])
      : [];

  console.log(JSON.stringify(tarefasSemana, null, 2));

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
    container: {
      flex: 1,
      alignItems: "stretch",
      justifyContent: "flex-start",
      paddingHorizontal: screenWidth * 0,
    },
    table: {
      borderWidth: 1,
      borderColor: "#002B40",
      width: "100%",
      height: "100%",
    },
    rowHeader: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
    },
    row: {
      flexDirection: "row",
      backgroundColor:
        colorScheme === "dark" ? cores.azulDark : cores.azulLight,
      borderBottomWidth: 1,
    },
    cell: {
      paddingVertical: screenWidth * 0.1,
      paddingHorizontal: screenWidth * 0.03,
      textAlign: "center",
      color: colorScheme === "dark" ? cores.ghostWhite : cores.black,
      width: screenWidth / 3,
      borderRightWidth: 1,
      fontSize: 16,
    },
    headerText: {
      fontWeight: "bold",
      color: "white",
      backgroundColor: "#4F7A9A",
    },
    horarioCell: {
      flex: 1,
      width: screenWidth * 0.4,
    },
    tarefaCell: {
      flex: 2,
      width: screenWidth * 0.6,
    },
    dataTable: {
      flex: 1,
      flexDirection: "row",
    },
    column: {
      flexDirection: "column",
    },
    cell2: {
      paddingHorizontal: screenWidth * 0.03,
      width: screenWidth / 3,
      borderRightWidth: 1,
      fontSize: 16,
      borderBottomWidth: 1,
      justifyContent: "center",
      backgroundColor:
        colorScheme === "dark" ? cores.azulDark : cores.azulLight,
    },
    cell2Text: {
      color: colorScheme === "dark" ? cores.ghostWhite : cores.black,
      textAlign: "center",
    },
  });

  //***********************************************Tela****************************************************************************//
  return (
    <View style={styles.container}>
      {visualizacao === "diaria" ? (
        <ScrollView>
          <View style={styles.table}>
            <View style={styles.rowHeader}>
              <Text
                style={[styles.cell, styles.headerText, styles.horarioCell]}
              >
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
              <Text style={[styles.cell, styles.horarioCell]}>
                Nenhuma tarefa para hoje.
              </Text>
            )}
          </View>
        </ScrollView>
      ) : (
        <ScrollView>
          <View style={styles.table}>
            <View style={styles.rowHeader}>
              {Object.keys(data).map((dia) => (
                <Text key={dia} style={[styles.cell, styles.headerText]}>
                  {diasSemana[dia]}
                </Text>
              ))}
            </View>
            <View style={styles.dataTable}>
              {tarefasSemana.map((dia, columnIndex) => (
                <View key={columnIndex} style={styles.column}>
                  {dia[0].map((tarefa, index) => {
                    const isEmpty = !tarefa;
                    const tamanhoMaximo = Math.max(
                      ...tarefasSemana.map((dia) =>
                        dia[1].reduce((acumulador, valorAtual) => 
                          acumulador + valorAtual
                        , 0)
                      )
                    );
                    const duracaoDia = dia[1].reduce((acumulador, valorAtual) => acumulador + valorAtual, 0)
                    const constanteAltura = tamanhoMaximo / duracaoDia
                    const taskDuration = tarefasSemana[columnIndex][1][index];
                    const isLast = dia[0][dia[0].length - 1] == tarefa;

                    return !isEmpty ? (
                      <View
                        key={tarefa}
                        style={[
                          styles.cell2,
                          { height: constanteAltura * taskDuration},
                        ]}
                      >
                        <Text style={styles.cell2Text}>
                          {isEmpty ? null : tarefa}
                        </Text>
                      </View>
                    ) : (
                      console.log()
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
