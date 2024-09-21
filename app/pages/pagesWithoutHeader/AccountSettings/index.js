//Import de componentes
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  Button,
} from "react-native";

//********************************************Import de depêndencias e componentes**********************************************//
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useState, useEffect } from "react";
import { Appearance } from "react-native";
import cores from "../../../Util/coresPadrao";
import { Link } from "expo-router";
import InputLabel from "../../../components/InputLabel";
import Popup from "../../../components/Popup";

export default function HomePage() {
  //**********************************************UseStates**********************************************************************//
  const [inputNome, setInputNome] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [popup, setPopup] = useState(false);

  //**********************************************Alteração automática de tema***************************************************//
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const listener = Appearance.addChangeListener((scheme) => {
      setColorScheme(scheme.colorScheme);
    });
    return () => listener.remove();
  }, []);

  //************************************************Funções**********************************************************************//

  const deleteAccount = async () => {
    try {
      const response = await fetch(
        'http://192.168.3.14:8080/delete-account',
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: inputEmail }),
        }
      );
  
      if (!response.ok) {
        throw new Error(`Error deleting account: ${response.status}`);
      }
  
      const data = await response.json();
      if (response.ok) {
        setPopup(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //**********************************************Animações**********************************************************************//

  //***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({
    navbar: {
      backgroundColor:
        colorScheme === "dark" ? cores.azulDark : cores.azulLight,
      height: 90,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 20,
      zIndex: 3,
      borderBottomColor: "black",
      borderBottomWidth: 1,
    },

    fundo: {
      backgroundColor:
        colorScheme === "dark" ? cores.azulEscuroDark : cores.azulClaro1Light,
      height: "80%",
      paddingHorizontal: 20,
      paddingVertical: 120,
    },

    contentContainer: {
      flexDirection: "column",
      height: "100%",
      gap: 20,
      alignItems: "center",
      marginBottom: 100,
    },

    form: {
      backgroundColor: colorScheme === "dark" ? cores.azulDark : cores.ciano,
      height: "60%",
      width: "100%",
      borderRadius: 10,
      padding: 10,
    },
    formContent: {
      flexDirection: "column",
      justifyContent: "space-around",
      gap: 50,
      zIndex: 1000,
      marginTop: 40,
    },

    profile: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 20,
    },
    text: {
      fontSize: 25,
      color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
    },

    deleteAccount: {
      padding: 15,
      backgroundColor: cores.red,
      borderRadius: 10,
      zIndex: 2,
      position: "absolute",
      alignSelf: "flex-start",
      bottom: 0,
    },
    save: {
      padding: 15,
      backgroundColor: cores.azulDark,
      borderRadius: 10,
      zIndex: 2,
      position: "relative",
      alignSelf: "flex-end",
      bottom: 0,
    },
  });
  //***********************************************Tela***************************************************************************//
  return (
    <>
      <View style={styles.navbar}>
        <Pressable>
          <Link replace href={"/pages/pagesWithHeader/HomePage"}>
            <Ionicons
              name="arrow-back-circle-outline"
              color={colorScheme === "dark" ? "#FFFFFF" : "#000000"}
              size={50}
            />
          </Link>
        </Pressable>
        <Text style={styles.text}>Configurações</Text>
      </View>

      <ScrollView
        style={styles.fundo}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.text}> Perfil do usuário </Text>

        <ScrollView
          style={styles.form}
          contentContainerStyle={styles.formContent}
        >
          {/*<View style={styles.profile}>
            <Pressable onPress={this.pickImage}>
              <Ionicons name="person-circle" size={50}/>  
            </Pressable>
          </View> */}
          <InputLabel label="Nome" handleText={setInputNome} typeInput="text" />

          <InputLabel
            label="Email"
            handleText={setInputEmail}
            typeInput="text"
          />

          <InputLabel
            label="Senha"
            handleText={setInputPassword}
            typeInput="password"
          />
        </ScrollView>

        <Pressable
          style={styles.deleteAccount}
          onPress={deleteAccount}
        >
          <Text style={styles.text}>Excluir conta</Text>
        </Pressable>
        <Pressable style={styles.save}>
          <Text style={styles.text}>Salvar</Text>
        </Pressable>
      </ScrollView>

      {popup && (
        <Popup
          message="Tem certeza que deseja excluir sua conta?"
          cor="red"
          option="Excluir conta"
          link="/pages/Signup"
          handle={setPopup}
        />
      )}
    </>
  );
}
