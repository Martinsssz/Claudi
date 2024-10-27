//Import de componentes
import {
  View,
  StyleSheet,
  Appearance,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import TabelaTarefas from "../../../components/Table";

//********************************************Import de depêndencias e componentes***********************************************//
import cores from "../../../Util/coresPadrao";
import ip from "../../../Util/localhost";
import Toolbar from "../../../components/Toolbar";
import ScrollBar from "../../../components/Scrollbar";
import Header from "../../../components/Header";

export default function TableData() {
  //**********************************************HOOKS**********************************************************************//
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  const [data, setData] = useState({}); // Inicializando como um objeto vazio

  const [visualizacao, setVisualizacao] = useState("diaria")

  //**********************************************Alteração automática de tema*****************************************************//

  useEffect(() => {
    const listener = Appearance.addChangeListener((scheme) => {
      setColorScheme(scheme.colorScheme);
    });
    return () => listener.remove();
  }, []);

  //************************************************Funções**********************************************************************//

  async function getData() {
    fetch(`${ip}/timelines`)
      .then((response) => response.json())
      .then((timelines) => {
        const parsedData = timelines.map((item) => JSON.parse(item.json_views));
        setData(parsedData[0]);
      })
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }

  useEffect(() => {
    getData();
  }, []);



  //**********************************************Animações**********************************************************************//

  //***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({
    principal: {
      backgroundColor:
        colorScheme === "dark" ? cores.azulEscuroDark : cores.azulClaro1Light,
      height: "100%",
      width: "100%",
      paddingVertical: 20,
      paddingHorizontal: 15,
    },
  });
  //***********************************************Tela****************************************************************************//
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.principal}>
          <Toolbar visualizacao={visualizacao} setVisualizacao={setVisualizacao}/>
          <ScrollBar data={data}/>
          <TabelaTarefas data={data}  visualizacao={visualizacao}/>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
