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
import PasswordInput from "../PasswordInput";

export default function EditableInputLabel({
  label,
  type,
  value,
  handleInputChange,
}) {
  const [isEditing, setIsEditing] = useState(false);
  let colorScheme = Appearance.getColorScheme();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  //Estilos
  const styles = StyleSheet.create({
    container: {
      width: "100%",
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
      width: "90%",
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
      width: "60%",
      //Fim da borda
    },
    text: {
      flex: 1,
      fontSize: 20,
      color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
      paddingBottom: 10,
    },
    icon: {
      marginLeft: 50,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}:</Text>

      {isEditing ? (
        type === "password" ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <PasswordInput
              placeHolder={"Senha"}
              handleText={handleInputChange}
              value={value}
              style={styles.inputAfter}
            />
            <View styles={styles.icon}>
              <TouchableOpacity onPress={handleEditClick}>
                <Ionicons
                  name="close-circle"
                  size={24}
                  color={cores.black}
                  alignSelf="flex-end"
                  padding={5}
                ></Ionicons>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              value={value}
              onChangeText={(texto) => handleInputChange(texto)}
              autoFocus={true}
              placeholder={label}
              style={styles.inputAfter}
            />
            <View styles={styles.icon}>
              <TouchableOpacity onPress={handleEditClick}>
                <Ionicons
                  name="close-circle"
                  size={24}
                  color={cores.black}
                  alignSelf="flex-end"
                  padding={5}
                ></Ionicons>
              </TouchableOpacity>
            </View>
          </View>
        )
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.inputBefore}>{value}</Text>
          <View styles={styles.icon}>
            <TouchableOpacity onPress={handleEditClick}>
              <Ionicons
                name="pencil"
                size={24}
                color={cores.black}
                marginLeft={10}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
