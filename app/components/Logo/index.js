import React from "react"
import { View, Image, StyleSheet, Appearance} from "react-native"

export default function Logo(){
  const colorScheme = Appearance.getColorScheme();
  if(colorScheme === "dark"){
    var imagem = require("../../../assets/images/logoDarkMode.png")
  }else{
    var imagem = require("../../../assets/images/logo.png")
  }

  const styles = StyleSheet.create({
    container:{ 
      width: "100%", 
      height: 240,
      justifyContent: "center",
      alignItems: "center",
    },
    image:{
      width: colorScheme === "dark" ?  "80%" : "100%"
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
