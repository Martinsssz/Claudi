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
  Pressable
} from 'react-native'
import React, { useState, useEffect } from 'react'
import MultiSelect from 'react-native-multiple-select';
import { Ionicons } from '@expo/vector-icons';

//********************************************Import de depêndencias e componentes***********************************************//
import cores from '../../Util/coresPadrao'
import { checkName } from '../../Util/checkData'
import ClassSelect from '../ClassSelect';



export default function Subject({ data, handleData, id, popup }) {
  //**********************************************HOOKS**********************************************************************//
  const [name, setName] = useState("")
  const [selectedItems, setSelectedItems] = useState([]);
  const [classes, setClasses] = useState({})
  const [teachers, setTeachers] = useState([])

  const [min, setMin] = useState("")
  const [max, setMax] = useState("")

  const {height, width} = Dimensions.get('window')

  useEffect(() => {
    if (data['subjects'][id] !== null) {
      let thisSubject = data['subjects'][id]
      setName(thisSubject['name'])
      setMin(thisSubject['minAndMax']['min'])
      setMax(thisSubject['minAndMax']['max'])
      setSelectedItems(thisSubject['teachers']);
      setClasses(thisSubject['classes'])
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

  //Definindo os professores da lista.
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

  //Atualizando os itens selecionados
  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

  function addClass() {
    let id
    let keys = Object.keys(classes)

    do {
      id = Math.floor(Math.random() * 1000000).toString()
    } while (keys.some(key => key.endsWith(`-${id}`)))

    let newKey = `class-${id}-${Date.now()}`
    let copyOfData = { ...classes }
    copyOfData[newKey] = {}

    setClasses(copyOfData)

    console.log(JSON.stringify(copyOfData, null, 2))
  }

  function deleteClass(key) {
    let copyOfData = { ...classes }
    delete copyOfData[key]

    setClasses(copyOfData)
  }

  useEffect(() => {
    let localMin = parseInt(min);
    let localMax = parseInt(max);

    if (min.trim !== "" && max.trim !== "") {
      if (localMin > localMax) {
        popup("O mínimo não pode ser maior que o máximo")
        setMin(`${localMax - 1}`)
      }
    }

  }, [min, max])

  useEffect(() => {
    let isNameValid = checkName(name)
    let isTeacherSelected = selectedItems.length > 0
    let areClassesComplete = !Object.values(classes).some(item => Object.keys(item).length <= 0) && Object.keys(classes).length > 0
    let isMinAndMaxValid = min.trim() !== "" && max.trim() !== ""
    console.log(isMinAndMaxValid)

    if (isNameValid && isTeacherSelected && areClassesComplete && isMinAndMaxValid) {
      let copyOfData = { ...data }

      copyOfData['subjects'][id] = {
        name: name,
        teachers: selectedItems,
        classes: classes,
        minAndMax: { min: min.trim(), max: max.trim() }
      }

      console.log(JSON.stringify(copyOfData, null, 2))

      handleData(copyOfData)
    }

  }, [name, selectedItems, classes, min, max])
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
      gap: PixelRatio.get() * 5
    },

    titulo: {
      color: colorScheme == "dark" ? "#FFFFFF" : "#000000",
      fontSize: PixelRatio.getFontScale() * 25,
    },

    titulo2: {
      color: colorScheme == "dark" ? "#FFFFFF" : "#000000",
      fontSize: PixelRatio.getFontScale() * 18,
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

    createATask: {
      alignSelf: "center",
      backgroundColor: colorScheme == "dark" ? cores.azulClaro1Light : cores.azulEscuro1Light,
      justifyContent:"center",
      alignItems: "center",
      width: width * 0.085,
      aspectRatio: 1,
      borderRadius: 1000,
      alignItems: "center",
    },

    createATaskText: {
      color: colorScheme == "dark" ? cores.azulEscuro1Light : cores.azulClaro1Light,
      fontSize: PixelRatio.getFontScale() * 25
    },

    optionsTasks: {
      flexDirection: "row",
      justifyContent: "center",
      gap: PixelRatio.get() * 3
    },
    
    taskView: {
      flexDirection: "row",
      gap: PixelRatio.get() * 2
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
          <Text style={styles.titulo2}>Matéria:</Text>
          <TextInput
            placeholder={"Matéria"}
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>

        <View style={styles.vertical}>
          <Text style={styles.titulo2}>Professores: </Text>
          <MultiSelect
            items={teachers}
            uniqueKey="id"
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText="Escolha os professores"
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

        <Text style={styles.titulo}>Aulas por turma:</Text>

        {classes && Object.keys(classes).length > 0 ? (

          Object.keys(classes).map((key, index) => (

            <View key={key} style={styles.taskView}>
              <ClassSelect data={data} classesData={classes} handleClasses={setClasses} id={key}></ClassSelect>

              <View style={styles.optionsTasks}>
                {index + 1 == Object.keys(classes).length && (
                  <Pressable style={styles.createATask} onPress={addClass}>
                    <Text style={styles.createATaskText}>
                      <Ionicons name='add-outline' style={styles.createATaskText} />
                    </Text>
                  </Pressable>
                )}

                <Pressable style={styles.createATask} onPress={(e) => deleteClass(key)}>
                  <Ionicons name='trash-outline' style={styles.createATaskText} />
                </Pressable>
              </View>
            </View>
          ))
        ) : (
          <Pressable style={styles.createATask} onPress={addClass}>
            <Text style={styles.createATaskText}>+</Text>
          </Pressable>
        )}

        <View style={styles.vertical}>
          <Text style={styles.titulo2}>Repetições diárias por turma: </Text>
          <View style={styles.horizontal}>

            <View style={styles.inputLabel}>
              <Text style={styles.titulo2}>Min:</Text>
              <TextInput
                placeholder={"Min"}
                value={min}
                style={styles.input}
                onChangeText={(text) => setMin(text)}
              />
            </View>

            <View style={styles.inputLabel}>
              <Text style={styles.titulo2}>Max:</Text>
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