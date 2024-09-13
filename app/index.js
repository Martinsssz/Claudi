import React, { useEffect } from "react";
import Signup from "./pages/Signup";
import HomePage from "./pages/pagesWithHeader/HomePage";
import { Redirect, useRouter, useFocusEffect } from "expo-router";

export default function App(){
  const router = useRouter()

  useFocusEffect(()=>{
    router.replace("pages/pagesWithoutHeader/AccountSettings")
  })
  return (
    <Signup></Signup>
    
  )
  
}