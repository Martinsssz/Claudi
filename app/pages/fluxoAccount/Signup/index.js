//Import de componentes
import {
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Animated,
  Appearance,
  Dimensions,
  PixelRatio,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

import { router } from "expo-router";
import React, { useState, useEffect, useRef } from "react";

//********************************************componentes*****************************************************************//
import cores from "../../../Util/coresPadrao";
import Logo from "../../../components/Logo";
import PasswordInput from "../../../components/PasswordInput";
import Loginwith from "../../../components/Loginwith";
import { checkDataCadastro } from "../../../Util/checkData";
import Popup from "../../../components/Popup";
import ip from "../../../Util/localhost";

export default function Signup() {
  //**********************************************HOOKS*******************************************************************//
  const [inputName, setInputNome] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPass, setInputConfirmPass] = useState("");
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  const [popupVisibility, setPopupVisibility] = useState(false)
  const [popupText, setPopupText] = useState("")
  const [popupOption, setPopupOption] = useState([])
  const [popupColor, setPopupColor] = useState("")
  const [popupTitle, setPopupTitle] = useState("")

  const { width, height } = Dimensions.get("window");

  //**********************************************Alteração automática de tema************************************************//
  useEffect(() => {
    const listener = Appearance.addChangeListener((scheme) => {
      setColorScheme(scheme.colorScheme);
    });
    return () => listener.remove();
  }, []);

  //************************************************Funções**********************************************************************//
  async function sendData() {
    clique();

    let dadosFiltrados = checkDataCadastro(
      inputName,
      inputEmail,
      inputPassword,
      inputConfirmPass
    )

    if (dadosFiltrados.validate) {
      try {
        const response = await fetch(`${ip}/cadastrar`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: inputName,
            email: inputEmail,
            password: inputPassword,
          }),
        });

        const data = await response.json()
        if (response.status === 201) {
          popup("Sucesso", "Usuario cadastrado com sucesso", ["Fazer login", "../../fluxoAccount/Login"], "green")
        } else if (response.status === 500) {
          popup("Email já cadastrado", "Deseja fazer login?", ["Sim", "../../fluxoAccount/Login"], "yellow")
        } else {
          alert("Erro ao criar usuário.")
          popup("Erro ao criar usuário. Tente novamente mais tarde", null, "orange")
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro de rede ou no servidor.");
      }
    } else {
      popup("Erro", dadosFiltrados.message, null, null);
    }

  }

  function popup(title = null, text, options = null, color = null) {
    setPopupVisibility(true)
    setPopupText(text)

    if (options) {
      setPopupOption([...options]);
    }

    if (color) {
      setPopupColor(color)
    }
    if (title) {
      setPopupTitle(title)
    }
  }

  //**********************************************Animações**********************************************************************//

  //Inicio
  const opacityForm = useRef(new Animated.Value(0)).current;
  Animated.timing(opacityForm, {
    toValue: 1,
    duration: 150,
    useNativeDriver: true,
  }).start();

  //Clique no pressable
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const opacityAni = useRef(new Animated.Value(1)).current;
  function clique() {
    Animated.sequence([
      Animated.timing(opacityAni, {
        toValue: 0.3,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAni, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }

  //Transicionar para tela de login
  function transition() {
    Animated.timing(opacityForm, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      router.replace("pages/fluxoAccount/Login");
    }, 150);
  }

  //***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({
    keyboard: {
      backgroundColor: colorScheme === "dark" ? cores.azulEscuroDark : cores.azulClaro1Light,
      height: height,
    },

    scroll: {
      height: height,
      backgroundColor:
        colorScheme === "dark" ? cores.azulEscuroDark : cores.azulClaro1Light,
      paddingHorizontal: 20,
    },

    contentContainer: {
      height: height,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: PixelRatio.get() * 10,
    },

    form: {
      width: "100%",
      gap: 15,
      opacity: opacityForm,
    },

    input: {
      height: "auto",
      padding: 10,
      backgroundColor:
        colorScheme === "dark" ? cores.azulClaroDark : cores.ghostWhite,
      color: "black",
      paddingLeft: 7,
      fontSize: 19,
      //borda
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "black",
      borderRadius: 7,
      //Fim da borda
    },

    button: {
      text: {
        color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
        textAlign: "center",
        fontSize: 19,
      },
      backgroundColor:
        colorScheme === "dark" ? cores.azulDark : cores.azulLight,
      padding: 13,
      borderRadius: 7,
      opacity: opacityAni,
    },

    opcoesAlternativas: {
      width: "100%",
      paddingHorizontal: 10,
      flexDirection: "row",
      justifyContent: "center",
    },

    opcoesAlternativasText: {
      fontSize: 20,
      color: colorScheme == "dark" ? "white" : "black",
      textDecorationLine: "underline",
    },

    siginWith: {
      height: 50,
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      gap: 50,
      opacity: opacityForm,
      marginTop: height/60
    },
  });

  //***********************************************Tela****************************************************************************//
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboard}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.contentContainer}
        >
          <Logo header={false} />
          <Animated.View style={styles.form}>
            <TextInput
              placeholder="Nome"
              style={styles.input}
              maxLength={256}
              onChangeText={(texto) => setInputNome(texto)}
            ></TextInput>

            <TextInput
              placeholder="Email"
              maxLength={256}
              style={styles.input}
              onChangeText={(texto) => setInputEmail(texto)}
            ></TextInput>

            <PasswordInput
              placeHolder={"Senha"}
              handleText={setInputPassword}
              style={styles.input}
            />

            <PasswordInput
              placeHolder={"Confirmar senha"}
              handleText={setInputConfirmPass}
              style={styles.input}
            />

            <AnimatedPressable style={styles.button} onPress={sendData}>
              <Text style={styles.button.text}>Cadastrar-se</Text>
            </AnimatedPressable>
          </Animated.View>

          <Pressable style={styles.opcoesAlternativas} onPress={transition}>
            <Text style={styles.opcoesAlternativasText}>
              Já tenho uma conta
            </Text>
          </Pressable>

          <Animated.View style={styles.siginWith}>
            <Loginwith tipo="0"></Loginwith>
            <Loginwith tipo="1"></Loginwith>
            <Loginwith tipo="2"></Loginwith>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
      {popupVisibility && (
        <Popup
          title={popupTitle != "" ? popupTitle : ""}
          message={popupText}
          option={popupOption.length !== 0 ? popupOption[0] : ""}
          link={popupOption.length !== 0 ? popupOption[1] : ""}
          handle={setPopupVisibility}
        />
      )}
    </>
  );
}
