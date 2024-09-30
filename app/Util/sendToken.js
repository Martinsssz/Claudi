import ip from "./localhost";
import { checkEmail } from "./checkData";
import { router } from "expo-router";


export async function sendToken(popup, email) {
    let emailVerification = checkEmail(email)

    if(emailVerification.validate){
      try {
        const response = await fetch(`${ip}/forgotPassword`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (response.status == 200) {
          popup(`Enviamos um e-mail para a conta ${email}`, null, "green");
          setTimeout(()=>{
            router.replace("pages/fluxoAccount/resetPassword");
          },3000)
        } else {
          popup("Erro ao enviar e-mail para a conta", null, "red");
        }
      } catch (error) {
        console.log(error)
      }
    }else{
      popup(emailVerification.message, null, "red")
    }
}