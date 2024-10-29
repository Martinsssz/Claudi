//Import de componentes
import {
  View, Text,
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
import { useGlobalSearchParams } from 'expo-router'

//********************************************Import de depêndencias e componentes***********************************************//
import BackArrow from "../../../components/BackArrow"
import cores from '../../../Util/coresPadrao'
import Task from '../../../components/Task'
import { Ionicons } from '@expo/vector-icons'


export default function TaskList() {
  //**********************************************HOOKS**********************************************************************//
  const [dataTask, setDataTask] = useState({
    'days': {
      'monday': {'start':  '07:00', 'end': '23:59'},
      'tuesday': {'start':  '07:00', 'end': '23:59'},
      'wednesday': {'start':  '07:00', 'end': '23:59'},
      'thursday': {'start':  '07:00', 'end': '23:59'},
      'friday': {'start':  '07:00', 'end': '23:59'},
      'saturday': {'start':  '07:00', 'end': '23:59'},
      'sunday': {'start':  '07:00', 'end': '23:59'}
    },
    'tasks':{
        'fix':{
          '12545':{
            'name': "Escola",
            "days":{
              "monday": {"start": "8:20", "end": "16:40"},
              "tuesday": {"start": "8:20", "end": "16:40"},
              "wednesday": {"start": "8:20", "end": "16:40"},
              "thursday": {"start": "8:20", "end": "16:40"},
              "friday": {"start": "8:20", "end": "16:40"}
            }
          }
        },
        'random':{}
    }
  })

  const { width, height } = Dimensions.get('window')

  /*let { data } = useGlobalSearchParams()
  data = JSON.parse(data)
  useEffect(() => {
    setDataTask(data)
  }, [])
  */


  //**********************************************Alteração automática de tema*****************************************************//
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme())
  useEffect(() => {
    const listener = Appearance.addChangeListener((scheme) => {
      setColorScheme(scheme.colorScheme)
    })
    return () => listener.remove()
  }, [])

  //************************************************Funções**********************************************************************//  
  let numeroComponents = []
  for (i = 1; i <= 7; i++) {
    numeroComponents.push(`${i}`)
  }


  function createTask() {
    let id
    let keys = Object.keys(dataTask['tasks']['fix'])

    do {
      id = Math.floor(Math.random() * 1000000).toString()
    } while (keys.some(key => key.endsWith(`-${id}`)))
    
    let newKey = `task-${id}-${Date.now()}`
    let copyOfData = {...dataTask}
    copyOfData['tasks']['fix'][newKey] = null

    setDataTask(copyOfData)
    console.log(copyOfData)
  }

  function deleteTask(key) {
    let copyOfData = { ...dataTask }
    delete copyOfData['tasks']['fix'][key]

    setDataTask(copyOfData)
  }
  //**********************************************Animações**********************************************************************//

  //***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({
    principal: {
      backgroundColor: colorScheme === "dark" ? cores.azulEscuroDark : cores.azulClaro1Light,
      height: "100%",
      width: "100%",
      paddingVertical: 20,
      paddingHorizontal: 15,
    },

    styleContent: {
      justifyContent: "flex-start",
      gap: PixelRatio.get() * 10
    },

    title: {
      fontSize: PixelRatio.getFontScale() * 35,
      textAlign: "center",
      color: colorScheme === "dark" ? "white" : "black"
    },

    tasks: {
      gap: PixelRatio.get() * 10,
      marginBottom: PixelRatio.get() * 50
    },

    createATask: {
      alignSelf: "center",
      backgroundColor: colorScheme == "dark" ? cores.azulClaro1Light : cores.azulEscuro1Light,
      padding: PixelRatio.get() * 2,
      aspectRatio: 1,
      borderRadius: 1000,
      alignItems: "center",
    },

    createATaskText: {
      color: colorScheme == "dark" ? cores.azulEscuro1Light : cores.azulClaro1Light,
      fontSize: PixelRatio.getFontScale() * 30
    },

    optionsTasks: {
      flexDirection: "row",
      justifyContent: "center",
      gap: PixelRatio.get() * 7
    },

    taskView:{
      flexDirection: "column",
      gap: PixelRatio.get() * 15

    }

  })
  //***********************************************Tela****************************************************************************//
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.principal} contentContainerStyle={styles.styleContent}>
          <BackArrow link={"../../pagesWithHeader/ChoiceTimeline"}></BackArrow>
          <Text style={styles.title}>Compromissos</Text>
          <ScrollView contentContainerStyle={styles.tasks}>

            {dataTask && Object.keys(dataTask['tasks']['fix']).length > 0 ? (
              Object.keys(dataTask['tasks']['fix']).map((key, index) => (
                <View key={key} style={styles.taskView}>
                  <Task data={dataTask} handleData={setDataTask} id={key} key={key} />
                  <View style={styles.optionsTasks}>
                    {index + 1 == Object.keys(dataTask['tasks']['fix']).length && (
                      <Pressable style={styles.createATask} onPress={createTask}>
                        <Text style={styles.createATaskText}>
                          <Ionicons name='add-outline' style={styles.createATaskText} />
                        </Text>
                      </Pressable>
                    )}
                    <Pressable style={styles.createATask} onPress={(e) => deleteTask(key)}>
                      <Ionicons name='trash-outline' style={styles.createATaskText} />
                    </Pressable>
                  </View>
                </View>
              ))
            ) : (
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

/* 
Modelo:
'days': {
      'monday': {'start':  '07:00', 'end': '23:59'},
      'tuesday': {'start':  '07:00', 'end': '23:59'},
      'wednesday': {'start':  '07:00', 'end': '23:59'},
      'thursday': {'start':  '07:00', 'end': '23:59'},
      'friday': {'start':  '07:00', 'end': '23:59'},
      'saturday': {'start':  '07:00', 'end': '23:59'},
      'sunday': {'start':  '07:00', 'end': '23:59'}
    },
    'tasks':{
        'fix':{
          'name':{
            "monday": {"start": "21:00", "end": "22:00"},
            "tuesday": {"start": "21:00", "end": "22:00"}
          }
        },
        'random':{}
    }
*/