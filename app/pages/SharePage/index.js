//Import de componentes
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
  PanResponder,
  TextInput,
  Animated,
  PixelRatio,
  Dimensions
} from "react-native";

//********************************************Import de depêndencias e componentes**********************************************//
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Appearance } from "react-native";
import cores from "../../Util/coresPadrao";
import { Link, router, useGlobalSearchParams } from "expo-router";
import ip from "../../Util/localhost";
import Popup from "../../components/Popup"

import BackArrow from "../../components/BackArrow"
import { mostrarUsuario } from "../../sqlite/dbService";


export default function SharePage() {
  //**********************************************HOOKS**********************************************************************//
  let { idTable } = useGlobalSearchParams()
  const [refresh, setRefresh] = useState(0)

  const [popup1, setPopup1] = useState(false)
  const [popup2, setPopup2] = useState(false)
  const [popupText, setPopupText] = useState("")
  const [idClickUser, setIdClickUser] = useState("")

  const { width, height } = Dimensions.get('window')
  if (!idTable) {
    router.navigate("pages/pagesWithHeader/HomePage")
  }

  const [data, setData] = useState({})

  async function getData() {
    let user = await mostrarUsuario();
    try {
      const response = await fetch(`${ip}/timelineShareData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          timelineId: idTable
        }),
      });

      const datas = await response.json();
      console.log(datas)
      setData(datas)

    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  useEffect(() => {
    getData()
  }, [refresh])

  //**********************************************Alteração automática de tema***************************************************//
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const listener = Appearance.addChangeListener((scheme) => {
      setColorScheme(scheme.colorScheme);
    });
    return () => listener.remove();
  }, []);
  //**********************************************Animações**********************************************************************//

  //************************************************Funções**********************************************************************//
  function confirmDeleteUser(id) {
    let username = data['usersData'].filter((item) => item.id == id)[0]['username']
    console.log(username)
    setPopup1(true)
    setPopupText(username)
    setIdClickUser(id)
  }

  async function deleteUser(id) {
    try {
      const response = await fetch(`${ip}/removeAccessOf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timelineId: idTable,
          user: id
        }),
      });
      if (response.status == 200) {
        setRefresh((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  async function deleteAllUsersFromShare() {
    let user = await mostrarUsuario();
    try {
      const response = await fetch(`${ip}/removeAllAccesses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          timelineId: idTable
        }),
      });
      if (response.status == 200) {
        setRefresh((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  async function randomCodeAgain() {
    try {
      const response = await fetch(`${ip}/randomCodeAgain`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timelineId: idTable
        }),
      });
      if (response.status == 200) {
        setRefresh((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  //***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({
    fundo: {
      backgroundColor:
        colorScheme === "dark" ? cores.azulEscuroDark : cores.azulClaro1Light,
      padding: 20,
      height: "100%",
    },
    contentContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
      paddingVertical: 30,
      flexGrow: 1,
      gap: PixelRatio.get() * 10
    },
    title: {
      color: colorScheme == "dark" ? cores.ghostWhite : cores.black,
      fontSize: PixelRatio.getFontScale() * 27,
    },

    userField: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomColor: "white",
      borderBottomWidth: 1,
      padding: PixelRatio.get() * 5
    },
    user: {
      flexDirection: "row",
      alignItems: "center",
      gap: PixelRatio.get() * 5
    },
    textUser: {
      fontSize: PixelRatio.getFontScale() * 20,
      color: colorScheme == "dark" ? cores.ghostWhite : cores.black
    },

    trashUser: {
      alignSelf: "center",
      backgroundColor: colorScheme == "dark" ? cores.azulClaro1Light : cores.azulEscuro1Light,
      padding: PixelRatio.get() * 2,
      aspectRatio: 1,
      borderRadius: 1000,
      alignItems: "center",
    },

    deleteAUserText: {
      color: colorScheme == "dark" ? cores.azulEscuro1Light : cores.azulClaro1Light,
      fontSize: PixelRatio.getFontScale() * 30
    },
    picture: {
      color: colorScheme == "dark" ? cores.ghostWhite : cores.black,
      fontSize: PixelRatio.getFontScale() * 40
    },

    button: {
      backgroundColor: colorScheme == "dark" ? cores.azulEscuro2Light : cores.azulDark,
      flex: 1,
      padding: PixelRatio.get() * 3,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: PixelRatio.get() * 3,
    },

    codeAndButton: {
      width: "100%",
      gap: PixelRatio.get() * 2,
      flexDirection: "row",
      justifyContent: "center",
      right: PixelRatio.get() * 0,
    },

    deleteButton:{
      backgroundColor: colorScheme == "dark" ? cores.azulEscuro2Light : cores.azulDark,
      padding: PixelRatio.get() * 4,
      alignItems: "center",
      alignSelf: "flex-end",
      borderRadius: PixelRatio.get() * 3,
      bottom: PixelRatio.get()*2
      
    },
    code: {
      backgroundColor: colorScheme == "dark" ? cores.azulClaro1Light : cores.ghostWhite,
      padding: PixelRatio.get() * 4,
      alignItems: "center",
      borderRadius: PixelRatio.get() * 3,
      flex: 1.5
    },
    codeText: {
      color: "white",
      fontSize: PixelRatio.getFontScale() * 20,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      alignContent: "center"
    },
  });
  //***********************************************Tela***************************************************************************//
  return (
    <>
      <ScrollView
        style={styles.fundo}
        contentContainerStyle={styles.contentContainer}
      >
        <BackArrow link={"pages/pagesWithHeader/HomePage"} />
        <View style={styles.codeAndButton}>
          <View style={styles.code}>
            <Text style={[styles.codeText, {color: "black"}]}>Código: {data['token']}</Text>
          </View>

          <Pressable style={styles.button} onPress={randomCodeAgain}>
            <Text style={styles.codeText}>Novo código</Text>
          </Pressable>
        </View>


        <Text style={styles.title}>Pessoas com acesso: </Text>
        {data && data['usersData'] && data['usersData'][0] ? (
          data['usersData'].map(user => (
            <View style={styles.userField} key={user['id']}>

              <View style={styles.user}>
                <Ionicons name="person-circle-outline" style={styles.picture} />
                <Text style={styles.textUser}>{user['username']}</Text>
              </View>

              <Pressable style={styles.trashUser} onPress={() => confirmDeleteUser(user['id'])}>
                <Ionicons name='trash-outline' style={styles.deleteAUserText} />
              </Pressable>

            </View>
          ))
        ) : (
          <Text style={styles.textUser}>Compartilhe o código para que as pessoas acessem seu horário</Text>
        )}

        <Pressable style={styles.deleteButton} onPress={() => setPopup2(true)}>
          <Text style={styles.codeText}>Parar de compartilhar</Text>
        </Pressable>


      </ScrollView>

      {popup1 && (
        <Popup
          title="Atenção"
          message={`Tem certeza que deseja remover ${popupText} de sua lista?`}
          option="Confirmar"
          link="/pages/SharePage"
          handle={setPopup1}
          specialHandle={() => deleteUser(idClickUser)}
        />
      )}

      {popup2 && (
        <Popup
          title="Atenção"
          message="Tem certeza que deseja parar de compartilhar?"
          option="Confirmar"
          link="/pages/pagesWithHeader/HomePage"
          handle={setPopup2}
          specialHandle={deleteAllUsersFromShare}
        />
      )}
    </>
  );
}
