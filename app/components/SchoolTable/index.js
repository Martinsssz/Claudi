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

export default function TabelaAulas({
  data,
  visualizacao,
  diasDeAula,
  daysMax,
  maxClasses,
  professores,
  aulasTurmas,
}) {
  //*************************************************HOOKS********************************************************************//
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

  //**********************************************Animações**********************************************************************//

  //***********************************************Estilos************************************************************************//

  const styles = StyleSheet.create({
    table: {
      flexDirection: "row",
    },
    column: {
      flexDirection: "column",
    },
    blackbox: {
      backgroundColor: colorScheme === "dark" ? "#000" : cores.azulEscuroDark,
      width: screenWidth / 8,
      height: screenHeight / 10,
      borderWidth: 1,
    },
    diaDaSemana: {
      width: screenWidth / 8,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
    },
    text: {
      color: "#ffff",
      transform: [{ rotate: "-90deg" }],
      fontSize: PixelRatio.getFontScale() * 18,
      width: PixelRatio.get() * 30 * 2,
      textAlign: "center",
    },
    textContent: {
      color: "#ffff",
      fontSize: PixelRatio.getFontScale() * 18,
    },
  });

  //***********************************************Tela****************************************************************************//

  return visualizacao == "turma" ? (
    <ScrollView>
      <View style={styles.table}>
        {/* Primeira */}
        <View style={styles.column}>
          <View style={styles.blackbox} />
          <View style={styles.column}>
            {diasDeAula.map((day, index) => (
              <View
                key={index}
                style={[
                  styles.diaDaSemana,
                  {
                    height: PixelRatio.get() * daysMax[day] * 17.5,
                    backgroundColor:
                      colorScheme === "dark" ? "#012643" : cores.azulDark,
                  },
                ]}
              >
                <Text style={styles.text}>{diasSemana[day]}</Text>
              </View>
            ))}
          </View>
        </View>

        {Object.keys(aulasTurmas).map((turma, index) => (
          <View
            key={`${turma}-${index}`}
            style={[styles.column, { width: screenWidth / 2 }]}
          >
            <View style={[styles.column, { height: screenHeight / 10 }]}>
              <View
                style={{
                  flex: 1,
                  backgroundColor:
                    colorScheme === "dark" ? "#012643" : cores.azulDark,
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
                    colorScheme === "dark" ? "#012643" : cores.azulDark,
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
              {Object.keys(aulasTurmas[turma]).map((dia, indexDay) =>
                aulasTurmas[turma][dia][0].map((atividade, index) => (
                  //console.log(`${turma}-${dia}-${atividade}-${index}`),
                  <View
                    key={`${turma}-${dia}-${atividade}-${index}`}
                    style={{
                      backgroundColor:
                        colorScheme === "dark"
                          ? indexDay % 2 == 0
                            ? cores.azulDark
                            : cores.azulEscuroDark
                          : indexDay % 2 == 0
                          ? cores.azulLight
                          : `${cores.azulDark}aa`,
                      flexDirection: "row",
                      borderWidth: 1,
                      height: PixelRatio.get() * 17.5,
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
                      <Text
                        style={[
                          styles.textContent,
                          {
                            color:
                              colorScheme === "dark" ? "#fff" : cores.black,
                          },
                        ]}
                      >
                        {aulasTurmas[turma][dia][1][index] || "X"}
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={[
                          styles.textContent,
                          {
                            color:
                              colorScheme === "dark" ? "#fff" : cores.black,
                          },
                        ]}
                      >
                        {atividade || "X"}
                      </Text>
                    </View>
                  </View>
                ))
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
    //***********************************************Turmas****************************************************************************//
  ) : (
    //***********************************************Professores****************************************************************************//
    <ScrollView>
      <View style={styles.table}>
        {/* Primeira */}
        <View style={styles.column}>
          <View style={styles.blackbox} />
          <View style={styles.column}>
            {diasDeAula.map((day, index) => (
              <View
                key={index}
                style={[
                  styles.diaDaSemana,
                  {
                    height: PixelRatio.get() * maxClasses[day] * 17.5,
                    backgroundColor:
                      colorScheme === "dark" ? "#012643" : cores.azulDark,
                  },
                ]}
              >
                <Text style={styles.text}>{diasSemana[day]}</Text>
              </View>
            ))}
          </View>
        </View>

        {Object.keys(professores).map((professor, index) => (
          <View
            key={`${professor}-${index}`}
            style={[styles.column, { width: screenWidth / 2 }]}
          >
            <View style={[styles.column, { height: screenHeight / 10 }]}>
              <View
                style={{
                  flex: 1,
                  backgroundColor:
                    colorScheme === "dark" ? "#012643" : cores.azulDark,
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.textContent}>{professor}</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  backgroundColor:
                    colorScheme === "dark" ? "#012643" : cores.azulDark,
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
              {Object.keys(professores[professor]).map((dia, indexDay) =>
                professores[professor][dia][0].map((atividade, index) => (
                  //console.log(`${turma}-${dia}-${atividade}-${index}`),
                  <View
                    key={`${professor}-${dia}-${atividade}-${index}`}
                    style={{
                      backgroundColor:
                        colorScheme === "dark"
                          ? indexDay % 2 == 0
                            ? cores.azulDark
                            : cores.azulEscuroDark
                          : indexDay % 2 == 0
                          ? cores.azulLight
                          : `${cores.azulDark}aa`,
                      flexDirection: "row",
                      borderWidth: 1,
                      height: PixelRatio.get() * 17.5,
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
                      <Text
                        style={[
                          styles.textContent,
                          {
                            color:
                              colorScheme === "dark" ? "#fff" : cores.black,
                          },
                        ]}
                      >
                        {professores[professor][dia][1][index] || "X"}
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={[
                          styles.textContent,
                          {
                            color:
                              colorScheme === "dark" ? "#fff" : cores.black,
                          },
                        ]}
                      >
                        {atividade || "X"}
                      </Text>
                    </View>
                  </View>
                ))
              )}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}