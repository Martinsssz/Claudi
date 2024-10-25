//COMPONENTES

import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Appearance, Dimensions } from "react-native";
import Slider from "@react-native-community/slider";

export default function ScrollBar() {
  //*************************************************HOOKS********************************************************************//

  const [value, setValue] = useState(0); // Valor inicial da barra

  const screenWidth = Dimensions.get("window").width;

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
    container: {
      width: "100%", 
      alignSelf: "center",
      marginTop: 20,
      backgroundColor: "#000",
      padding: 10,
    },
    slider: {
      height: 30, 
    },
  });

  //***********************************************Tela****************************************************************************//

  return (
    <View style={[styles.container, { width: screenWidth }]}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={100}
        value={value}
        onValueChange={(val) => setValue(val)}
        minimumTrackTintColor="#94B3C5" 
        maximumTrackTintColor="#94B3C5" 
        thumbTintColor="#346788" 
      />
    </View>
  );
}
