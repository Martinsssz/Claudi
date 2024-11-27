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
} from "react-native";

//********************************************Import de depêndencias e componentes**********************************************//
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { Appearance } from "react-native";
import cores from "../../../Util/coresPadrao";
import { Link, router } from "expo-router";
import { adicionarFixado, deleteFixado, mostrarFixados, mostrarUsuario } from "../../../sqlite/dbService";
import ip from "../../../Util/localhost";

export default function HomePage() {
  //**********************************************HOOKS**********************************************************************//

  const [modalVisible, setModalVisible] = useState(false)
  const panY = useRef(new Animated.Value(0)).current
  const [isEditing, setIsEditing] = useState(false)
  const [horarioEditando, setHorarioEditando] = useState(null)
  const [fixedHorarios, setFixedHorarios] = useState([])

  const [refresh, setRefresh] = useState(0)

  const [horarios, setHorarios] = useState([])

  async function getData() {
    let user = await mostrarUsuario();
    try {
      const response = await fetch(`${ip}/getTimelines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id
        }),
      });

      const timelines = await response.json();
      console.log(timelines)

      setHorarios(timelines['timelines']);
      //fixar tabelas
      fixarHorarios()
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  useEffect(() => {
    getData()
  }, [refresh])

  async function fixarHorarios() {
    await mostrarFixados().then(element => {
      if (element.length > 0) {
        element.forEach(id => {
          handleFixarHorario(id, true)
        })
      }
    })
  }
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

  async function changeNameOnDataBase(id, newName) {
    try {
      await fetch(`${ip}/renameTimeline`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timelineId: id,
          newName: newName
        }),
      });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  async function deleteTimeline(id) {
    let user = await mostrarUsuario()
    try {
      const response = await fetch(`${ip}/deleteTimeline`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timelineId: id,
          user: user.id
        }),
      });

      if (response.status == 200) {
        setRefresh((prev) => prev + 1)
        closeModal()
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  async function copyTimeline(id){
    let user = await mostrarUsuario()
    try {
      const response = await fetch(`${ip}/copyTimeline`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timelineId: id,
          userId: user.id
        }),
      });

      if (response.status == 200) {
        setRefresh((prev) => prev + 1)
        closeModal()
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  const handleNomeChange = (id, novoNome) => {
    setHorarios((prevHorarios) =>
      prevHorarios.map((horario) =>
        horario.id === id ? { ...horario, name: novoNome } : horario
      )
    );

  };

  const findTimeline = (timeline_id) => {
    // Achando o elemento para editar
    let result = horarios.filter((item) => item.id == timeline_id)
    return result[0]
  }

  useEffect(() => {
    if (!isEditing && horarioEditando != null) {
      let horario = findTimeline(horarioEditando)
      changeNameOnDataBase(horarioEditando, horario['name'])
    }
  }, [isEditing, horarioEditando])

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          Animated.event([null, { dy: panY }], {
            useNativeDriver: false,
          })(_, gestureState);
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
  ).current

  const openModal = (id) => {
    setHorarioEditando(id)
    panY.setValue(0);
    setModalVisible(true);
  }

  const handleEditClick = () => {
    setIsEditing(true)
    setModalVisible(false)

  }

  const closeModal = () => {
    setIsEditing(false)
    setModalVisible(false)
  }

  const handleFixarHorario = async (id, alredyInBD, user) => {



    setFixedHorarios((prevFixed) => {
      if (prevFixed.includes(id) && user) {
        deleteFixado(id)
        return prevFixed.filter((horarioId) => horarioId !== id)
      } else {
        alredyInBD ? null : adicionarFixado(id)
        return [id, ...prevFixed]

      }
    })


    setHorarios((prevHorarios) => {
      const horarioToFix = prevHorarios.find((horario) => horario.id === id)
      const otherHorarios = prevHorarios.filter((horario) => horario.id !== id)
      return [horarioToFix, ...otherHorarios]
    })
    setModalVisible(false)
  }

  const shareTimeline = (id) => {
    console.log(`aaaaa: ${fixedHorarios}`)
    router.push({
      pathname: "../../SharePage",
      params: { idTable: id }
    })
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
      flexGrow: 1
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
      elevation: 5,
      marginVertical: 30,
      width: "70%",
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
      color: colorScheme === "dark" ? cores.ghostWhite : cores.azulEscuroDark,
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
    iconFixed: {
      position: "absolute",
      top: 5,
      right: 5,
      zIndex: 1,
      transform: [{ rotate: "45deg" }],
    }
  });
  //***********************************************Tela***************************************************************************//
  return (
    <>
      <ScrollView
        style={styles.fundo}
        contentContainerStyle={styles.contentContainer}
      >
        {horarios && horarios[0] ? (

          <View style={{ flexDirection: "column", alignItems: "flex-start" }}>
            {horarios.map((horario) => (
              <View key={horario.id} style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
                <TouchableOpacity

                  onPress={() => router.push({
                    pathname: horario.type == 0 ? '/pages/FluxoRotina/PersonalSchedule' : '/pages/FluxoRotina/SchoolSchedule',
                    params: { idTable: JSON.stringify(horario.id) }
                  })}

                  style={styles.containerHorario}
                >
                  {fixedHorarios.includes(horario.id) && (
                    <Ionicons
                      name="pin"
                      size={20}
                      color={colorScheme === "dark" ? cores.ghostWhite : cores.azulEscuro}
                      style={styles.iconFixed} />

                  )}
                  {horarioEditando === horario.id && isEditing ? (
                    <TextInput
                      value={horario.name}
                      onChangeText={(text) => handleNomeChange(horario.id, text)}
                      autoFocus={true}
                      style={styles.tituloHorario}
                      onBlur={() => {
                        setIsEditing(false)
                        closeModal()
                      }}
                    />
                  ) : (
                    <Text style={styles.tituloHorario}>{horario.name}</Text>
                  )}
                  <Text style={styles.subtituloHorario}> {horario.type == 0 ? "Horário pessoal" : "Horário escolar"}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => openModal(horario.id)} style={styles.dotsButton}>
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={35}
                    color={colorScheme === "dark" ? cores.ghostWhite : cores.azulEscuroDark}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>

        ) : (
          <>
            <Text style={{
              color: colorScheme == "dark" ? cores.ghostWhite : cores.black,
              fontSize: PixelRatio.getFontScale() * 40,
              marginBottom: PixelRatio.get() * 5
            }}>Bem-Vindo</Text>

            <Text style={{
              color: colorScheme == "dark" ? cores.ghostWhite : cores.black,
              fontSize: PixelRatio.getFontScale() * 23
            }}>Aperte o botão abaixo para criar um horário</Text>
          </>
        )}
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

            {findTimeline(horarioEditando) && findTimeline(horarioEditando)['owner'] && (
              <TouchableOpacity style={styles.menuItem} onPress={handleEditClick}>
                <Ionicons name="pencil" size={20} style={styles.icon} />
                <Text style={styles.menuItemText}>Editar nome</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="cloud-upload" size={20} style={styles.icon} />
              <Text style={styles.menuItemText}>Exportar horário</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleFixarHorario(horarioEditando, false, true)}>
              <Ionicons name="pin" size={20} style={styles.icon} />
              <Text style={styles.menuItemText}>{fixedHorarios.includes(horarioEditando) ? "Desfixar horário" : "Fixar horário"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => deleteTimeline(horarioEditando)}>
              <Ionicons name="trash" size={20} style={styles.icon} />
              <Text style={styles.menuItemText}>Excluir horário</Text>
            </TouchableOpacity>

            {findTimeline(horarioEditando) && findTimeline(horarioEditando)['owner'] && (
              <TouchableOpacity style={styles.menuItem} onPress={() => shareTimeline(horarioEditando)}>
                <Ionicons name="arrow-redo" size={20} style={styles.icon} />
                <Text style={styles.menuItemText}>Compartilhar</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.menuItem} onPress={() => copyTimeline(horarioEditando)}>
              <Ionicons name="copy" size={20} style={styles.icon} />
              <Text style={styles.menuItemText}>Fazer uma cópia</Text>
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
