import { View, StyleSheet, TextInput, Appearance, PixelRatio } from 'react-native'
import { useEffect, useState } from 'react'
import React from 'react';
import cores from "../../Util/coresPadrao"
import RNPickerSelect from 'react-native-picker-select';

export default function ClassSelect({ data, classesData, handleClasses, id }) {
  const [selectedValue, setSelectedValue] = useState()
  const [onClasses, setClasses] = useState([])
  const [qntd, setQntd] = useState("")

  useEffect(() => {
    if (classesData[id]['qntd']) {
      let thisSubjectClass = classesData[id]
      setQntd(thisSubjectClass['qntd'])
      setSelectedValue(thisSubjectClass['classId'])
    }

  }, [])

  useEffect(() => {
    let verifyClasses = []

    Object.keys(data['classes']).forEach((item) => {
      verifyClasses.push({
        label: data['classes'][item]['name'],
        value: item
      })
    })

    setClasses(verifyClasses)
  }, [])

  useEffect(() =>{
    let localQntd =  parseInt(qntd); 

    if(qntd.trim != "" && selectedValue !== null && localQntd > 0){
      let copyOfData = classesData
      copyOfData[id] = {
        classId: selectedValue,
        qntd: qntd
      }

      handleClasses(copyOfData)
    }

  }, [selectedValue, qntd])

  let colorScheme = Appearance.getColorScheme()
  //Esti
  const styles = StyleSheet.create({
    main: {
      width: "75%",
      flexDirection: "row",
      backgroundColor: cores.ghostWhite,
      borderColor: "black",
      borderWidth: 2,
      height: 40,
      gap: PixelRatio.get() * 0,
    },
    container: {
      flex: .6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      flex: .45,
      color: "black",
      fontSize: PixelRatio.get() * 7,

    }
  })


  //Componentes
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <RNPickerSelect
          style={styles.input}
          onValueChange={(value) => setSelectedValue(value)}
          value={selectedValue}
          items={onClasses}
          placeholder={{ label: 'Selecione uma turma', value: null }}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder='Quantidade'
        value={qntd}
        onChangeText={text => setQntd(text)}
      />
    </View>
  )
}