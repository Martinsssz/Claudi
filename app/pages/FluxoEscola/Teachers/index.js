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
import { Ionicons } from '@expo/vector-icons'
import Popup from '../../../components/Popup'
import Teacher from '../../../components/Teacher'
import { checkName } from '../../../Util/checkData'


export default function Teachers() {
  //**********************************************HOOKS**********************************************************************//
  let { data } = useGlobalSearchParams()


  const [popupVisibility, setPopupVisibility] = useState(false)
  const [popupText, setPopupText] = useState("")
  const [popupOption, setPopupOption] = useState([])
  const [jsonData, setJsonData] = useState()

  const {height, width} = Dimensions.get('window')
  try {
    data = JSON.parse(data)
    useEffect(() => {
      setJsonData(data)
    }, [])
  } catch (error) {
    console.log("")
  }

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

  function createTeacher() {
    let id
    let keys = Object.keys(jsonData['teachers'])

    do {
      id = Math.floor(Math.random() * 1000000).toString()
    } while (keys.some(key => key.endsWith(`-${id}`)))

    let newKey = `teacher-${id}-${Date.now()}`
    let copyOfData = { ...jsonData }
    copyOfData['teachers'][newKey] = null

    setJsonData(copyOfData)

    console.log(JSON.stringify(copyOfData, null, 2))
  }

  function deleteTask(key) {
    let copyOfData = { ...jsonData }
    delete copyOfData['teachers'][key]

    setJsonData(copyOfData)
  }

  function nextStage() {
    let copyOfData = { ...jsonData }
    let teachers = copyOfData['teachers']
    let keysToVerify = Object.keys(teachers)

    if (keysToVerify.some(key => teachers[key] == null)) {
      popup("Preencha corretamente os dados requisitados", null)
    } else {
      router.push({
        pathname: '../Classes',
        params: { data: JSON.stringify(jsonData) }
      })
    }
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
      gap: PixelRatio.get() * 10,
      width: "100%"
    },

    title: {
      fontSize: PixelRatio.getFontScale() * 35,
      textAlign: "center",
      color: colorScheme === "dark" ? "white" : "black"
    },

    tasks: {
      gap: PixelRatio.get() * 10,
      marginBottom: PixelRatio.get() * 50,
      width: "100%"
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
      gap: PixelRatio.get() * 15,
      width: "100%"

    },

    save: {
      padding: PixelRatio.get() * 5,
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

          <BackArrow link={"../SchoolDays"} data={jsonData}></BackArrow>

          <Text style={styles.title}>Professores</Text>
          <ScrollView contentContainerStyle={styles.tasks}>

            {jsonData && Object.keys(jsonData['teachers']).length > 0 ? (

              Object.keys(jsonData['teachers']).map((key, index) => (

                <View key={key} style={styles.taskView}>
                  <Teacher data={jsonData} handleData={setJsonData} id={key} key={key} popup={popup} />
                  <View style={styles.optionsTasks}>

                    {index + 1 == Object.keys(jsonData['teachers']).length && (
                      <Pressable style={styles.createATask} onPress={createTeacher}>
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
              <Pressable style={styles.createATask} onPress={createTeacher}>
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
