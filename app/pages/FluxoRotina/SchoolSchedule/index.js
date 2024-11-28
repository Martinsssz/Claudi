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
  PixelRatio,
} from "react-native";
import TabelaAulas from "../../../components/SchoolTable";
import cores from "../../../Util/coresPadrao";
import ip from "../../../Util/localhost";
import SchoolToolbar from "../../../components/SchoolToolbar";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalSearchParams } from "expo-router";

//*************************************************HOOKS********************************************************************//

const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;

export default function TableData() {
  let { idTable } = useGlobalSearchParams();

  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  const [data, setData] = useState({});
  const [visualizacao, setVisualizacao] = useState("turma");

  //**********************************************Alteração automática de tema*****************************************************//

  useEffect(() => {
    const listener = Appearance.addChangeListener((scheme) => {
      setColorScheme(scheme.colorScheme);
    });
    return () => listener.remove();
  }, []);

  //************************************************Funções**********************************************************************//

  async function getData() {
    try {
      const response = await fetch(`${ip}/timelines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_timeline: idTable,
        }),
      });
      const timelines = await response.json();
      const parsedData = JSON.parse(timelines);

      setData(parsedData);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  useEffect(() => {
    getData();
    console.log(data);
  }, []);

  let diasDeAula = Object.keys(data);

  let aulasTurmas = {};
  Object.keys(data).forEach((dia) => {
    Object.keys(data[dia]).forEach((turma) => {
      aulasTurmas[turma] ? null : (aulasTurmas[turma] = {});
      aulasTurmas[turma][dia] = [[], []];
    });
  });

  Object.keys(data).forEach((dia) => {
    Object.keys(data[dia]).forEach((turma) => {
      Object.values(data[dia][turma]).forEach((atividade) => {
        aulasTurmas[turma][dia][0].push(
          atividade == null ? null : atividade["subject"]
        );
        aulasTurmas[turma][dia][1].push(
          atividade == null ? null : atividade["start"]
        );
      });
    });
  });
  //console.log(JSON.stringify(aulasTurmas, null, 2))

  let professores = {};

  Object.keys(data).forEach((dia) => {
    Object.keys(data[dia]).forEach((turma) => {
      Object.values(data[dia][turma]).forEach((atividade) => {
        if (atividade != null) {
          let teacher = atividade["teacher"];
          professores[teacher] ? null : (professores[teacher] = {});
          professores[teacher][dia]
            ? null
            : (professores[teacher][dia] = [[], []]);

          professores[teacher][dia][0].push(turma);
          professores[teacher][dia][1].push(atividade["start"]);
        }
      });
    });
  });

  console.log(JSON.stringify(professores, null, 2));

  let daysMax = [];

  diasDeAula.forEach((dia) => {
    const tamanhoMaximo = Math.max(
      ...Object.values(aulasTurmas).map((turma) => turma[dia][0].length)
    );
    daysMax.push(tamanhoMaximo);
  });

  let maxClasses = {};
  diasDeAula.forEach((dia) => {
    const tamanhoMaximo = Math.max(
      ...Object.values(professores).map((professor) => {
        return professor[dia] ? professor[dia][0].length : 0;
      })
    );
    maxClasses[dia] = tamanhoMaximo;
  });

  Object.keys(aulasTurmas).forEach((turma) => {
    Object.values(diasDeAula).forEach(dia => {

      if (!aulasTurmas[turma][dia]) {
        aulasTurmas[turma][dia] = [[], []]
        for (let i = 0; i < maxClasses[dia]; i++) {
          aulasTurmas[turma][dia][0].push(null)
          aulasTurmas[turma][dia][1].push(null)
        }
      }

      if (aulasTurmas[turma][dia][0].length < maxClasses[dia]) {
        let difference = maxClasses[dia] - aulasTurmas[turma][dia][0].length

        for (let i = 0; i < difference; i++) {
          aulasTurmas[turma][dia][0].push(null)
          aulasTurmas[turma][dia][1].push(null)
        }
      }
    })
  })

  Object.keys(professores).forEach((professor) => {
    Object.values(diasDeAula).forEach((dia) => {
      if (!professores[professor][dia]) {
        professores[professor][dia] = [[], []];
        for (let i = 0; i < maxClasses[dia]; i++) {
          professores[professor][dia][0].push(null);
          professores[professor][dia][1].push(null);
        }
      }

      if (professores[professor][dia][0].length < maxClasses[dia]) {
        let difference =
          maxClasses[dia] - professores[professor][dia][0].length;

        for (let i = 0; i < difference; i++) {
          professores[professor][dia][0].push(null);
          professores[professor][dia][1].push(null);
        }
      }
    });
  });
  
  const scrollViewRef = useRef(null);
  const scrollBarWidth = ScreenWidth/1.1;
  const scrollBallSize = ScreenWidth /7;
  const scrollBallPosition = useRef(new Animated.Value(0)).current;
  const tableWidth = (ScreenWidth/2) * Object.keys(aulasTurmas).length 
  const scrollRatio = tableWidth / (scrollBarWidth - scrollBallSize);


  //**********************************************Animações**********************************************************************//
  const handleScroll = (event) => {
    const scrollX = event.nativeEvent.contentOffset.x;

    const ballPos = Math.min(
      scrollX / scrollRatio,
      scrollBarWidth - scrollBallSize
    );

    Animated.spring(scrollBallPosition, {
      toValue: ballPos,
      friction: 6,
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const maxLimit = scrollBarWidth - scrollBallSize;

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

  //***********************************************Estilos************************************************************************//

  const styles = StyleSheet.create({
    principal: {
      flex: 1,
      backgroundColor:
        colorScheme === "dark" ? cores.azulEscuroDark : cores.azulClaro1Light,
      paddingVertical: ScreenHeight * -0.02,
    },
    scrollContainer: {
      backgroundColor:
        colorScheme === "dark" ? cores.black : cores.azulEscuroDark,
      marginTop: ScreenHeight * 0.01,
      height: ScreenHeight * 0.06,
    },
    scrollBar: {
      marginTop: ScreenHeight * 0.025,
      width: scrollBarWidth,
      height: ScreenHeight * 0.012,
      backgroundColor: "#C4CACE",
      borderRadius: 5,
      alignSelf: "center",
    },
    scrollBall: {
      width: scrollBallSize,
      height: ScreenHeight * 0.019,
      backgroundColor: "#346788",
      borderRadius: 5,
      position: "absolute",
      marginLeft: 18,
      top: -3,
    },
  });

  //***********************************************Tela****************************************************************************//
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.principal}>
        <SchoolToolbar
          visualizacao={visualizacao}
          setVisualizacao={setVisualizacao}
          table={idTable}
        />

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

        <View style={{ flex: 1 }}>
          <ScrollView
            ref={scrollViewRef}
            horizontal={true}
            scrollEnabled={true}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={visualizacao === "turma"}
            onScroll={handleScroll}
          >
            <TabelaAulas
              data={data}
              visualizacao={visualizacao}
              diasDeAula={diasDeAula}
              aulasTurmas={aulasTurmas}
              professores={professores}
              daysMax={daysMax}
              maxCLasses={maxClasses}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
