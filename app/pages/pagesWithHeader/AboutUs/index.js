//Import de componentes
import { View, StyleSheet, Text } from "react-native";

//********************************************Import de depêndencias e componentes**********************************************//
import React from "react";
import { useState, useEffect } from "react";
import { Appearance } from "react-native";
import cores from "../../../Util/coresPadrao";

export default function AboutUs() {
  //**********************************************Hooks**********************************************************************//

  //**********************************************Alteração automática de tema***************************************************//
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
    corpo: {
      backgroundColor:
        colorScheme === "dark" ? cores.azulEscuroDark : cores.azulClaro1Light,
      paddingHorizontal: 30,
      paddingVertical: 30,
      height: "100%",
    },
    texto1: {
      fontSize: 18,
      color: colorScheme === "dark" ? cores.ghostWhite : cores.black,
      textAlign: "justify",
    },
    texto: {
      fontSize: 18,
      color: colorScheme === "dark" ? cores.ghostWhite : cores.black,
      marginBottom: 15,
      textAlign: "justify",
    },
  });
  //***********************************************Tela***************************************************************************//
  return (
    <>
      <View style={styles.corpo}>
        <Text style={styles.texto1}>
          Em 2024, éramos um grupo de amigos estudantes da Etec Uirapuru,
          percebemos que a organização de horários escolares é uma tarefa
          complexa e muitas vezes sobrecarregada de desafios, tanto para as
          escolas quanto para os alunos.
        </Text>
        <Text style={styles.texto}>
          Nossa missão se tornou desenvolver uma aplicação inovadora que
          facilite a criação de horários personalizados, atendendo às
          necessidades de instituições de ensino, professores e estudantes,
          sendo desenvolvido em nosso trabalho de conclusão de curso.
        </Text>
        <Text style={styles.texto}>
          Nossa solução é uma agenda automática que não apenas simplifica esse
          processo, mas também se adapta às exigências diárias dos usuários, em
          formato de software que será projetado para integrar informações do
          cotidiano.
        </Text>
        <Text style={styles.texto}>
          Queremos transformar a maneira como você organiza seu tempo, ajudando
          a otimizar seus estudos, trabalhos e responsabilidades, para que você
          possa se concentrar no que realmente importa.
        </Text>
        <Text style={styles.texto}>
          Junte-se a nós nessa jornada rumo a uma gestão do tempo mais eficiente
          e produtiva!
        </Text>
      </View>
    </>
  );
}
