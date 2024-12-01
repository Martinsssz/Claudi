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
  TextInput,
  Text,
} from 'react-native'
import React, { useState, useEffect } from 'react'

//********************************************Import de depêndencias e componentes***********************************************//
import cores from '../../Util/coresPadrao'
import WeekDays from '../../components/WeekDays'
import { checkName } from '../../Util/checkData'
import LabelAndHour from '../LabelAndHour'


export default function Teacher({ data, handleData, id, popup }) {
  //**********************************************HOOKS**********************************************************************//
  const [name, setName] = useState("")
  const [onDays, setOnDays] = useState({ 'days': {} })

  const { width, height } = Dimensions.get('window')

  useEffect(() => {
    if(data['teachers'][id] !== null){
      setName(data['teachers'][id]['name'])

      let copyOfData = {...onDays}
      copyOfData['days'] = data['teachers'][id]['days']
      setOnDays(copyOfData)
    }

  },[])

  //**********************************************Alteração automática de tema*****************************************************//
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme())
  useEffect(() => {
    const listener = Appearance.addChangeListener((scheme) => {
      setColorScheme(scheme.colorScheme)
    })
    return () => listener.remove()
  }, [])

  //************************************************FUNÇÕES**********************************************************************//
  useEffect(() => {
    let nameCheck = name.trim() != ""
    let keysOfData = Object.keys(onDays['days'])
    const hasNullValue = keysOfData.some(key => onDays['days'][key] == null)

    if (nameCheck && !hasNullValue && Object.keys(onDays['days']).length > 0) {
      let copyOfData = { ...data }
      copyOfData['teachers'][id] = {
        "name": name,
        "days": onDays['days']
      }
      handleData(copyOfData)
      console.log('Depois de alterar:', JSON.stringify(copyOfData, null, 2));
    }

  }, [name, onDays])
  //************************************************Variáveis**********************************************************************//
  let orderDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  let days = [...data['days']]
  days = orderDays.filter((day) => days.includes(day))

  //**********************************************Animações**********************************************************************//

  //***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({
    principal: {
      backgroundColor: colorScheme === "dark" ? cores.azulDark : cores.ghostWhite2,
      height: "auto",
      paddingVertical: 20,
      paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(8),
      borderRadius: PixelRatio.get() * 4,
      borderColor: cores.black,
      borderWidth: 1,
    },

    styleContent: {
      justifyContent: "flex-start",
      gap: PixelRatio.get() * 15
    },

    scroll: {
      width: "100%",
      height: "auto",
    },

    scrollContent: {
      flexDirection: "row",
      justifyContent: "flex-start",
      left: 0
    },

    titulo2: {
      color: colorScheme == "dark" ? "#FFFFFF" : "#000000",
      fontSize: PixelRatio.getFontScale() * 18,
    },

    inputLabel: {
      flex: 1,
      flexDirection: "row",
      gap: PixelRatio.get() * 2,
      width: "100%",
      alignItems: "center"

    },

    input: {
      flex: 1,
      color: "black",
      backgroundColor: colorScheme === "dark" ? cores.azulClaroDark : cores.ghostWhite,
      fontSize: 19,
      padding: 7,
      borderRadius: 7,
      paddingLeft: 7,
      //borda
      borderWidth: 1,
      borderStyle: "solid",
      borderBlockColor: "black",
      borderRadius: 7,
      paddingRight: 7
      //Fim da borda
      //Fim da borda
    },
    labels: {
      width: "100%",
      alignItems: "flex-start",
      justifyContent:  "space-around",
    },
  })
  //***********************************************Tela****************************************************************************//
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >

      <ScrollView style={styles.principal} contentContainerStyle={styles.styleContent}>
        <View style={styles.inputLabel}>
          <Text style={styles.titulo2}>Professor:</Text>
          <TextInput
            placeholder={"Professor"}
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <WeekDays handleWeek={setOnDays} orientation={"column"} data={onDays} dias={days} background={false} />

          <View style={styles.labels}>
            {days.map((component) => (
              <LabelAndHour
                label1={"Entrada:"}
                label2={"Saída:"}
                handleData={setOnDays}
                data={onDays}
                isActived={component in onDays['days']}
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