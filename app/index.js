import React, { useEffect, useState } from "react";
import Signup from "./pages/Signup";
import HomePage from "./pages/pagesWithHeader/HomePage";
import { Redirect, useRouter, useFocusEffect } from "expo-router";
import ResetPassword from "./pages/resetPassword";
import { mostrarUsuario } from "./sqlite/dbService";

export default function App() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await mostrarUsuario();
      setUser(fetchedUser);
    }
    fetchUser();
  }, []);

  useFocusEffect(() => {
    if (user) {
      router.replace("pages/pagesWithHeader/HomePage");
    }
  });
  console.log(user)
  return user ? null : <Signup />;
}
