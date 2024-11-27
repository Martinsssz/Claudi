import React from "react";
import { StyleSheet, Appearance, Pressable, Image, PixelRatio, Text} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
//import * as Google from "expo-auth-session/providers/google"
//import * as AuthSession from "expo-auth-session";
//import * as Crypto from "expo-crypto";

/*const CLIENT_ID =
  "199020620542-0in1re6knsp1eubq82di8170to1m4vcd.apps.googleusercontent.com";
const REDIRECT_URI = "https://auth.expo.io/@pietrombatistela/claudi"
console.log(REDIRECT_URI)


const DISCOVERY = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};
*/

export default function Loginwith({ tipo }) {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  let styles = StyleSheet.create({
    icone: {
      width: 50,
      aspectRatio: 1,
      resizeMode: "stretch",
    },
  });

  /*const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "199020620542-0in1re6knsp1eubq82di8170to1m4vcd.apps.googleusercontent.com",
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
  */

  let icones = ["google", "facebook", "microsoft"];

  return (
    <Pressable style={{height: 50, width: 50}}>
      <Image
        source={require('../../../assets/images/microsoft.png')}
      />
    </Pressable>
  );
}
