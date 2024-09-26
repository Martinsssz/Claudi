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
const [days,setDays] = useState([])

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
  const value = days.includes(id) ? cores.azulDark : null;

  return value;
};

function clique(id){

  if( days.includes(id) ){
    newDays = days.filter( (day) => day != id )
  }else{
    newDays = [...days, id]
  }
  setDays(newDays)
  handleWeek(newDays)

}
//**********************************************Animações**********************************************************************//

//***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({ 
    principal:{
      flexDirection: orientation,
      backgroundColor: colorScheme == "dark" ? cores.ciano : cores.ghostWhite,
      borderColor:"black",
      borderWidth: 2,
      width: "auto",
      alignItems: "center",
      justifyContent: "space-around",
      padding: orientation == "column" ? 10 : 5, 
      gap: orientation == "column" ? 30 : 10, 
      alignSelf: "flex-start"
    },
    weekDay:{
      padding:5,
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
      fontSize: 20,
    }
  })
//***********************************************Tela****************************************************************************//
  return(
    <View style={styles.principal}>
      {["d","s","t","q","qu","se","sa"].map( (day,index) => (
        <Pressable 
          key={day}
          style={[
            styles.weekDay, 
            {backgroundColor: getColor(day)},
          ]} 
          onPress={ () => clique(day) }
        >
          <Text style={ [styles.text, {color: days.includes(day) ? "white" : "black"} ] }>{labelDias[index]}</Text>
        </Pressable>
      ))}

    </View>
  )
}