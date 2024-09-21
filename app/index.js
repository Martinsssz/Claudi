import React, { useEffect } from "react";
import Signup from "./pages/Signup";
import HomePage from "./pages/pagesWithHeader/HomePage";
import { Redirect, useRouter, useFocusEffect } from "expo-router";
import ResetPassword from "./pages/resetPassword";
import { testar } from "./sqlite/dbService";


export default function App(){
  testar()
  const router = useRouter()

  useFocusEffect(()=>{
    router.replace("pages/pagesWithHeader/HomePage")
  }) 
  return (
    <Signup></Signup>
    
  )
  
}