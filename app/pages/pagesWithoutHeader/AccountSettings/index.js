//Import de componentes
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  Button,
  KeyboardAvoidingView,
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
import {
  mostrarUsuario,
  deletarUsuario,
  atualizarTabelaUsuario,
} from "../../../sqlite/dbService";
import EditableInputLabel from "../../../components/EditableInputLabel";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ip from "../../../Util/localhost";


export default function HomePage() {
  //**********************************************UseStates**********************************************************************//
  const [inputNome, setInputNome] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [popup, setPopup] = useState(false);

  //**********************************************Alteração automática de tema***************************************************//
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    fetchUserData();
    const listener = Appearance.addChangeListener((scheme) => {
      setColorScheme(scheme.colorScheme);
    });
    return () => listener.remove();
  }, []);

  //***********************************************Constantes****************************************************************//

  //************************************************Funções**********************************************************************//

  const deleteAccount = async () => {
    let user = await mostrarUsuario();
    try {
      const response = await fetch(`${ip}/delete-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

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

  const fetchUserData = async () => {
    const user = await mostrarUsuario();
    if (user) {
      setInputNome(user.username);
      setInputEmail(user.email);
      setInputPassword(user.password);
    }
  };

  const updateUserData = async () => {
    try {
      await atualizarTabelaUsuario(id, nome, email, senha);
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
      height: 740,
      paddingHorizontal: 20,
      paddingVertical: 90,
    },

    contentContainer: {
      flexDirection: "column",
      gap: 20,
      alignItems: "center",
    },

    form: {
      backgroundColor: colorScheme === "dark" ? cores.azulDark : cores.ciano,
      height: "60%",
      width: "100%",
      borderRadius: 10,
      padding: 20,
    },
    formContent: {
      flexDirection: "column",
      justifyContent: "space-around",
      gap: 40,
      zIndex: 1000,
      marginBottom: 10,
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
    <KeyboardAwareScrollView>
      <View style={styles.navbar}>
        <Pressable>
          <Link replace href={"/pages/pagesWithHeader/HomePage"}>
            <Ionicons
              name="arrow-back"
              color={colorScheme === "dark" ? "#FFFFFF" : "#000000"}
              size={30}
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
          <EditableInputLabel
            label="Nome"
            type="text"
            value={inputNome}
            handleInputChange={setInputNome}
          />

          <EditableInputLabel
            label="Email"
            type="text"
            value={inputEmail}
            handleInputChange={setInputEmail}
          />

          <EditableInputLabel
            label="Senha"
            type="password"
            value={inputPassword}
            handleInputChange={setInputPassword}
          />
        </ScrollView>

        <Pressable
          style={styles.deleteAccount}
          onPress={() => {
            setPopup(true);
          }}
        >
          <Text style={styles.text}>Excluir conta</Text>
        </Pressable>
        <Pressable style={styles.save} onPress={updateUserData}>
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
          specialHandle={deleteAccount}
        />
      )}
    </KeyboardAwareScrollView>
  );
}
