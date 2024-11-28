import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Appearance } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { Link, router, useGlobalSearchParams, useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//**********************************************COMPONENTES************************************************************/
import Popup from "../../../components/Popup";
import Logo from "../../../components/Logo";
import { sendToken } from "../../../Util/sendToken";
import cores from "../../../Util/coresPadrao";


export default function ChangePassword() {
//**********************************************Alteração automática de tema***************************************************//
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const listener = Appearance.addChangeListener((scheme) => {
      setColorScheme(scheme.colorScheme);
    });
    return () => listener.remove();
  }, []);

 let {data} = useGlobalSearchParams()

//************************************************HOOKS*****************************************************/
  const [email, setEmail] = useState("");
  const [popupVisibility, setPopupVisibility] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [popupOption, setPopupOption] = useState([]);
  const [popupColor, setPopupColor] = useState("");

  const router = useRouter()
//**********************************************Animações**********************************************************************//

//************************************************Funções**********************************************************************/

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

  function changePage(){
    router.navigate({ pathname:"../resetPassword",  params:{email: undefined} });
  }

  async function tokenGenerate(){
    const response = await sendToken(popup, email);

    if(response){
      setTimeout(()=>{
        router.navigate({ pathname:"../resetPassword", params:{email: email} })
      },3000)
    }
  }


//***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({

    main:{
      backgroundColor:
        colorScheme === "dark"
          ? cores.azulEscuroDark
          : cores.azulClaro1Light,
    },
    container: {
      flex: 1,
      backgroundColor:
        colorScheme === "dark"
          ? cores.azulEscuroDark
          : cores.azulClaro1Light,
    },
    header: {
      backgroundColor:
        colorScheme === "dark" ? cores.azulDark : cores.azulLight,
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
      alignItems: "center"
    },

    form:{
      height: "50%",
      width: "100%",
      gap: 0,
    },

    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 20,
      color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
      textAlign:"left",
    },

    input: {
      height: "auto",
      padding: 10,
      backgroundColor:
        colorScheme === "dark"
          ? cores.azulClaroDark
          : cores.ghostWhite,
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
        colorScheme === "dark" ? cores.azulDark : cores.azulLight,
      padding: 13,
      borderRadius: 7,
      marginTop: 40,
    },

    opcoesAlternativasText:{
      fontSize:20,
      color: colorScheme == "dark" ? "white" : "black",
      textDecorationLine: "underline",
      marginTop: "5%",
      textAlign: "center"
    },
  });

//***********************************************Tela*********************************************************************//
  return (
      <>
      <KeyboardAwareScrollView style={styles.main}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Pressable>
              <Link replace href={data ? "../../pagesWithoutHeader/AccountSettings" : "../Login"}>
                <Icon name="arrow-back" size={24} color={colorScheme === "dark" ? "#FFFFFF" : "#000000"} />
              </Link>
            </Pressable>
          </View>

          <View style={styles.content}>
            <Logo/>
            <View style={styles.form}>
              <Text style={styles.title}>Informe seu e-mail para alterar a sua senha: </Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />

              <Pressable style={styles.button} onPress={tokenGenerate}>
                <Text style={styles.button.text}>Enviar código</Text>
              </Pressable>

              <Pressable style={styles.opcoesAlternativas} onPress={changePage}>
                <Text style={styles.opcoesAlternativasText}>Já tenho um código</Text>
              </Pressable>

            </View>

          </View>
        </View>
      </KeyboardAwareScrollView>

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
