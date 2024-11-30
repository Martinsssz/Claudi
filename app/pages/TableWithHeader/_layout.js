import { View, Text} from "react-native";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar"
import { Slot, Stack, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
  const pathname = usePathname();
  const [currentScreen, setCurrentScreen] = useState('');
  
  useEffect(() => {
    setCurrentScreen(pathname);
  }, [pathname]);

  const [sidebar, setSidebar] = useState(false)
  return (
    <>
      <Header handle={setSidebar} showMenu={false} showArrowForward={true}/>
      <Slot/>
      {sidebar &&(
        <Sidebar rotaAtual={currentScreen}/>
      )}
      
    </>
  );
}
