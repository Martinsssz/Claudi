import React from "react"
import { View, Image, StyleSheet, Appearance } from "react-native"

export default function Logo({ header }) {
  const colorScheme = Appearance.getColorScheme();
  if (colorScheme === "dark") {
    var imagem = require("../../../assets/images/logoDarkMode.png")
  } else {
    var imagem = require("../../../assets/images/logo.png")
  }

  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      aspectRatio: 1,
    },
    image: {
      height: header ? "75%" : "25%",
      aspectRatio: 1,
    }

  })

  return (
    header ? (
      <View style={styles.container}>
        <Image
          source={imagem}
          style={styles.image}
          resizeMode="cover"
        ></Image>
      </View>
    ) : (
      <Image
        source={imagem}
        style={styles.image}
        resizeMode="cover"
      ></Image>
    )

  )
}

