
//Import de componentes
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
} from "react-native"


//********************************************Import de depêndencias e componentes**********************************************//
import { Ionicons } from "@expo/vector-icons"
import React, { useRef } from "react"
import { useState, useEffect } from "react"
import { Appearance } from "react-native"
import cores from "../../../Util/coresPadrao"
import { useRouter } from "expo-router"
import PopupInput from "../../../components/PopupInput"
import { ScrollView } from "react-native-web"
import Popup from "../../../components/Popup"
import ip from "../../../Util/localhost"
import { mostrarUsuario } from "../../../sqlite/dbService"



export default function ChoiceTimeline() {
  //**********************************************Hooks**********************************************************************//
  const router = useRouter()

  const [token, setToken] = useState("")
  const [popup, setPopup] = useState(false)

  const [popupVisibility, setPopupVisibility] = useState(false)
  const [popupText, setPopupText] = useState("")
  const [popupOption, setPopupOption] = useState([])
  const [popupTitle, setPopupTitle] = useState([])
  //**********************************************Alteração automática de tema***************************************************//
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme())

  useEffect(() => {
    const listener = Appearance.addChangeListener((scheme) => {
      setColorScheme(scheme.colorScheme)
    })
    return () => listener.remove()
  }, [])

  //************************************************Funções**********************************************************************//
  function popupFunction(text, options = null, title = null) {
    setPopupVisibility(true)
    setPopupText(text)

    if (options) {
      setPopupOption([...options])
    }
    if (title) {
      setPopupTitle(title)
    }

  }
  
  async function enterWithToken() {
    let localToken = token
    let noSpacesStr = localToken.replace(/\s+/g, '');

    if(noSpacesStr.length < 6 || noSpacesStr.length > 6){
      popupFunction("Digite um código válido")
      return
    }
    let user = await mostrarUsuario();
    
    try {
      const response = await fetch(`${ip}/addShareTimeline`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: noSpacesStr,
          userId: user.id
        }),
      });

      if(response.status === 404){
        popupFunction("Token inválido", null, "")
      } else if(response.status === 400){
        popupFunction("Você já possui acesso a esse horário", null, "")
      }else if(response.status === 500){
        popupFunction("Erro no servidor, tente novamente mais tarde", null, "")
      }else if(response.status == 200){
        router.navigate("pages/pagesWithHeader/HomePage")
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }
  //**********************************************Animações**********************************************************************//
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
  const opacityAni = useRef(new Animated.Value(1)).current;
  const [activeId, setActiveId] = useState(null);

  function clique(id) {

    setActiveId(id);
    Animated.sequence([
      Animated.timing(opacityAni, {
        toValue: 0.3,
        duration: 200,
        useNativeDriver: false
      }),
      Animated.timing(opacityAni, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false
      }),
    ]).start(() => {
      if (id == "a") {
        setActiveId(null);
        router.navigate("../../FluxoRotina/TimelineDays")
      }
      if (id == "b") {
        setActiveId(null);
        router.navigate("../../FluxoEscola/SchoolDays")
      }
      if (id == "c") {
        setPopup(true)
      }
    });
  }
  //***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({
    keyboard: {
      backgroundColor: colorScheme === "dark" ? cores.azulEscuroDark : cores.azulClaro1Light,
      height: "100%"
    },
    corpo: {
      backgroundColor: colorScheme === "dark" ? cores.azulEscuroDark : cores.azulClaro1Light,
      paddingHorizontal: 30,
      paddingVertical: 50,
      height: "100%",
    },
    h1: {
      color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
      fontSize: 35,
      width: "100%"
    },
    options: {
      flexDirection: "column",
      gap: 50
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
      opacity: opacityAni
    },

    optionText: {
      color: "#000000",
      fontSize: 25,
      backgroundColor: cores.ghostWhite,
      flex: 1,
      padding: 20,
      borderWidth: 2,
      borderColor: "black",
      borderRadius: 5,
    },
    youtube: {
      top: 200,
      left: 280,
    }

  })
  //***********************************************Tela***************************************************************************//
  return (
    <>
      <View style={styles.corpo}>
        <View style={styles.options}>
          <Text style={styles.h1}>O que deseja fazer?</Text>

          <AnimatedPressable
            style={[styles.option, { opacity: activeId === "a" ? opacityAni : 1 }]}
            onPress={() => clique("a")}
          >
            <Ionicons name="person-outline" color={colorScheme === "dark" ? "#FFFFFF" : "#000000"} size={50} />
            <Text style={styles.optionText}>Rotina de Estudo</Text>
          </AnimatedPressable>

          <AnimatedPressable
            style={[styles.option, { opacity: activeId === "b" ? opacityAni : 1 }]}
            onPress={() => clique("b")}
          >
            <Ionicons name="school" color={colorScheme === "dark" ? "#FFFFFF" : "#000000"} size={50} />
            <Text style={styles.optionText}>Horário Escolar</Text>
          </AnimatedPressable>

          <AnimatedPressable
            style={[styles.option, { opacity: activeId === "c" ? opacityAni : 1 }]}
            onPress={() => clique("c")}
          >
            <Ionicons name="arrow-redo-outline" color={colorScheme === "dark" ? "#FFFFFF" : "#000000"} size={50} />
            <Text style={styles.optionText}>Compartilhado</Text>
          </AnimatedPressable>
        </View>

        

      </View>

      {popup && (
        <PopupInput
          title={"Horário compartilhado"}
          message={"Insira o código de acesso: "}
          inputText={token}
          handleText={setToken}
          selfDesability={setPopup}
          send={enterWithToken}
        />
      )}

      {popupVisibility && (
        <Popup
          title={popupTitle.length > 0 ? popupTitle : undefined}
          message={popupText}
          option={popupOption.length !== 0 ? popupOption[0] : ""}
          link={popupOption.length !== 0 ? popupOption[1] : ""}
          handle={setPopupVisibility}
        />
      )}
    </>

  )
}