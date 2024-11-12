//Import de componentes
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Modal,
  PanResponder,
  Animated,
} from "react-native";

//********************************************Import de depêndencias e componentes**********************************************//
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect, useRef } from "react";
import { Appearance } from "react-native";
import cores from "../../../Util/coresPadrao";
import { Link } from "expo-router";
import { AnimateSharedLayout } from "framer-motion";

export default function HomePage() {
  //**********************************************UseStates**********************************************************************//
  const [modalVisible, setModalVisible] = useState(false);
  const panY = useRef(new Animated.Value(0)).current;

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

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          Animated.event([null, { dy: panY }], {
            useNativeDriver: false,
          })(_, gestureState)
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          setModalVisible(false);
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const openModal = () => {
    panY.setValue(0);
    setModalVisible(true);
  };

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
      gap: 20,
      alignItems: "flex-start",
      paddingVertical: 30,
    },

    h1: {
      color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
      fontSize: 40,
      fontWeight: "bold",
    },
    texto: {
      color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
      fontSize: 25,
    },
    dashboard: {
      height: 50,
      backgroundColor:
        colorScheme === "dark" ? cores.azulDark : cores.azulLight,
      alignItems: "center",
    },
    circulo: {
      width: "15%",
      aspectRatio: 1,
      backgroundColor:
        colorScheme === "dark" ? cores.azulDark : cores.azulLight,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
      transform: [{ translateY: -30 }],
    },
    containerHorario: {
      backgroundColor:
        colorScheme === "dark" ? cores.azulDark : cores.azulLight,
      padding: 15,
      borderRadius: 8,
      marginVertical: 30,
      elevation: 5,
      width: "70%",
      height: "70%",
      justifyContent: "center",
    },
    tituloHorario: {
      color: colorScheme === "dark" ? cores.ghostWhite : cores.black,
      fontSize: 18,
      fontWeight: "bold",
    },
    subtituloHorario: {
      color: colorScheme === "dark" ? cores.ghostWhite : cores.black,
      fontSize: 16,
      marginTop: 10,
    },
    dotsButton: {
      position: "absolute",
      right: -70,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    modalContent: {
      backgroundColor:
        colorScheme === "dark" ? cores.azulEscuroDark : cores.ghostWhite,

      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      elevation: 5,
    },
    menuItem: {
      flexDirection: "row",
      paddingVertical: 10,
      alignItems: "center",
    },
    icon: {
      marginRight: 10,
      color: colorScheme === "dark" ? cores.ghostWhite : cores.azulEscuroDark
    },
    menuItemText: {
      fontSize: 18,
      color: colorScheme === "dark" ? cores.ghostWhite : cores.black,
    },
    dragIndicator: {
      width: 60,
      height: 6,
      backgroundColor:
        colorScheme === "dark" ? cores.azulDark : cores.azulClaro1Light,
      borderRadius: 2.5,
      alignSelf: "center",
      marginVertical: 20,
    },
  });
  //***********************************************Tela***************************************************************************//
  return (
    <>
      <ScrollView
        style={styles.fundo}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.containerHorario}>
            <Text style={styles.tituloHorario}>Horário XXX</Text>
            <Text style={styles.subtituloHorario}>Horário Pessoal</Text>
          </View>
          <TouchableOpacity onPress={openModal} style={styles.dotsButton}>
            <Ionicons
              name="ellipsis-horizontal"
              size={35}
              color={
                colorScheme === "dark" ? cores.ghostWhite : cores.azulEscuroDark
              }
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Animated.View
            style={[styles.modalContent, { transform: [{ translateY: panY }] }]}
            {...panResponder.panHandlers}
          >
            <View style={styles.dragIndicator} />
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="pencil" size={20} style={styles.icon} />
              <Text style={styles.menuItemText}>Editar nome</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="cloud-upload" size={20} style={styles.icon} />
              <Text style={styles.menuItemText}>Exportar horário</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="pin" size={20} style={styles.icon} />
              <Text style={styles.menuItemText}>Fixar horário</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="trash" size={20} style={styles.icon} />
              <Text style={styles.menuItemText}>Excluir horário</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="arrow-redo" size={20} style={styles.icon} />
              <Text style={styles.menuItemText}>Compartilhar</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      <View style={styles.dashboard}>
        <Link href={"pages/pagesWithHeader/ChoiceTimeline"} asChild>
          <Pressable style={styles.circulo}>
            <Ionicons
              name="add"
              color={colorScheme === "dark" ? "#FFFFFF" : "#000000"}
              style={styles.botao}
              size={25}
            ></Ionicons>
          </Pressable>
        </Link>
      </View>
    </>
  );
}
