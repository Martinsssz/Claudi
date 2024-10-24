import React from "react";
import { StyleSheet, Appearance, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as AuthSession from "expo-auth-session";
import * as Crypto from "expo-crypto";

const CLIENT_ID =
  "199020620542-0in1re6knsp1eubq82di8170to1m4vcd.apps.googleusercontent.com";
const REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: true});
console.log(REDIRECT_URI)


const DISCOVERY = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

export default function Loginwith({ tipo }) {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  let styles = StyleSheet.create({
    icone: {
      fontSize: 40,
      color: colorScheme == "dark" ? "white" : "black",
    },
  });

  async function handleGoogleSignIn() {
    const request = new AuthSession.AuthRequest({
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URI,
      scopes: ['profile', 'email'],
      responseType: AuthSession.ResponseType.Token,
    });

    const result = await request.promptAsync(DISCOVERY);
    if (result.type === 'success') {
      const userResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${result.params.access_token}` },
      });
      const data = await userResponse.json();
      setUserInfo(data);
    }
  }

  let icones = ["logo-google", "logo-facebook", "logo-microsoft"];

  return (
    <Pressable onPress={handleGoogleSignIn}>
      <Ionicons name={icones[parseInt(tipo)]} style={styles.icone}></Ionicons>
    </Pressable>
  );
}
