//COMPONENTES
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Appearance,
  PixelRatio,
} from "react-native";
import cores from "../../Util/coresPadrao";

export default function TabelaAulas({ data, visualizacao }) {
  //*************************************************HOOKS********************************************************************//
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  useEffect(() => {
    return;
  }, [data]);

  const diasSemana = {
    monday: "Segunda",
    tuesday: "Terça",
    wednesday: "Quarta",
    thursday: "Quinta",
    friday: "Sexta",
  };

  let aulaSemana = {};

  console.log(JSON.stringify(aulaSemana, null, 1));

  /*const aulasSemana =
    data && Object.keys(data).length > 0
      ? Object.keys(data).map((dia) => ({
          dia,
          turmas: data[dia]
            ? Object.keys(data[dia]).map((turma) => ({
                turma,
                materias: data[dia][turma]
                  ? data[dia][turma]
                      .filter((task) => task !== null)
                      .map((task) => task.subject)
                  : [],
              }))
            : [],
        }))
      : []; */

  //**********************************************Alteração automática de tema*****************************************************//

  useEffect(() => {
    const listener = Appearance.addChangeListener((scheme) => {
      setColorScheme(scheme.colorScheme);
    });
    return () => listener.remove();
  }, []);

  //************************************************Funções**********************************************************************//

  Object.keys(data).forEach((key) => (aulaSemana[key] = {}));
  Object.keys(aulaSemana).forEach((day) => {
    Object.keys(data[day]).forEach((turma) => {
      aulaSemana[day][turma] = [[], []];
      Object.values(data[day][turma]).forEach((subject) => {
        aulaSemana[day][turma][0].push(
          subject == null ? null : subject["subject"]
        );
        aulaSemana[day][turma][1].push(subject == null ? null : subject["end"]);
      });
    });
  });

  console.log(JSON.stringify(aulaSemana, null, 2));

  let daysMax = [];

  Object.values(aulaSemana).forEach((day) => {
    const tamanhoMaximo = Math.max(
      ...Object.values(day).map(
        (turma) => turma[0].filter((element) => element != null).length
      )
    );
    daysMax.push(tamanhoMaximo);
  });
  console.log(daysMax);

  //**********************************************Animações**********************************************************************//

  //***********************************************Estilos************************************************************************//

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    table: {
      flexDirection: "row",
    },
    column: {
      flexDirection: "column",
    },
    blackbox: {
      backgroundColor: colorScheme === "dark" ? cores.black : cores.azulLight,
      width: PixelRatio.get() * 30,
      aspectRatio: 0.75,
    },
    diaDaSemana: {
      backgroundColor:
        colorScheme === "dark" ? cores.azulDark : cores.azulLight,
      width: PixelRatio.get() * 30,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
    },
    text: {
      color: "#ffff",
      transform: [{ rotate: "-90deg" }],
      fontSize: PixelRatio.getFontScale() * 20,
    },
    textContent: {
      color: "#ffff",
      fontSize: PixelRatio.getFontScale() * 15,
    },
  });

  //***********************************************Tela****************************************************************************//

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.table}>
        {/* Primeira */}
        <View style={styles.column}>
          <View style={styles.blackbox} />
          <View style={styles.column}>
            {Object.keys(aulaSemana).map((day, index) => (
              <View
                key={index}
                style={[
                  styles.diaDaSemana,
                  { height: PixelRatio.get() * 17.5 * daysMax[index] },
                ]}
              >
                <Text style={styles.text}>{diasSemana[day]}</Text>
              </View>
            ))}
          </View>
        </View>
        {Object.values(aulaSemana).map((day, index) =>
          Object.keys(day).map((turma, index) => (
            /* Aqui é o conteúdo */
            <View style={[styles.column, { width: PixelRatio.get() * 70 }]}>
              
              <View style={[styles.column, { height: PixelRatio.get() * 40 }]}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor:
                      colorScheme === "dark" ? cores.azulDark : cores.azulLight,
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.textContent}>{turma}</Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    backgroundColor:
                      colorScheme === "dark" ? cores.azulDark : cores.azulLight,
                    flexDirection: "row",
                    borderWidth: 1,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRightWidth: 1,
                    }}
                  >
                    <Text style={styles.textContent}>Horário</Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.textContent}>Atividade</Text>
                  </View>
                </View>
              </View>
              <View style={styles.column}>
                {Object.values(day).map((materias) =>
                  materias[0].map((atividade, index) => (
                    <View
                      style={{
                        flex: 1,
                        backgroundColor:
                          colorScheme === "dark"
                            ? cores.azulDark
                            : cores.azulLight,
                        flexDirection: "row",
                        borderWidth: 1,
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRightWidth: 1,
                        }}
                      >
                        <Text style={styles.textContent}>
                          {materias[1][index]}
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.textContent}>{atividade}</Text>
                      </View>
                    </View>
                  ))
                )}
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
