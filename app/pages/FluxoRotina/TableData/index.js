//Import de componentes
import {
  View,
  StyleSheet,
  Appearance,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import TableComponent from "../../../components/Table";

//********************************************Import de depêndencias e componentes***********************************************//
import cores from "../../../Util/coresPadrao";

import Toolbar from "../../../components/Toolbar";
import ScrollBar from "../../../components/Scrollbar";

export default function TableData() {
  //**********************************************HOOKS**********************************************************************//


  //**********************************************Alteração automática de tema*****************************************************//
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  useEffect(() => {
    const listener = Appearance.addChangeListener((scheme) => {
      setColorScheme(scheme.colorScheme);
    });
    return () => listener.remove();
  }, []);

  //************************************************Funções**********************************************************************//

  //**********************************************Animações**********************************************************************//

  //***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({
    principal: {
      backgroundColor:
        colorScheme === "dark" ? cores.azulEscuroDark : cores.azulClaro1Light,
      height: "100%",
      width: "100%",
      paddingVertical: 20,
      paddingHorizontal: 15,
    },

  });
  //***********************************************Tela****************************************************************************//
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.principal}>
          <Toolbar />
          <ScrollBar />
          <TableComponent headers={headers} data={data} />
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
