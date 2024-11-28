//Import de componentes
import {
  StyleSheet,
  ScrollView,
  View,
  Appearance,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  PixelRatio,
} from 'react-native'
import React, { useState, useEffect } from 'react'

//********************************************Import de depêndencias e componentes***********************************************//
import cores from '../../Util/coresPadrao'
import WeekDays from '../../components/WeekDays'
import LabelAndHour from '../../components/LabelAndHour'
import InputLabel from '../InputLabel'
import { checkName } from '../../Util/checkData'


export default function Task({data, handleData, id}){
//**********************************************HOOKS**********************************************************************//
  const[name, setName] = useState("")
  const[dataTask, setDataTask] = useState({'days': {}})

  const {width, height} = Dimensions.get('window')

  useEffect(() => {
    if(data['tasks']['fix'][id] !== null){
      setName(data['tasks']['fix'][id]['name'])

      let copyOfData = {...dataTask}
      copyOfData['days'] = data['tasks']['fix'][id]['days']
      setDataTask(copyOfData)
    }

  },[])
  
//**********************************************Alteração automática de tema*****************************************************//
  const[colorScheme, setColorScheme] = useState(Appearance.getColorScheme())
  useEffect(() => {
    const listener = Appearance.addChangeListener(( scheme ) => {
      setColorScheme(scheme.colorScheme)
    })
    return () => listener.remove()
  }, [])

//************************************************FUNÇÕES**********************************************************************//

  useEffect(() =>{
    let keysOfTask = Object.keys(dataTask)
    let updateData
    keysOfTask.forEach(day =>{
      if(dataTask[day] && dataTask[day]['start'] && dataTask[day]['end'] ){
        let startTask = dataTask[day]['start']
        let endTask  = dataTask[day]['end']

        let startDay = data[day]['start']
        let endDay = data[day]['end']

        let hourStartTaks = new Date(`1970-01-01T${startTask}:00`)
        let hourEndTask = new Date(`1970-01-01T${endTask}:00`)
        let hourStartDay = new Date(`1970-01-01T${startDay}:00`)
        let hourEndtDay = new Date(`1970-01-01T${endDay}:00`)

        if( !(hourEndTask > hourEndtDay || hourStartTaks <  hourStartDay) && name !== "" ){
          updateData = {"start": startTask, "end": endTask}
          handleData(id, day, updateData)
        }
      }
    })
    
  }, [dataTask])


  useEffect(() => {
    let nameCheck = checkName(name)
    let keysOfData = Object.keys(dataTask['days'])
    const hasNullValue = keysOfData.some(key => dataTask['days'][key] == null)

    if(nameCheck && !hasNullValue && Object.keys(dataTask['days']).length > 0  ){
      let copyOfData = {...data}
      copyOfData['tasks']['fix'][id] =  {
        "name" : name,
        "days":  dataTask['days']
      }
      handleData(copyOfData)
      console.log('Depois de alterar:', JSON.stringify(copyOfData, null, 2));
    }

  }, [name, dataTask])
//************************************************Variáveis**********************************************************************//
  let orderDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  let days = Object.keys(data['days'])
  days = orderDays.filter((day) => days.includes(day))
  
//**********************************************Animações**********************************************************************//

//***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({ 
    principal:{
      backgroundColor: colorScheme === "dark" ? cores.azulDark : cores.ghostWhite2,
      height: "auto",
      paddingVertical:20,
      paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(15),
      borderRadius: PixelRatio.get() * 3,
      borderColor: cores.black,
      borderWidth: 2,
    },
    
    styleContent:{
      justifyContent:"flex-start",
      gap: 0
    },

    scroll:{
      width:"100%",
      height: "auto",
    },

    scrollContent:{
      flexDirection:"row",
      justifyContent: "flex-start",
      gap:PixelRatio.get() * 5,
      paddingVertical: PixelRatio.get()*10,
      left:0
    },

    labels:{
      width: "100%",
      alignItems: "flex-start",
      justifyContent:  "space-around",
    },
  })
//***********************************************Tela****************************************************************************//
  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={{ flex: 1 }} 
    >
      <ScrollView style={styles.principal} contentContainerStyle={styles.styleContent}>
        <InputLabel 
          label="Tarefa" 
          typeInput="text" 
          value={name}
          handleText={ (text) => setName(text) }
        />
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <WeekDays handleWeek={setDataTask} orientation={"column"} data={dataTask} dias={days} background={false}/>

          <View style={styles.labels}>
            {days.map((component) => (
              <LabelAndHour 
                label1={"Início"} 
                label2={"Fim"}  
                handleData={setDataTask} 
                data={dataTask}
                isActived={ component in dataTask['days'] }
                id={component}
                key={component}
              />
            ))}
          </View>
        </ScrollView>
      </ScrollView>

    </KeyboardAvoidingView>
  )
}