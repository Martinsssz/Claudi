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
import MultiSelect from 'react-native-multiple-select'
//********************************************Import de depêndencias e componentes***********************************************//
import cores from '../../Util/coresPadrao'
import { checkName } from '../../Util/checkData'



export default function Subject({ data, handleData, id, popup }) {
  //**********************************************HOOKS**********************************************************************//
  const [name, setName] = useState("")
  const [onDays, setOnDays] = useState({ 'days': {} })
  const [selectedItems, setSelectedItems] = useState([]);

  const { width, height } = Dimensions.get('window')

  /*useEffect(() => {
    const teacher = data['teachers'][id];
    if (teacher) {
      setName(teacher['name'])
 
      let copyOfData = { ...onDays }
      copyOfData['days'] = teacher['days']
      setOnDays(copyOfData)
    }
 
  }, [])*/

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

  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    let copyOfData = { ...data }
    let localTeachers = copyOfData['teachers']

    let teachersArray = Object.keys(localTeachers).map(id => ({
      'id': id,
      'name': localTeachers[id]['name']
    }));

    console.log(teachersArray)

    setTeachers(teachersArray)
  }, []);

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };
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
      borderWidth: 2,
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
      padding: 10,
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
    labels: {
      width: "100%",
      alignItems: "flex-start",
      justifyContent: "space-between",
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
          <Text style={styles.titulo2}>Matéria:</Text>
          <TextInput
            placeholder={"Matéria"}
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>


        <MultiSelect
          items={teachers}
          uniqueKey="id"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Escolha os professores"
          searchInputPlaceholderText="Procurar os nomes..."
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />

      </ScrollView>


    </KeyboardAvoidingView>
  )
}