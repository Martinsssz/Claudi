//Import de componentes
import {
  View,Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Appearance,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  PixelRatio
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useGlobalSearchParams  } from 'expo-router'

//********************************************Import de depêndencias e componentes***********************************************//
import BackArrow from "../../../components/BackArrow"
import cores from '../../../Util/coresPadrao'
import Task from '../../../components/Task'
import { Ionicons } from '@expo/vector-icons'


export default function TaskList(){
//**********************************************HOOKS**********************************************************************//
  const[dataTask, setDataTask] = useState({"key1": {}})


  const {width, height} = Dimensions.get('window')

  let {data} = useGlobalSearchParams()
  data = JSON.parse(data)
  

//**********************************************Alteração automática de tema*****************************************************//
  const[colorScheme, setColorScheme] = useState(Appearance.getColorScheme())
  useEffect(() => {
    const listener = Appearance.addChangeListener(( scheme ) => {
      setColorScheme(scheme.colorScheme)
    })
    return () => listener.remove()
  }, [])
  
//************************************************Funções**********************************************************************//  
  let numeroComponents = []
  for(i=1;i<=7;i++){
    numeroComponents.push(`${i}`)
  }

  useEffect(() => {
    console.log("Estado atual de dataTasks:", dataTask)
  }, [dataTask])

  useEffect(() => {return}, [])

  function createTask(){
    let id
    let keys = Object.keys(dataTask)
    do {
      id = Math.floor(Math.random() * 1000000).toString()
    }  while (keys.some(key => key.endsWith(`-${id}`)))
    let copyOfTasksObject = dataTask
    const dynamicKey = `undefined-${id}`

    copyOfTasksObject[dynamicKey] =  {}
    setDataTask(copyOfTasksObject)
  
  
  }

  function deleteTask(key) {
    console.log("Entrou aqui")
    let copyOfTasksObject = {...dataTask}
    delete copyOfTasksObject[key]

    setDataTask(copyOfTasksObject)
  }
//**********************************************Animações**********************************************************************//

//***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({ 
    principal:{
      backgroundColor: colorScheme === "dark" ? cores.azulEscuroDark : cores.azulClaro1Light,
      height: "100%",
      width:"100%",
      paddingVertical:20,
      paddingHorizontal:15,
    },
    
    styleContent:{
      justifyContent:"flex-start",
      gap: PixelRatio.get() * 10
    },

    title:{
      fontSize: PixelRatio.getFontScale()*35,
      textAlign: "center",
      color: colorScheme === "dark" ? "white" : "black"
    },

    tasks:{
      gap: PixelRatio.get()*10,
      marginBottom: PixelRatio.get()*50
    },

    createATask:{
      alignSelf: "center",
      backgroundColor: colorScheme == "dark" ? cores.azulClaro1Light : cores.azulEscuro1Light,
      padding: PixelRatio.get()*2,
      aspectRatio: 1,
      borderRadius: 1000,
      alignItems: "center",
      marginBottom: PixelRatio.get()*15
      },

    createATaskText:{
      color:  colorScheme == "dark" ? cores.azulEscuro1Light : cores.azulClaro1Light,
      fontSize: PixelRatio.getFontScale()*30
    },
    
    optionsTasks:{
      flexDirection:  "row",
      justifyContent: "center",
      gap: PixelRatio.get()*7

    }
  })
//***********************************************Tela****************************************************************************//
  return(
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }} 
      >
        <ScrollView style={styles.principal} contentContainerStyle={styles.styleContent}>
          <BackArrow link={"../../pagesWithHeader/ChoiceTimeline"}></BackArrow>
          <Text style={styles.title}>Compromissos</Text>
          <ScrollView contentContainerStyle={styles.tasks}>
            {dataTask && Object.keys(dataTask).length > 0 ? (
              Object.keys(dataTask).map((key, index) => (
                <>
                  <Task data={dataTask} handleData={setDataTask} id={key} key={key}/>
                  <View style={styles.optionsTasks}>
                    {index+1 == Object.keys(dataTask).length && (
                      <Pressable style={styles.createATask} onPress={createTask}>
                        <Text style={styles.createATaskText}>
                          <Ionicons name='add-outline' style={styles.createATaskText}/>
                        </Text>
                      </Pressable>
                    )}
                    <Pressable style={styles.createATask} onPress={(e) => deleteTask(key)}>
                      <Ionicons name='trash-outline' style={styles.createATaskText}/>
                    </Pressable>
                  </View>
                </>
              ))
            ):(
              <Pressable style={styles.createATask} onPress={createTask}>
                <Text style={styles.createATaskText}>+</Text>
              </Pressable>
            )}
          </ScrollView>

        </ScrollView>

      </KeyboardAvoidingView>
    </>
  )
}