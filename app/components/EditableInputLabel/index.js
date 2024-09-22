import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Appearance,
  TouchableOpacity,
  label,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import cores from "../../Util/coresPadrao";

export default function EditableInputLabel({ label }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  let colorScheme = Appearance.getColorScheme();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  //Estilos
  const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    inputAfter: {
      flex: 4,
      color: "black",
      backgroundColor:
        colorScheme === "dark" ? cores.azulClaroDark : cores.ghostWhite,
      fontSize: 19,
      padding: 10,
      borderRadius: 7,
      paddingLeft: 7,
      //borda
      borderWidth: 1,
      borderStyle: "solid",
      borderBlockColor: "grey",
      borderRadius: 7,
      paddingRight: 7,
      width: "90%"
      //Fim da borda
    },
    inputBefore: {
      flex: 4,
      color: "grey",
      backgroundColor:
        colorScheme === "dark" ? cores.azulClaroDark : cores.ghostWhite,
      fontSize: 19,
      padding: 10,
      borderRadius: 7,
      paddingLeft: 7,
      //borda
      borderWidth: 1,
      borderStyle: "solid",
      borderBlockColor: "black",
      borderRadius: 7,
      paddingRight: 7,
      width: "60%"
      //Fim da borda
    },
    text: {
      flex: 1,
      fontSize: 20,
      color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
      paddingBottom: 10
    },
    icon: {
        marginLeft: 50
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}:</Text>

      {isEditing ? (
        <TextInput
          value={inputValue}
          onChangeText={handleInputChange}
          autoFocus={true}
          placeholder="Nome"
          style={styles.inputAfter}
        />
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.inputBefore}>
            {inputValue || "Esperando informações..."}
          </Text>
          <View styles={styles.icon}>
          <TouchableOpacity onPress={handleEditClick}>
            <Ionicons name="pencil" size={24} color={cores.black} marginLeft={10}></Ionicons>
          </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
