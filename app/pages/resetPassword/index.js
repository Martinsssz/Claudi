import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import cores from "../../Util/coresPadrao";
import { Appearance } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { Link, router } from "expo-router";
import Popup from "../../components/Popup";
import PasswordInput from "../../components/PasswordInput";
import Logo from "../../components/Logo";
import { ScrollView } from "moti";
import { checkPassword } from "../../Util/checkData";

import ip from "../../Util/localhost";

export default function ResetPassword() {
  //**********************************************Alteração automática de tema***************************************************//
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const listener = Appearance.addChangeListener((scheme) => {
      setColorScheme(scheme.colorScheme);
    });
    return () => listener.remove();
  }, []);

  //**********************************************Animações**********************************************************************//

  //************************************************Funções**********************************************************************/
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [popupVisibility, setPopupVisibility] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [popupOption, setPopupOption] = useState([]);
  const [popupColor, setPopupColor] = useState("");

  async function handleSubmit() {
    let passwordVerification = checkPassword(newPassword, confirmPassword)

    if(passwordVerification.validate){
      try {
        const response = await fetch(
          `${ip}/resetPasswordConfirm`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token, 
              password: newPassword, 
            }),
          }
        );
        const data = await response.json();
        
        if (response.status === 200) {
          popup("Senha alterada com sucesso", ["Ir para tela de login", "/pages/Login"], "green")
        } else {
          popup("Código inválido", null, "red")
        }
      } catch (error) {
        popup("Erro no sistema, tente novamente mais tarde", null, "orange")
      }
    }else{
      popup(passwordVerification.message, null, "red")
    }
  }

  function popup(text, options = null, color = null) {
    setPopupVisibility(true);
    setPopupText(text);

    if (options) {
      setPopupOption([...options]);
    }

    if (color) {
      setPopupColor(color);
    }
  }

  //***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? cores.azulEscuroDark : cores.azulClaro1Light,
    },

    header: {
      backgroundColor: colorScheme === "dark" ? cores.azulDark : "#99B8D5",
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
    },

    content: {
      padding: 20,
      width: "100%"
    },
    
    contentContainer:{
      flexDirection:"column",
      justifyContent: "center",
      alignItems: "center",
      gap:5,
      paddingVertical:30,
    },

    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#FFFF",
      textAlign:"center"
    },
    input: {
      height: "auto",
      width: "100%",
      padding: 10,
      backgroundColor: colorScheme === "dark" ? cores.azulClaroDark : cores.ghostWhite,
      color: "black",
      paddingLeft: 7,
      fontSize: 19,
      //borda
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "black",
      borderRadius: 7,
      marginTop: 20,
    },

    button: {
      text: {
        color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
        textAlign: "center",
        fontSize: 19,
      },
      backgroundColor: colorScheme === "dark" ? cores.azulDark : cores.azulLight,
      padding: 13,
      borderRadius: 7,
      marginTop: 40,
    },
  });

  //***********************************************Tela***************************************************************************//
  return (
    <>
      <View style={styles.container}>
      
        <View style={styles.header}>
          <Pressable>
            <Link replace href={"/pages/changePassword"}>
              <Icon name="arrow-back" size={24} color="#FFF" />
            </Link>
          </Pressable>
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <Logo/>
          <Text style={styles.title}>Confirmação de redefinição de senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Código"
            value={token}
            onChangeText={(text) => setToken(text)}
          />

          <PasswordInput
            placeHolder= {"Digite sua nova senha"}
            handleText={setNewPassword}
            style={styles.input}
          />

          <PasswordInput
            placeHolder= {"Repita sua nova senha"}
            handleText={setConfirmPassword}
            style={styles.input}
          />

          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.button.text}>Redefinir senha</Text>
          </Pressable>
        </ScrollView>
      </View>

      {popupVisibility && (
        <Popup
          message={popupText}
          cor={popupColor}
          option={popupOption.length !== 0 ? popupOption[0] : ""}
          link={popupOption.length !== 0 ? popupOption[1] : ""}
          handle={setPopupVisibility}
        />
      )}
    </>
  );
}
