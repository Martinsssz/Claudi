import {
  View,
  StyleSheet,
  Appearance,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  PanResponder,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import TabelaTarefas from "../../../components/Table";
import cores from "../../../Util/coresPadrao";
import ip from "../../../Util/localhost";
import Toolbar from "../../../components/Toolbar";

const ScreenWidth = Dimensions.get("window").width;
const NUM_DIAS_SEMANA = 7;

export default function TableData() {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  const [data, setData] = useState({});
  const [visualizacao, setVisualizacao] = useState("diaria");
  const scrollViewRef = useRef(null);
  const [scrollBarPos, setScrollBarPos] = useState(10);

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

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const newPos = Math.max(
          0,
          Math.min(ScreenWidth - 40, scrollBarPos + gestureState.dx)
        );
        setScrollBarPos(newPos);
        scrollViewRef.current.scrollTo({
          x: (newPos / (ScreenWidth - 40)) * (ScreenWidth * NUM_DIAS_SEMANA),
          animated: false,
        });
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  const styles = StyleSheet.create({
    principal: {
      flex: 1,
      backgroundColor:
        colorScheme === "dark" ? cores.azulEscuroDark : cores.azulClaro1Light,
      paddingVertical: 20,
    },
    scrollContainer: {
      backgroundColor: "#000",
      marginTop: 10,
    },
    scrollBarContainer: {
      height: 9,
      backgroundColor: "lightgray",
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: "#C4CACE",
    },
    scrollBar: {
      height: "100%",
      width: 40,
      backgroundColor:
        colorScheme === "dark" ? cores.azulEscuro1Light : cores.azulClaro1Light,
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.principal}>
        <Toolbar visualizacao={visualizacao} setVisualizacao={setVisualizacao} />

        {/* Barra de rolagem horizontal acima da tabela */}
        <View style={styles.scrollContainer}>
          <View style={styles.scrollBarContainer}>
            <View
              {...panResponder.panHandlers}
              style={[styles.scrollBar, { transform: [{ translateX: scrollBarPos }] }]}
            />
          </View>
        </View>

        {/* Tabela com rolagem horizontal */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <TabelaTarefas data={data} visualizacao={visualizacao} />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
