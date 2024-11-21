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
import MultiSelect from 'react-native-multiple-select';


//********************************************Import de depêndencias e componentes***********************************************//
import cores from '../../Util/coresPadrao'
import { checkName } from '../../Util/checkData'
import LabelAndHour from '../LabelAndHour';



export default function Interval({ data, handleData, id, popup }) {
  //**********************************************HOOKS**********************************************************************//
  const [name, setName] = useState("")
  const [selectedItems, setSelectedItems] = useState([]);
  const [classes, setclasses] = useState([])
  const [onDays, setOnDays] = useState({ 'schoolTime': {}, 'days': {} })


  useEffect(() => {
    if (data['schoolIntervals'][id] !== null) {
      let thisInterval = data['schoolIntervals'][id]
      setName(thisInterval['name'])
      setSelectedItems(thisInterval['classes']);

      let copyOfData = { ...onDays }
      copyOfData['days']['starAndEnd'] = thisInterval['intervalHour']
      setOnDays(copyOfData)
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

  //Definir as turmas
  useEffect(() => {
    let copyOfData = { ...data }
    let localClasses = copyOfData['classes']

    let intervalsArray = Object.keys(localClasses).map(id => ({
      'id': id,
      'name': localClasses[id]['name']
    }));

    setclasses(intervalsArray)
  }, []);

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

  useEffect(() => {
    let copyOfData = { ...data }
    let nameCheck = checkName(name)
    let classesCheck = selectedItems.length > 0

    if (nameCheck && classesCheck) {
      copyOfData['schoolIntervals'][id] = {
        'name': name,
        'classes': selectedItems,
        'intervalHour': onDays['days']['starAndEnd']
      }

      console.log(JSON.stringify(copyOfData, null, 2))

      handleData(copyOfData)
    }
  }, [name, onDays, selectedItems])

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
      borderRadius: PixelRatio.get() * 3,
      borderColor: cores.black,
      borderWidth: 1,
    },

    styleContent: {
      justifyContent: "flex-start",
      gap: PixelRatio.get() * 10
    },

    titulo: {
      color: colorScheme == "dark" ? "#FFFFFF" : "#000000",
      fontSize: PixelRatio.getFontScale() * 25,
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
      alignItems: "center",
      marginBottom: PixelRatio.get()

    },

    input: {
      flex: 1,
      color: "black",
      backgroundColor: colorScheme === "dark" ? cores.azulClaroDark : cores.ghostWhite,
      fontSize: 19,
      padding: PixelRatio.get()*1.8,
      paddingLeft: 7,
      //borda
      borderWidth: 1,
      borderStyle: "solid",
      borderBlockColor: "black",
      paddingRight: 7
      //Fim da borda
    },

    vertical: {
      flexDirection: 'column',
      gap: PixelRatio.get() * 5,
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
  })
  //***********************************************Tela****************************************************************************//
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >

      <ScrollView style={styles.principal} contentContainerStyle={styles.styleContent}>
        <View style={styles.inputLabel}>
          <Text style={styles.titulo2}>Intervalo:</Text>
          <TextInput
            placeholder={"Intervalo"}
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={{ gap: PixelRatio.get() * 3, width: "115%" }}>
          <LabelAndHour
            label1={"Começo"}
            label2={"Fim"}
            handleData={setOnDays}
            data={onDays}
            isActived={true}
            id={'starAndEnd'}
          />
        </View>

        <View style={styles.vertical}>
          <Text style={styles.titulo2}>Turmas: </Text>
          <MultiSelect
            items={classes}
            uniqueKey="id"
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="Escolha as turmas"
            searchInputPlaceholderText="Procurar os nomes..."
            tagRemoveIconColor={colorScheme == "dark" ? cores.ghostWhite : cores.azulEscuroDark}
            tagBorderColor={colorScheme == "dark" ? cores.ghostWhite : cores.azulEscuroDark}
            tagTextColor={colorScheme == "dark" ? cores.ghostWhite : cores.black}
            selectedItemTextColor={cores.black}
            selectedItemIconColor="green"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: '#000' }}
            submitButtonColor={cores.azulEscuroDark}
            submitButtonText="Confirmar"
            styleDropdownMenuSubsection={{ backgroundColor: colorScheme === "dark" ? cores.azulClaroDark : cores.ghostWhite, }}
          />
        </View>
      </ScrollView>


    </KeyboardAvoidingView>
  )
}