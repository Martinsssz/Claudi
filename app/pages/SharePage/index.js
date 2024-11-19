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

import BackArrow from "../../components/BackArrow"
import { mostrarUsuario } from "../../sqlite/dbService";


export default function SharePage() {
  //**********************************************HOOKS**********************************************************************//
  let { idTable } = useGlobalSearchParams()
  const {width, height} = Dimensions.get('window')
  if(!idTable){
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
  }, [])




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

    code: {
      backgroundColor: colorScheme == "dark" ? cores.azulClaro1Light : cores.ghostWhite,
      width: "100%",
      padding: PixelRatio.get() * 8,
      alignItems: "center"
    },
    codeText: {
      color: cores.black,
      fontSize: PixelRatio.getFontScale() * 20
    },
    title: {
      color: colorScheme == "dark" ? cores.ghostWhite : cores.black,
      fontSize: PixelRatio.getFontScale() * 25,
    },

    userField:{
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      borderColor: "white",
      borderWidth: 1,
      padding: PixelRatio.get()*5
    },
    user:{
      flexDirection: "row",
      alignItems: "center",
      gap: PixelRatio.get() * 5
    }, 
    textUser:{
      fontSize: PixelRatio.getFontScale()*20,
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
    }
  });
  //***********************************************Tela***************************************************************************//
  return (
    <>
      <ScrollView
        style={styles.fundo}
        contentContainerStyle={styles.contentContainer}
      >
        <BackArrow link={"pages/pagesWithHeader/HomePage"} />
        <View style={styles.code}>
          <Text style={styles.codeText}>Código: {data['token']}</Text>
        </View>

        <Text style={styles.title}>Pessoas com acesso</Text>
        {data && data['usersData'] && data['usersData'][0] ? (
          data['usersData'].map(user => (
            <View style={styles.userField} key={user['id']}>

              <View style={styles.user}>
                <Ionicons name="person-circle-outline" style={styles.picture}/>
                <Text style={styles.textUser}>{user['username']}</Text>
              </View>

              <Pressable style={styles.trashUser} onPress={(e) => deleteUser(user['id'])}>
                <Ionicons name='trash-outline' style={styles.deleteAUserText} />
              </Pressable>

            </View>
          ))
        ) : (
          <Text style={styles.textUser}>Não há ninguém aqui =(</Text>
        )}
      </ScrollView>
    </>
  );
}
