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
import { router, useGlobalSearchParams } from 'expo-router'

//********************************************Import de depêndencias e componentes***********************************************//
import BackArrow from "../../../components/BackArrow"
import cores from '../../../Util/coresPadrao'
import Task from '../../../components/Task'
import { Ionicons } from '@expo/vector-icons'
import { checkName } from '../../../Util/checkData'
import Popup from '../../../components/Popup'


export default function TaskList() {
  //**********************************************HOOKS**********************************************************************//
  let { data } = useGlobalSearchParams()

  const [popupVisibility, setPopupVisibility] = useState(false)
  const [popupText, setPopupText] = useState("")
  const [popupOption, setPopupOption] = useState([])

  const [dataTask, setDataTask] = useState()

  useEffect(() =>{
    setDataTask(JSON.parse(data))
  }, [])

  const { width, height } = Dimensions.get('window')

  //**********************************************Alteração automática de tema*****************************************************//
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme())
  useEffect(() => {
    const listener = Appearance.addChangeListener((scheme) => {
      setColorScheme(scheme.colorScheme)
    })
    return () => listener.remove()
  }, [])

  //************************************************Funções**********************************************************************//  
  function popup(text, options = null) {
    setPopupVisibility(true)
    setPopupText(text)

    if (options) {
      setPopupOption([...options])
    }

  }

  function createTask() {
    let id
    let keys = Object.keys(dataTask['tasks']['fix'])

    do {
      id = Math.floor(Math.random() * 1000000).toString()
    } while (keys.some(key => key.endsWith(`-${id}`)))

    let newKey = `task-${id}-${Date.now()}`
    let copyOfData = { ...dataTask }
    copyOfData['tasks']['fix'][newKey] = null

    setDataTask(copyOfData)
  }

  function deleteTask(key) {
    let copyOfData = { ...dataTask }
    delete copyOfData['tasks']['fix'][key]

    setDataTask(copyOfData)
  }

  function nextStage() {
    let copyOfData = { ...dataTask }
    let fixTasks = copyOfData['tasks']['fix']
    let keysToVerify = Object.keys(fixTasks)

    keysToVerify.forEach((key) => {
      let name
      try {
        name = fixTasks[key]['name']
      } catch (error) {
        name = ""
      }

      let validationResult = checkName(name)
      if (!validationResult.validate) {
        popup(validationResult['message'], null)
      } else {
        router.push({
          pathname: '../RandomTaskList',
          params: { data: JSON.stringify(dataTask) }
        })
      }
    })

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
      justifyContent:"center",
      alignItems: "center",
      height: height * 0.05,
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

    taskView: {
      flexDirection: "column",
      gap: PixelRatio.get() * 15

    },

    save: {
      padding: 15,
      backgroundColor: cores.azulDark,
      borderRadius: 10,
      zIndex: 2,
      position: "relative",
      alignSelf: "flex-end",
      bottom: PixelRatio.get() * 20,
    },
    text: {
      fontSize: 25,
      color: cores.ghostWhite
    },

  })
  //***********************************************Tela****************************************************************************//
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.principal} contentContainerStyle={styles.styleContent}>

          <BackArrow link={"../TimelineDays"} data={dataTask}></BackArrow>

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

          <Pressable style={styles.save} onPress={nextStage}>
            <Text style={styles.text}>Próxima</Text>
          </Pressable>

        </ScrollView>

      </KeyboardAvoidingView>

      {popupVisibility && (
        <Popup
          message={popupText}
          option={popupOption.length !== 0 ? popupOption[0] : ""}
          link={popupOption.length !== 0 ? popupOption[1] : ""}
          handle={setPopupVisibility}
        />
      )}
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