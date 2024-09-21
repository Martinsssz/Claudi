import React, { useEffect } from "react";
import Signup from "./pages/Signup";
import HomePage from "./pages/pagesWithHeader/HomePage";
import { Redirect, useRouter, useFocusEffect } from "expo-router";
import ResetPassword from "./pages/resetPassword";
import {mostrarUsuario} from "./sqlite/dbService"

export default function App(){
  const router = useRouter()

  let user = mostrarUsuario()
  console.log(user)

  if(user.email){
    useFocusEffect(()=>{
      router.replace("pages/pagesWithHeader/HomePage")
    })
  }else{
    return <Signup></Signup>
  }
  
}