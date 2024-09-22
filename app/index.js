
import React, { useState, useEffect } from "react";
import Signup from "./pages/Signup";
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
      router.replace("pages/PagesWithHeader/HomePage")
    }
  })
  return user ? null : <Signup/>
}
