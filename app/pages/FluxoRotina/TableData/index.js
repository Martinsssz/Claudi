//COMPONENTES
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Appearance,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  PanResponder,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import TabelaTarefas from "../../../components/Table";
import cores from "../../../Util/coresPadrao";
import ip from "../../../Util/localhost";
import Toolbar from "../../../components/Toolbar";
import { Ionicons } from "@expo/vector-icons";

//*************************************************HOOKS********************************************************************//

const ScreenWidth = Dimensions.get("window").width;

export default function TableData() {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  const [data, setData] = useState({});
  const [visualizacao, setVisualizacao] = useState("diaria");
  const scrollViewRef = useRef(null);
  const scrollBarWidth = ScreenWidth - 30;
  const scrollBallSize = 50;
  const scrollBallPosition = useRef(new Animated.Value(0)).current;
  const tableWidth = ScreenWidth * 1.5;
  const scrollRatio = tableWidth / (scrollBarWidth - scrollBallSize);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable)


  //**********************************************Alteração automática de tema*****************************************************//

  useEffect(() => {
    const listener = Appearance.addChangeListener((scheme) => {
      setColorScheme(scheme.colorScheme)
    })
    return () => listener.remove()
  }, [])

  //************************************************Funções**********************************************************************//

  async function getData() {
    try {
      const response = await fetch(`${ip}/timelines`);
      const timelines = await response.json();
      const parsedData = timelines.map((item) => JSON.parse(item.json_views));
      setData(parsedData[0]);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleScroll = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const ballPos = scrollX / scrollRatio;
    Animated.timing(scrollBallPosition, {
      toValue: ballPos,
      duration: 70,
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const maxLimit = scrollBarWidth - scrollBallSize * 1.6;

        const newPos = Math.max(
          0,
          Math.min(maxLimit, gestureState.dx + scrollBallPosition._value)
        );

        Animated.timing(scrollBallPosition, {
          toValue: newPos,
          duration: 70,
          useNativeDriver: false,
        }).start();

        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: newPos * scrollRatio,
            animated: false,
          });
        }
      },
    })
  ).current;

  //**********************************************Animações**********************************************************************//

  //***********************************************Estilos************************************************************************//

  const styles = StyleSheet.create({
    principal: {
      flex: 1,
      backgroundColor:
        colorScheme === "dark" ? cores.azulEscuroDark : cores.azulClaro1Light,
      paddingVertical: 20,
    },
    scrollContainer: {
      backgroundColor: colorScheme === "dark" ? cores.black : cores.azulEscuroDark,
      marginTop: 10,
      height: 50,
    },
    scrollBar: {
      marginTop: 20,
      width: scrollBarWidth,
      height: 10,
      backgroundColor: "#C4CACE",
      borderRadius: 5,
      alignSelf: "center",
    },
    scrollBall: {
      width: scrollBallSize,
      height: 15,
      backgroundColor: "#346788",
      borderRadius: 5,
      position: "absolute",
      marginLeft: 18,
      top: -3,
    },
    tabelaContainer: {
      marginTop: 20,
      flex: 1,
    },
  });

  //***********************************************Tela****************************************************************************//
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.principal}>
        <Toolbar
          visualizacao={visualizacao}
          setVisualizacao={setVisualizacao}
        />

        {visualizacao === "semanal" && (
          <View style={styles.scrollContainer}>
            <View style={styles.scrollBar}>
              <Animated.View
                {...panResponder.panHandlers}
                style={[
                  styles.scrollBall,
                  { transform: [{ translateX: scrollBallPosition }] },
                ]}
              />
            </View>
          </View>
        )}

        <View style={styles.tabelaContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal={visualizacao === "semanal"}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={visualizacao === "diaria"}
            onScroll={handleScroll}
          >
            <TabelaTarefas data={data} visualizacao={visualizacao} />
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
