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
    PixelRatio,
    TextInput
  } from 'react-native'
  import React, { useState, useEffect,  } from 'react'
  import { router, useGlobalSearchParams } from 'expo-router'
  
  //********************************************Import de depêndencias e componentes***********************************************//
  import BackArrow from "../../../components/BackArrow"
  import cores from '../../../Util/coresPadrao'
  import WeekDays from '../../../components/WeekDays'
  import LabelAndHour from '../../../components/LabelAndHour'
  import Popup from '../../../components/Popup'

  
  
  export default function SchoolDays(){
  //**********************************************HOOKS**********************************************************************//
    let { data } = useGlobalSearchParams()
  
    console.log(data)
  
    const [dataWeek, setDataWeek] = useState(() =>{
      if(data){
        return JSON.parse(data)
      }else{
        return {
          "days":[],
          "schoolTime": {},
          "timePerClass": 0,
          "teachers": {},
          "classes":{},
          "subjects":{},
          "schoolIntervals":{}
        }
      }
    })
  
    try{
      data = JSON.parse(data)
      useEffect(() => {
        setDataWeek(data)
      }, [])
    } catch(error){
      console.log("")  
    }
  
  
    const[popupVisibility, setPopupVisibility] = useState(false)
    const[popupText, setPopupText] = useState("")
    const[popupOption, setPopupOption] = useState([])
    const[duration, setDuration] = useState('')
  
    const {width, height} = Dimensions.get('window')
  //**********************************************Alteração automática de tema*****************************************************//
    const[colorScheme, setColorScheme] = useState(Appearance.getColorScheme())
    useEffect(() => {
      const listener = Appearance.addChangeListener(( scheme ) => {
        setColorScheme(scheme.colorScheme)
      })
      return () => listener.remove()
    }, [])
    
  //************************************************Funções**********************************************************************//  
    function popup(text, options=null){
      setPopupVisibility(true)
      setPopupText(text)
    
      if(options){
        setPopupOption([... options])
      }
    }

    function checkDuration(text){
      if(text.length > 0){
        let localDuration = parseInt(duration)
        if(localDuration > 1440){
          popup("A duração não pode ser maior que um dia inteiro")
          setDuration("")
        }else{
          setDuration(text)
          let copyOfData = {...dataWeek}
          copyOfData['timePerClass'] = text
          setDataWeek(copyOfData)
        }
      }
    }
  
    function nextStage(){
      let keysOfData = Object.keys(dataWeek['days'])
      const hasNullValue = keysOfData.some(key => dataWeek['days'][key] == null)
  
      if(hasNullValue){
        popup("Preencha todos os campos", null)
        return
      }else if(keysOfData.length == 0){
        popup("Selecione ao menos um dia", null)
        return
      }
      router.push({
        pathname: '../TaskList',
        params: {data:  JSON.stringify(dataWeek)}
      })
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
        justifyContent:"flex-start"
      },
  
      scroll:{
        width:"100%",
        height: "100%",
      },
      scrollContent:{
        flexDirection:"collumn",
        justifyContent: "flex-start",
        gap:PixelRatio.get() * 10,
        paddingVertical:50,
        left:0
      },
      title:{
        fontSize: PixelRatio.getFontScale()*35,
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
      setUpBox:{
        backgroundColor: colorScheme == "dark"? cores.azulDark : cores.ghostWhite2,
        paddingHorizontal: PixelRatio.get()*7,
        paddingVertical: PixelRatio.get()*5,
        height: height/ 6,
        borderColor: "black",
        borderWidth: 2,
        gap: PixelRatio.get()*8
      },

      input:{
        width: "100%",
        borderColor: "black",
        borderWidth: 2,
        backgroundColor: colorScheme == "dark" ? cores.azulClaroDark : cores.ghostWhite,
        paddingHorizontal: PixelRatio.get()*3,
        paddingVertical: PixelRatio.get()*2,
        fontSize: PixelRatio.getFontScale()*17,
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
  
            <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
              <Text style={styles.title}>Dias de aula </Text>
              
              <WeekDays handleWeek={setDataWeek} orientation={"row"} data={dataWeek} background={false}/>

              <View style={styles.setUpBox}>
                <Text style={styles.title}>Horário Escolar</Text>
                <LabelAndHour label1="Início" label2="Fim" handleData={setDataWeek} isActived={true} data={dataWeek}/>
              </View>

              <View style={styles.setUpBox}>
                <Text style={styles.title}>Tempo por aula</Text>
                <TextInput
                    style={styles.input}
                    value={duration}
                    onChangeText={text => checkDuration(text)}
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
            option= {popupOption.length !== 0 ? popupOption[0] : ""} 
            link= {popupOption.length !== 0 ? popupOption[1] : ""} 
            handle={setPopupVisibility}
          />
        )}
      </>
    )
    
  }