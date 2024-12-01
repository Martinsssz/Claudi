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


export default function RandomTask({ data, handleData, id, popup }) {
  //**********************************************HOOKS**********************************************************************//
  const [name, setName] = useState("")
  const [total, setTotal] = useState("")
  const [duration, setDuration] = useState("")
  const [min, setMin] = useState("")
  const [max, setMax] = useState("")


  const [dataTask, setDataTask] = useState({ 'days': {} })

  const { width, height } = Dimensions.get('window')

  useEffect(() => {
    const task = data['tasks']['random'][id];
    if (task) {
      setName(task['name'])
      setTotal(task['total'])
      setDuration(task['duration'])
      setMin(task['minAndMax']['min'])
      setMax(task['minAndMax']['max'])

      let copyOfData = { ...dataTask }
      copyOfData['days'] = task['days']
      setDataTask(copyOfData)
    }

  }, [])

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
    let nameCheck = checkName(name)
    let keysOfData = Object.keys(dataTask['days'])
    const hasNullValue = keysOfData.some(key => dataTask['days'][key] == null)

    if (nameCheck && !hasNullValue && Object.keys(dataTask['days']).length > 0) {
      let copyOfData = { ...data }
      copyOfData['tasks']['random'][id] = {
        "name": name,
        "days": dataTask['days']
      }
      handleData(copyOfData)
      console.log('Depois de alterar:', JSON.stringify(copyOfData, null, 2));
    }

  }, [name, dataTask])


  useEffect(() =>{
    let localMin =  parseInt(min); 
    let localMax = parseInt(max);

    if(min.trim !== ""  && max.trim !== ""){
      if(localMin > localMax){
        popup("O mínimo não pode ser maior que o máximo")
        setMin(`${localMax-1}`)
      }
    }

  }, [min, max])

  useEffect(() => {
    let localMax = parseInt(max)
    let localMin = parseInt(min)
    let localTotal = parseInt(total)
    let dataTaskLeght = Object.keys(dataTask['days']).length

    if(min.trim !== ""  && max.trim !== "" &&  total.trim !== ""){
      if(localMin * dataTaskLeght > localTotal){
        popup("O mínimo vezes a quantidade de dias não pode ser maior que o total")
        setTotal(`${localMin*dataTaskLeght}`)
      }else if(localMax * dataTaskLeght < localTotal){
        popup("O máximo vezes a quantidade de dias não pode ser menor que o total")
        let newTotal = localTotal % dataTaskLeght == 0 ? localTotal / dataTaskLeght : parseInt(localTotal / dataTaskLeght) + 1
        setMax(`${newTotal}`)
      }
    }

  }, [min, max, total, dataTask])

  useEffect(() => {
    const dados = [max,min,duration,name,total]
    if(dados.some( dado =>  dado.trim() === "")){
      return
    }
    const copyOfData = {...data}
    const newTask = {
      "name": name,
      "days": dataTask['days'],
      "total": total,
      "minAndMax": {"min": min, "max": max},
      "duration": duration
    }

    copyOfData['tasks']['random'][id] = newTask
    handleData(copyOfData)
    console.log(JSON.stringify(copyOfData, null, 2));
  }, [max, min, duration, name, dataTask, total])

  //************************************************Variáveis**********************************************************************//
  let orderDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  let days = Object.keys(data['days'])
  days = orderDays.filter((day) => days.includes(day))

  //**********************************************Animações**********************************************************************//

  //***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({
    principal: {
      backgroundColor: colorScheme === "dark" ? cores.azulDark : cores.ghostWhite2,
      height: "auto",
      paddingVertical: 20,
      paddingHorizontal: PixelRatio.getPixelSizeForLayoutSize(10),
      borderRadius: PixelRatio.get() * 3,
      borderColor: cores.black,
      borderWidth: 2,
    },

    styleContent: {
      justifyContent: "flex-start",
      gap: height * 0.008,
      
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

    labels: {
      width: "100%",
      alignItems: "flex-start",
      justifyContent: "space-around",
    },
    titulo2: {
      color: colorScheme == "dark" ? "#FFFFFF" : "#000000",
      fontSize: PixelRatio.getFontScale() * 20,
    },

    vertical: {
      width: "100%",
      flexDirection: 'column',
      gap: height * 0.01,
      marginTop: PixelRatio.get() * 5
    },

    horizontal: {
      flexDirection: 'row',
      justifyContent: "space-between",
      gap: PixelRatio.get() * 5

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
          <Text style={styles.titulo2}>Tarefa:</Text>
          <TextInput
            placeholder={"Tarefa"}
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <View style={styles.vertical}>
            <Text style={styles.titulo2}>Dias da tarefa:</Text>
            <WeekDays handleWeek={setDataTask} orientation={"row"} data={dataTask} dias={days} background={false} />
          </View>
        </ScrollView>

        <View style={styles.vertical}>
          <Text style={styles.titulo2}>Repetições na semana: </Text>
          <View style={styles.inputLabel}>
            <Text style={styles.titulo2}>Total:   </Text>
            <TextInput
              placeholder={"Total"}
              style={styles.input}
              value={total}
              onChangeText={(text) => setTotal(text)}
            />
          </View>
        </View>

        <View style={styles.vertical}>
          <Text style={styles.titulo2}>Duração: </Text>
          <View style={styles.inputLabel}>
            <Text style={styles.titulo2}>Tempo:</Text>
            <TextInput
              placeholder={"Tempo (minutos)"}
              style={styles.input}
              value={duration}
              onChangeText={(text) => setDuration(text)}
            />
          </View>
        </View>

        <View style={styles.vertical}>
          <Text style={styles.titulo2}>Repetições da tarefa em um dia:</Text>
          <View style={styles.horizontal}>

            <View style={styles.inputLabel}>
              <Text style={styles.titulo2}>Min:  </Text>
              <TextInput
                placeholder={"Min"}
                value={min}
                style={styles.input}
                onChangeText={(text) => setMin(text)}
              />
            </View>

            <View style={styles.inputLabel}>
              <Text style={styles.titulo2}>Max:  </Text>
              <TextInput
                placeholder={"Max"}
                style={styles.input}
                value={max}
                onChangeText={(text) => setMax(text)}
              />
            </View>

          </View>
        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  )
}