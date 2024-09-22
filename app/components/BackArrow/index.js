//Import de componentes
import {
  StyleSheet,
  Pressable,
} from 'react-native'
//********************************************Import de depêndencias e componentes***********************************************//
import { Ionicons } from '@expo/vector-icons'
import cores from "../../Util/coresPadrao"
import { router } from 'expo-router'

export default function BackArrow(){
//************************************************Funções**********************************************************************//  
function returnTo(){
  alert("Ola mundo")
  router.replace("pages/pagesWithHeader/ChoiceTimeline")
}
//**********************************************Animações**********************************************************************//

//***********************************************Estilos************************************************************************//
  const styles = StyleSheet.create({ 
    body:{
      padding: 1,
      backgroundColor: cores.azulEscuroDark,
      alignSelf: "baseline",
      borderRadius: 500,
      margin: "2%",
      zIndex:10
    }
  })
//***********************************************Tela****************************************************************************//
  return(
    <Pressable style={styles.body} onPress={returnTo}>
      <Ionicons name="arrow-back" color={cores.ghostWhite} size={50} />
    </Pressable>
  )
}