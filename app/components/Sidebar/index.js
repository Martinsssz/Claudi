
///Import de componentes
import { 
  View , 
  Text, 
  StyleSheet,
  Pressable,
  Animated
} from "react-native";

//********************************************Import de depêndencias e componentes**********************************************//
import React from "react";
import { useState, useEffect, useRef } from "react";
import cores from "../../Util/coresPadrao";
import { Appearance } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import Popup from "../Popup";
  

export default function Sidebar({rotaAtual}){
//**********************************************UseStates**********************************************************************//
  const [popup,setPopup] = useState(false) 
  const [tela, setTela] = useState(rotaAtual)

  useEffect(() =>{
    setTela(rotaAtual)
  }, [rotaAtual])

//**********************************************Alteração automática de tema*****************************************************//
  const[colorScheme, setColorScheme] = useState(Appearance.getColorScheme())

  useEffect(() => {
    const listener = Appearance.addChangeListener(( scheme ) => {
      setColorScheme(scheme.colorScheme)
    })
    return () => listener.remove()
  }, [])

//**********************************************Animações**********************************************************************//
  const left = useRef(new Animated.Value(280)).current;  
  Animated.timing(left, {
    toValue: 0,
    duration: 500,
    useNativeDriver: false,
  }).start();

//************************************************Funções**********************************************************************//

//***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({
    container:{
      ...StyleSheet.absoluteFillObject, // Preenche toda a área disponível
      flexDirection:"row",
      justifyContent:"flex-end",
      alignItems:"flex-end",
      zIndex: 2, 
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    sidebar:{
      backgroundColor: colorScheme === "dark" ? cores.azulDark : cores.azulLight,
      height: "86%",
      width: "70%",
      paddingHorizontal: 10,
      paddingVertical: 30,
      justifyContent:"space-between",
      left: left,
      borderTopLeftRadius:5,
      borderBottomLeftRadius: 5
    },

    options:{
      flexDirection:"column",
      gap: 15
    },
    optionText:{
      fontSize: 20,
      color: colorScheme === "dark" ? "white" : "black"
    },
    option:{
      padding: 20,
    },
    selecionado:{
      backgroundColor: `${cores.azulEscuroDark}CC`,
      padding: 20,
      borderRadius:10,
      
    }
  })
//***********************************************Tela****************************************************************************//
  return(
    <>
      <View style={styles.container}> 
        <Animated.View style={styles.sidebar}> 

          <View style={styles.options}> 

            <Link href={"/pages/pagesWithHeader/HomePage"} asChild>
              <Pressable 
                style={tela === "/pages/pagesWithHeader/HomePage" ? styles.selecionado : styles.option}
              >
                <Text style={styles.optionText}>Página inicial</Text>
              </Pressable>
            </Link>

            <Link href={"/pages/pagesWithoutHeader/AccountSettings"} asChild>
              <Pressable 
                style={tela === "/pages/pagesWithoutHeader/AccountSettings" ? styles.selecionado : styles.option}
              >
                <Text style={styles.optionText}>Configurações da conta</Text>
              </Pressable>
            </Link>

            <Link href={"#"} asChild>
              <Pressable 
                style={tela === "/pages/pagesWithHeader/ImportTimeline" ? styles.selecionado : styles.option}
              >
                <Text style={styles.optionText}>Importar horário</Text>
              </Pressable>
            </Link>

            <Pressable>
            </Pressable>

          </View>

          <Pressable style={styles.option}onPress={() => setPopup(!popup) } >
            <Ionicons></Ionicons>
            <Text style={styles.optionText}>Sair da conta</Text>
          </Pressable>
          
        </Animated.View>
      </View>

      {popup &&(
        <Popup 
          message = "Tem certeza que deseja sair?"
          cor     = "yellow"
          option  = "Sair da conta"
          link    = "/pages/Signup" 
          handle  = {setPopup}
        />
      )}

    </>
  )
}