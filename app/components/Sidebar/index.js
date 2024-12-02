///Import de componentes
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Switch,
  Image,
} from "react-native";

//********************************************Import de depêndencias e componentes**********************************************//
import React from "react";
import { useState, useEffect, useRef } from "react";
import cores from "../../Util/coresPadrao";
import { Appearance } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import Popup from "../Popup";

import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

import { deletarUsuario, mostrarUsuario } from "../../sqlite/dbService";
import ip from "../../Util/localhost";

export default function Sidebar({ rotaAtual, refresh }) {
  //**********************************************UseStates**********************************************************************//
  const [popup1, setPopup1] = useState(false);
  const [popup2, setPopup2] = useState(false)
  const [tela, setTela] = useState(rotaAtual);

  useEffect(() => {
    setTela(rotaAtual);
  }, [rotaAtual]);

  //**********************************************Alteração automática de tema*****************************************************//
  const [theme, setTheme] = useState("light");
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  var imagem1 = require("../../../assets/images/moon.png");
  var imagem2 = require("../../../assets/images/sun.png");

  useEffect(() => {
    const listener = Appearance.addChangeListener((scheme) => {
      setColorScheme(scheme.colorScheme);
    });
    return () => listener.remove();
  }, []);

  const handleToggleTheme = () => {
    if (colorScheme === "light") {
      Appearance.setColorScheme("dark");
      setColorScheme("dark");
    } else {
      Appearance.setColorScheme("light");
      setColorScheme("light");
    }
  };

  //**********************************************Animações**********************************************************************//
  const left = useRef(new Animated.Value(280)).current;
  Animated.timing(left, {
    toValue: 0,
    duration: 500,
    useNativeDriver: false,
  }).start();

  //************************************************Funções**********************************************************************//
  async function sairDaConta() {
    await deletarUsuario();
  }

  async function saveData(data) {
    let user = await mostrarUsuario();
    try {
      const response = await fetch(`${ip}/saveImport`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timelineData: data,
          userId: user.id
        }),
      });

      if (response.status == 200) {
        router.push("../../pagesWithHeader/HomePage")
      }

    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  async function importar() {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: 'text/plain',
      })

      if (res.canceled === false) {
        const uri = res.assets[0].uri;
        const content = JSON.parse(await FileSystem.readAsStringAsync(uri))
        console.log(content)
        await saveData(content)
      }
    } catch (err) {
      return
    }

  }

  //***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject, // Preenche toda a área disponível
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "flex-end",
      zIndex: 2,
      backgroundColor: "rgba(0, 0, 0, 0.6)",

    },
    sidebar: {
      backgroundColor:
        colorScheme === "dark" ? cores.azulDark : cores.azulLight,
      height: "87%",
      width: "70%",
      paddingHorizontal: 10,
      paddingVertical: 30,
      justifyContent: "space-between",
      left: left,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    },

    toggleSwitch: {
      flexDirection: "row",
    },
    switch: {
      alignSelf: "flex-start",
    },

    moon: {
      marginHorizontal: 10,
      width: 20,
      height: 20,
      marginTop: 15,
    },

    options: {
      flexDirection: "column",
      gap: 15,
    },
    optionText: {
      fontSize: 20,
      color: colorScheme === "dark" ? "white" : "black",
    },
    option: {
      padding: 20,
    },
    selecionado: {
      backgroundColor:
        colorScheme === "dark"
          ? `${cores.azulEscuroDark}CC`
          : `${cores.azulEscuro2Light}CC`,
      padding: 20,
      borderRadius: 10,
    },
  });
  //***********************************************Tela****************************************************************************//
  return (
    <>
      <View style={styles.container}>
        <Animated.View style={styles.sidebar}>
          <View style={styles.options}>
            <Link href={"/pages/pagesWithHeader/HomePage"} asChild>
              <Pressable
                style={
                  tela === "/pages/pagesWithHeader/HomePage"
                    ? styles.selecionado
                    : styles.option
                }
              >
                <Text style={styles.optionText}>Página inicial</Text>
              </Pressable>
            </Link>

            <Link href={"/pages/pagesWithoutHeader/AccountSettings"} asChild>
              <Pressable
                style={
                  tela === "/pages/pagesWithoutHeader/AccountSettings"
                    ? styles.selecionado
                    : styles.option
                }
              >
                <Text style={styles.optionText}>Configurações da conta</Text>
              </Pressable>
            </Link>

            <Pressable
              onPress={() => setPopup2(true)}
              style={
                tela === "/pages/pagesWithHeader/ImportTimeline"
                  ? styles.selecionado
                  : styles.option
              }
            >
              <Text style={styles.optionText}>Importar horário</Text>
            </Pressable>

            <Link href={"/pages/pagesWithHeader/AboutUs"} asChild>
              <Pressable
                style={
                  tela === "/pages/pagesWithHeader/AboutUs"
                    ? styles.selecionado
                    : styles.option
                }
              >
                <Text style={styles.optionText}>Sobre nós</Text>
              </Pressable>
            </Link>




            <View style={styles.toggleSwitch}>
              <Image source={imagem1} style={styles.moon} />
              <Switch
                style={styles.switch}
                trackColor={{ false: "#CCCCCC", true: "#444444" }}
                thumbColor={colorScheme === "light" ? "#FFFFFF" : "#333333"}
                onValueChange={handleToggleTheme}
                value={colorScheme === "light"}
              />
              <Image source={imagem2} style={styles.moon} />
            </View>
          </View>

          <Pressable style={styles.option} onPress={() => setPopup1(!popup1)}>
            <Ionicons></Ionicons>
            <Text style={styles.optionText}>Sair da conta</Text>
          </Pressable>
        </Animated.View>
      </View>

      {popup1 && (
        <Popup
          title="Sair da Conta"
          message="Tem certeza que deseja sair da sua conta?"
          option="Sair"
          link="/pages/fluxoAccount/Signup"
          handle={setPopup1}
          specialHandle={sairDaConta}
        />
      )}

      {popup2 && (
        <Popup
          title="Importar"
          message="Selecione um arquivo para importar"
          option="Selecionar"
          handle={() => setPopup2(false)}
          specialHandle={importar}
        />
      )}
    </>
  );
}
