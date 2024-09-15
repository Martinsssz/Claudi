import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import coresEscuras from "../../Util/coresPadrao";
import { Appearance } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { Link, router } from "expo-router";
import Popup from "../../components/Popup";
import Logo from "../../components/Logo";
import { checkEmail } from "../../Util/checkData";

export default function ChangePassword() {
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
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [popupOption, setPopupOption] = useState([]);
  const [popupColor, setPopupColor] = useState("");

  async function handleResetPassword() {
    let emailVerification = checkEmail(email)

    if(emailVerification.validate){
      try {
        const response = await fetch("http://192.168.1.113:8080/forgotPassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (response.status == 200) {
          popup(`Enviamos um e-mail para a conta ${email}`, null, "green");
          router.replace("/pages/resetPassword");
        } else {
          popup("Erro ao enviar e-mail para a conta", null, "red");
          setError(data.error);
        }
      } catch (error) {
        setError(error.message);
      }
    }else{
      popup(emailVerification.message, null, "red")
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
      backgroundColor:
        colorScheme === "dark"
          ? coresEscuras.azulEscuroDark
          : cores.azulClaro1Light,
    },
    header: {
      backgroundColor:
        colorScheme === "dark" ? coresEscuras.azulDark : "#99B8D5",
      height: 60,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
    },
    content: {
      padding: 20,
      paddingVertical:50,
      gap:25,
      justifyContent:"center",
    },

    form:{
      height: "50%",
      gap: 0,
    },

    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 20,
      color: "#FFFF",
      textAlign:"center"
    },

    input: {
      height: "auto",
      padding: 10,
      backgroundColor:
        colorScheme === "dark"
          ? coresEscuras.azulClaroDark
          : coresEscuras.ghostWhite,
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
      backgroundColor:
        colorScheme === "dark" ? coresEscuras.azulDark : coresEscuras.azulLight,
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
            <Link replace href={"/pages/Login"}>
              <Icon name="arrow-back" size={24} color="#FFF" />
            </Link>
          </Pressable>
        </View>

        <View style={styles.content}>
          <Logo/>
          <View style={styles.form}>
            <Text style={styles.title}> Informe seu e-mail para alterar a sua senha: </Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <Pressable style={styles.button} onPress={handleResetPassword}>
              <Text style={styles.button.text}>Redefinir senha</Text>
            </Pressable>
          </View>

        </View>
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
