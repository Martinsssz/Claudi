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

  let aulaSemana = {};
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
  //console.log(JSON.stringify(aulaSemana, null, 2));


  let aulasTurmas = {}
  Object.keys(data).forEach(dia => {
    Object.keys(data[dia]).forEach(turma => {
      aulasTurmas[turma] ? null : aulasTurmas[turma] = {}
      aulasTurmas[turma][dia] = [[], []]
    })
  })

  Object.keys(data).forEach(dia => {
    Object.keys(data[dia]).forEach(turma => {
      Object.values(data[dia][turma]).forEach(atividade => {

        aulasTurmas[turma][dia][0].push(atividade == null ? null : atividade['subject'])
        aulasTurmas[turma][dia][1].push(atividade == null ? null : atividade["end"])

      })
    })
  })
  console.log(JSON.stringify(aulasTurmas, null, 2))



  let daysMax = [];

  Object.values(aulaSemana).forEach((day) => {
    const tamanhoMaximo = Math.max(
      ...Object.values(day).map(
        (turma) => turma[0].length
      )
    );
    daysMax.push(tamanhoMaximo);
  });
  console.log(daysMax);

  //**********************************************Animações**********************************************************************//

  //***********************************************Estilos************************************************************************//

  const styles = StyleSheet.create({
    table: {
      flexDirection: "row"
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
      width: PixelRatio.get() * 30,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
    },
    text: {
      color: "#ffff",
      transform: [{ rotate: "-90deg" }],
      fontSize: PixelRatio.getFontScale() * 30,
      width: PixelRatio.get() * 30 * 2,
      textAlign: "center",

    },
    textContent: {
      color: "#ffff",
      fontSize: PixelRatio.getFontScale() * 18,
    },
  });

  //***********************************************Tela****************************************************************************//

  return (
    <ScrollView>
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
                  {
                    height: PixelRatio.get() * daysMax[index] * 17.5 ,
                    backgroundColor: colorScheme === "dark"
                      ? index % 2 == 0 ? cores.azulDark : cores.azulClaro
                      : index % 2 == 0 ? cores.azulLight : cores.azulEscuro2Light,
                  },
                ]}
              >
                <Text style={styles.text}>{diasSemana[day]}</Text>
              </View>
            ))}
          </View>
        </View>

        {Object.keys(aulasTurmas).map((turma, index) => (
          <View key={`${turma}-${index}`}style={[styles.column, { width: PixelRatio.get() * 70 }]}>
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
              {Object.keys(aulasTurmas[turma]).map((dia, indexDay) => (
                aulasTurmas[turma][dia][0].map((atividade, index) => (
                  console.log(`${turma}-${dia}-${atividade}-${index}`),
                  <View
                    key={`${turma}-${dia}-${atividade}-${index}`}
                    style={{
                      backgroundColor:
                        colorScheme === "dark"
                          ? indexDay % 2 == 0 ? cores.azulDark : cores.azulClaro
                          : indexDay % 2 == 0 ? cores.azulLight : cores.azulEscuro2Light,
                      flexDirection: "row",
                      borderWidth: 1,
                      height: PixelRatio.get() * 17.5

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
                        {aulasTurmas[turma][dia][1][index] || 'X'}
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.textContent}>{atividade || 'X'}</Text>
                    </View>
                    
                  </View>
                ))
              ))}
            </View>

          </View>

        ))}
      </View>
    </ScrollView>
  );
}
