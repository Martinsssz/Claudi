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
  PixelRatio,
  TextInput
} from 'react-native'
import React, { useState, useEffect, } from 'react'
import { router, useGlobalSearchParams } from 'expo-router'

//********************************************Import de depêndencias e componentes***********************************************//
import BackArrow from "../../../components/BackArrow"
import cores from '../../../Util/coresPadrao'
import WeekDays from '../../../components/WeekDays'
import LabelAndHour from '../../../components/LabelAndHour'
import Popup from '../../../components/Popup'



export default function SchoolDays() {
  //**********************************************HOOKS**********************************************************************//
  let { data } = useGlobalSearchParams()
  const [onDays, setOnDays] = useState({ 'schoolTime': {}, 'days': {} }) //horas
  const [schoolDays, setSchoolDays] = useState({ 'days': {} }) //dias da semana

  const [popupVisibility, setPopupVisibility] = useState(false)
  const [popupText, setPopupText] = useState("")
  const [popupOption, setPopupOption] = useState([])
  const [duration, setDuration] = useState('')

  const [jsonData, setJsonData] = useState(() => {
    if (data && data['days']) {
      let jsonData = JSON.parse(data)
      let copyOfOnDays = onDays
      let copyOfSchoolDays = schoolDays

      jsonData['days'].forEach((day) => {
        copyOfSchoolDays['days'][day] = null
      })

      copyOfOnDays['days']['startAndEnd'] = jsonData['schoolTime']
      

      setOnDays(copyOfOnDays)
      setSchoolDays(copyOfSchoolDays)
      setDuration(jsonData['timePerClass'])
      
      return JSON.parse(data)
    } else {
      return {
        "days": [],
        "schoolTime": {},
        "timePerClass": "",
        "teachers": {},
        "classes": {},
        "subjects": {},
        "schoolIntervals": {}
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

  useEffect(() => {
    let copyOfData = { ...jsonData }
    if (Object.keys(schoolDays['days']).length == 0) {
      copyOfData['days'] = []
      setJsonData(copyOfData)
    }
  }, [schoolDays])

  useEffect(() => {
    let durationCheck = checkDuration(duration)
    let daysCheck = Object.keys(schoolDays['days']).length > 0
    let hoursCheck = onDays['days'] != {}
    let copyOfData = { ...jsonData }

    if (durationCheck && daysCheck && hoursCheck) {
      copyOfData['days'] = Object.keys(schoolDays['days'])
      copyOfData['schoolTime'] = onDays['days']['startAndEnd']
      copyOfData['timePerClass'] = duration

      console.log(JSON.stringify(copyOfData, null, 2));
      setJsonData(copyOfData)
    }
  }, [onDays, schoolDays, duration])

  function checkDuration(text) {
    if (text.trim().length > 0) {
      let localDuration = parseInt(duration)
      if (localDuration > 1440) {
        popup("A duração não pode ser maior que um dia inteiro")
        setDuration("")
        return false
      } else {
        return true
      }
    }
  }

  function nextStage() {
    let validateDays = Object.keys(jsonData['days']).length > 0
    let validateDuration = jsonData['timePerClass'].trim() != ""
    let validateHours = Object.keys(jsonData['schoolTime']).length > 0

    if (!(validateDays && validateDuration && validateHours)) {
      popup("Preencha todos os campos", null)
      return
    } else if (!validateDays) {
      popup("Selecione ao menos um dia", null)
      return
    }
    router.push({
      pathname: '../Teachers',
      params: { data: JSON.stringify(jsonData) }
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
      justifyContent: "flex-start"
    },

    scroll: {
      width: "100%",
      height: "100%",
    },
    scrollContent: {
      flexDirection: "collumn",
      justifyContent: "flex-start",
      gap: PixelRatio.get() * 11,
      paddingVertical: PixelRatio.get()*10,
      left: 0
    },
    title: {
      fontSize: PixelRatio.getFontScale() * 35,
      color: colorScheme === "dark" ? cores.ghostWhite : cores.black,
    },
    title2: {
      fontSize: PixelRatio.getFontScale() * 25,
      color: colorScheme === "dark" ? cores.ghostWhite : cores.black,
    },

    save: {
      padding: 15,
      backgroundColor: cores.azulDark,
      borderRadius: 10,
      zIndex: 2,
      position: "relative",
      alignSelf: "flex-end",
      bottom: 0,
    },
    text: {
      fontSize: 20,
      color: cores.ghostWhite
    },
    setUpBox: {
      backgroundColor: colorScheme == "dark" ? cores.azulDark : cores.ghostWhite2,
      paddingHorizontal: PixelRatio.get() * 10,
      paddingVertical: height*0.02,
      height: height / 6,
      borderColor: "black",
      borderWidth: 1,
      gap: height * 0.02,
      borderRadius: PixelRatio.get()*4
    },

    input: {
      color: "black",
      backgroundColor: colorScheme === "dark" ? cores.azulClaroDark : cores.ghostWhite,
      fontSize: 19,
      height: height * 0.05,
      borderRadius: 7,
      paddingLeft: 7,
      //borda
      borderWidth: 1,
      borderStyle: "solid",
      borderBlockColor: "black",
      borderRadius: 7,
      paddingRight: 7
      //Fim da borda
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

          <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Dias de aula </Text>

            <WeekDays handleWeek={setSchoolDays} orientation={"row"} data={schoolDays} background={false} />

            <View style={styles.setUpBox}>
              <Text style={styles.title2}>Horário Escolar:</Text>
              <LabelAndHour label1="Início:" label2="Fim:" handleData={setOnDays} isActived={true} data={onDays} id="startAndEnd" />
            </View>

            <View style={styles.setUpBox}>
              <Text style={styles.title2}>Tempo por aula:</Text>
              <TextInput
                style={styles.input}
                value={duration}
                onChangeText={text => setDuration(text)}
                keyboardType="numeric"
                placeholder={"Tempo em minutos"}
              />
            </View>

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