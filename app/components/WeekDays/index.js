//Import de componentes
import {
  View,Text,
  StyleSheet,
  Pressable,
  Appearance,
  Dimensions,
  PixelRatio
} from 'react-native'
//********************************************Import de depêndencias e componentes******************************************//
import React, { useState, useEffect } from 'react'
import cores from '../../Util/coresPadrao'


export default function WeekDays({handleWeek, orientation, dias, data}){
//**********************************************Hooks**********************************************************************//

  const [json, setJson] = useState({})
  const {width, height} = Dimensions.get('window')

//********************************************Variáveis******************************************************************//
  const days = {
    "sunday": "D",
    "monday": "S",
    "tuesday": "T",
    "wednesday": "Q",
    "thursday": "Q",
    "friday": "S",
    "saturday": "S"
  }

  let keys = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
  if(dias){
    let  newKeys = []
    keys.forEach(key => {
      if(dias.includes(key)){
        newKeys.push(key)
      }
    });
    keys = newKeys
  }

  useEffect(() => {
    if(data){
      setJson(data['days'])
    }
  }, [data])
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
    updatedJson[id] = null 
  }

  setJson(updatedJson)
  let copyOfData = {...data}
  copyOfData['days'] = updatedJson
  handleWeek(copyOfData)
  console.log(data)
}
//**********************************************Animações**********************************************************************//

//***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({ 
    principal:{
      flexDirection: "column",
      backgroundColor: colorScheme == "dark" ? cores.ciano : cores.ghostWhite2,
      borderColor:"black",
      borderWidth:colorScheme == "dark" ? 0 : 1,
      width: "15%",
      alignItems: "center",
      justifyContent: "space-around",
      padding: orientation == "column" ? 10 : 5, 
      gap: orientation == "column" ? 30 : 10, 
      alignSelf: "flex-start"
    },

    weekDay:{
      padding: PixelRatio.get()*2,
      aspectRatio:1,
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
      {keys.map( (day) => (
        <Pressable 
          key={day}
          style={[
            styles.weekDay, 
            {backgroundColor: getColor(day)},
          ]} 
          onPress={ () => clique(day) }
        >
          <Text style={ [styles.text, {color: day in json ? "white" : "black"} ] }> 
            {days[day]}
          </Text>

        </Pressable>
      ))}

    </View>
  )
}