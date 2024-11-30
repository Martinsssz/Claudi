//Import de componentes
import { StyleSheet, Pressable, Animated, Appearance } from "react-native";
//********************************************Import de depêndencias e componentes***********************************************//
import { Ionicons } from "@expo/vector-icons";
import cores from "../../Util/coresPadrao";
import { router } from "expo-router";
import { useRef, useState, useEffect } from "react";

export default function BackArrow({ link, data, style }) {
  //************************************************Hooks**********************************************************************//

  //************************************************Funções**********************************************************************//
  function returnTo() {
    clique();
  }

  //**********************************************Alteração automática de tema*****************************************************//
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  useEffect(() => {
    const listener = Appearance.addChangeListener((scheme) => {
      setColorScheme(scheme.colorScheme);
    });
    return () => listener.remove();
  }, []);

  //**********************************************Animações**********************************************************************//
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const opacityAni = useRef(new Animated.Value(1)).current;

  function clique() {
    Animated.sequence([
      Animated.timing(opacityAni, {
        toValue: 0.3,
        duration: 50,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAni, {
        toValue: 1,
        duration: 50,
        useNativeDriver: false,
      }),
    ]).start();

    setTimeout(() => {
      if (data) {
        router.push({
          pathname: link,
          params: data ? { data: JSON.stringify(data) } : null,
        });
      } else {
        router.replace(link);
      }
    }, 100);
  }
  //***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({
    body: {
      padding: 1,
      backgroundColor:
        colorScheme == "dark" ? cores.azulClaro2Light : cores.azulLight,
      alignSelf: "flex-start",
      borderRadius: 30,
      opacity: opacityAni,
      borderColor: colorScheme == "dark" ? "white" : "transparent",
      borderWidth: colorScheme == "dark" ? 1 : 0,
    },
    icone: {
      color: colorScheme === "dark" ? cores.ghostWhite : cores.black,
      fontSize: 50,
      pointerEvents: "none",
    },
  });
  //***********************************************Tela****************************************************************************//
  return (
    <AnimatedPressable style={style || styles.body} onPress={returnTo}>
      <Ionicons name="arrow-back" style={styles.icone} />
    </AnimatedPressable>
  );
}
