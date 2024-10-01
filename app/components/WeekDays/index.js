//Import de componentes
import {
  View,Text,
  StyleSheet,
  Pressable,
  Appearance,
} from 'react-native'
//********************************************Import de depêndencias e componentes******************************************//
import React, { useState, useEffect } from 'react'
import cores from '../../Util/coresPadrao'


export default function WeekDays({handleWeek, orientation}){
//**********************************************Hooks**********************************************************************//

const [json, setJson] = useState({})

//********************************************Variáveis******************************************************************//
const labelDias = ['D','S','T','Q','Q','S',"S"]


//**********************************************Alteração automática de tema*****************************************************//
  const[colorScheme, setColorScheme] = useState(Appearance.getColorScheme())

  useEffect(() => {
    const listener = Appearance.addChangeListener(( scheme ) => {
      setColorScheme(scheme.colorScheme)
    })
    return () => listener.remove()
  }, [])
  
//************************************************Funções**********************************************************************//  
const getColor = (id) => {
  const value = id in json ? cores.azulDark : null;

  return value;
};

function clique(id) {
  const updatedJson = { ...json }

  if (id in updatedJson) {
    delete updatedJson[id]
  } else {
    updatedJson[id] = undefined 
  }

  setJson(updatedJson)
  handleWeek(updatedJson)
}
//**********************************************Animações**********************************************************************//

//***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({ 
    principal:{
      flexDirection: orientation,
      backgroundColor: colorScheme == "dark" ? cores.ciano : cores.ghostWhite,
      borderColor:"black",
      width: "auto",
      alignItems: "center",
      justifyContent: "space-around",
      padding: orientation == "column" ? 10 : 5, 
      gap: orientation == "column" ? 27 : 10, 
      alignSelf: "flex-start"
    },
    weekDay:{
      padding:3,
      aspectRatio:1,
      flex:1,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      borderColor:"black",
      borderWidth: 1
    },

    text:{
      color:"black",
      fontSize: 18,
    }
  })
//***********************************************Tela****************************************************************************//
  return(
    <View style={styles.principal}>
      {["1","2","3","4","5","6","7"].map( (day,index) => (
        <Pressable 
          key={day}
          style={[
            styles.weekDay, 
            {backgroundColor: getColor(day)},
          ]} 
          onPress={ () => clique(day) }
        >
          <Text style={ [styles.text, {color: day in json ? "white" : "black"} ] }> 
            {labelDias[index]}
          </Text>

        </Pressable>
      ))}

    </View>
  )
}