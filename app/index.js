
import React, { useState, useEffect } from "react";
import Signup from "./pages/fluxoAccount/Signup";
import {useRouter, useFocusEffect } from "expo-router";
import {mostrarUsuario} from "./sqlite/dbService";


export default function App(){
  const [user,setUser] = useState(null)
  const router = useRouter()


  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await mostrarUsuario();
      setUser(fetchedUser);
    }
    fetchUser();
  }, []);
  useFocusEffect(() =>{
    if(user){
      router.replace("./pages/pagesWithHeader/HomePageTable")
      
    }
  })
  return user ? null : <Signup/>


}
