import React from "react"
import { View, Image, StyleSheet, Appearance} from "react-native"

export default function Logo({header}){
  const colorScheme = Appearance.getColorScheme();
  if(colorScheme === "dark"){
    var imagem = require("../../../assets/images/logoDarkMode.png")
  }else{
    var imagem = require("../../../assets/images/logo.png")
  }

  const styles = StyleSheet.create({
    container:{ 
      width: "80%",
      justifyContent: "center",
      alignItems: "center",
      aspectRatio: 1,
    },
    image:{
      height: header ? "100%" : "120%",
      aspectRatio: 1,
    }
    
  })
  
  return(
    <View style={styles.container}>
      <Image
          source={imagem}
          style={styles.image}
          resizeMode="contain"
      ></Image>
    </View>
  )


}

