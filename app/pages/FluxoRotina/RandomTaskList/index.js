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
import RandomTask from '../../../components/RandomTask'
import { Ionicons } from '@expo/vector-icons'
import { checkName } from '../../../Util/checkData'
import Popup from '../../../components/Popup'


export default function RandomTasksList() {
  //**********************************************HOOKS**********************************************************************//
  let { data } = useGlobalSearchParams()

  const [popupVisibility, setPopupVisibility] = useState(false)
  const [popupText, setPopupText] = useState("")
  const [popupOption, setPopupOption] = useState([])
  const [dataRandom, setDataRandom] = useState(() => {
    
    //return JSON.parse(data)
    return {
      "days": {
        "monday": { "start": "07:00", "end": "23:59" },
        "tuesday": { "start": "07:00", "end": "23:59" },
        "wednesday": { "start": "07:00", "end": "23:59" },
        "thursday": { "start": "07:00", "end": "23:59" },
        "friday": { "start": "07:00", "end": "23:59" },
        "saturday": { "start": "07:00", "end": "23:59" },
        "sunday": { "start": "07:00", "end": "23:59" }
      },
      "tasks": {
        "fix": {
          "task-1234567890-1698288000000": {
            "name": "Reunião de equipe",
            "days": {
              "monday": { "start": "10:00", "end": "11:00" },
              "tuesday": { "start": "14:00", "end": "15:00" }
            }
          },
          "task-2345678901-1698288000000": {
            "name": "Desenvolvimento de feature",
            "days": {
              "wednesday": { "start": "09:00", "end": "12:00" },
              "friday": { "start": "13:00", "end": "16:00" }
            }
          },
          "task-3456789012-1698288000000": {
            "name": "Teste de usabilidade",
            "days": {
              "thursday": { "start": "15:00", "end": "17:00" },
              "saturday": { "start": "10:00", "end": "12:00" }
            }
          },
          "task-4567890123-1698288000000": {
            "name": "Preparação de apresentação",
            "days": {
              "monday": { "start": "16:00", "end": "18:00" },
              "sunday": { "start": "14:00", "end": "16:00" }
            }
          },
          "task-5678901234-1698288000000": {
            "name": "Revisão de código",
            "days": {
              "tuesday": { "start": "09:00", "end": "11:00" },
              "thursday": { "start": "13:00", "end": "15:00" }
            }
          }
        },
        "random": {}
      }
    }

  })

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
    let keys = Object.keys(dataRandom['tasks']['random'])

    do {
      id = Math.floor(Math.random() * 1000000).toString()
    } while (keys.some(key => key.endsWith(`-${id}`)))

    let newKey = `task-${id}-${Date.now()}`
    let copyOfData = { ...dataRandom }
    copyOfData['tasks']['random'][newKey] = null

    setDataRandom(copyOfData)

    console.log(JSON.stringify(copyOfData, null, 2))
  }

  function deleteTask(key) {
    let copyOfData = { ...dataRandom }
    delete copyOfData['tasks']['random'][key]

    setDataRandom(copyOfData)
  }

  /*function nextStage(){
    let copyOfData = { ...dataRandom}
    let fixTasks = copyOfData['tasks']['fix']
    let keysToVerify = Object.keys(fixTasks)
 
    keysToVerify.forEach((key) => {
      let name
      try{
        name = fixTasks[key]['name']
      }catch(error){
        name = ""
      }
      
      let validationResult = checkName(name)
      if( !validationResult.validate ){
        popup(validationResult['message'], null)
      }else{
        router.push({
          pathname: '../RandomTasksList',
          params: {data:  JSON.stringify(dataRandom)}
        })
      }
    })
 
  }*/
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

          <BackArrow link={"../TimelineDays"} data={dataRandom}></BackArrow>

          <Text style={styles.title}>Tarefas</Text>
          <ScrollView contentContainerStyle={styles.tasks}>

            {dataRandom && Object.keys(dataRandom['tasks']['random']).length > 0 ? (

              Object.keys(dataRandom['tasks']['random']).map((key, index) => (

                <View key={key} style={styles.taskView}>
                  <RandomTask data={dataRandom} handleData={setDataRandom} id={key} key={key} />
                  <View style={styles.optionsTasks}>

                    {index + 1 == Object.keys(dataRandom['tasks']['random']).length && (
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

          {/*<Pressable style={styles.save} onPress={nextStage}>
              <Text style={styles.text}>Próxima</Text>
            </Pressable>*/}

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
{dataRandom && Object.keys(dataRandom['tasks']['random']).length > 0 ? (
                Object.keys(dataRandom['tasks']['random']).map((key, index) => (
                  <View key={key} style={styles.taskView}>
                    <RandomTask data={dataRandom} handleData={setDataRandom} id={key} key={key} />
                    <View style={styles.optionsTasks}>
                      {index + 1 == Object.keys(dataRandom['tasks']['fix']).length && (
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
*/

